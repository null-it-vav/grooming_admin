<template>
  <div>
    <base-h-menu
        :list="menu"
        title="Чат и почта"
    />
    <div class="mx-4">
      <router-view
      />
    </div>
  </div>
</template>

<script>
import BaseHMenu from "@/components/base/BaseHMenu";

export default {
  name: "MessagesIndex",
  components: {
    BaseHMenu,
  },
  data() {
    return {
      menu: [
        { name: 'home.messages.vk', title: 'VKcom'},
        { name: 'home.messages.instagram', title: 'Instagram'},
        { name: 'home.messages.telegram', title: 'Telegram'},
      ]
    }
  },
}
</script>

<style scoped>

</style>
