import Vue from 'vue'
import Core from './components/Core.vue'
import router from './route/app';
import store from './store/app';
import VueProgressBar from 'vue-progressbar';
import { BootstrapVue } from 'bootstrap-vue'
import ru from "./i18n/ru";
import en from "./i18n/en";
import axios from './bootstrap';
import "./sass/app.scss";
import FlagIcon from 'vue-flag-icon'
import VueI18n from 'vue-i18n'
import VueMoment from 'vue-moment'
import moment from 'moment'
import 'moment/locale/ru'
import VCalendar from 'v-calendar';
import vSelect from 'vue-select'
import { Cropper } from 'vue-advanced-cropper'
import { Sketch } from 'vue-color'
import StarRating from 'vue-star-rating'
const invert = require('invert-color');
import { Select } from 'ant-design-vue';
import './filters/filesize';

window.invert = invert
Vue.use(Select);

Vue.component('v-select', vSelect)
Vue.use(FlagIcon);
Vue.use(VCalendar);
Vue.use(Cropper);
Vue.component('sketch-picker', Sketch);

Vue.component('star-rating', StarRating);
Vue.prototype.$moment = VueMoment;


Vue.use(VueMoment, {
  moment,
})
Vue.moment.locale('ru')

Vue.use(VueI18n)

Vue.use(BootstrapVue)

Vue.config.productionTip = false

axios.interceptors.request.use((config) => {
  let type = config.type ?  config.type : 'local'
  store.dispatch('animateLoading', { type: type, action: 'start' }, { root: true });
  return config;
  // return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  let type = response.config.type ?  response.config.type : 'local'
  store.dispatch('animateLoading', { type: type, action: 'finish' }, { root: true });
  return response;
}, function (error) {
  let type = error.response.config.type ?  error.response.config.type : 'local'
  store.dispatch('animateLoading', { type: type, action: 'error', status_code: error.response.status }, { root: true });
  return Promise.reject(error);
});


const i18n = new VueI18n({
  locale: 'ru', // установка локализации по умолчанию
  messages: {
    ru: ru,
    en: en,
  } // установка сообщений локализаций
})

Vue.prototype.$axios = axios;
Vue.use(VueProgressBar, {
  color: '#009688',
  failedColor: 'red',
  height: '4px',
  autoFinish: true,
});

Vue.filter('invert_color', function (value) {
  return window.invert('#'+value, true)
})

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
