<template>
  <div class="row">
<!--    <div class="col-lg-12">-->
<!--      <a class="fa fa-refresh" @click="getConversations"/>-->
<!--    </div>-->
    <div class="col-lg-2">
      <b-card>
        <div
            v-for="conversation in conversations.data"
            :key="conversation.id"
            class="mb-2"
        >
          <router-link
              :to="{name: 'home.messages.instagram.conversation', params: {conversation_id: conversation.id}}"
          >
            <b-avatar
                :src="conversation.sender_profile_pic"
            />
            {{ conversation.sender_username }}
          </router-link>
        </div>
      </b-card>
    </div>
    <div class="col-lg-6">
      <router-view
        :conversation="conversation"
        :needReload="needReload"
      />
    </div>
    <div class="col-lg-4">
      <messages-user-info
        :user_id="conversation.user_id"
        conversation_type="instagram"
        :conversation_id="conversation.id"
        @reload="reload"
      />
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import MessagesUserInfo from "@/components/messages/MessagesUserInfo";

export default {
  name: "InstagramIndex",
  components: {MessagesUserInfo},
  created() {
    this.getConversations()
  },
  data() {
    return {
      conversations: {
        page: 1,
        data: []
      },
      conversation: {
        id: null,
        user_id: null
      },
      needReload: false
    }
  },
  computed: {
    ...mapGetters([
      'notifications',
    ]),
  },
  watch: {
    // 'notifications.App_Models_FacebookInstagramMessage': function (value) {
    //   console.log(value)
    // }
  },
  destroyed() {
    // window.Echo.leave(`messages.facebook`)
  },
  methods: {
    // createEcho(){
    //
    //   window.Echo.private(`messages.facebook`)
    //       .listen('InstagramMessageEvent', (data) => {
    //         console.log(data)
    //       })
    // },
    getConversations() {
      this.$axios.get('/api/v1/profile/socials/instagram')
          .then(response => {
            this.conversations.data = response.data.conversations.data
          })
    },
    reload()
    {
      this.needReload = !this.needReload
    }
  }
}
</script>

<style scoped>

</style>
