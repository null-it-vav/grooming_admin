<template>
  <div>
    <b-card>
      <h5>
        Интеграция с Instagram позволяет получать сообщения из вашего бизнес-аккаунта:
      </h5>
      <a
          @click="login"
          v-if="!auth.organization.facebook.access_token"
      >
        <img width="200px" src="https://i.stack.imgur.com/oL5c2.png"/>
      </a>
      <div v-else>
<!--        <h5>Интеграция подключена</h5>-->
        Подключенные аккаунты Instagram:
        <div
            v-for="facebook_account in facebook_accounts"
            :key="facebook_account.id"
        >
          <a :href="`https://instagram.com/${facebook_account.instagram_business_account_username}`" target="_blank">{{ facebook_account.instagram_business_account_username }}</a>
        </div>
        <br>
        <a @click="logout" class="btn btn-danger">Отключить</a>
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
      show_button: true,
      facebook_accounts: []
    }
  },
  created() {
    this.getLoginStatus()
    this.getFacebookAccounts();
  },
  computed: {
    ...mapGetters([
      'auth'
    ]),
  },
  methods: {
    getFacebookAccounts() {
      this.$axios.get('/api/v1/profile/socials/facebook-accounts')
          .then(response => {
            this.facebook_accounts = response.data.facebook_accounts
          })
    },
    getLoginStatus() {
      window.FB.getLoginStatus(response => {
        this.statusChangeCallback(response);
      });
    },
    statusChangeCallback(response) {
      console.log(response.authResponse)
    },
    logout() {
      save_settings_part({
        action: 'delete-instagram',
      }).then(() => {
        store.dispatch('getAuth')
      })
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
            this.getFacebookAccounts();
          })
    }
  }
}
</script>

<style scoped>

</style>
