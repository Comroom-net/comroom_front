/**API URL 상수들 정의하는 스크립트 : API 호출 시 사용되는 모든 URL 상수 정의**/
// * url의 '/'는 항상 앞에 붙으며 뒤에 붙지 않습니다.

const API_VERSION = "";

export default {
    API_URL: `http://api.comroom.net/${API_VERSION}`, //기본 베이스 URL
    TEST_URL: `http://test-api.comroom.net/${API_VERSION}`,   //임시 테스트 URL
    DEVELOPMENT_URL: `http://localhost:8000/${API_VERSION}`,
    BASE_URL: 'http://comroom.net',
    LOCAL_URL: `http://localhost:8080/${API_VERSION}`,
    DJANGO_DEVELOPMENT_URL: `http://localhost:8000/${API_VERSION}`,
    DJANGO_TEST_URL: `https://localhost:8000/${API_VERSION}`,
    DJANGO_API_URL: '',

    /** users **/
    SCHOOL_SIGNUP_URL: "/school",
    SCHOOL_EX_LOGIN_URL: "/school/ex_login",
    USERS_ME_URL: "/users/me",                             //회원 정보 확인
    USERS_USERINFO_URL: (id) => {                             //회원 정보 갱신
        return `/users/${id}`
    },
    USERS_PHOTO_URL: (id) => {                                //회원 프로필 사진 갱신
        return `/users/${id}/photo`
    },
    USERS_PREMIUM_URL: (id) => {                              //회원 등급 갱신
        return `/users/${id}/premium`
    },
    USERS_SIGNOUT_URL: "/users",



    /** auth **/
    AUTH_LOGOUT_URL: '/auth',                              //로그아웃

    AUTH_EMAIL_VALIDATION_URL: (link) => {                   //회원가입 이메일 인증
        return `/auth/email-validation/${link}`
    },
    AUTH_RESET_PW_URL: '/auth/reset-pw',                   //비밀번호 초기화 이메일 요청
    AUTH_EMAIL_LOGIN_URL: '/auth/local',                   //이메일 로그인
    AUTH_GOOGLE_LOGIN_URL: '/auth/google',                 //구글 로그인

    /** notification **/
    NOTIFICATION: '/notification',
    NOTIFICATION_ADD: "/notification/add",


    /** contact**/
    CONTACT_URL: '/contact-us',                               //서비스 대표 이메일로 문의 사항 전달

    SUPPORT: '/support',
    /** Republish **/
    ADD_REPUBLISH_URL: (id) => {                          //멀티 업로드 추가
        return `/republish/${id}`
    },
    REPUBLISH_LIST_URL: (id) => {                         //멀티 업로드 리스트 요청
        return `/republish/${id}`
    },
    REPUBLISH_PLATFORM_INFO_URL: (id, platform) => {      //멀티 업로드 플랫폼의 대한 상세 정보 요청
        return `/republish/${id}/${platform}`
    },


    /** team**/
    TEAM_URL: '/team',                                     //팀 생성
    TEAM_DELETE_URL: (teamId) => {                           //팀삭제
        return `/team/${teamId}`
    },
    TEAM_INVITE_URL: (teamId) => {                           //팀초대
        return `/team/${teamId}/person`
    },
    TEAM_PERSON_URL: (teamId) => {                           //팀원 리스트 요청
        return `/team/${teamId}/person`
    },

    /** Upload */
    UPLOAD: '/upload',                                  // File Upload (POST)

    /** Index */
    INDEX: '/index',

    RESEND: '/users/resend-validation',

    RESET: '/password-reset',

    RESET_PASSWORD: (link) => {                   // 비밀번호 저장
        return `/password-reset/${link}`
    },
}