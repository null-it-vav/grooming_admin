<template>
  <form
      @submit.prevent="submit"
  >
    <b-card>
      <div class="row">
        <div class="col-lg-12 mb-2 alert position-fixed fixed-bottom">
          <message-success-error
              :show="success_error"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6">
          <form-group
              group
              type="text"
              label="Баланс СМС"
              disabled
              v-model="settings.sms_balance"
          >
            <template v-slot:append>
              <div class="input-group-append">
                <span class="input-group-text">
                  {{ auth.organization.currency.symbol || '' }}
                </span>
              </div>
            </template>
          </form-group>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6">
          <form-group
            type="text"
            label="Подпись СМС"
            v-model="settings.sms_sign"
            disabled
          />
        </div>
      </div>
<!--      <div class="row">-->
<!--        <div class="col-lg-12">-->
<!--          <button type="submit" class="btn btn-success">{{ $t('base.save') }}</button>-->
<!--        </div>-->
<!--      </div>-->
    </b-card>
  </form>
</template>

<script>
import { save_settings} from "@/api";
import MessageSuccessError from "@/components/base/SuccessError";
import FormGroup from "@/components/base/FormGroup";
import {mapGetters} from "vuex";

export default {
  name: "SettingsSMS",
  components: {FormGroup, MessageSuccessError},
  props: {
    settings: {}
  },
  data() {
    return {
      sms_services: [],
      success_error: {
        success: false,
        error: false
      },
    }
  },
  computed: {
    ...mapGetters([
      'auth'
    ]),
  },
  created() {
  },
  methods: {
    submit() {
      save_settings({
        action: 'sms-service',
        sms_service_settings: this.settings.sms_service_settings
      })
    },
  }
}
</script>
