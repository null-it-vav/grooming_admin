<template>
  <div class="mb-2 mx-4 row no-gutters">
    <div class="col-auto p-0">
      <b-avatar
          :src="message.user_info.photo"
      />
    </div>
    <div class="col-10 col-md-7 p-0">
      <div class="mx-2">
        <div class="text-hint">{{ message.user_info.name }}</div>
        <div class="d-flex">
          <div class="chat-message-box" :class="'chat-message-box-'+(message.user_info.id == auth.id ? 'my' : 'other')">
            {{message.data.text}}
          </div>
        </div>
      </div>
    </div>
    <div class="col-3 col-md-4 pt-1 pl-0 d-none d-md-flex ml-auto">
      <div class="ml-auto text-hint" v-b-tooltip="$moment(message.created_at).format('YYYY-MM-DD HH:mm:ss')">
        {{ message.created_at | moment("from", "now") }}
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "ChatMessage",
  props: {
    message: {}
  },
  computed: {
    ...mapGetters([
      'auth',
    ]),
  },
}
</script>

<style scoped>

</style>
