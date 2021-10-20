<template>
  <div>
    <div ref="chatWindows">
      <div :style="`height: ${chat_height}px`">
        <div class="card mr-lg-2 mr-0 h-100 p-0">
          <div class="chat-header px-4 py-2 d-flex" ref="chatHeader">
<!--            <i class="fa fa-refresh" @click="getMessages"/>-->
            <span class="text-hint">@{{facebookInstagramConversation.sender_username}}</span>
          </div>
          <div class="chat-body" :style="`height: ${chat_history_height}px`" @scroll="checkLoadMessage" ref="chatBody">
            <div
                v-for="message in messages.data"
                :key="message.id"
                class="mb-2"
            >
              <div
                  class="d-flex px-2"
              >
                <div
                    class="ml-auto"
                    v-if="message.sender_id != facebookInstagramConversation.sender_id"
                />
                <div class="mr-2">
                  <b-avatar
                      :src="facebookInstagramConversation.sender_profile_pic"
                      v-if="message.sender_id == facebookInstagramConversation.sender_id"
                  />
                </div>
                <div
                    class="chat-message-box"
                    :class="'chat-message-box-'+(message.sender_id != facebookInstagramConversation.sender_id ? 'my' : 'other')"
                >
                  <div>
                    {{ message.text }}
                  </div>
                  <div v-if="message.attachments.data">
                    <div
                        v-for="(attachment, id) in message.attachments.data"
                        :key="`attachment_${message.id}_${id}`"
                    >
                      <div v-if="attachment.image_data">
                        <img :src="attachment.image_data.preview_url" width="200px"/>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <div
                        v-for="(attachment, id) in message.attachments"
                        :key="`attachment_${message.id}_${id}`"
                    >
                      <div v-if="attachment.type == 'image'">
                        <img :src="attachment.payload.url"  width="200px" />
                      </div>
                      <div v-if="attachment.type == 'audio'">
                        <audio controls>
                          <source :src="attachment.payload.url" type="audio/mpeg">
                        </audio>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="chat-input" ref="chatInput">

            <div class="py-2 row no-gutters align-items-center">
              <div class="col-auto d-flex">
                <img src="~@/assets/chat/attach-doc.svg" class="pointer" @click="addImages"/>

                <input
                    ref="images" type="file" style="display: none" @change="handleImagesUpload()"
                    accept="image/png, image/jpg, image/ico, image/bmp"
                />
              </div>
              <div class="col-lg-7 col-8 d-flex align-items-center">
                <textarea
                    v-model="message"
                    class="chat-input-message"
                    placeholder="Напишите сообщение"
                    contenteditable="true"
                    :rows="send_message_rows"
                />
              </div>
              <div class="ml-auto col-auto">
                <div
                    class="pointer"
                    @click="chooseMessageType()"
                    @keyup.enter="chooseMessageType()"
                >
                  <div
                      class="mr-4"
                  >
                    <img v-if="message.length > 0" src="~@/assets/chat/send_button_active.svg"/>
                    <img v-else src="~@/assets/chat/send_button.svg"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "InstagramConversationShow",
  props: {
    conversation_id: null,
    conversation: {
      type: Object
    },
    needReload: {
      type: Boolean
    },
  },
  computed: {
    ...mapGetters([
      'notifications',
    ]),
  },
  created() {
    this.getMessages()
    window.addEventListener("resize", this.pageResize);
  },
  watch: {
    conversation_id: function () {
      this.getMessages()
    },
    message() {
      let rows = (this.message.match(/\n/g) || []).length
      this.send_message_rows = rows ? (rows+1 > 4 ? 4 : rows+1) : 1
    },
    'notifications.App_Models_TelegramChatMessage': function (value) {
      // console.warn(value)
      if (value.data.fic_id == this.conversation_id) {
        switch (value.action) {
          case "new_message":
            this.messages.data.unshift(value.data)
            break;
          case 'message_delete':
            this.messages.data = this.messages.data.filter(message => message.id !== value.data.id)
            break;
          default:

            break;
        }

      }
    },
    'needReload': function () {
      this.getMessages()
    }
  },
  data() {
    return {
      facebookInstagramConversation: {},
      messages: {
        page: 1,
        data: []
      },
      chat_height: 400,
      chat_history_height: 0,
      send_message_rows: 1,
      message: ''
    }
  },
  mounted() {
    this.pageResize()
  },
  destroyed() {
    window.removeEventListener("resize", this.pageResize);
  },
  methods: {
    addImages() {
      this.$refs.images.click()
    },
    handleImagesUpload() {
      if (this.$refs.images.files[0]) {
        //this.$refs.images.files[0]
        this.chooseMessageType(this.$refs.images.files[0])
        this.$refs.images.value = ''
      }
    },
    getMessages() {
      this.$axios.get(`/api/v1/profile/socials/instagram/${this.conversation_id}/messages`)
          .then(response => {
            this.facebookInstagramConversation = response.data.facebookInstagramConversation
            this.conversation.user_id = response.data.facebookInstagramConversation.user_id
            this.conversation.id = response.data.facebookInstagramConversation.id
            this.messages.data = response.data.messages.data
          })
    },
    pageResize() {
      let top = this.$refs.chatWindows.getBoundingClientRect().top
      let height = window.innerHeight;

      this.chat_height = height - top - 10;
      this.chatHistoryResize()
    },
    chatHistoryResize(){
      let height = this.$refs.chatInput.clientHeight
      this.chat_history_height = this.chat_height - height
    },
    // eslint-disable-next-line no-unused-vars
    checkLoadMessage (e) {
      //let el = e.target
    },
    chooseMessageType(image = null) {
      let data = new FormData()
      if (image) {
        data.append("sended_image", image)
      } else {
        data.append("text", (this.message || ""))
      }

      //надо выбрать что отправляем
      this.$axios.post(`/api/v1/profile/socials/instagram/${this.conversation_id}/messages`, data)
          .then(() => {
            this.message = ''
            this.getMessages()
          })
    }
  }
}
</script>

<style scoped>

</style>
