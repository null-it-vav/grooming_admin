<template>
  <div class="container pt-4">
    <b-card class="mb-4">
      <a class="btn btn-success mb-2" @click="getAuthUrl">get auth</a>
      <form-group
        v-model="url"
        type="text"
      />
      <a :href="url" target="_blank">open google</a>
    </b-card>
    <b-card>
      <a class="btn btn-success" @click="checkGoogle">reload auth</a>
    </b-card>
  </div>
</template>

<script>
import {google_oauth2callback, google_oauth} from "@/api";
import FormGroup from "@/components/base/FormGroup";

export default {
  name: "GoogleOauth2callback",
  components: {FormGroup},
  data() {
    return {
      url: ''
    }
  },
  created() {
    //this.checkGoogle()
  },
  methods: {
    getAuthUrl() {
      google_oauth()
          .then(response => {
            this.url = response.data
          })
    },
    checkGoogle(){
      if (this.$route.query.code){
        google_oauth2callback(this.$route.query).then(response => {
          console.log(response.data)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
