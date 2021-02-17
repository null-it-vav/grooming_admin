<template>
  <div :class="nav_open ? 'nav-open' : ''">
    <div class="wrapper">
      <div class="sidebar p-3">
        <div class="sidebar-wrapper">
          <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <b>{{ auth.organization.name }}</b>
                <br>
                {{ auth.organization.email }}
              </div>
              <i class="fa fa-sign-out pointer" @click="logout"/>
            </li>
          </ul>
          <hr>
          <div class="list-group border-none">

            <router-link :to="{ name: 'home.dashboard' }" class="list-group-item">
              <i class="fa fa-sliders"/>
              <span class="mx-3">{{ $t('app.titles.home.dashboard') }}</span>
            </router-link>

            <router-link :to="{ name: 'home.calendar' }" class="list-group-item">
              <i class="fa fa-calendar"/>
              <span class="mx-3">{{ $t('app.titles.home.calendar') }}</span>
            </router-link>

            <router-link :to="{ name: 'home.masters' }" class="list-group-item">
              <i class="fa fa-user"/>
              <span class="mx-3">{{ $t('app.titles.home.masters') }}</span>
            </router-link>
            <router-link :to="{ name: 'home.orders' }" class="list-group-item">
              <i class="fa fa-shopping-bag" />
              <span class="mx-3">{{ $t('app.titles.home.orders') }}</span>
            </router-link>
            <router-link :to="{ name: 'home.salons' }" class="list-group-item">
              <i class="fa fa-map-marker" />
              <span class="mx-3">{{ $t('app.titles.home.salons') }}</span>
            </router-link>
            <router-link :to="{ name: 'home.services' }" class="list-group-item">
              <i class="fa fa-briefcase"/>
              <span class="mx-3">{{ $t('app.titles.home.services') }}</span>
            </router-link>
            <router-link :to="{ name: 'home.promotions' }" class="list-group-item">
              <i class="fa fa-bullhorn"/>
              <span class="mx-3">{{ $t('app.titles.home.promotions') }}</span>
            </router-link>
            <router-link :to="{ name: 'home.settings' }" class="list-group-item">
              <i class="fa fa-cogs"/>
              <span class="mx-3">{{ $t('app.titles.home.settings') }}</span>
            </router-link>
          </div>
          <hr>
          <div class="form-group">
            <label>{{ $t('app.components.main.selected_salon') }}</label>
            <select class="form-control" @change="setSalon" v-model="selected_salon">
              <option v-for="(salon, k) in salons" :value="salon.id" :key="k">{{ salon.address }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="main-panel">
        <nav class="navbar navbar-expand-md navbar-light bg-faded shadow-sm">
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
                class="navbar-toggler m-2"
                @click="nav_open = !nav_open"
            >
              <img src="~@/assets/open_panel.svg"/>
            </button>
            <div class="collapse navbar-collapse justify-content-end">

            </div>
          </div>
        </nav>

        <div class="container mt-4">
          <router-view/>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { logout } from "@/api";
import {mapGetters} from "vuex";
import store from "@/store/app";

export default {
  name: "DashboardIndex",
  data() {
    return {
      nav_open: false,
      selected_salon: localStorage.getItem('salon_selected')
    }
  },
  computed: {
    ...mapGetters([
      'auth',
      'salons'
    ])
  },
  methods: {
    setSalon(){
      store.dispatch('setSalon', this.selected_salon)
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

</style>
