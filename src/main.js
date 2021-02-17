import Vue from 'vue'
import Core from './components/Core.vue'
import router from './route/app';
import store from './store/app';
import VueProgressBar from 'vue-progressbar';
import { BootstrapVue } from 'bootstrap-vue'
import ru from "./i18n/ru";
import axios from './bootstrap';
import "./sass/app.scss";
import FlagIcon from 'vue-flag-icon'
import VueI18n from 'vue-i18n'
import VueMoment from 'vue-moment'
import moment from 'moment'
import 'moment/locale/ru'

Vue.use(FlagIcon);


Vue.prototype.$moment = VueMoment;
Vue.use(VueMoment, {
  moment,
})
Vue.moment.locale('ru')

Vue.use(VueI18n)

Vue.use(BootstrapVue)

Vue.config.productionTip = false

axios.interceptors.request.use((config) => {
  store.dispatch('animateLoading', { type: 'local', action: 'start' }, { root: true });
  return config;
  // return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  store.dispatch('animateLoading', { type: 'local', action: 'finish' }, { root: true });
  return response;
}, function (error) {
  store.dispatch('animateLoading', { type: 'local', action: 'error', status_code: error.request.status }, { root: true });
  return Promise.reject(error);
});


const i18n = new VueI18n({
  locale: 'ru', // установка локализации по умолчанию
  messages: {
    ru: ru,
    gb: {language: "English",},
    it: {language: "Italiano",},
    es: {language: "Español",},
  } // установка сообщений локализаций
})

Vue.prototype.$axios = axios;
Vue.use(VueProgressBar, {
  color: '#009688',
  failedColor: 'red',
  height: '4px',
  autoFinish: true,
});

const app = new Vue({ // eslint-disable-line no-unused-vars
  el: '#app',
  store,
  router,
  i18n,
  components: {
    VueCore: Core,
  },
  render: h => h(Core)
});
