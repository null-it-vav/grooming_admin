<template>
  <div
      class="page"
  >
    <div class="container vh-100">
      <div class="row">
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
              <h5 class="card-title">{{ $t('app.components.login.title') }}</h5>
              <div class="card-text">
                <form
                    @submit.prevent="submit"
                >
                  <div v-if="type == 'auth'">
                    <form-group
                        type="text"
                        name="email"
                        :label="$t('app.components.login.email')"
                        v-model="email"
                        :errors="errors"
                    />

                    <form-group
                        type="password"
                        name="password"
                        :label="$t('app.components.login.password')"
                        v-model="password"
                        :errors="errors"
                    />

                    <div class="mb-3">
                      <button type="submit" class="btn btn-purpure btn-block">{{ $t('app.components.login.login') }}</button>
                    </div>
                  </div>
                  <div v-if="type == 'reset'">
                    <form-group
                        type="text"
                        name="email"
                        :label="$t('app.components.login.username')"
                        v-model="email"
                        :errors="errors"
                    />
                    <div class="mb-3">
                      <button type="submit" class="btn btn-purpure btn-block">{{ $t('app.components.login.reset') }}</button>
                    </div>
                  </div>

                  <div v-if="type == 'get_demo'">
                    <form-group
                        type="text"
                        name="email"
                        :label="$t('app.components.login.email')"
                        v-model="email"
                        :errors="errors"
                    />
                    <div class="mb-3">
                      <button type="submit" class="btn btn-purpure btn-block">{{ $t('app.components.login.get_demo_button') }}</button>
                    </div>
                  </div>

                  <div class="text-center" v-if="type == 'auth'">
                    <a class="pointer" @click="type = 'reset'">{{ $t('app.components.login.reset_password') }}</a>
                  </div>
                  <div class="text-center" v-if="type == 'reset'">
                    <a class="pointer" @click="type = 'auth'">{{ $t('app.components.login.auth') }}</a>
                  </div>
                </form>
              </div>
            </div>
            <div class="card-footer">
              <div class="text-center" v-if="type != 'get_demo'">
                <a class="pointer text-danger" @click="type = 'get_demo'">{{ $t('app.components.login.get_demo') }}</a>
              </div>

              <div class="text-center" v-if="type == 'get_demo'">
                <a class="pointer text-danger" @click="type = 'auth'">{{ $t('app.components.login.login_exist') }}</a>
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
import { login, create_demo } from '@/api'
import store from "@/store/app";
import FormGroup from "@/components/base/FormGroup";
import MessageSuccessError from "@/components/base/SuccessError";

export default {
  name: "Login",
  components: {MessageSuccessError, FormGroup},
  data(){
    return {
      email: '',
      password: '',
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
      if (this.type == 'auth'){
        this.login();
      }
      if (this.type == 'get_demo'){
        this.createDemo()
      }
    },
    createDemo(){
      create_demo({email: this.email})
          .then((response) => {
            if (response.data.msg) this.success_error.msg = [response.data.msg]
            this.success_error.success = true
            setTimeout(() => {
              this.type = 'auth'
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
    login(){
      const data = {
        email: this.email,
        password: this.password,
      };


      login(data)
          .then((response) => {
            localStorage.setItem('user-token', response.data.data.token)
            this.$axios.defaults.headers.common['Authorization'] = response.data.data.token

            store.dispatch('getAuth').then(() => {
              this.$router.push({ name: 'home.dashboard' });
            });

          })
          .catch((e) => {
            this.errors = e.response.data.errors;
          })
    }
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
