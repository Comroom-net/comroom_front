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
    resetPassword(component) {
        const REQUEST_URL = API_URL.SCHOOL_RESET_PASSWORD_URL;

        const reqData = {
            newPassword: component.newPassword,
            token: component.token
        }

        api.post(REQUEST_URL, reqData)
            .then(response => {
                Vue.$log.debug(response);
                component.$router.push("/")
            })
            .catch(err => {
                Vue.$log.debug(err);
                // TODO: error page로 이동
            });

    },
    /**샘플 로그인 ( Home component에서 호출 )
     * @param component : 해당 api 를 호출한 component 객체
     * */
    user_active(token, component) {
        const REQUEST_URL = API_URL.SCHOOL_USER_ACITVE_URL;

        api.get(REQUEST_URL + token)
            .then((response) => {
                Vue.$log.debug(`response ok ${response.status}`);
                this.add_user_session(component, response["data"])
                component.active_good(response);
                return;
            }).catch((error) => {
                Vue.$log.debug(error);
                component.active_bad(error.response.status);
            })
    },
    login(component, login_info) {
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
    add_user_session(component, resData) {
        component.$session.set("username", resData["username"]);
        component.$session.set("user_id", resData["user_id"]);
        component.$session.set("school", resData["school"]);
        component.$session.set("school_id", resData["school_id"]);
        component.$session.set("s_code", resData["s_code"]);
        component.$session.set("is_active", resData["is_active"]);
    },
    ex_login(component) {
        const REQUEST_URL = API_URL.SCHOOL_EX_LOGIN_URL;

        api.get(REQUEST_URL)
            .then((response) => {
                Vue.$log.debug(`response ok ${response.status}`);
                //api 호출한 component(Login.Vue)의 callback method 호출
                this.add_user_session(component, response["data"])
                component.onLoginSuccess(response);
                return;
            }).catch((error) => {
                Vue.$log.debug(error);
                // this.$toasted.show("Something went wrong", {duration: 3000});
                // TODO : 401 에러에 대해서 핸들링 해야합니다. charlie 
                component.onLoginFalied(401);
                // if (error.response) {
                //     component.onLoginFalied(error.response.status);
                // } else {
                //     component.onLoginFalied(500);
                // }
            })
    },
    register(reqData, component) {
        const REQUEST_URL = API_URL.SCHOOL_REGISTER;

        api.post(REQUEST_URL, reqData)
            .then((response) => {
                Vue.$log.debug(`response ok ${response.status}`);
                //api 호출한 component(Login.Vue)의 callback method 호출
                component.$router.push("/")
            }).catch((error) => {
                component.$log.error("register failed")
                if (error.response.status == 400) {
                    component.error = error.response.data.message
                    component.snackbar = true
                } else {
                    Vue.$log.debug(error);
                }
            })
    }

}