import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'

import About from '@/views/common/about'
import Howto from '@/views/common/howto'
import Whatis from '@/views/common/whatis'
import Faq from '@/views/common/faq'
import Nocookie from '@/views/common/nocookie'
import Gsuite from '@/views/common/g_suite_convertor'

import School from '@/views/school/school'
import Login from '@/views/school/login'
import PrivacyConsent from '@/views/school/privacy_consent'
import Register from '@/views/school/register'
import UserActive from '@/views/school/user_active'
import ResetPassword from '@/components/common/reset_password'

import Timetable from '@/views/timetable/timetable'

import Admin from '@/views/admin'
import FixedTime from '@/components/admin/fixedTime'
import TimeMap from '@/components/admin/timeMap'
import TimetableManager from '@/components/admin/timetableManager'
import RoomManager from '@/components/admin/roomManager'

import Namu from '@/views/namu/namu'
import OrderPage from '@/views/namu/order_page'
import OrderSuccess from '@/views/namu/order_success'
import NamuInvalid from '@/views/namu/invalid'

import UpdateHistory from '@/views/develop/update_history'

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
        path: '/g-suite',
        name: 'g-suite',
        component: Gsuite
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/develop',
        name: 'develop',
        component: UpdateHistory
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
        children: [{
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
        {
            path: 'reset-password/:token',
            name: 'reset-password',
            component: ResetPassword,
            props: (route) => ({ token: route.params.token })
        },
        ]
    },
    {
        path: '/admin',
        component: Admin,
        children: [{
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
        component: Namu,
        children: [{
            path: '',
            component: OrderPage,
            beforeEnter: (to, from, next) => {
                if (Vue.prototype.$session.get('namuRoom') == null) {
                    next({ name: 'namuInvalid' })
                } else next()
            }
        },
        {
            path: 'room/:name',
            beforeEnter: (to, from, next) => {
                const name = to.params.name
                Vue.prototype.$session.set('namuRoom', name)
                next('/namu')
            }
        },
        {
            path: 'success',
            component: OrderSuccess,
            name: 'namuSuccess'
        },
        {
            path: 'invalid',
            component: NamuInvalid,
            name: 'namuInvalid'
        },
        ]

    },


    ]
})