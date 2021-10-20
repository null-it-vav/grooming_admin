<template>
  <div>
    <div>
      <a class="fa fa-refresh" @click="getMessages"/>
    </div>
    <b-card>
      <div
        v-for="message in messages"
        :key="message.id"
        class="border-bottom mb-2"
      >
        <vk-message :message="message"/>
      </div>
    </b-card>
    <br>
    <b-card>
      <div class="form-group">
        <input
            type="text"
            name=""
            class="form-control"
            placeholder="message..."
            v-model="message"
        >
      </div>
      <a class="btn btn-success" @click="send">Send</a>
    </b-card>
  </div>
</template>

<script>
import VkMessage from "@/components/messages/vk/VkMessage";
export default {
  name: "VkShow",
  components: {VkMessage},
  props: {
    user_id: null
  },
  data() {
    return {
      messages: [],
      message: ''
    }
  },
  created() {
    this.getMessages()
  },
  methods: {
    getMessages() {
      this.$axios.get(`/api/v1/profile/socials/vk/${this.user_id}/messages`)
          .then(response => {
            this.messages = response.data.messages
          })
    },
    send() {
      this.$axios.post(`/api/v1/profile/socials/vk/${this.user_id}/messages`, {
        text: this.message
      })
          .then(() => {
            this.message = ''
          })
    }
  }
}
</script>

<style scoped>

</style>
