import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import About from '@/views/about'
import Howto from '@/views/Howto'

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
            path: '/whatis',
            name: 'whatis',
            component: Howto
        }

    ]
})