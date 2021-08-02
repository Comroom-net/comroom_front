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

    get_event_color(time) {
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
    get_monthly(component) {
        const REQUEST_URL = API_URL.TIMETABLE_URL;

        let cal_info = {
            school: component.school_id,
            room: component.room,
            year: component.year,
            month: component.month
        }

        let colors = [
            "blue",
            "indigo",
            "deep-purple",
            "cyan",
            "green",
            "orange",
            "grey darken-1"
        ]

        api.get(REQUEST_URL, { params: cal_info })
            .then((response) => {
                Vue.$log.debug(`response ok ${response.status}`);
                Vue.$log.debug(response['data'])
                let timetables = response["data"]["results"]
                Vue.$log.debug(`time tables = ${timetables[0].grade}`);
                let events = []
                timetables.forEach(function(event) {
                    let name = `${event.grade}학년${event.classNo}반`
                    events.push({
                        name: name,
                        start: new Date(event.date),
                        end: new Date(event.date),
                        color: colors[event.time - 1],
                        timed: true
                    })

                })
                component.events.push(...events)
                return events;
            }).catch((error) => {
                Vue.$log.debug(error);
            })
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
            })
            .catch(err => {
                Vue.$log.debug(err)
            })
    }

}