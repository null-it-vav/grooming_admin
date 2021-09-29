<template>
  <div
      class="sidebar"
      :class="[
          sidebar_mini ? 'sidebar-mini' : ''
      ]"
  >
    <div class="sidebar-logo d-flex">
      <img v-if="!sidebar_mini" src="~@/assets/logo.svg" />
      <img v-else src="~@/assets/logo_mini.svg" />
      <i v-if="!sidebar_mini" class="ml-auto pointer icon-close_arrow" @click="setSidebarMini()"/>
    </div>
    <div class="sidebar-block">
      <div class="sidebar-head text-2">
        <b>МЕНЕДЖМЕНТ</b>
      </div>
      <router-link
          :to="{ name: 'home.dashboard' }"
          class="sidebar-menu-item"
      >
        <div class="sidebar-menu-item-right" />
        <div class="sidebar-menu-item-title">
          <img src="~@/assets/sidebar/dashboard.svg"/>
          <div class="sidebar-menu-item-text">
            Дашборд
          </div>
        </div>
      </router-link>
      <router-link
          :to="{ name: 'home.orders' }"
          class="sidebar-menu-item"
      >
        <div class="sidebar-menu-item-right" />
        <div class="sidebar-menu-item-title">
          <img src="~@/assets/sidebar/calendar.svg"/>
          <div class="sidebar-menu-item-text">
            Записи
          </div>
        </div>
        <div class="sidebar-menu-item-plus" @click="createOrder">
          <i class="icon-plus"/>
        </div>
      </router-link>
      <router-link
          :to="{ name: 'home.clients' }"
          class="sidebar-menu-item"
      >
        <div class="sidebar-menu-item-right" />
        <div class="sidebar-menu-item-title">
          <img src="~@/assets/sidebar/clients.svg"/>
          <div class="sidebar-menu-item-text">
            Клиенты и питомцы
          </div>
        </div>
        <div class="sidebar-menu-item-plus" @click="createOrder">
          <i class="icon-plus"/>
        </div>
      </router-link>
      <router-link
          :to="{ name: 'home.mail.index' }"
          class="sidebar-menu-item"
      >
        <div class="sidebar-menu-item-right" />
        <div class="sidebar-menu-item-title">
          <img src="~@/assets/sidebar/chat.svg"/>
          <div class="sidebar-menu-item-text">
            Чат и почта
          </div>
        </div>
        <div class="sidebar-menu-item-badge-red">
          3
        </div>
      </router-link>
    </div>
    <div class="sidebar-block">
      <div class="sidebar-head text-2">
        <b>Управление</b>
      </div>
      <router-link :to="{ name: 'home.salons' }" class="sidebar-menu-item">
        <div class="sidebar-menu-item-right" />
        <div class="sidebar-menu-item-title">
          <img src="~@/assets/sidebar/company.svg"/>
          <div class="sidebar-menu-item-text">
            Салоны
          </div>
        </div>
      </router-link>
      <router-link :to="{ name: 'home.services' }" class="sidebar-menu-item">
        <div class="sidebar-menu-item-right" />
        <div class="sidebar-menu-item-title">
          <img src="~@/assets/sidebar/services.svg"/>
          <div class="sidebar-menu-item-text">
            Услуги
          </div>
        </div>
      </router-link>
      <router-link :to="{ name: 'home' }" class="sidebar-menu-item">
        <div class="sidebar-menu-item-right" />
        <div class="sidebar-menu-item-title">
          <img src="~@/assets/sidebar/abonements.svg"/>
          <div class="sidebar-menu-item-text">
            Абонементы
          </div>
        </div>
      </router-link>
      <router-link :to="{ name: 'home.shop.index' }" class="sidebar-menu-item">
        <div class="sidebar-menu-item-right" />
        <div class="sidebar-menu-item-title">
          <img src="~@/assets/sidebar/shop.svg"/>
          <div class="sidebar-menu-item-text">
            Магазин
          </div>
        </div>
      </router-link>
      <router-link :to="{ name: 'home' }" class="sidebar-menu-item">
        <div class="sidebar-menu-item-right" />
        <div class="sidebar-menu-item-title">
          <img src="~@/assets/sidebar/star.svg"/>
          <div class="sidebar-menu-item-text">
            Отзывы
          </div>
        </div>
      </router-link>
      <router-link :to="{ name: 'home' }" class="sidebar-menu-item">
        <div class="sidebar-menu-item-right" />
        <div class="sidebar-menu-item-title">
          <img src="~@/assets/sidebar/sender.svg"/>
          <div class="sidebar-menu-item-text">
            Маркетинг
          </div>
        </div>
      </router-link>
      <router-link :to="{ name: 'home' }" class="sidebar-menu-item">
        <div class="sidebar-menu-item-right" />
        <div class="sidebar-menu-item-title">
          <img src="~@/assets/sidebar/team.svg"/>
          <div class="sidebar-menu-item-text">
            Сотрудники
          </div>
        </div>
      </router-link>
      <router-link :to="{ name: 'home' }" class="sidebar-menu-item">
        <div class="sidebar-menu-item-right" />
        <div class="sidebar-menu-item-title">
          <img src="~@/assets/sidebar/stock.svg"/>
          <div class="sidebar-menu-item-text">
            Складской учет
          </div>
        </div>
      </router-link>
      <router-link :to="{ name: 'home' }" class="sidebar-menu-item">
        <div class="sidebar-menu-item-right" />
        <div class="sidebar-menu-item-title">
          <img src="~@/assets/sidebar/report.svg"/>
          <div class="sidebar-menu-item-text">
            Отчеты
          </div>
        </div>
      </router-link>
    </div>
    <div class="sidebar-block">
      <router-link :to="{ name: 'home.settings.index' }" class="sidebar-menu-item">
        <div class="sidebar-menu-item-right" />
        <div class="sidebar-menu-item-title">
          <img src="~@/assets/sidebar/setting.svg"/>
          <div class="sidebar-menu-item-text">
            Настройки
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    sidebar_mini: {
      type: Boolean
    }
  },
  methods: {
    setSidebarMini() {
      this.$emit('setSidebarMini', this.sidebar_mini)
    },
    createOrder(event) {
      event.preventDefault()
      console.log(123)

    }
  }
}
</script>

<style scoped>
  .icon-close_arrow {
    color: #A8B3C1;
  }
</style>
