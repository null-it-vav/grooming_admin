<template>
  <div
      class="page"
  >
    <div class="container vh-100">
      <div class="row">
        <div class="col-lg-8 text-center">
          <img class=" my-5 logo" src='~@/assets/grooming_box.svg' />
          <div class="d-none d-md-block">
            <div class="text-white">{{ $t('app.components.login.head_title') }}</div>
            <div>
              <img src="~@/assets/auth/mobiles.png"/>
            </div>
          </div>
        </div>

        <div class="col-lg-4 d-flex align-items-center justify-content-center">
          <div class="card shadow p-5 w-100">
            <div class="card-body">
              <h5 class="card-title">{{ $t('app.components.login.title') }}</h5>
              <div class="card-text">
                <form
                    @submit.prevent="submit"
                >
                  <div class="mb-3">
                    <label for="login" class="form-label">{{ $t('app.components.login.username') }}</label>
                    <input autocomplete="username" required type="email" class="form-control" id="login" v-model="email">
                  </div>
                  <div class="mb-3">
                    <label for="password" class="form-label">{{ $t('app.components.login.password') }} </label>
                    <input autocomplete="current-password" required class="form-control" id="password" type="password" v-model="password" />
                  </div>
                  <div class="mb-3">
                    <button type="submit" class="btn btn-purpure btn-block">{{ $t('app.components.login.login') }}</button>
                  </div>
                  <div class="text-center">
                    <a>{{ $t('app.components.login.reset_password') }}</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { login } from '@/api'
import store from "@/store/app";

export default {
  name: "Login",
  data(){
    return {
      email: 'email1@mail.ru',
      password: '123456',
      errors: {}
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
    }
  },
  methods: {
    submit(){
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
