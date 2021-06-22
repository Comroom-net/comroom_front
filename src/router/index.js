import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import About from '@/views/about'
import Howto from '@/views/Howto'
import Whatis from '@/views/whatis'
import Faq from '@/views/faq'
import Nocookie from '@/views/nocookie'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/about',
            name: 'about',
            component: About

        },
        {
            path: '/howto',
            name: 'howto',
            component: Howto
        },
        {
            path: '/whatis',
            name: 'whatis',
            component: Whatis
        },
        {
            path: '/faq',
            name: 'faq',
            component: Faq
        },
        {
            path: '/nocookie',
            name: 'nocookie',
            component: Nocookie
        },

    ]
})