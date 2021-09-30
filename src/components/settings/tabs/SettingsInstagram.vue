<template>
  <div>
    <b-card>
      <h4>
        Integration with Instagram allows you to receive messages from your business account
      </h4>
      <a @click="login" v-if="show_button"><img width="200px" src="https://i.stack.imgur.com/oL5c2.png"/> </a>
      <a v-else>Connected</a>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "SettingsInstagram",
  data() {
    return {
      show_button: true
    }
  },
  created() {
    this.getLoginStatus()
  },
  methods: {
    getLoginStatus() {
      window.FB.getLoginStatus(response => {
        this.statusChangeCallback(response);
      });
    },
    statusChangeCallback(response) {
      console.log(response.authResponse)
    },
    async login() {
      // login with facebook then authenticate with the API to get a JWT auth token
      window.FB.login(response => {
        this.apiAuthenticate(response);
      }, {scope: 'pages_show_list,pages_manage_metadata,instagram_basic,instagram_manage_messages'});
    },
    async  apiAuthenticate(accessToken) {
      this.show_button = false
      console.log(accessToken.authResponse)
    }
  }
}
</script>

<style scoped>

</style>
