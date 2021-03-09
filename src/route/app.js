import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/app';

Vue.use(VueRouter);

const Login = () => import( '../components/auth/Login.vue');
const SetPassword = () => import( '../components/auth/SetPassword.vue');
const BaseIndex = () => import( '../components/base/Index.vue');
const DashboardIndex = () => import( '../components/dashboard/Index');
const CalendarIndex = () => import( '../components/calendar/Index');
const MastersIndex = () => import( '../components/masters/Index');
const OrdersIndex = () => import( '../components/orders/Index');
const SalonsIndex = () => import( '../components/salons/Index');
const ServicesIndex = () => import( '../components/services/Index');
const PromotionsIndex = () => import( '../components/promotions/Index');
const SettingsIndex = () => import( '../components/settings/Index');
const AdminUsers = () => import( '../components/admin/Users');

const form = () => import('../components/form/index')


const Error404 = () => import( '../components/base/404.vue');

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login,
    },
    {
        path: '/form',
        name: 'form',
        component: form,
    },
    {
        path: '/set-password',
        name: 'set-password',
        component: SetPassword,
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
                meta: { needAuth: true },
            },
            {
                path: '/admin-users',
                name: 'home.admin.users',
                component: AdminUsers,
                meta: { needAuth: true, roles: ['super-admin'] },
            },
            {
                path: '/calendar',
                name: 'home.calendar',
                component: CalendarIndex,
                meta: { roles: ['admin', 'master'], needAuth: true },
            },
            {
                path: '/masters',
                name: 'home.masters',
                component: MastersIndex,
                meta: { roles: ['admin'], needAuth: true },
            },
            {
                path: '/orders',
                name: 'home.orders',
                component: OrdersIndex,
                meta: { roles: ['admin', 'master'], needAuth: true },
            },
            {
                path: '/orders/:order_id?',
                name: 'home.order.show',
                component: OrdersIndex,
                meta: { roles: ['admin', 'master'], needAuth: true },
            },
            {
                path: '/salons',
                name: 'home.salons',
                component: SalonsIndex,
                meta: { roles: ['admin'], needAuth: true },
            },
            {
                path: '/services',
                name: 'home.services',
                component: ServicesIndex,
                meta: { roles: ['admin'], needAuth: true },
            },
            {
                path: '/promotions',
                name: 'home.promotions',
                component: PromotionsIndex,
                meta: { roles: ['admin'], needAuth: true },
            },
            {
                path: '/settings',
                name: 'home.settings',
                component: SettingsIndex,
                meta: { roles: ['admin'], needAuth: true },
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

        })
            .catch((error) => {
                if (error?.response?.status == 401){

                    store.dispatch('clearAuth').then(() => {
                        window.location.href = '/'
                    })
                }else {
                    console.warn(error)
                }
            })
    }
    if (to.meta.roles){
        var redirect = true
        to.meta.roles.forEach(role => {
            if (store.getters.auth.role_list.includes(role)){
                redirect = false
            }
        })
        //проверка прошла но роли нет
        if (redirect)
            window.location.href = '/dashboard'
    }
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.needAuth) && !store.getters.auth) {
        store.dispatch('getAuth').then(() => {
            if (!store.getters.auth) {
                // eslint-disable-next-line no-debugger
                // debugger;
                window.location.href = '/'
            }else {
                next()
            }
        }).catch((error) => {
            if (error?.response?.status == 401){
                // eslint-disable-next-line no-debugger
                // debugger;
                window.location.href = '/'
            }else {
                console.warn(error)
                next()
            }
        })
    } else {
        next();
    }
});

export default router;
