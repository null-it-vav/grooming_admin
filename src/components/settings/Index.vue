<template>
  <div>
    <form
        @submit.prevent="submit"
    >
      <div class="col-lg-12 mb-2 alert position-fixed fixed-bottom">
        <message-success-error
            :show="success_error"
        />
      </div>
      <div class="row">
        <div class="col-md-2 mb-2">
          <b-card>
            <div class="list-group border-none">
              <router-link
                  :to="{ name: 'home.settings.base' }" class="list-group-item"
              >
                <span class="mx-3">{{$t('app.components.settings.tabs.base')}}</span>
              </router-link>
              <router-link
                  :to="{ name: 'home.settings.schedule' }" class="list-group-item"
              >
                <span class="mx-3">{{$t('app.components.settings.tabs.schedule')}}</span>
              </router-link>
              <router-link
                  :to="{ name: 'home.settings.app' }" class="list-group-item"
              >
                <span class="mx-3">{{$t('app.components.settings.tabs.app')}}</span>
              </router-link>
              <router-link
                  :to="{ name: 'home.settings.push' }" class="list-group-item"
              >
                <span class="mx-3">{{$t('app.components.settings.tabs.push')}}</span>
              </router-link>
              <router-link
                  :to="{ name: 'home.settings.tags' }" class="list-group-item"
              >
                <span class="mx-3">{{$t('app.components.settings.tabs.tags')}}</span>
              </router-link>
              <router-link
                  :to="{ name: 'home.settings.site' }" class="list-group-item"
              >
                <span class="mx-3">{{$t('app.components.settings.tabs.site')}}</span>
              </router-link>
            </div>
          </b-card>
        </div>
        <div class="col-md-10">
          <router-view
              :settings="settings"
              :errors="errors"
          />
        </div>
      </div>
    </form>


  </div>
</template>

<script>

import deepClone from 'clonedeep';
import {mapGetters} from "vuex";
import {save_settings} from "@/api";
import MessageSuccessError from "@/components/base/SuccessError";
import store from "@/store/app";

export default {
  name: "Index",
  components: {
    MessageSuccessError,
  },
  data() {
    return {
      settings: {},
      new_image: null,
      errors: {},
      // times: [
      //   "00:00", "01:00", "02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"
      // ],
      success_error: {
        success: false,
        error: false
      },
      langs: [
        { iso: "ru", lang: "ru" },
        { iso: "us", lang: "en" },
      ],
      tab_select: 'base'
    }
  },
  computed: {
    ...mapGetters([
      'auth'
    ]),
    times() {
      var quarterHours = ["00", "30"];
      var times = [];
      for(var i = 0; i < 24; i++){
        for(var j = 0; j < 2; j++){
          if(i < 10){
            times.push("0" + i + ":" + quarterHours[j]);
          } else {
            times.push(i + ":" + quarterHours[j]);
          }
        }
      }
      return times
    }
  },
  created() {
    this.settings = deepClone(this.auth.organization)
    this.settings.new_image = null;
  },
  methods: {
    submit(){
      var data = new FormData();
      data.append('name', this.settings.name)
      data.append('phone', this.settings.phone)
      data.append('site', this.settings.site)
      data.append('email', this.settings.email)
      data.append('schedule_step', this.settings.schedule_step)
      data.append('lang', this.settings.lang)
      data.append('notif_after', this.settings.notif_after)
      data.append('notif_before', this.settings.notif_before)
      data.append('notif_before', this.settings.notif_before)
      data.append('tg_link', this.settings.tg_link)
      data.append('wa_link', this.settings.wa_link)
      data.append('show_tg_link', this.settings.show_tg_link ? 1 : 0)
      data.append('show_wa_link', this.settings.show_wa_link ? 1 : 0)
      data.append('show_email', this.settings.show_email ? 1 : 0)
      data.append('notif_before_24h', this.settings.notif_before_24h ? 1 : 0)


      data.append('text', this.settings.text)


      if (this.settings.new_image) {
        data.append('image', this.settings.new_image)
      }

      for (var day in this.settings.schedule){
        data.append('schedule['+day+'][active]', this.settings.schedule[day].active ? 1 : 0)
        data.append('schedule['+day+'][start]', this.settings.schedule[day].start)
        data.append('schedule['+day+'][end]', this.settings.schedule[day].end)
      }

      save_settings(data)
        .then(() => {
          this.success_error.success = true
          this.errors = {}
          store.dispatch('getAuth').then(() => {})
        })
        .catch((error) => {
          if (error.response?.data?.errors) this.errors = error.response?.data?.errors
          this.success_error.error = true
        })
    }
  }
}
</script>

