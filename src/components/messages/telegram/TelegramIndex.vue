<template>
  <div class="row">
    <div class="col-lg-3">
      <b-card>
        <div
            v-for="chat in chats.data"
            :key="chat.id"
            class="mb-2"
        >
          <router-link
              :to="{name: 'home.messages.instagram.chat', params: {chat_id: chat.id}}"
          >
            {{ chat.last_name }} {{ chat.first_name }}
          </router-link>
        </div>
      </b-card>
    </div>
    <div class="col-lg-9">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "TelegramIndex",
  created() {
    this.getChats()
  },
  data() {
    return {
      chats: {
        page: 1,
        data: []
      }
    }
  },
  methods: {
    getChats() {
      this.$axios.get('/api/v1/profile/socials/telegram')
          .then(response => {
            this.chats.data = response.data.chats.data
          })
    }
  }
}
</script>

<style scoped>

</style>
