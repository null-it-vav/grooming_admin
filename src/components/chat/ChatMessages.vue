<template>
  <div>
    <div class="row no-gutters" ref="chatWindows">
      <div class="col-lg-8" :style="`height: ${chat_height}px`">
        <div class="card mr-lg-2 mr-0 h-100 p-0">
          <div class="chat-footer px-4 py-2" ref="chatFooter">
            <router-link
                :to="{ name: 'home.clients' }"
                class="text-dark text-decoration-none"
            >
              <i class="fa fa-chevron-left"/> Назад
            </router-link>
          </div>
          <div class="chat-body" :style="`height: ${chat_history_height}px`" @scroll="checkLoadMessage" ref="chatBody">
            <chat-message :message="message" v-for="message in messages" :key="`message_${message.id}`"/>
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
import {clients, send_message, chat_messages} from "@/api";
import ChatMessage from "@/components/chat/ChatMessage";

export default {
  name: "ChatDialog",
  components: {ChatMessage},
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
      scrollTop: 0
    }
  },
  computed: {
    ...mapGetters([
      'auth',
      'breeds',
      'tags'
    ]),
  },
  destroyed() {
    window.removeEventListener("resize", this.pageResize);
    window.Echo.leave(`chat.${this.chat_id}`)
  },
  created() {
    this.getClient()
    window.addEventListener("resize", this.pageResize);
    this.loadMessages()
  },
  mounted() {
    this.pageResize()
    this.echoCreateConnect()
  },
  watch: {
    message() {
      let rows = (this.message.match(/\n/g) || []).length
      this.send_message_rows = rows ? rows+1 : 1
    }
  },
  methods: {
    echoCreateConnect() {
      window.Echo.private(`chat.${this.chat_id}`)
          .listen('ChatMessage', (data) => {
            if (data.message) {
              this.messages.unshift(data.message)
              this.newMessages++

              var audio = new Audio(require('../../assets/chat/sound.mp3'));
              audio.play()
            }
            // this.receiveMessageData = data
            // this.addMessage()
            // this.receiveMessageData = []
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

    },
    addImages() {

    },
    addOrder() {

    },
    typing(){
      window.Echo.join('chat_typing.'+this.chat_id)
          .whisper('typing', {
            id: this.auth.id
          });
    },
    chooseMessageType()
    {
      switch (true) {
        case this.replymessage:
          //this.sendRepliedMessage();
          break;
        case !!this.images.length:
          //this.sendImageMessage();
          break;
        case !!this.files.length:
          //this.sendFileMessage();
          break;
        // case !!this.audios.blobUrl:
        //   this.sendAudioMessage();
        //   break;
        default:
          var data = new FormData();
          data.append("type", 'TEXT')
          data.append("text", this.message)
          this.sendMessage(data)
          break;
      }
    },
    sendMessage (data) {
      send_message(this.chat_id, data)
          .then(() => {
            //this.messages.unshift(response.data)
            this.message = ''
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
    }
  }
}
</script>

<style scoped>

</style>
