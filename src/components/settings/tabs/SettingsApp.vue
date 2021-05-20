<template>
  <b-card :title="$t('app.components.settings.tabs.app')" class="mb-2">
    <div class="row">
      <div class="col-lg-6">
        <form-group
            :label="$t('app.components.settings.text')"
            type="text"
            v-model="settings.text"
            :errors="errors"
            name="text"
            required
        />
      </div>
      <div class="col-lg-6">
        <form-group
            :group="true"
            :label="$t('app.components.settings.tg_link')"
            name="tg_link"
            prepend_name="show_tg_link"
            v-model="settings.tg_link"
            placeholder="https://t.me/..."
            type="text"
            :errors="errors"
        >
          <template v-slot:prepend>
            <div class="input-group-prepend">
              <div class="input-group-text">
                <input type="checkbox" v-model="settings.show_tg_link"
                       :disabled="settings.show_wa_link && settings.show_email"
                >
              </div>
            </div>
          </template>
        </form-group>
      </div>
      <div class="col-lg-6">
        <form-group
            :group="true"
            :label="$t('app.components.settings.wa_link')"
            name="wa_link"
            prepend_name="show_wa_link"
            v-model="settings.wa_link"
            placeholder="https://api.whatsapp.com/send?phone="
            type="text"
            :errors="errors"
        >
          <template v-slot:prepend>
            <div class="input-group-prepend">
              <div class="input-group-text">
                <input type="checkbox" v-model="settings.show_wa_link"
                       :disabled="settings.show_tg_link && settings.show_email"
                >
              </div>
            </div>
          </template>
        </form-group>
      </div>
      <div class="col-lg-6">
        <form-group
            :group="true"
            :label="$t('app.components.settings.email')"
            type="email"
            name="email"
            prepend_name="show_email"
            v-model="settings.email"
            :errors="errors"
        >
          <template v-slot:prepend>
            <div class="input-group-prepend">
              <div class="input-group-text">
                <input type="checkbox"  v-model="settings.show_email"
                       :disabled="settings.show_wa_link && settings.show_tg_link"
                >
              </div>
            </div>
          </template>
        </form-group>
      </div>
      <div class="col-lg-6">
        <form-group
            :label="$t('app.components.settings.image')"
            type="photo"
            :errors="errors"
            name="image"
            v-model="settings.new_image"
        />
        <b-img
            v-if="!settings.new_image && settings.image"
            :src="settings.image"
            fluid
            class="my-3 mx-auto"
        />
      </div>
      <div class="col-lg-12">
        <button type="submit" class="btn btn-success">{{ $t('base.save') }}</button>
      </div>
    </div>
  </b-card>
</template>

<script>
import FormGroup from "@/components/base/FormGroup";
import {mapGetters} from "vuex";
export default {
name: "SettingsApp",
  components: {FormGroup},
  props: {
    errors: {},
    settings: {}
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'auth'
    ]),
  },
  created() {
    // this.settings = deepClone(this.auth.organization)
  },
}
</script>

<style scoped>

</style>
