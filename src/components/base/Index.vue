<template>
  <div :class="nav_open ? 'nav-open' : ''">
    <div class="wrapper">
      <sidebar
          @setSidebarMini="setSidebarMini"
          :sidebar_mini="sidebar_mini"
      />
      <div
          class="main-panel"
          :class="[
              sidebar_mini ? 'main-panel-max' : ''
          ]"
      >
        <base-header
          @navOpen="nav_open = !nav_open"
          :sidebar_mini="sidebar_mini"
          @openSidebar="setSidebarMini"
        />
        <div style="height: 70px; width: 100%;"></div>
        <router-view />

      </div>
    </div>

    <user-settings-popup
      v-if="showUserSettingsPopup"
      @closePopup="closeUserSettingsPopup"
    />
  </div>
</template>

<script>
import { logout } from "@/api";
import {mapGetters} from "vuex";
import store from "@/store/app";
import UserSettingsPopup from "@/components/users/UserSettingsPopup";
import BaseHeader from "@/components/base/BaseHeader";
import Sidebar from "@/components/base/Sidebar";

export default {
  name: "DashboardIndex",
  components: {Sidebar, BaseHeader, UserSettingsPopup},
  data() {
    return {
      showUserSettingsPopup: false,
      nav_open: false,
      selected_salon: localStorage.getItem('salon_selected'),
      sidebar_mini: localStorage.sidebar_mini == 'true' ? true : false,
    }
  },
  computed: {
    ...mapGetters([
      'auth',
      'salons',
      'salon_selected'
    ]),
  },
  created() {
    //todo Вернуть
    // window.Echo.private(`App.User.${this.auth.id}`)
    //     .listen('UserNotification', ({ data }) => {
    //       console.log(data)
    //     });
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route (to, from){
      if (this.nav_open){
        this.nav_open = false;
      }
    },
    'salon_selected': function (){
      this.selected_salon = localStorage.getItem('salon_selected')
    },
    '$store.state.popup': function (){

      const body = document.getElementsByTagName('body')[0];
      if (this.$store.state.popup) {
        body.classList.add('modal-open');
      }else {
        body.classList.remove('modal-open');
      }

    }
  },
  methods: {
    setSidebarMini() {
      this.sidebar_mini = !this.sidebar_mini
      localStorage.sidebar_mini = this.sidebar_mini
    },
    setSalon(){
      store.dispatch('setSalon', this.selected_salon)
    },
    closeUserSettingsPopup(){
      this.showUserSettingsPopup = false
    },
    logout(){
      logout()
          .then(() => {
            this.$store.dispatch('clearAuth');
            this.$router.push({ name: 'login' });
          }).catch((error) => {
            if (error.response.status == 401){
              this.$store.dispatch('clearAuth');
              this.$router.push({ name: 'login' });
            }
          })
    }
  }
}
</script>
