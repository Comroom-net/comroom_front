import Vue from 'vue';
import api from "../index"; //gloabal instance로 정의한 axios 참조
import API_URL from "Api/url";
// import common from '../../lib/common';

// const qs = require('querystring');
/** api 함수 정의 기본 flow는 다음과 같습니다.
 * 1) url 상수를 이용한 url 정의
 * 2) request에 포함될 form data 혹은 parameter 정의
 * 3) api 호출 : 호출 시 개별 적용될 confing 적용, response/error catch하여 다음 동작 정의/호출한 component에게 callback
 * **/

export default {
    delete_fix(component, idx) {
        const REQUEST_URL = API_URL.FIXED_TIME_URL + idx + '/';

        api.delete(REQUEST_URL)
            .then((response) => {
                Vue.$log.debug(response.status)
                this.get_all_fixed_times(component)
            })
            .catch((err) => {
                Vue.$log.error(err)
            })
    },
    add_new_fixed(component) {
        const REQUEST_URL = API_URL.FIXED_TIME_URL

        const reqData = {
            fixed_day: component.day,
            fixed_time: component.time,
            fixed_name: component.title,
            fixed_from: component.start_date,
            fixed_until: component.end_date,
            school: component.$session.get("school_id"),
            comroom_id: component.room
        }

        Vue.$log.debug("add new fixed", reqData)

        api.post(REQUEST_URL, reqData)
            .then((response) => {
                Vue.$log.debug(response.status)
                this.get_all_fixed_times(component)
                component.$refs.form.reset()
            })
            .catch((err) => {
                Vue.$log.error(err)
            })
    },
    delete_time(component, idx) {
        const REQUEST_URL = API_URL.TIMETABLE_URL + idx + '/';

        api.delete(REQUEST_URL)
            .then((response) => {
                Vue.$log.debug(response.status)
                this.get_all_timetable(component)
            })
            .catch((err) => {
                Vue.$log.error(err)
            })
    },
    set_comroom(component, room) {
        component.isSending = true

        const REQUEST_URL = API_URL.COMROOM_URL + room.id + '/';

        const reqData = {
            name: room.name,
            caption: room.description,
        }

        api.patch(REQUEST_URL, reqData)
            .then((response) => {
                Vue.$log.debug(response.status)
                component.isSending = false
            })
            .catch((err) => {
                Vue.$log.error(err)
            })
    },
    set_start_time(component) {
        const REQUEST_URL = API_URL.MAP_TIME_URL;

        const reqData = { school_id: component.$session.get('school_id'), start_time: component.selectTimes[component.startTime] }

        api.post(REQUEST_URL, reqData)
            .then((response) => {
                Vue.$log.debug(response.status)
            })
            .catch((err) => {
                Vue.$log.error(err)
            })
    },
    get_start_time(component) {
        const REQUEST_URL = API_URL.MAP_TIME_URL;

        const reqParam = { school_id: component.$session.get('school_id') }

        api.get(REQUEST_URL, { params: reqParam })
            .then((response) => {
                Vue.$log.debug(response)
                if (response.data) {
                    component.startTime = response.data['start_time']
                    if (component.isFixedTime) component.makeTimes()
                        // component.startTime = component.selectTimes.findIndex(ele => ele == response.data['start_time'])
                }
                return response.data['start_time']
            })
            .catch((err) => {
                Vue.$log.error(err)
            })
    },
    get_all_timetable(component) {
        const REQUEST_URL = API_URL.SCHOOL_GET_ALL_TIMETABLE_URL;

        api.get(REQUEST_URL + component.$session.get('school_id'))
            .then((response) => {
                Vue.$log.debug(response)
                component.timetables = response.data
            })
            .catch((err) => {
                Vue.$log.error(err)
            })
    },
    get_comroom(component) {
        const REQUEST_URL = API_URL.SCHOOL_GET_COMROOMS_URL;

        api.get(REQUEST_URL + component.$session.get('school_id'))
            .then((response) => {
                Vue.$log.debug(response)
                component.rooms = response.data
            })
            .catch((err) => {
                Vue.$log.error(err)
            })
    },
    get_monthly(component) {
        const REQUEST_URL = API_URL.TIMETABLE_URL;

        let cal_info = {
            school: component.$session.get("school_id"),
            room: component.roomNo + 1,
            year: component.year,
            month: component.month
        }

        const get_event_color = this._get_event_color
        const get_realtime = this._get_realtime

        api.get(REQUEST_URL, { params: cal_info })
            .then((response) => {
                Vue.$log.debug(`response ok ${response.status}`);
                Vue.$log.debug(response['data'])
                let timetables = response["data"]["results"]
                    // Vue.$log.debug(`time tables = ${timetables[0].grade}`);
                let events = []
                timetables.forEach(function(event) {
                    let name = `${event.grade}학년 ${event.classNo}반`
                    const realTime = get_realtime(event.time - 1)
                    events.push({
                        name: name,
                        start: new Date(`${event.date}T${realTime[0]}`),
                        end: new Date(`${event.date}T${realTime[1]}`),
                        color: get_event_color(event.time - 1),
                        timed: true,
                        details: `${event.teacher} 선생님`,
                        schoolTime: event.time
                    })

                })
                component.events = events
                return events;
            }).catch((error) => {
                Vue.$log.debug(error);
            })
    },
    get_all_fixed_times(component) {
        const REQUEST_URL = API_URL.FIXED_TIME_URL;

        let cal_info = {
            school: component.$session.get("school_id"),
            year: component.year,
        }

        api.get(REQUEST_URL, { params: cal_info })
            .then((response) => {
                Vue.$log.debug(response['data'])
                let timetables = response["data"]["results"]
                Vue.$log.debug(timetables)
                component.timetables = timetables
            })
    },
    _get_event_color(time) {
        let colors = [
            "blue",
            "indigo",
            "deep-purple",
            "cyan",
            "green",
            "orange",
            "grey darken-1"
        ]
        return colors[time]
    },
    _get_realtime(time) {
        let timetable = [
            ["09:00:00", "09:40:00"],
            ["09:50:00", "10:30:00"],
            ["10:40:00", "11:20:00"],
            ["11:30:00", "12:10:00"],
            ["12:20:00", "13:00:00"],
            ["13:10:00", "13:50:00"],
            ["14:00:00", "14:40:00"],
        ]
        return timetable[time]
    },
    addTime(component) {
        const REQUEST_URL = API_URL.TIMETABLE_URL;

        var timeInfo = {
            classNo: component.newClass,
            grade: component.newGrade,
            date: component.date,
            time: component.newTime + 1,
            teacher: component.teacher,
            school: component.$session.get("school_id"),
            roomNo: component.roomNo
        }

        Vue.$log.info(timeInfo)

        api.post(REQUEST_URL, timeInfo)
            .then(response => {
                Vue.$log.debug(response);
                component.loading = false
                component.showNew = false
                component.$emit("addNew")
            })
            .catch(err => {
                Vue.$log.debug(err);
                component.apiError = err;
            });

    },
    check_school(component) {
        const REQUEST_URL = API_URL.TIMETABLE_VALID_URL;

        const params = {
            school: component.school,
            s_code: component.s_code
        }

        api.get(REQUEST_URL, { params: params })
            .then(response => {
                Vue.$log.debug("checkschool", response)
                component.$session.set("school_id", response.data["school_id"]);
                component.valid_school = true
                component.$router.push({ name: 'timetable' })

            })
            .catch(err => {
                Vue.$log.debug(err)
            })
    }

}