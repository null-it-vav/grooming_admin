<template>
  <div class="menu">
    <div class="px-4">
      <div class="menu-slot">
        <div class="menu-slot-title">
          {{ title }}
        </div>
      </div>
      <div class="menu-items">
        <router-link
            v-for="(item, id) in list"
            :key="id"
            :to="{ name: item.name }"
            class="menu-item"
        >
          <span class="menu-item-span">{{ item.title }}</span>
          <div class="menu-item-bottom" />
        </router-link>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseHMenu",
  props: {
    list: {
      type: Array
    },
    title: {
      type: String
    }
  }
}
</script>

<style scoped>

</style>
