<template>
  <div>
    <div ref="chatWindows">
      <div :style="`height: ${chat_height}px`">
        <div class="card mr-lg-2 mr-0 h-100 p-0">
          <div class="chat-header px-4 py-2 d-flex" ref="chatHeader">
            <!--            <i class="fa fa-refresh" @click="getMessages"/>-->
            <span class="text-hint">{{ telegramChat.last_name }} {{ telegramChat.first_name }}</span>
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
                    v-if="message.is_bot"
                />
                <div
                    class="chat-message-box"
                    :class="'chat-message-box-'+(message.is_bot ? 'my' : 'other')"
                >
                  {{message.text}}
                  <div v-if="message.document.file_id">
                    <a
                      :href="$axios.defaults.baseURL + `/api/socials/telegram/${chat_id}/message/${message.id}/getFile`"
                      target="_blank"
                    >
                      {{ message.document.file_name }}
                    </a><br>
                    {{ message.document.file_size | filesize }}
                  </div>
                  <div v-if="message.voice.file_id">
                    <audio controls>
                      <source :src="$axios.defaults.baseURL + `/api/socials/telegram/${chat_id}/message/${message.id}/getFile`" type="audio/mpeg">
                    </audio>
                    <br>
                    {{ message.voice.file_size | filesize }}
                  </div>
                  <div v-if="message.photo.length > 0">
                    <img
                        width="300px"
                        :src="$axios.defaults.baseURL + `/api/socials/telegram/${chat_id}/message/${message.id}/photo_${message.id}.jpeg`"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="chat-input" ref="chatInput">

            <div class="py-2 row no-gutters align-items-center">
              <div class="col-auto d-flex">
                <img src="~@/assets/chat/attach-doc.svg" class="pointer" @click="addDocument"/>

                <input
                    ref="document" type="file" style="display: none" @change="handleDocumentUpload()"
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
  name: "TelegramChatShow",
  props: {
    chat_id: null
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
      if (value.data.telegram_chat_id == this.chat_id) {
        switch (value.action) {
          case "new_message":
            this.messages.data.unshift(value.data)
            break;
          case 'message_delete':
            //this.messages.data = this.messages.data.filter(message => message.id !== value.data.id)
            break;
          default:

            break;
        }

      }
    }
  },
  data() {
    return {
      telegramChat: {},
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
    addDocument() {
      this.$refs.document.click()
    },
    handleDocumentUpload() {
      if (this.$refs.document.files[0]) {
        //this.$refs.images.files[0]
        this.chooseMessageType(this.$refs.document.files[0])
        this.$refs.document.value = ''
      }
    },
    getMessages() {
      this.$axios.get(`/api/v1/profile/socials/telegram/${this.chat_id}/messages`)
          .then(response => {
            this.telegramChat = response.data.telegramChat
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
        data.append("document", image)
      } else {
        data.append("text", (this.message || ""))
      }

      this.$axios.post(`/api/v1/profile/socials/telegram/${this.chat_id}/messages`, data)
          .then(() => {
            this.message = ''
            // this.getMessages()
          })
    }
  }
}
</script>

<style scoped>

</style>
