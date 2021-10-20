import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import { me } from "@/api";

const store = new Vuex.Store({
    state: {
        auth: false,
        salons: [],
        masters: [],
        admins: [],
        breeds: [],
        tags: [],
        salon_selected: {},
        internetError: false,
        loading: {
            local: 0,
            global: 0,
        },
        popup: false,
        notifications: {
            App_Models_FacebookInstagramMessage: {},
            App_Models_TelegramChatMessage: {}
        }
    },
    mutations: {
        auth(state, {data}) {
            state.auth = data; // eslint-disable-line no-param-reassign
        },
        salons(state, {data}){
            state.salons = data
        },
        masters(state, {data}){
            state.masters = data
        },
        admins(state, {data}){
            state.admins = data
        },
        breeds(state, {data}){
            state.breeds = data
        },
        tags(state, {data}){
            state.tags = data
        },
        salon_selected(state, {data}) {
            state.salon_selected = data
        },
        notifications(state, {data}) {
            state.notifications = data
        },
        setStore(state, { key, data, allowCreate = false }) {
            if (key.includes('.')) {
                let tmp = state;
                const arrKey = key.split('.');
                for (const i in arrKey) { // eslint-disable-line guard-for-in, no-restricted-syntax
                    const keyInStore = arrKey[i];
                    if (typeof tmp[keyInStore] !== 'undefined') {
                        if (keyInStore === arrKey[arrKey.length - 1]) {
                            tmp[keyInStore] = data;
                        }
                        tmp = tmp[keyInStore];
                    } else if (allowCreate) {
                        if (keyInStore === arrKey[arrKey.length - 1]) {
                            tmp[keyInStore] = data;
                        }
                        tmp = tmp[keyInStore];
                    }
                }
            } else {
                state[key] = data; // eslint-disable-line no-param-reassign
            }
        },
    },
    getters: {
        auth: (state) => state.auth,
        salons: (state) => state.salons,
        masters: (state) => state.masters,
        admins: (state) => state.admins,
        salon_selected: (state) => state.salon_selected,
        breeds: (state) => state.breeds,
        tags: (state) => state.tags,
        notifications: (state) => state.notifications,
        getStore: (state) => (key) => {
            if (key.includes('.')) {
                let tmp = state;
                const arrKey = key.split('.');
                for (const i in arrKey) { // eslint-disable-line guard-for-in, no-restricted-syntax
                    const keyInStore = arrKey[i];
                    if (typeof tmp[keyInStore] !== 'undefined') {
                        if (keyInStore === arrKey[arrKey.length - 1]) {
                            return tmp[keyInStore];
                        }
                        tmp = tmp[keyInStore];
                    }
                }
                return undefined;
            } else { // eslint-disable-line no-else-return
                return state[key];
            }
        },
    },
    actions: {
        // eslint-disable-next-line no-unused-vars
        clearAuth({ commit, state }) {
            commit('setStore', {key: 'auth', data: false});
            commit('setStore', {key: 'salons', data: []});
            commit('setStore', {key: 'masters', data: []});
            commit('setStore', {key: 'admins', data: []});
            commit('setStore', {key: 'breeds', data: []});
            commit('setStore', {key: 'tags', data: []});
            localStorage.removeItem('user-token')
            localStorage.removeItem('salon_selected')
            window.location.href = '/'
            // eslint-disable-next-line no-debugger
            // debugger;
        },
        // eslint-disable-next-line no-unused-vars
        getAuth: async function ({dispatch, commit, state}) {
            const token = localStorage.getItem('user-token')

            if (token) {
                await me().then((response) => {
                    commit('setStore', {key: 'auth', data: response.data.data.user});
                    commit('setStore', {key: 'salons', data: response.data.data.salons});
                    commit('setStore', {key: 'masters', data: response.data.data.masters});
                    commit('setStore', {key: 'admins', data: response.data.data.admins || []});
                    commit('setStore', {key: 'breeds', data: response.data.data.user.organization ? response.data.data.user.organization.breeds : []});
                    commit('setStore', {key: 'tags', data: response.data.data.tags});

                    // eslint-disable-next-line no-debugger
                    //debugger;

                    if (response.data.data.user.salon_id && !response.data.data.user.role_list.includes('admin')){
                        commit('setStore', {key: 'salon_selected', data: response.data.data.user.salon_id});
                        localStorage.setItem('salon_selected', response.data.data.user.salon_id)
                    } else {
                        var salon_id = localStorage.getItem('salon_selected')
                        if(salon_id){
                            var salon = response.data.data.salons.find(salon => salon.id == salon_id)
                            if (salon) {
                                commit('setStore', {key: 'salon_selected', data: salon});
                                localStorage.setItem('salon_selected', salon.id)
                            }else {
                                //салон удалили
                                localStorage.removeItem('salon_selected')
                                //если есть еще салоны - выбрать первый из списка
                                if (response.data.data.salons.length > 0 && response.data.data.salons[0]){
                                    commit('setStore', {key: 'salon_selected', data: response.data.data.salons[0]});
                                    localStorage.setItem('salon_selected', response.data.data.salons[0].id)
                                }
                            }
                        }else {
                            if (response.data.data.salons.length > 0 && response.data.data.salons[0]){
                                commit('setStore', {key: 'salon_selected', data: response.data.data.salons[0]});
                                localStorage.setItem('salon_selected', response.data.data.salons[0].id)
                            }
                        }
                    }
                })
            }
        },
        setSalon({dispatch, commit, state},  salon_id ){// eslint-disable-line
            var salon = state.salons.find(salon => salon.id === salon_id)
            if (salon){
                commit('setStore', {key: 'salon_selected', data: salon});
                localStorage.setItem('salon_selected', salon.id)
            }
        },
        animateLoading({ getters, commit }, { type, action, status_code }) {
            let value = getters.getStore(`loading.${type}`);
            switch (action) {
                case 'start':
                    commit('setStore', { key: 'internetError', data: false });
                    value += 1;
                    break;
                case 'finish':
                    value -= 1;
                    break;
                case 'error':
                    if (status_code == 0){
                        commit('setStore', { key: 'internetError', data: true });
                    }
                    value -= 1;
                    break;
                default:
                    break;
            }
            if (value < 0) {
                value = 0;
            }
            commit('setStore', { key: `loading.${type}`, data: value });
        }
    }
});

export default store;
