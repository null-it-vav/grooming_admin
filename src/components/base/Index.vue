<template>
  <div :class="nav_open ? 'nav-open' : ''">
    <div class="wrapper">
      <div class="sidebar p-3">
        <div class="sidebar-wrapper">
          <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <b>Gav Love</b>
                <br>
                123@asda.ru
              </div>
              <i class="fa fa-sign-out"/>
            </li>
          </ul>
          <hr>
          <div class="list-group border-none">

            <router-link :to="{ name: 'home.dashboard' }" class="list-group-item">
              <i class="fa fa-sliders"/>
              <span class="mx-3">Панель управления</span>
            </router-link>

            <router-link :to="{ name: 'home.calendar' }" class="list-group-item">
              <i class="fa fa-calendar"/>
              <span class="mx-3">Календарь</span>
            </router-link>

            <router-link :to="{ name: 'home.masters' }" class="list-group-item">
              <i class="fa fa-user"/>
              <span class="mx-3">Мастера</span>
            </router-link>
            <router-link :to="{ name: 'home.orders' }" class="list-group-item">
              <i class="fa fa-shopping-bag" />
              <span class="mx-3">Записи</span>
            </router-link>
            <router-link :to="{ name: 'home.salons' }" class="list-group-item">
              <i class="fa fa-map-marker" />
              <span class="mx-3">Салоны</span>
            </router-link>
            <router-link :to="{ name: 'home.services' }" class="list-group-item">
              <i class="fa fa-briefcase"/>
              <span class="mx-3">Услуги</span>
            </router-link>
            <router-link :to="{ name: 'home.promotions' }" class="list-group-item">
              <i class="fa fa-bullhorn"/>
              <span class="mx-3">Акции</span>
            </router-link>
            <router-link :to="{ name: 'home.settings' }" class="list-group-item">
              <i class="fa fa-cogs"/>
              <span class="mx-3">Настройки</span>
            </router-link>
          </div>
          <hr>
          <div class="form-group">
            <label>Выбранный салон</label>
            <select class="form-select">
              <option>12312</option>
              <option>12312</option>
              <option>12312</option>
              <option>12312</option>
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
export default {
  name: "DashboardIndex",
  data() {
    return {
      nav_open: false
    }
  }
}
</script>

<style scoped>

</style>
