/**vue routing 정의 부분**/

import Vue from 'vue'
import Router from 'vue-router'
import VueAnalytics from 'vue-analytics'

//home
import Home from '../views/Home'

/*router page 단위 code splitting 적용*/

const Privacy = () =>
    import ('Views/Privacy');
const Terms = () =>
    import ('Views/Terms');
const Contact = () =>
    import ('Views/contact/Contact');
const ContactSuccess = () =>
    import ('Views/contact/ContactSuccess');

//user
const User = () =>
    import ('Components/container/User')
const Join = () =>
    import ('Views/user/Join');
const JoinSuccess = () =>
    import ('Views/user/JoinSuccess');
const Login = () =>
    import ('Views/user/Login');
const Verified = () =>
    import ('Views/user/Verified');
const Forgot = () =>
    import ('Views/user/ForgotPassword');
const ForgotSuccess = () =>
    import ('Views/user/ForgotPasswordSuccess');
const Reset = () =>
    import ('Views/user/ResetPassword');

//dashboard
const Dashboard = () =>
    import ("Components/container/Dashboard");
//const Upscaler = () => import('Views/dashboard/Upscaler');
const Tutorial = () =>
    import ("Views/dashboard/tutorial")
const VidUpscaler = () =>
    import ('Views/dashboard/VidUpscaler');
const ImgUpscaler = () =>
    import ('Views/dashboard/ImgUpscaler');
const Store = () =>
    import ('Views/dashboard/Store');
const FAQ = () =>
    import ('Views/dashboard/FAQ');
const Forum = () =>
    import ('Views/dashboard/Forum');
const List = () =>
    import ('Components/widget/forum/ListOther');
const Write = () =>
    import ('Components/widget/forum/WritePage');
const Detail = () =>
    import ('Components/widget/forum/DetailPage');
const Republish = () =>
    import ('Views/dashboard/republish');
const Settings = () =>
    import ('Views/dashboard/Settings');
const PaymentInProgres = () =>
    import ('Views/dashboard/PaymentInProgress');
const PaymentComplete = () =>
    import ('Views/dashboard/PaymentComplete');

Vue.use(Router);

const requireAuth = () => (to, from, next) => {
    if (this.$store.state.user.loginState) {
        return next();
    }
    next('/user/login');
};

// export default new Router({
const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        // { path: '*', component: NotFoundComponent },
        //home landing page
        {
            path: '/',
            name: 'home',
            component: Home
        },
        //user container page: join, join-success ,login
        {
            path: '/user',
            name: 'user',
            component: User,
            children: [{
                    path: 'join',
                    component: Join
                },
                {
                    name: 'join-success',
                    path: 'join-success',
                    component: JoinSuccess,
                    props: true
                },
                {
                    path: 'login',
                    component: Login
                },
                {
                    path: 'verified',
                    component: Verified
                },
                {
                    path: 'forgot-password',
                    component: Forgot
                },
                {
                    path: 'forgot-password-success',
                    component: ForgotSuccess
                },
                {
                    path: 'password-reset/:hash',
                    component: Reset
                }
            ]
        },
        //dashboard container page : upscaler, republish, settings
        {
            path: '/dashboard',
            // redirect: '/dashboard/upscaler',    //dashboard로 들어올 시 default로 upscaler page로 redirect
            /*
                현재 비디오 업스케일러가 완성되지 않아서 초기 진입화면을 이미지 업스케일러 페이지로 변경함
                    - jeff, 191016
            */
            redirect: '/dashboard/tutorial', //dashboard로 들어올 시 default로 upscaler page로 redirect
            name: 'dashboard',
            component: Dashboard,
            // beforeEnter: requireAuth(), - 로그인 유무 판단, store 가져오면 적용 가능, 다른 일감 처리로 인해 중지 및 주석 처리 - 191030 Charlie

            //dashboard하위에서 라우팅 되는 component 들
            children: [{
                    path: "tutorial",
                    component: Tutorial
                },
                {
                    path: "vid-upscaler",
                    component: VidUpscaler
                },
                {
                    path: "img-upscaler",
                    component: ImgUpscaler
                },
                {
                    path: "republish",
                    component: Republish
                }, {
                    path: "settings",
                    component: Settings
                }, {
                    path: "store",
                    component: Store
                }, {
                    path: "faq",
                    component: FAQ
                }, {
                    path: "forum",
                    component: Forum,
                    children: [{
                        path: "/",
                        component: List,
                    }, {
                        path: "write",
                        component: Write
                    }, {
                        path: "detail/:idx",
                        name: 'detail',
                        component: Detail
                    }]
                }, {
                    path: "payment/in-progress",
                    component: PaymentInProgres
                }, {
                    name: "payment-complete",
                    path: "payment/complete",
                    component: PaymentComplete
                }
            ],
            meta: {
                func: [
                    { call: 'color', modifier: 'temp', argument: '#ffb000' }, { call: 'fail', modifier: 'temp', argument: '#6e0000' },
                    { call: 'location', modifier: 'temp', argument: 'top' },
                    { call: 'transition', modifier: 'temp', argument: { speed: '1.5s', opacity: '0.6s', termination: 400 } }
                ]
            }
        },
        {
            path: '/privacy',
            name: 'privacy',
            component: Privacy
        },
        {
            path: '/terms',
            name: 'terms',
            component: Terms
        },
        { // 문의사항 보내는 페이지
            path: '/contact',
            name: 'contact',
            component: Contact,
        },
        {
            // 문의사항 보낸 후 페이지 
            path: "/contact-success",
            name: "contact-success",
            component: ContactSuccess,
        }
    ]
})

Vue.use(VueAnalytics, {
    id: 'UA-146418775-1',
    router
})

export default router;