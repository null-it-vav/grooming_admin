<template>
  <div
      class="page"
  >
    <div class="container vh-100">
      <div class="row vh-100">
        <div class="col-lg-8 text-center">
          <img class=" my-5 logo" src='~@/assets/logo.png' />
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
                    <input autocomplete="username" required type="email" class="form-control" id="login">
                  </div>
                  <div class="mb-3">
                    <label for="password" class="form-label">{{ $t('app.components.login.password') }} </label>
                    <input autocomplete="current-password" required class="form-control" id="password" type="password" />
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

export default {
  name: "Login",
  data(){
    return {
      login: '',
      password: '',
      errors: {}
    }
  },
  computed: {
    ...mapGetters([
        'auth'
    ])
  },
  methods: {
    submit(){
      const data = {
        login: this.login,
        password: this.password,
      };

      this.$router.push({ name: 'home.dashboard' });


      this.$axios.post('/login', data)
          .then(() => {

            this.$router.push({ name: 'me.profile' });
          })
          .catch((e) => {

            this.errors = e.response.data.errors;
          })
          .finally(() => {
          });
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
