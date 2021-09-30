<template>
  <div>
    <b-card>
      <h4>
        Integration with Instagram allows you to receive messages from your business account:
      </h4>
      <a
          @click="login"
          v-if="!auth.organization.facebook.access_token"
      >
        <img width="200px" src="https://i.stack.imgur.com/oL5c2.png"/>
      </a>
      <div v-else>
        <h5>Integration connected!</h5>
        <a @click="logout" class="btn btn-danger">Disconnect</a>
      </div>
    </b-card>
  </div>
</template>

<script>
import {save_settings_part} from "@/api";
import {mapGetters} from "vuex";
import store from "@/store/app";

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
  computed: {
    ...mapGetters([
      'auth'
    ]),
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
    logout() {
      try {
        window.FB.logout(() => {
          save_settings_part({
            action: 'delete-instagram',
          }).then(() => {
            store.dispatch('getAuth')
          })
        })
      } catch (e) {
        save_settings_part({
          action: 'delete-instagram',
        }).then(() => {
          store.dispatch('getAuth')
        })
      }
    },
    async login() {
      // login with facebook then authenticate with the API to get a JWT auth token
      window.FB.login(response => {
        this.apiAuthenticate(response);
      }, {scope: 'pages_show_list,pages_messaging,instagram_basic,instagram_manage_messages,pages_read_engagement,pages_manage_metadata,public_profile'});
    },
    async  apiAuthenticate(accessToken) {
      save_settings_part({
        action: 'set-instagram',
        authResponse: accessToken.authResponse || []
      })
          .then(() => {
            store.dispatch('getAuth')
          })
    }
  }
}
</script>

<style scoped>

</style>
