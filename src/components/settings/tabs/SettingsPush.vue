<template>
  <b-card :title="$t('app.components.settings.tabs.push')" class="mb-2">
    <div class="row">
      <div class="col-lg-6">
        <div class="form-group">
          <form-group
              type="switch"
              name="notif_before_24h"
              key="notif_before_24h"
              v-model="settings.notif_before_24h"
              :label="$t('app.components.settings.notif_before_24h')"
          />
        </div>
      </div>
      <div class="col-lg-6">
        <form-group
            :label="$t('app.components.settings.notif_before')"
            type="select"
            :items="[30, 60, 90]"
            v-model="settings.notif_before"
            :errors="errors"
        />
      </div>
      <div class="col-lg-6">
        <form-group
            :label="$t('app.components.settings.notif_after')"
            type="select"
            :items="[30, 45, 60]"
            v-model="settings.notif_after"
            :errors="errors"
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
  name: "SettingsPush",
  components: {FormGroup},
  props: {
    errors: {},
    settings: {}
  },
  data() {
    return {
      new_image: null,
    }
  },
  computed: {
    ...mapGetters([
      'auth'
    ]),
  },
}
</script>

<style scoped>

</style>
