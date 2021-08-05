import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'

import About from '@/views/common/about'
import Howto from '@/views/common/Howto'
import Whatis from '@/views/common/whatis'
import Faq from '@/views/common/faq'
import Nocookie from '@/views/common/nocookie'

import Login from '@/views/school/login'
import ForgotPassword from '@/views/school/forgot_password'
import PrivacyConsent from '@/views/school/privacy_consent'
import Register from '@/views/school/register'
import UserActive from '@/views/school/user_active'

import Timetable from '@/views/timetable/timetable'
import validSchool from '@/views/timetable/valid_school'
import Calendar from "@/components/timetable/calendar";

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
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/forgot-password',
            name: 'forgot-passowrd',
            component: ForgotPassword
        },
        {
            path: '/timetable',
            component: Timetable,
            children: [{
                    path: '',
                    name: 'validschool',
                    component: validSchool,
                    props: (route) => ({
                        school: route.query.school,
                        s_code: route.query.s_code,
                    }),
                },
                {
                    path: 'room/:roomNo',
                    name: 'timetable',
                    component: Calendar,
                },
            ]
        },

        {
            path: '/school/privacy_consent',
            name: 'privacy-consent',
            component: PrivacyConsent
        },
        {
            path: '/school/register',
            name: 'register',
            component: Register
        },
        {
            path: '/school/active/:token',
            name: 'user-active',
            component: UserActive,
            props: (route) => ({ token: route.params.token })
        },
        {
            path: '/search',
            component: Timetable,
            props: (route) => ({ school: route.query.school })
        },


    ]
})