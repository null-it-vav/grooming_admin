<template>
  <div class="row">
    <div class="col-lg-3">
      <b-card>
        <div
            v-for="message in messages.data"
            :key="message.key"
            class="mb-2 border-bottom pointer"
            @click="loadMessage(message)"
        >
          <div class="d-flex align-items-center">
            <div class="new_mail mr-1" v-if="!message.flags['seen']" />
            <b>{{ message.from[0].personal }}</b>
          </div>
          {{ message.subject }}
        </div>
        <div>
          <b-pagination
              v-if="messages.total > messages.per_page"
              v-model="messages.page"
              :total-rows="messages.total"
              :per-page="messages.per_page"
              aria-controls="my-table"
              class="m-auto"
          />
        </div>
      </b-card>
    </div>
    <div class="col-lg-9">
      <b-card v-show="message" class="h-100">
        <iframe
            id="mailBody"
            class="mail_body_html"
            ref="mailBody"
            scrolling="no"
        />
      </b-card>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "MailIndex",
  data() {
    return {
      messages: {
        per_page: 15,
        page: 1,
        data: [],
        total: 0
      },
      message: null
    }
  },
  computed: {
    ...mapGetters([
      'auth',
    ]),
  },
  created() {
    this.loadMessages()
  },
  watch: {
    'messages.page': function () {
      this.loadMessages()
    }
  },
  methods: {
    loadMessages(){
      this.$axios.get(`/api/v1/profile/mails`, {
        params: {
          page: this.messages.page,
          qty: this.messages.per_page
        }
      })
      .then(response => {
        this.messages.data = response.data.data
        this.messages.total = response.data.total
      })
    },
    loadMessage(message){
      this.$axios.get(`/api/v1/profile/mails/${message.uid}`)
          .then(response => {
            this.message = response.data
            this.$refs.mailBody.srcdoc = response.data
            message.flags["seen"] = "Seen"
          })
    }
  }
}
</script>
<style scoped>
  .new_mail {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #1E88E5;
  }
  .mail_body_html {
    display: block;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    overflow-x: hidden;
    border: 0px;
  }
</style>
