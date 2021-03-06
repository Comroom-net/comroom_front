// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router'

import vuetify from '@/plugins/vuetify'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import './assets/app.scss'

import VueLogger from 'vuejs-logger';
import VueSession from 'vue-session'

const isProduction = process.env.NODE_ENV === 'production';


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueSession)


// vue logger
const vueLoggerOptions = {
    isEnabled: true,
    logLevel: isProduction ? 'error' : 'debug', //logLevels :  ['debug', 'info', 'warn', 'error', 'fatal']
    stringifyArguments: false,
    showLogLevel: true,
    showMethodName: true,
    separator: '|',
    showConsoleColors: true
};
Vue.use(VueLogger, vueLoggerOptions);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    vuetify,
    store,
    router,
    el: '#app',
    components: { App },
    template: '<App/>'
})