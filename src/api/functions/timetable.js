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


    get_monthly(component) {
        const REQUEST_URL = API_URL.TIMETABLE_URL;

        let cal_info = {
            school: component.$session.school_id,
            room: component.$route.params.roomNo,
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
                Vue.$log.debug(`time tables = ${timetables[0].grade}`);
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
                component.events.push(...events)
                return events;
            }).catch((error) => {
                Vue.$log.debug(error);
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
    add_time(component, login_info) {
        const REQUEST_URL = API_URL.SCHOOL_LOGIN_URL;

        api
            .post(REQUEST_URL, login_info)
            .then(response => {
                Vue.$log.debug(response);
                this.add_user_session(component, response["data"])
                component.$router.push("/")
            })
            .catch(err => {
                Vue.$log.debug(err);
                component.error = err;
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
                component.$router.push({ name: 'timetable', params: { roomNo: 1 } })
            })
            .catch(err => {
                Vue.$log.debug(err)
            })
    }

}