// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import vuetify from '@/plugins/vuetify'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import VCalendar from 'v-calendar';

Vue.use(BootstrapVue)
    // Vue.use(VCalendar, {
    //     componentPrefix: 'vc',
    // });

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
        vuetify,
        el: '#app',
        router,
        components: { App },
        template: '<App/>'
    })
    // new Vue({
    //     vuetify,
    // }).$mount('#app')