import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'

import About from '@/views/common/about'
import Howto from '@/views/common/howto'
import Whatis from '@/views/common/whatis'
import Faq from '@/views/common/faq'
import Nocookie from '@/views/common/nocookie'

import School from '@/views/school/school'
import Login from '@/views/school/login'
import ForgotPassword from '@/views/school/forgot_password'
import PrivacyConsent from '@/views/school/privacy_consent'
import Register from '@/views/school/register'
import UserActive from '@/views/school/user_active'

import Timetable from '@/views/timetable/timetable'

import Admin from '@/views/admin'
import FixedTime from '@/components/admin/fixedTime'
import TimeMap from '@/components/admin/timeMap'
import TimetableManager from '@/components/admin/timetableManager'
import RoomManager from '@/components/admin/roomManager'

import OrderPage from '@/views/namu/order_page'

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
        name: 'timetable',
        component: Timetable,
        props: (route) => ({
            school: route.query.school,
            s_code: route.query.s_code,
        }),
    },
    {
        path: '/school',
        component: School,
        children: [
            {
                path: 'privacy-consent',
                name: 'privacy-consent',
                component: PrivacyConsent
            },
            {
                path: 'register',
                name: 'register',
                component: Register
            },
            {
                path: 'active/:token',
                name: 'user-active',
                component: UserActive,
                props: (route) => ({ token: route.params.token })
            },
        ]
    },
    {
        path: '/admin',
        component: Admin,
        children: [
            {
                path: 'fixed',
                name: 'fixedTime',
                component: FixedTime
            },
            {
                path: 'map-time',
                name: 'timeMap',
                component: TimeMap
            },
            {
                path: 'room',
                name: 'roomManager',
                component: RoomManager
            },
            {
                path: 'timetable',
                name: 'timeManager',
                component: TimetableManager
            },
        ]
    },
    {
        path: '/search',
        component: Timetable,
        props: (route) => ({ school: route.query.school })
    },
    {
        path: '/namu',
        component: OrderPage
    }

    ]
})