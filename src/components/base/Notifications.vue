<template>
  <div style="position: fixed; z-index: 99999">
<!--    <button @click="test">13</button>-->
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Notifications",
  computed: {
    ...mapGetters([
      'auth',
    ]),
  },
  created() {
    window.Echo.private(`App.User.${this.auth.id}`)
        .listen('UserNotification', ({ data }) => {
          // console.log(data)
          if (data.model) {
            let model = data.model.replaceAll('\\', '_')
            this.showNotificationToast(model, data)
            this.$store.state.notifications[model] = data
          }
        });
  },
  methods: {
    test() {
      this.$bvToast.toast('123', {
        title: `New message`,
        to: {name: 'home.messages.instagram.conversation', params: {conversation_id: 4}},
        toaster: 'b-toaster-bottom-right',
        appendToast: true
      })
    },
    showNotificationToast(model, notification) {
      switch (model) {
        case 'App_Models_FacebookInstagramMessage':
          if (this.checkToast('App_Models_FacebookInstagramMessage'))
            return;
          this.$bvToast.toast(notification.data.text, {
            title: `New message`,
            toaster: 'b-toaster-bottom-right',
            to: {name: 'home.messages.instagram.conversation', params: {conversation_id: notification.data.fic_id}},
            appendToast: true
          })
          break;
        case 'App_Models_TelegramChatMessage':
          if (this.checkToast('App_Models_TelegramChatMessage'))
            return;

          this.$bvToast.toast(notification.data.text, {
            title: `New message`,
            toaster: 'b-toaster-bottom-right',
            to: {name: 'home.messages.instagram.chat', params: {chat_id: notification.data.telegram_chat_id}},
            appendToast: true
          })

          break;
        default:
          console.log(model, notification)
          break;
      }
    },
    //проверка того, надо ли показывать сообщение. В route meta надо пометить notification_model со значением модели чтобы toast не показывался
    checkToast(model) {
      return this.$route.meta && this.$route.meta.notification_model && this.$route.meta.notification_model === model
    }
  }
}
</script>

<style scoped>

</style>
