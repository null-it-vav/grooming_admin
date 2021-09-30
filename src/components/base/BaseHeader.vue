<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-faded fixed-top">
    <div class="w-100 d-flex flex-column">
      <button
          type="button"
          class="ml-auto navbar-toggler"
          @click="$emit('navOpen')"
      >
        <img src="~@/assets/open_panel.svg"/>
      </button>
      <div class="collapse navbar-collapse">
        <div class="navbar-box px-4 d-flex align-items-center">
          <i v-if="sidebar_mini" @click="openSidebar()" class="pointer icon-close_arrow icon-rotate-180 mr-2"/>
          <b-avatar
              :src="auth.organization.image"
          />
          <div class="ml-2">
            <div class="text-6">Компания</div>
            <b>{{ auth.organization.name }}</b>
          </div>
        </div>
        <div class="navbar-box w-100 px-4 d-flex align-items-center">
          <div class="d-flex align-items-center">
            <i class="icon-search" />
          </div>
          <div class="ml-auto d-flex">
            <div class="btn btn-blue btn-circle">
              <i class="fa fa-plus"/>
            </div>
            <div class="ml-2 btn btn-gray btn-circle">

            </div>
            <div class="ml-2 btn btn-gray btn-circle">
              <i class="icon-bell"/>
            </div>
          </div>
        </div>
        <div class="navbar-box navbar-profile px-4 ml-auto d-flex align-items-center">
          <b-avatar
            :src="auth.photo"
          />
          <div class="ml-2">
            <div class="text-nowrap"><b>{{ auth.name }}</b></div>
            <span class="text-6 text-nowrap">{{ auth.email }}</span>
          </div>
          <div class="ml-3">
            <div class="icon-v_menu pointer" @click="showMenuProfile = !showMenuProfile"/>
          </div>
          <div class="profile-menu" v-if="showMenuProfile">
            <div class="profile-menu-item">Мой аккаунт</div>
            <div class="profile-menu-item">Настройки компании</div>
            <div class="profile-menu-item">Реферальная программа Grooming Box</div>
            <div class="profile-menu-item pointer" @click="logout">Выйти</div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import {mapGetters} from "vuex";
import {logout} from "@/api";

export default {
  name: "BaseHeader",
  props: {
    sidebar_mini: {
      type: Boolean
    }
  },
  computed: {
    ...mapGetters([
      'auth',
    ]),
  },
  data() {
    return {
      showMenuProfile: false
    }
  },
  methods: {
    openSidebar() {
      this.$emit('openSidebar')
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

<style scoped>
  .icon-close_arrow {
    color: #A8B3C1;
  }
</style>
