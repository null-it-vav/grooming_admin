<template>
  <base-popup
    @closePopup="closePopup"
    :success_error="success_error"
  >
    <template v-slot:body>
      <form
          @submit.prevent="submit"
          class="row"
      >
        <div class="col-lg-6 mb-3">
          <b-checkbox
              v-model="auth.receive_email_notif"
              size="sm"
              switch
              class="mb-3"
          >
            {{$t('app.components.user.fields.email_notifications')}}
          </b-checkbox>

          <b-checkbox
              v-model="auth.receive_telegram_notif"
              size="sm"
              switch
          >
            {{$t('app.components.user.fields.telegram_notifications')}}
          </b-checkbox>
        </div>
        <div class="col-lg-6 mb-3" v-if="auth.receive_telegram_notif">
          <form-group
              type="number"
              :label="$t('app.components.user.fields.telegram_id')"
              name="telegram_chat_id"
              v-model="auth.telegram_chat_id"
              :errors="errors"
          />
          <b>{{$t('app.components.user.fields.get_telegram_id')}} <a target="_blank" href="https://t.me/GroomingBoxBot">@GroomingBoxBot</a></b>
        </div>

        <div class="col-lg-12 d-flex mt-2">
          <button type="submit" class="m-auto btn btn-success">
            {{$t('base.save')}}
          </button>
        </div>
      </form>
    </template>
  </base-popup>
</template>

<script>
import BasePopup from "@/components/base/Popup";
import FormGroup from "@/components/base/FormGroup";
import {mapGetters} from "vuex";
import {me_save_settings} from "@/api";

export default {
name: "UserSettingsPopup",
  components: {FormGroup, BasePopup},
  data() {
    return {
      errors: {},
      success_error: {
        success: false,
        error: false
      },
    }
  },
  computed: {
    ...mapGetters([
      'auth'
    ])
  },
  methods: {
    submit(){
      var data = {
        telegram_chat_id: this.auth.telegram_chat_id,
        receive_telegram_notif: this.auth.receive_telegram_notif ? 1 : 0,
        receive_email_notif: this.auth.receive_email_notif ? 1 : 0,
      }
      me_save_settings(data)
          .then(() => {
            this.success_error.success = true
            setTimeout(() => {
              this.closePopup()
            }, 2000);
          })
    },
    closePopup() {
      this.$emit('closePopup');
    },
  }
}
</script>

<style scoped>

</style>
