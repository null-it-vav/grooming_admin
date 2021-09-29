<template>
  <div>
    <div class="mb-2 alert position-fixed fixed-bottom">
      <message-success-error
          :show="success_error"
      />
    </div>
    <div class="row no-gutters" ref="chatWindows">
      <div class="col-lg-8" :style="`height: ${chat_height}px`">
        <div class="card mr-lg-2 mr-0 h-100 p-0">
          <div class="chat-header px-4 py-2 d-flex" ref="chatHeader">
            <router-link
                :to="{ name: 'home.clients' }"
                class="text-dark text-decoration-none"
            >
              <i class="fa fa-chevron-left"/> {{ $t('base.back') }}
            </router-link>
            <div class="ml-auto d-flex">
              <div
                  v-for="(time, k) in users_typing" :key="k"
                  class="mr-2"
              >
                <div v-if="time > nowTime">
                  <div class="spinner-grow spinner-grow-sm" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                  {{ users[k] ? users[k].name : '' }}
                </div>
              </div>
            </div>
          </div>
          <div class="chat-body" :style="`height: ${chat_history_height}px`" @scroll="checkLoadMessage" ref="chatBody">
            <chat-message
                @reply="replyMessage"
                @sendSMS="sendSMS"
                :users_online="users_online"
                :message="message"
                :client_id="client_id"
                v-for="message in messages" :key="`message_${message.id}`"
            />
          </div>
          <div class="chat-input" ref="chatInput">
            <button
                class="chat-input-to-end"
                :class="{'chat-input-to-end-show': toEndShow}"
                @click="scrollToBottom"
            >
              <span class="chat-input-to-end-button"></span>
              <span v-if="newMessages" class="chat-input-to-end-label">
                <span class="chat-input-to-end-label-round">{{ newMessages }}</span>
              </span>
            </button>
            <div class="py-2 row no-gutters align-items-center">
              <div class="col-auto d-flex">
                <b-dropdown
                    v-if="!images.length && !files.length"
                    dropup
                    no-caret
                    variant="link" toggle-class="m-auto text-decoration-none"
                >
                  <template v-slot:button-content>
                    <img src="~@/assets/chat/attach-doc.svg">
                  </template>
                  <b-dropdown-item @click="addFiles()">{{ $t('app.components.chats.file') }}</b-dropdown-item>
                  <b-dropdown-item @click="addImages()">{{ $t('app.components.chats.photo') }}</b-dropdown-item>
                  <b-dropdown-item @click="addOrder()">{{ $t('app.components.chats.order') }}</b-dropdown-item>
                </b-dropdown>
                <div v-else>
                  <button type="button" class="btn btn-link m-auto text-decoration-none dropdown-toggle-no-caret" @click="addContent">
                    <img src="~@/assets/chat/attach-doc.svg">
                  </button>
                </div>

                <input ref="documents" multiple type="file" style="display: none" @change="handleFileUpload()">
                <input ref="images" multiple type="file" style="display: none" @change="handleImagesUpload()">
              </div>
              <div class="col-lg-7 col-8 d-flex align-items-center">
                <textarea
                    v-model="message"
                    class="chat-input-message"
                    placeholder="Напишите сообщение"
                    contenteditable="true"
                    @keyup="typing"
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
                    <img v-if="message.length > 0 || files.length > 0 || images.length > 0" src="~@/assets/chat/send_button_active.svg"/>
                    <img v-else src="~@/assets/chat/send_button.svg"/>
                  </div>
                </div>
              </div>
            </div>
            <div class="chat-message-box-files">
              <div class="d-flex" v-if="reply_message.id">
                <chat-message class="w-100" v-if="reply_message.id" :users_online="users_online" :message="reply_message" :client_id="client_id" :can_reply="false"/>
                <div
                    class="ml-auto col-auto align-items-center d-flex pointer"
                    @click="reply_message = {}"
                >
                  <i class="text-hint fa fa-times"/>
                </div>
              </div>
              <div
                  v-for="(document,k) in files"
                  :key="k"
                  class="row no-gutters w-100 px-3 pb-2"
              >
                <div
                    class="card-file col-auto card-file-can-delete"
                >
                  <div class="d-flex align-items-center">
                    <img src="~@/assets/chat/base_file.svg" class="mr-2" />
                    <div class="mr-2">
                      <div>{{ document.name }}</div>
                      <span class="text-primary">{{ document.size | filesize }}</span>
                    </div>
                  </div>
                </div>
                <div
                    class="ml-auto col-auto align-items-center d-flex pointer"
                    @click="deleteFileFromUpload(k)"
                >
                  <i class="text-hint fa fa-times"/>
                </div>
              </div>

              <div
                  v-for="(image,k) in imagesData"
                  :key="k"
                  class="row no-gutters w-100 px-3 pb-2"
              >
                <div
                    class="card-file col-auto card-file-can-delete"
                >
                  <div class="d-flex align-items-center">
                    <div
                        class="card-file-preview"
                        :style="`background-image: url('${image}')`"
                    />
                    <div class="mr-2">
                      <div>{{ images[k] ? images[k].name : '' }}</div>
                      <span class="text-primary">{{ (images[k] ? images[k].size : 0) | filesize }}</span>
                    </div>
                  </div>
                </div>
                <div
                    class="ml-auto col-auto align-items-center d-flex pointer"
                    @click="deleteImageFromUpload(k)"
                >
                  <i class="text-hint fa fa-times"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 d-none d-lg-block overflow-auto" :style="`height: ${chat_height}px`">
        <div class="card p-4 mb-2" v-if="client">
          <b>{{ client.name }}</b>
          {{ client.phone }}
        </div>
        <div class="card p-4 mb-2">
          <div class="card-body p-0">
            <router-link
                v-for="(pet, k) in client.pets"
                :key="k"
                :to="{name: 'home.client.pet.index', params: {
                  client_id: client_id,
                  pet_id: pet.id
                }}"
                class="pet-card w-auto"
            >
              <div>
                <b-avatar />
              </div>
              <div
                  class="pet-card-about"
              >
                <div>
                  <b>{{ pet.nickname }} </b>
                  <span class="pet-card-about-breed">{{ breeds && breeds.find(breed => breed.id == pet.breed_id) ? breeds.find(breed => breed.id == pet.breed_id).name : '' }}</span>
                </div>
                <div class="d-flex flex-wrap">
                  <div
                      v-for="(tag,k) in pet.tags"
                      :key="k"
                      class="ant-select-dropdown-menu-item-tags-code_title mb-1"
                      :style="`background-color: #${tag.color_mark};color: ${ $options.filters.invert_color(tag.color_mark) }`"
                      v-b-tooltip="tag.name"
                  >
                    {{ tag.code_title }}
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {clients, send_message, chat_messages, chat_messages_set_read, update_message} from "@/api";
import ChatMessage from "@/components/chat/ChatMessage";
import MessageSuccessError from "@/components/base/SuccessError";

export default {
  name: "ChatDialog",
  components: {MessageSuccessError, ChatMessage},
  props: {
    client_id: null,
    chat_id: null
  },
  data() {
    return {
      client: {},
      orders: {
        data: [],
        page: 1,
        per_page: this.qty ? this.qty : 15,
        last_page: 1,
        total: 0,
      },
      messages: [],
      messages_per_page: 20,
      images: [],
      imagesData: [],
      files: [],
      message: '',
      chat_height: 400,
      chat_history_height: 0,
      send_message_rows: 1,
      loadMessage: false,
      endOfChatMessages: false,
      toEndShow: false,
      newMessages: 0,
      showScrollBottomPx: 100,
      scrollTop: 0,
      messagesRead: [],
      chatEventsChannel: null,
      isTabActive: true,
      users_typing: {},
      users_online: {},
      nowTime: Date.now(),
      reply_message: {},
      success_error: {
        success: false,
        error: false,
        msg: '',
      },
    }
  },
  computed: {
    ...mapGetters([
      'auth',
      'breeds',
      'masters',
      'admins',
      'tags'
    ]),
    users: function () {
      let data = {}
      this.masters.forEach(master => {
        data[master.id] = master
      })
      this.admins.forEach(admin => {
        data[admin.id] = admin
      })
      data[this.client.id] = this.client
      return data;
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.pageResize);
    window.Echo.leave(`chat.${this.chat_id}`)
    window.Echo.leave(`chat_events.${this.chat_id}`)

    clearInterval(this.intervalId);
  },
  created() {
    this.getClient()
    window.addEventListener("resize", this.pageResize);
    this.loadMessages()
  },
  mounted() {
    this.pageResize()
    this.echoCreateConnect()
    window.onfocus = () => { this.isTabActive = true }
    window.onblur = () => { this.isTabActive = false }
    this.intervalId = setInterval(() => {
      this.nowTime = Date.now()
    }, 1000);
  },
  watch: {
    isTabActive() {
      if (this.isTabActive){
        //отправить что прочитал сообщения
        let messages = this.messages.filter(message => (message.user_id == this.client_id && !message.admin_read))
        messages.forEach(message => {
          this.setChatMessagesRead(message.id)
        })
      }
    },
    message() {
      let rows = (this.message.match(/\n/g) || []).length
      this.send_message_rows = rows ? rows+1 : 1
    }
  },
  methods: {
    setMessageReaded(message_id) {
      let messageIsRead = this.messagesRead.find(message => message == message_id)

      if (messageIsRead){
        let message = this.messages.find(message => message.id == messageIsRead)
        if (message) {
          message.user_read = true
        }
      }
    },
    setChatMessagesRead(message_id){
      chat_messages_set_read(this.chat_id, message_id).then(() => {
        let message = this.messages.find(message => message.id == message_id)
        message.admin_read = 1
      })
    },
    echoCreateConnect() {
      this.chatEventsChannel = window.Echo.join('chat_events.'+this.chat_id)
      this.chatEventsChannel.listenForWhisper('typing', (e) => {
        this.$set(this.users_typing, e.id, (Date.now() + 6000))
      })
      this.chatEventsChannel
          .here((users) => {
            users.forEach(user => {
              this.$set(this.users_online, user.id, true)
            })
          })
          .joining((user) => {
            this.$set(this.users_online, user.id, true)
          })
          .leaving((user) => {
            this.$set(this.users_online, user.id, false)
          })
      window.Echo.private(`chat.${this.chat_id}`)
          .listen('ChatMessage', (data) => {
            if (data.message) {
              this.messages.unshift(data.message)

              this.$set(this.users_typing, data.message.user_id, Date.now())

              this.newMessages++

              if (this.isTabActive) {
                this.setMessageReaded(data.message.id)
                this.setChatMessagesRead(data.message.id)
              }


              try {
                var audio = new Audio(require('../../assets/chat/sound.mp3'));
                audio.play()
              }catch (e) {
                console.log(e)
              }
            }
          })
          .listen('ChatMessageReaded', (data) => {
            if (data.message) {
              let message = this.messages.find(message => message.id == data.message.id)
              if (message){
                message.user_read = true
              }
            }
          })
    },
    getClient() {
      clients({
        id: this.client_id,
        with: [
          'pets.tags',
          'tags'
        ]
      })
          .then((response) => {
            this.client = response.data.data.clients.data[0]
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
    addFiles(){
      this.$refs.documents.click()
    },
    addImages() {
      this.$refs.images.click()
    },
    addOrder() {

    },
    addContent () {
      if(this.images.length > 0) {
        this.addImages()
      }
      else if (this.files.length > 0) {
        this.addFiles()
      }
    },
    handleFileUpload () {
      for (let i = 0; i < this.$refs.documents.files.length; i++) {
        if ((this.$refs.documents.files[i].size / 1024 / 1024) < 2) {
          this.files.push(this.$refs.documents.files[i])
        }
      }
      this.$refs.documents.value = ''
    },
    handleImagesUpload () {
      for (let i = 0; i < this.$refs.images.files.length; i++) {
        if ((this.$refs.images.files[i].size / 1024 / 1024) < 2) {
          this.images.push(this.$refs.images.files[i])
        }
      }
      this.$refs.images.value = ''
      this.previewImage()
    },
    previewImage () {
      if (this.images) {
        let newPhotos = []
        this.images.forEach(element => {
          const reader = new FileReader();
          reader.onload = (e) => {
            newPhotos.push(e.target.result);
          }
          reader.readAsDataURL(element)
        })
        this.imagesData = newPhotos;
      }
    },
    deleteFileFromUpload (k) {
      this.files.splice(k, 1)
    },
    deleteImageFromUpload (k) {
      this.images.splice(k, 1)
      this.imagesData.splice(k, 1)
    },
    typing(){
      this.chatEventsChannel
          .whisper('typing', {
            id: this.auth.id
          });
    },
    chooseMessageType()
    {
      let data = new FormData()
      switch (true) {
        case !!this.images.length:
          data.append("type", 'IMAGES')
          data.append("text", (this.message || ""))
          if (this.reply_message.id) {
            data.append('reply_id', this.reply_message.id)
          }
          this.images.forEach(element => {
            data.append("message[images][]", element)
          })
          this.images = []
          this.imagesData = []
          this.sendMessage(data)
          break;
        case !!this.files.length:
          data.append("type", 'FILES')
          data.append("text", (this.message || ""))
          if (this.reply_message.id) {
            data.append('reply_id', this.reply_message.id)
          }
          this.files.forEach(element => {
            data.append("message[files][]", element)
          })
          this.files = []
          this.sendMessage(data)
          break;
        // case !!this.audios.blobUrl:
        //   this.sendAudioMessage();
        //   break;
        default:
          data = new FormData();
          data.append("type", 'TEXT')
          data.append("text", this.message)
          if (this.reply_message.id) {
            data.append('reply_id', this.reply_message.id)
          }
          this.sendMessage(data)
          break;
      }
    },
    sendSMS(message_id){
      update_message(this.chat_id, message_id, {
        _method: 'patch',
        action: 'send-sms'
      })
      .then((response) => {
        let message = this.messages.find(message => message.id == response.data.id)

        if (message){
          message.sms_is_send = true
          this.$forceUpdate();
        }
      })
      .catch(error => {
        if (error.response.data.message || false) {
          this.success_error.error = true
          this.success_error.msg = [
              error.response.data.message
          ]
        }
      })
    },
    sendMessage (data) {
      send_message(this.chat_id, data)
          .then((response) => {
            this.messages.unshift(response.data)
            this.message = ''
            this.reply_message = {}
            this.setMessageReaded(response.data.id)
          })
          .catch((error) => {
            console.log(error)
          })
    },
    checkLoadMessage (e) {
      let el = e.target
      let maxScroll = el.scrollHeight - el.clientHeight;
      let scrollTop = (Math.abs(el.scrollTop) + 100) > maxScroll
      if (scrollTop) {
        this.loadMore()
      }
      if (Math.abs(el.scrollTop) > this.showScrollBottomPx){
        this.toEndShow = true
      }else {
        this.toEndShow = false
        this.newMessages = 0
      }
      this.scrollTop = Math.abs(el.scrollTop)
    },
    loadMore() {
      if (!this.loadMessage && !this.endOfChatMessages) {
        this.loadMessage = true
        let lastMessage = this.messages[this.messages.length - 1]
        if (lastMessage){
          chat_messages(this.chat_id, {
            last_message: lastMessage.id,
            type: "before",
            qty: this.messages_per_page
          })
              .then((response) => {
                if (!response.data.messages.length){
                  this.endOfChatMessages = true;
                }
                if (response.data.messages.length != this.messages_per_page){
                  this.endOfChatMessages = true;
                }
                this.loadMessage = false
                response.data.messages.forEach(element => this.messages.push(element))
              })
            .catch((error) => {
              console.log(error)
              this.loadMessage = false
            })
        }
      }
    },
    loadMessages(){
      chat_messages(this.chat_id, {
        qty: this.messages_per_page
      })
          .then((response) => {
            this.messages = response.data.messages
            //если в первом ответе и так меньше сообещний чем надо
            if (response.data.messages.length != this.messages_per_page){
              this.endOfChatMessages = true;
            }
          })
    },
    scrollToBottom() {
      this.$refs.chatBody.scrollTop = 0
    },
    replyMessage(message){
      this.reply_message = message
    }
  }
}
</script>

<style scoped>

</style>
