<template>
  <b-card :title="$t('app.components.settings.tabs.base')" class="mb-2">
    <div class="row">
      <div class="col-lg-6">
        <form-group
            :label="$t('app.components.settings.name')"
            type="text"
            name="name"
            key="name"
            v-model="settings.name"
            :errors="errors"
        />
      </div>
      <div class="col-lg-6">
        <form-group
            :label="$t('app.components.settings.phone')"
            type="text"
            name="phone"
            required
            key="phone"
            v-model="settings.phone"
            :errors="errors"
        />
      </div>
      <div class="col-lg-6">
        <form-group
            :label="$t('app.components.settings.site')"
            type="text"
            name="site"
            key="site"
            required
            v-model="settings.site"
            :errors="errors"
        />
      </div>
      <div class="col-lg-6">
        <form-group
            :label="$t('app.components.settings.email')"
            type="email"
            name="email"
            key="email"
            required
            v-model="settings.email"
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
  name: "SettingsBase",
  components: {FormGroup},
  props: {
    errors: {},
    settings: {}
  },
  data() {
    return {
      new_image: null,
      success_error: {
        success: false,
        error: false
      },
      langs: [
        { iso: "ru", lang: "ru" },
        { iso: "us", lang: "en" },
      ],
      tab_select: 'base'
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
