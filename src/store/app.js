import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../bootstrap';
Vue.use(Vuex);


const store = new Vuex.Store({
    state: {
        auth: false,
        internetError: false,
        loading: {
            local: 0,
            global: 0,
        },
    },
    mutations: {
        auth(state, {data}) {
            state.auth = data; // eslint-disable-line no-param-reassign
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
        },
        getAuth: async function ({dispatch, commit, state}) { // eslint-disable-line

            await axios.get('/api/v1/me', {})
                .then(({
                           data: {
                               auth,
                           },
                       }) => {

                    commit('setStore', {key: 'auth', data: auth});

                })
                // eslint-disable-next-line no-unused-vars
                .catch((error) => {

                })
                .finally(() => {
                });
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
