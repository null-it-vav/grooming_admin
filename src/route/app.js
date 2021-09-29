import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/app';

Vue.use(VueRouter);

const Login = () => import( '../components/auth/Login.vue');
const SetPassword = () => import( '../components/auth/SetPassword.vue');
const BaseIndex = () => import( '../components/base/Index.vue');
const DashboardIndex = () => import( '../components/dashboard/Index');
// const CalendarIndex = () => import( '../components/calendar/Index');
const CalendarWeek = () => import( '../components/calendar/CalendarWeek');
// const CalendarScheduleIndex = () => import( '../components/calendar/Schedule');
const MastersIndex = () => import( '../components/masters/Index');
const MastersShow = () => import( '../components/masters/MasterShow');
const OrdersIndex = () => import( '../components/orders/Index');
const SalonsIndex = () => import( '../components/salons/Index');
const ServicesIndex = () => import( '../components/services/Index');
const ServicesBreeds = () => import( '../components/services/Breeds');
const ServicesSchedule = () => import( '../components/services/Schedule');
const PackagesIndex = () => import( '../components/packages/PackagesIndex');
const CommentsIndex = () => import( '../components/comments/CommentsIndex');

const ChatMessages = () => import( '../components/chat/ChatMessages');

const PromotionsIndex = () => import( '../components/promotions/Index');
const SettingsIndex = () => import( '../components/settings/Index');
const SettingsBase = () => import( '../components/settings/tabs/SettingsBase');
const SettingsTags = () => import( '../components/settings/tabs/SettingTags');
const SettingsApp = () => import( '../components/settings/tabs/SettingsApp');
const SettingsPush = () => import( '../components/settings/tabs/SettingsPush');
const SettingsSite = () => import( '../components/settings/tabs/SettingsSite');
const SettingsSMS = () => import( '../components/settings/tabs/SettingsSMS');
const SettingsSchedule = () => import( '../components/settings/tabs/SettingsSchedule');
const SettingsChats = () => import( '../components/settings/tabs/SettingsChats');

const ShopIndex = () => import('../components/shop/ShopIndex')
const ShopCategories = () => import('../components/shop/tabs/ShopCategories')
const ShopOrders = () => import('../components/shop/tabs/ShopOrders')
const ShopItems = () => import('../components/shop/tabs/ShopItems')

const AdminUsers = () => import( '../components/admin/Users');
const ClientsIndex = () => import( '../components/clients/Index');
const ClientsShow = () => import( '../components/clients/Show');
const ClientsPetIndex = () => import( '../components/clients/pet/Index');
const ClientTransactions = () => import( '../components/clients/ClientTransactions');

const AdminTagsIndex = () => import('../components/tags/TagsIndex')

const form = () => import('../components/form/index')

const BreedsIndex = () => import('../components/breeds/Index')

const Error404 = () => import( '../components/base/404.vue');

const MailIndex = () => import( '../components/mail/MailIndex.vue');
const GoogleOauth2callback = () => import('../components/google/GoogleOauth2callback')

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
                component: CalendarWeek,
                meta: { roles: ['admin', 'master'], needAuth: true },
            },
            {
                path: '/masters',
                name: 'home.masters',
                component: MastersIndex,
                meta: { roles: ['admin'], needAuth: true },
            },
            {
                path: '/masters/:master_id',
                name: 'home.master.show',
                component: MastersShow,
                props: route => ({ master_id: route.params.master_id }),
                meta: { roles: ['admin'], needAuth: true },
            },
            {
                path: '/orders',
                name: 'home.orders',
                component: OrdersIndex,
                meta: { roles: ['admin', 'master'], needAuth: true },
            },
            {
                path: '/clients',
                name: 'home.clients',
                component: ClientsIndex,
                meta: { roles: ['admin'], needAuth: true },
            },
            {
                path: '/clients/:client_id',
                name: 'home.client.show',
                component: ClientsShow,
                props: route => ({ client_id: route.params.client_id }),
                meta: { roles: ['admin'], needAuth: true },
            },
            {
                path: '/clients/:client_id/transactions',
                name: 'home.client.transactions',
                component: ClientTransactions,
                props: route => ({ client_id: route.params.client_id }),
                meta: { roles: ['admin'], needAuth: true },
            },
            {
                path: '/clients/:client_id/pet/:pet_id',
                name: 'home.client.pet.index',
                component: ClientsPetIndex,
                props: route => ({ client_id: route.params.client_id, pet_id: route.params.pet_id }),
                meta: { roles: ['admin'], needAuth: true },
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
                path: '/services/:service_id/breeds',
                name: 'home.service.breeds',
                component: ServicesBreeds,
                meta: { roles: ['admin'], needAuth: true },
                props: route => ({ service_id: route.params.service_id })
            },
            {
                path: '/services/:service_id/schedule',
                name: 'home.service.schedule',
                component: ServicesSchedule,
                meta: { roles: ['admin'], needAuth: true },
                props: route => ({ service_id: route.params.service_id })
            },
            {
                path: '/promotions',
                name: 'home.promotions',
                component: PromotionsIndex,
                meta: { roles: ['admin'], needAuth: true },
            },
            {
                path: '/shop',
                name: 'home.shop.index',
                component: ShopIndex,
                meta: { roles: ['admin'], needAuth: true },
                redirect: { name: 'home.shop.orders' },
                children: [
                    {
                        path: '/shop/categories',
                        name: 'home.shop.categories',
                        component: ShopCategories,
                        meta: { roles: ['admin'], needAuth: true },
                    },
                    {
                        path: '/shop/orders',
                        name: 'home.shop.orders',
                        component: ShopOrders,
                        meta: { roles: ['admin'], needAuth: true },
                    },
                    {
                        path: '/shop/items',
                        name: 'home.shop.items',
                        component: ShopItems,
                        meta: { roles: ['admin'], needAuth: true },
                    },
                ]
            },
            {
                path: '/settings',
                name: 'home.settings.index',
                component: SettingsIndex,
                meta: { roles: ['admin'], needAuth: true },
                redirect: { name: 'home.settings.base' },
                children: [
                    {
                        path: '/settings/base',
                        name: 'home.settings.base',
                        component: SettingsBase,
                        meta: { roles: ['admin'], needAuth: true },
                    },
                    {
                        path: '/settings/tags',
                        name: 'home.settings.tags',
                        component: SettingsTags,
                        meta: { roles: ['admin'], needAuth: true },
                    },
                    {
                        path: '/settings/app',
                        name: 'home.settings.app',
                        component: SettingsApp,
                        meta: { roles: ['admin'], needAuth: true },
                    },
                    {
                        path: '/settings/push',
                        name: 'home.settings.push',
                        component: SettingsPush,
                        meta: { roles: ['admin'], needAuth: true },
                    },
                    {
                        path: '/settings/site',
                        name: 'home.settings.site',
                        component: SettingsSite,
                        meta: { roles: ['admin'], needAuth: true },
                    },
                    {
                        path: '/settings/sms',
                        name: 'home.settings.sms',
                        component: SettingsSMS,
                        meta: { roles: ['admin'], needAuth: true },
                    },
                    {
                        path: '/settings/schedule',
                        name: 'home.settings.schedule',
                        component: SettingsSchedule,
                        meta: { roles: ['admin'], needAuth: true },
                    },
                    {
                        path: '/settings/chats',
                        name: 'home.settings.chats',
                        component: SettingsChats,
                        meta: { roles: ['admin'], needAuth: true },
                    }
                ]
            },
            {
                path: '/breeds',
                name: 'home.breeds',
                component: BreedsIndex,
                meta: { needAuth: true, roles: ['super-admin'] },
            },
            {
                path: '/tags',
                name: 'home.tags',
                component: AdminTagsIndex,
                meta: { needAuth: true, roles: ['super-admin'] },
            },
            {
                path: '/clients/:client_id/chat/:chat_id',
                name: 'home.client.chat',
                component: ChatMessages,
                meta: { needAuth: true, roles: ['admin'] },
                props: route => ({ client_id: route.params.client_id, chat_id: route.params.chat_id })
            },
            {
                path: '/packages',
                name: 'home.packages',
                component: PackagesIndex,
                meta: { needAuth: true, roles: ['admin'] },
            },
            {
                path: '/comments',
                name: 'home.comments',
                component: CommentsIndex,
                meta: { needAuth: true, roles: ['admin', 'master'] },
            },
            {
                path: '/mail',
                name: 'home.mail.index',
                component: MailIndex,
                meta: { needAuth: true, roles: ['admin'] },
            },
            {
                path: '/oauth2callback',
                name: 'home.google.oauth2callback',
                component: GoogleOauth2callback,
                meta: { needAuth: true, roles: ['admin', 'master'] },
            }
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
