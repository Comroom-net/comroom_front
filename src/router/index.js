import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import About from '@/views/about'

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

    ]
})