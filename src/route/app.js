import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/app';

Vue.use(VueRouter);

const Login = () => import( '../components/auth/Login.vue');
const BaseIndex = () => import( '../components/base/Index.vue');
const DashboardIndex = () => import( '../components/dashboard/Index');
const CalendarIndex = () => import( '../components/calendar/Index');
const MastersIndex = () => import( '../components/masters/Index');
const OrdersIndex = () => import( '../components/orders/Index');
const SalonsIndex = () => import( '../components/salons/Index');
const ServicesIndex = () => import( '../components/services/Index');
const PromotionsIndex = () => import( '../components/promotions/Index');
const SettingsIndex = () => import( '../components/settings/Index');



const Error404 = () => import( '../components/base/404.vue');

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login,
    },
    {
        path: '/home',
        name: 'home',
        component: BaseIndex,
        meta: { needAuth: true },
        redirect: { name: 'home.dashboard' },
        children: [
            {
                path: '/dashboard',
                name: 'home.dashboard',
                component: DashboardIndex,
            },
            {
                path: '/calendar',
                name: 'home.calendar',
                component: CalendarIndex
            },
            {
                path: '/masters',
                name: 'home.masters',
                component: MastersIndex
            },
            {
                path: '/orders',
                name: 'home.orders',
                component: OrdersIndex
            },
            {
                path: '/salons',
                name: 'home.salons',
                component: SalonsIndex
            },
            {
                path: '/services',
                name: 'home.services',
                component: ServicesIndex
            },
            {
                path: '/promotions',
                name: 'home.promotions',
                component: PromotionsIndex
            },
            {
                path: '/settings',
                name: 'home.settings',
                component: SettingsIndex
            },
        ]
    },
    {
        path: '*',
        name: 'error.404',
        component: Error404,
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
    if (!store.getters.auth) {
        store.dispatch('getAuth').then(() => {
        });
    }
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.needAuth) && !store.getters.auth) {
        store.dispatch('getAuth').then(() => {
            next()
        }).catch((error) => {
            if (error?.response?.status == 401){
                window.location.href = '/'
            }else {
                console.warn(error)
            }
        })
    } else {
        next();
    }
});

export default router;
