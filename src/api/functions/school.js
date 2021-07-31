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
    user_active(token, component) {
        const REQUEST_URL = API_URL.SCHOOL_USER_ACITVE_URL;

        api.get(REQUEST_URL + token)
            .then((response) => {
                Vue.$log.debug(`response ok ${response.status}`);
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
            var resData = response["data"];
            this.add_user_session(component, resData)
            component.$router.push("/")
          })
          .catch(err => {
            Vue.$log.debug(err);
            component.error = err;
          });

    },
    add_user_session(component, resData){
        component.$session.set("username", resData["username"]);
        component.$session.set("user_id", resData["user_id"]);
        component.$session.set("school", resData["school"]);
        component.$session.set("s_code", resData["s_code"]);
        component.$session.set("is_active", resData["is_active"]);
    },
    ex_login(component) {
        const REQUEST_URL = API_URL.SCHOOL_EX_LOGIN_URL;

        //login post request의 form data 정의 부분
        // const requestBody = {
        //     email: loginObject.email,
        //     password: loginObject.password
        // };
        //request call 및 response/error catch
        api.get(REQUEST_URL)
            .then((response) => {
                Vue.$log.debug(`response ok ${response.status}`);
                //api 호출한 component(Login.Vue)의 callback method 호출
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
                component.onRegisterSuccess(response);
                return;
            }).catch((error) => {
                Vue.$log.debug(error);
                // this.$toasted.show("Something went wrong", {duration: 3000});
                // TODO : 401 에러에 대해서 핸들링 해야합니다. charlie 
                component.onRegisterFalied();
                // if (error.response) {
                //     component.onLoginFalied(error.response.status);
                // } else {
                //     component.onLoginFalied(500);
                // }
            })
    }

}