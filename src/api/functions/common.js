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

    /**샘플 로그인 ( Home component에서 호출 )
     * @param component : 해당 api 를 호출한 component 객체
     * */
    getNotice(component) {
        const REQUEST_URL = API_URL.SCHOOL_NOTICE_URL;

        api.get(REQUEST_URL)
            .then((response) => {
                component.notices = response.data.results
                component.$log.debug(component.notices)
            }).catch((error) => {
                Vue.$log.debug(error);
            })
    },
    sendMsg(component) {
        const REQUEST_URL = API_URL.SEND_MSG_URL;

        const reqData = {
            sender: component.sender,
            contact: component.contact,
            msg: component.msg
        }

        api.post(REQUEST_URL, reqData)
            .then((response) => {
                component.$log.debug(response)
            }).catch((error) => {
                Vue.$log.debug(error);
            })
    },

}