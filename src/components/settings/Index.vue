<template>
  <div>
    <form
        @submit.prevent="submit"
    >
      <base-h-menu
        :list="menu"
        title="Настройки"
      />
      <div class="mx-4">
        <router-view
            v-if="settings"
            :settings="settings"
            @reloadSettings="reloadSettings"
        />
      </div>
    </form>
  </div>
</template>

<script>

import deepClone from 'clonedeep';
import {mapGetters} from "vuex";
// import {save_settings} from "@/api";
// import store from "@/store/app";
import BaseHMenu from "@/components/base/BaseHMenu";

export default {
  name: "Index",
  components: {
    BaseHMenu,
  },
  data() {
    return {
      settings: {},
      new_image: null,
      errors: {},
      success_error: {
        success: false,
        error: false
      },
      langs: [
        { iso: "ru", lang: "ru" },
        { iso: "us", lang: "en" },
      ],
      tab_select: 'base',

      menu: [
        { name: 'home.settings.base', title: this.$t('app.components.settings.tabs.base')},
        { name: 'home.settings.schedule', title: this.$t('app.components.settings.tabs.schedule')},
        { name: 'home.settings.app', title: this.$t('app.components.settings.tabs.app')},
        { name: 'home.settings.push', title: this.$t('app.components.settings.tabs.push')},
        { name: 'home.settings.tags', title: this.$t('app.components.settings.tabs.tags')},
        { name: 'home.settings.chats', title: this.$t('app.components.settings.tabs.chats')},
        { name: 'home.settings.site', title: this.$t('app.components.settings.tabs.site')},
        { name: 'home.settings.sms', title: this.$t('app.components.settings.tabs.sms')},
        { name: 'home.settings.instagram', title: 'instagram'},
      ]
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
    reloadSettings(data) {
      this.settings = data
    },
    submit() {
      this.$root.$emit('save')
    }
    // submit(){
    //   var data = new FormData();
    //   data.append('name', this.settings.name)
    //   data.append('phone', this.settings.phone)
    //   data.append('site', this.settings.site)
    //   data.append('email', this.settings.email)
    //   data.append('schedule_step', this.settings.schedule_step)
    //   data.append('lang', this.settings.lang)
    //   data.append('notif_after', this.settings.notif_after)
    //   data.append('notif_before', this.settings.notif_before)
    //   data.append('notif_before', this.settings.notif_before)
    //   data.append('tg_link', this.settings.tg_link)
    //   data.append('wa_link', this.settings.wa_link)
    //   data.append('show_tg_link', this.settings.show_tg_link ? 1 : 0)
    //   data.append('show_wa_link', this.settings.show_wa_link ? 1 : 0)
    //   data.append('show_email', this.settings.show_email ? 1 : 0)
    //   data.append('notif_before_24h', this.settings.notif_before_24h ? 1 : 0)
    //
    //
    //   data.append('text', this.settings.text)
    //
    //
    //   if (this.settings.new_image) {
    //     data.append('image', this.settings.new_image)
    //   }
    //
    //   for (var day in this.settings.schedule){
    //     data.append('schedule['+day+'][active]', this.settings.schedule[day].active ? 1 : 0)
    //     data.append('schedule['+day+'][start]', this.settings.schedule[day].start)
    //     data.append('schedule['+day+'][end]', this.settings.schedule[day].end)
    //   }
    //
    //   save_settings(data)
    //     .then(() => {
    //       this.success_error.success = true
    //       this.errors = {}
    //       store.dispatch('getAuth').then(() => {})
    //     })
    //     .catch((error) => {
    //       if (error.response?.data?.errors) this.errors = error.response?.data?.errors
    //       this.success_error.error = true
    //     })
    // }
  }
}
</script>

