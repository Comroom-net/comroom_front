import 'babel-polyfill'

import 'es6-promise/auto' // IE 환경에서 Promise를 사용하기 위해 추가

import 'bootstrap/dist/css/bootstrap.min.css'

import common from './lib/common'

import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './vuex/store'
import VueProgressBar from 'vue-progressbar'
import BootstrapVue from 'bootstrap-vue'

// socket 설정`
const io = require('socket.io-client');
// import io from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
const socket = io(common.getSocketUrl());

// console.log('Socket Url : '+common.getSocketUrl());
// Vue.use(VueSocketIO, io(common.getSocketUrl()));
const vueSocketDebug = process.env.NODE_ENV === 'production' ? false : true;
Vue.use(new VueSocketIO({
    debug: vueSocketDebug,
    connection: socket
}));

// moment 설정
import moment from 'moment'
import VueMomentJS from 'vue-momentjs'
Vue.use(VueMomentJS, moment);

//실제 제품용 배포 여부 dd
const isProduction = process.env.NODE_ENV === 'production';

//style sheet module
import './lib/cssLib'

//plugin 참조
import apiPlugin from 'Plugin/apiPlugin' //api정의 plugin
Vue.use(apiPlugin);

//component library
import VueSidebarMenu from 'vue-sidebar-menu' //dashboard의 sidebar component
import PrettyCheckbox from 'pretty-checkbox-vue'; //upscaler completed list의 checkbox component

import Toasted from 'vue-toasted'; // Toast
// Toast (Contact-us 에서 경고 메세지 전달용으로 사용 중)
Vue.use(Toasted)

//etc library
import VueLogger from 'vuejs-logger'; //log library

//vuetify
import vuetify from './plugins/vuetify'

// Google Analytics
import VueAnalytics from 'vue-analytics'
Vue.use(VueAnalytics, {
    id: 'UA-146418775-1'
})

/* 
  sentry -> production에서만 활성화 
  product, test 모드일때 프론트 오류를 메일로 받는 라이브러리
  센트리에서 계정 가입해서 key를 받고 해당 개발자가 이메일로 오류 에러를 받을 수 있게 해야함.  
*/
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    Sentry.init({
        // dsn: 'https://9f1d3209e68c455da4ebd6ecca77d547@sentry.io/1874533',
        dsn: 'https://7783723fd97d42c08c01ab130f416f8c@o420464.ingest.sentry.io/5338722',
        integrations: [new Integrations.Vue({ Vue, attachProps: true })],
    });
}

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload);

Vue.config.productionTip = false;

/**library, module Vue Instance에서 사용 가능하도록 설정**/

Vue.use(VueSidebarMenu);
Vue.use(PrettyCheckbox);
Vue.use(BootstrapVue);

//vue logger
const vueLoggerOptions = {
    isEnabled: true, //사용여부
    logLevel: isProduction ? 'error' : 'debug', //logLevels :  ['debug', 'info', 'warn', 'error', 'fatal']
    stringifyArguments: false,
    showLogLevel: true,
    showMethodName: true,
    separator: '|',
    showConsoleColors: true
};
Vue.use(VueLogger, vueLoggerOptions);

// vue router progress bar
const progressOptions = {
    color: '#4c92f9',
    failedColor: '#ef5350',
    thickness: '5px',
    autoRevert: true,
    location: 'top',
    inverse: false
}

Vue.use(VueProgressBar, progressOptions);

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app')