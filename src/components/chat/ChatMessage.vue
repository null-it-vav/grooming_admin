<template>
  <div
      class="mb-2 row no-gutters"
      :class="{
          'mx-4': !is_reply
      }"
  >
    <div class="col-auto p-0" v-if="!is_reply">
      <b-avatar
          :src="message.user_info.photo"
          badge
          :badge-variant="users_online[message.user_id] ? 'success' : ''"
      />
    </div>
    <div
        class="col-auto p-0"
        :class="{
          'chat-message-reply': is_reply
        }"
    >
      <div class="mx-2">
        <div class="text-hint d-flex">
          {{ message.user_info.name }}
          <div class="ml-2" v-if="message.user_id != client_id && !is_reply">
            <i class="fa fa-check" v-if="message.user_read" v-b-tooltip="'Прочитано'" />
            <i class="fa fa-times" v-else v-b-tooltip="'Не прочитано'" />
          </div>
          <div class="ml-2" v-if="message.user_id == client_id && !is_reply">
            <i class="fa fa-check" v-if="message.admin_read" v-b-tooltip="'Вы прочитали'" />
            <i class="fa fa-times" v-else v-b-tooltip="'Вы не прочитали'" />
          </div>
        </div>
        <div class="d-flex">
          <div class="chat-message-box" :class="'chat-message-box-'+(message.user_info.id == auth.id ? 'my' : 'other')">
            <div>{{message.data.text}}</div>
            <div class="chat-message-box-files">
              <chat-message
                  v-if="message.reply_message.id && !is_reply"
                  :can_reply="false"
                  :is_reply="true"
                  :client_id="client_id"
                  :message="message.reply_message"
                  :users_online="users_online"
              />
              <div
                  v-for="(document,k) in message.files"
                  :key="k"
                  class="card-file card-file-can-delete"
              >
                <div class="d-flex align-items-center">
                  <img src="~@/assets/chat/base_file.svg" class="mr-2" />
                  <div class="mr-2">
                    <div>
                      <a :href="document.url" target="_blank">{{ document.name }}</a>
                    </div>
                    <span class="text-primary">{{ document.size | filesize }}</span>
                  </div>
                </div>
              </div>
              <div
                  v-for="(document,k) in message.images"
                  :key="k"
                  class="card-file card-file-can-delete"
              >
                <div class="d-flex align-items-center">
                  <div
                      class="card-file-preview"
                      :style="`background-image: url('${document.url}')`"
                  />
                  <div class="mr-2">
                    <div>
                      <a :href="document.url" target="_blank">{{ document.name }}</a>
                    </div>
                    <span class="text-primary">{{ document.size | filesize }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex flex-column text-hint" v-if="can_reply">
            <i class="fa fa-envelope pointer ml-2" v-if="message.type == 'TEXT' && message.user_id != client_id && !message.sms_is_send" @click="$emit('sendSMS', message.id)" />
            <i class="fa fa-reply mt-auto ml-2 pointer" @click="reply"/>
          </div>
        </div>
      </div>
    </div>
    <div
        class="col-3 col-md-4 pt-1 pl-0 d-none d-md-flex ml-auto"
        v-if="message.created_at && !is_reply"
    >
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
    message: {},
    client_id: {},
    users_online: {
      type: Object,
      default: () => {}
    },
    can_reply: {
      type: Boolean,
      default: true
    },
    is_reply: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    ...mapGetters([
      'auth',
    ]),
  },
  methods: {
    reply() {
      this.$emit('reply', this.message)
    }
  }
}
</script>

<style scoped>

</style>
