<template>
  <div
      class="page"
  >
    <div class="container vh-100">
      <div class="row vh-100">
        <div class="col-lg-8 text-center">
          <img class=" my-5 logo" src='~@/assets/grooming_box.svg' />
          <div class="d-none d-lg-block">
            <div class="text-white">{{ $t('app.components.login.head_title') }}</div>
            <div >
              <img class="mw-100" src="~@/assets/auth/mobiles.png"/>
            </div>
          </div>
        </div>

        <div class="col-lg-4 d-flex align-items-center justify-content-center">
          <div class="card shadow p-1 p-md-3 w-100">
            <div class="card-body">
              <h5 class="card-title">{{ $t('app.components.login.reset_password_form') }}</h5>
              <div class="card-text">
                <form
                    @submit.prevent="submit"
                >
                  <form-group
                      type="text"
                      name="email"
                      :label="$t('app.components.login.email')"
                      v-model="email"
                      :errors="errors"
                      required
                  />

                  <form-group
                      type="password"
                      name="password"
                      :label="$t('app.components.login.password')"
                      v-model="password"
                      :errors="errors"
                      required
                  />

                  <form-group
                      type="password"
                      name="password_confirmation"
                      :label="$t('app.components.login.password_confirmation')"
                      v-model="password_confirmation"
                      :errors="errors"
                      required
                  />

                  <div class="mb-3">
                    <button type="submit" class="btn btn-purpure btn-block">{{ $t('app.components.login.reset') }}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-12 mb-2 alert position-fixed fixed-bottom">
        <message-success-error
            :show="success_error"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import FormGroup from "@/components/base/FormGroup";
import MessageSuccessError from "@/components/base/SuccessError";
import {set_password} from "@/api";

export default {
  name: "SetPassword",
  components: {MessageSuccessError, FormGroup},
  data(){
    return {
      email: '',
      password: '',
      password_confirmation: '',
      errors: {},
      type: "auth",
      success_error: {
        success: false,
        error: false,
        msg: []
      },
    }
  },
  computed: {
    ...mapGetters([
      'auth'
    ])
  },
  created() {
    if (!this.$route.query.token){
      this.success_error.error = true
      this.success_error.msg = [this.$t('app.components.login.url_invalid')]
      setTimeout(() => {
        this.$router.push({ name: 'login' });
      }, 4000);
    }
  },
  watch: {
    'auth': function (){
      if (this.auth.id){
        this.$router.push({ name: 'home.dashboard' });
      }
    },
    'success_error.success': function (){
      if (this.success_error.success) {
        setTimeout(() => {
          this.success_error.success = false;
        }, 4000);
      }
    },
    'success_error.error': function (){
      if (this.success_error.error) {
        setTimeout(() => {
          this.success_error.error = false;
        }, 4000);
      }
    }
  },
  methods: {
    submit(){
      var data = {
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
        token: this.$route.query.token
      }

      set_password(data)
          .then((response) => {
            if (response.data.msg) this.success_error.msg = [response.data.msg]
            this.success_error.success = true
            setTimeout(() => {
              this.$router.push({ name: 'login' });
            }, 2000);
          })
          .catch((e) => {
            if (e.response.status == 403){
              this.success_error.error = true
              this.success_error.msg = [e.response.data.message]
            }else {
              this.errors = e.response.data.errors;
            }
          })
    },
  }
}
</script>

<style>
.logo{
  max-width: 300px;
}
.page {
  min-width: 100vw;
  min-height: 100vh;
  background: linear-gradient(to bottom, #6200E8 50%, #fff 50%);
}
</style>
