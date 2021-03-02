<template>
  <div :class="nav_open ? 'nav-open' : ''">
    <nav class="navbar navbar-expand-lg navbar-light bg-faded shadow-sm fixed-top">
      <div class="container-fluid">
        <a href="#" class="navbar-brand">
          {{ $t('app.titles.' + $route.name) }}
        </a>
        <button
            id="menuDropdown"
            type="button"
            data-target="nav-link dropdown"
            aria-controls="navbarSupportedContent"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            class="navbar-toggler"
            @click="nav_open = !nav_open"
        >
          <img src="~@/assets/open_panel.svg"/>
        </button>
        <div class="collapse navbar-collapse justify-content-end">

        </div>
      </div>
    </nav>

    <div class="wrapper">
      <div class="sidebar p-3">
        <div class="sidebar-wrapper">
          <div style="height: 50px; width: 100%;"></div>
          <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <b v-if="auth.organization">{{ auth.organization.name }}</b>
                <b v-else>{{ auth.email }}</b>
                <br>
                {{ auth.name }}
              </div>
              <div>
                <i class="fa fa-sign-out pointer" @click="logout"/> <br>
                <i class="fa fa-cog pointer" @click="showUserSettingsPopup = true"/>
              </div>
            </li>
          </ul>

          <div
              class="card p-3"
              v-if="auth.organization && auth.organization.demo"
          >
            <div>
              {{ $t('base.demo') }} id: <span class="text-danger">{{ auth.organization.id }}</span>
            </div>
            <div>
              <i>{{$t('base.demo_tooltip')}}</i>
            </div>
          </div>

          <hr>
          <div class="list-group border-none">

            <router-link
                :to="{ name: 'home.dashboard' }" class="list-group-item"
            >
              <i class="fa fa-sliders"/>
              <span class="mx-3">{{ $t('app.titles.home.dashboard') }}</span>
            </router-link>

            <router-link
                :to="{ name: 'home.admin.users' }" class="list-group-item"
            >
              <i class="fa fa-users"/>
              <span class="mx-3">{{ $t('app.titles.home.admin.users') }}</span>
            </router-link>

            <router-link
                v-if="(auth.role_list.includes('admin') || auth.role_list.includes('master')) & (salons.length > 0)"
                :to="{ name: 'home.calendar' }" class="list-group-item"
            >
              <i class="fa fa-calendar"/>
              <span class="mx-3">{{ $t('app.titles.home.calendar') }}</span>
            </router-link>

            <router-link
                v-if="auth.role_list.includes('admin') & (salons.length > 0)"
                :to="{ name: 'home.masters' }" class="list-group-item"
            >
              <i class="fa fa-user"/>
              <span class="mx-3">{{ $t('app.titles.home.masters') }}</span>
            </router-link>
            <router-link
                v-if="(auth.role_list.includes('admin') || auth.role_list.includes('master')) & (salons.length > 0)"
                :to="{ name: 'home.orders' }" class="list-group-item"
            >
              <i class="fa fa-shopping-bag" />
              <span class="mx-3">{{ $t('app.titles.home.orders') }}</span>
            </router-link>
            <router-link
                v-if="auth.role_list.includes('admin')"
                :to="{ name: 'home.salons' }" class="list-group-item"
            >
              <i class="fa fa-map-marker" />
              <span class="mx-3">{{ $t('app.titles.home.salons') }}</span>
            </router-link>
            <router-link
                v-if="auth.role_list.includes('admin')"
                :to="{ name: 'home.services' }" class="list-group-item"
            >
              <i class="fa fa-briefcase"/>
              <span class="mx-3">{{ $t('app.titles.home.services') }}</span>
            </router-link>
            <router-link
                v-if="auth.role_list.includes('admin')"
                :to="{ name: 'home.promotions' }" class="list-group-item"
            >
              <i class="fa fa-bullhorn"/>
              <span class="mx-3">{{ $t('app.titles.home.promotions') }}</span>
            </router-link>
            <router-link
                v-if="auth.role_list.includes('admin')"
                :to="{ name: 'home.settings' }" class="list-group-item"
            >
              <i class="fa fa-cogs"/>
              <span class="mx-3">{{ $t('app.titles.home.settings') }}</span>
            </router-link>
          </div>
          <hr>
          <div class="form-group" v-if="auth.role_list.includes('admin') & (salons.length > 0)">
            <label>{{ $t('app.components.main.selected_salon') }}</label>
            <select class="form-control" @change="setSalon" v-model="selected_salon">
              <option v-for="(salon, k) in salons" :value="salon.id" :key="k">{{ salon.address }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="main-panel">
        <div class="container">
          <div style="height: 60px; width: 100%;"></div>
          <router-view />
          <div style="height: 60px; width: 100%;"></div>
        </div>

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

export default {
  name: "DashboardIndex",
  components: {UserSettingsPopup},
  data() {
    return {
      showUserSettingsPopup: false,
      nav_open: false,
      selected_salon: localStorage.getItem('salon_selected')
    }
  },
  computed: {
    ...mapGetters([
      'auth',
      'salons',
      'salon_selected'
    ]),
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
