import Vue from 'vue'; //Vue Instance에 연결된 모듈들을 사용하기 위한 Vue 참조
import axios from 'axios'; //vue http 처리 라이브러리
import URL from 'Api/url' //URL 상수 모음 스크립트 : 모든 API 호출시 사용되는 URL이 정의되어 있음

// Request URL 설정
let url = URL.DEVELOPMENT_URL;
if (process.env.NODE_ENV == 'production') {
    url = URL.API_URL;
} else if (process.env.NODE_ENV == 'staging') {
    url = URL.TEST_URL;
} else {
    console.log('url', `is ${url}`);
}


//전역에서 사용할 axios intance정의
const api = axios.create({
    baseURL: url, //실제 운영 시 URL.BASE_URL 사용
    //withCredentials : true,   //session 사용시 credential 포함 여부 설정 (session 필요 없는 요청에 대해선 개별 request에서 withCredential: false 설정 필요)
    // headers: {'Accept' : 'application/json'} //헤더 설정 : 서버에서 api 호출을 위한 url과 front-end router로 fallback할 page url 을 구분하기 위해 사용
});

//api response에 따라 global 처리 로직을 정의하는 부분
api.interceptors.response.use(
    //response fulfilled 실행 전 로직 => then 으로 연결됨
    function(response) {
        Vue.$log.debug(`URL Check - ${response.config.baseURL}`);

        //Vue.$log.debug("!intercept fulfilled!", Vue.$router);
        return response;
    },
    //response error 실행 전 로직 => catch 로 연결됨.
    function(error) {
        //error 분기 처리
        if (error) {
            Vue.$log.error("!intercept error!", error);

            let status = error.response.status;
            let message = error.response.data.message;

            Vue.$log.error("status : ", status);
            Vue.$log.error("message : ", message);

            switch (status) {

                //이메일 중복 : 개별 api error callback에서 처리
                // case 400:
                //     break;

                //Unauthorized
                // case 401:

                //     //session은 만료됫으나 vuex에 저장한 user 값이 있다면 유효하지 않은 것이므로 로그아웃 처리 (user 정보 삭제)
                //     if(Vue.$store.state.user){
                //         Vue.$store.commit('logoutUser');
                //         Vue.$log.debug("logout");
                //     }

                //     //login page로 redirect (login 완료 후 이동하고자 한 원래 페이지 경로를 query로 전달)
                //     Vue.$router.push(`/login/redirect=${Vue.$router.history.current.fullPath}`);

                //     break;
                case 403:
                    alert(message);
                    location.href = "/";
                    break;
                    //Not Found
                case 404:

                    //not found page로 redirect
                    Vue.$router.push('/not-found');

                    break;

                    //Internal Server Error
                case 500:

                    break;
            }

        }

        return Promise.reject(error);
    });

export default api