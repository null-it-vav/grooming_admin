<template>
  <div>
    <div>
      <a class="fa fa-refresh" @click="getUsers"/>
    </div>
    <b-card>
      <div
          v-for="user in users.data"
          :key="user.id"
      >
        <router-link
            :to="{name: 'home.messages.vk.show', params: {user_id: user.id}}"
        >
          {{ user.first_name }} {{ user.last_name }}
        </router-link>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "VkIndex",
  created() {
    this.getUsers()
  },
  data() {
    return {
      users: {
        page: 1,
        data: []
      }
    }
  },
  methods: {
    getUsers() {
      this.$axios.get('/api/v1/profile/socials/vk')
      .then(response => {
        this.users.data = response.data.data.vk_users.data
      })
    }
  }
}
</script>

<style scoped>

</style>
