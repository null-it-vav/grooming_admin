<template>
  <div class="card p-3">
    <form
        @submit.prevent="submit"
        class="row"
    >
      <div class="col-lg-6">
        <form-group
            :label="$t('app.components.settings.name')"
            type="text"
            name="name"
            required
            v-model="settings.name"
            :errors="errors"
        />
        <form-group
            :label="$t('app.components.settings.phone')"
            type="text"
            name="phone"
            required
            v-model="settings.phone"
            :errors="errors"
        />
        <form-group
            :label="$t('app.components.settings.site')"
            type="text"
            name="site"
            required
            v-model="settings.site"
            :errors="errors"
        />
        <form-group
            :label="$t('app.components.settings.email')"
            type="email"
            name="email"
            required
            v-model="settings.email"
            :errors="errors"
        />
        <form-group
            :label="$t('app.components.settings.schedule_step')"
            type="select"
            :items="[
                { value: 30, text: 30 },
                { value: 60, text: 60 },
                { value: 90, text: 90 },
                { value: 120, text: 120 },
            ]"
            name="schedule_step"
            required
            v-model="settings.schedule_step"
            :errors="errors"
        />
        <form-group
            :label="$t('app.components.settings.timezone')"
            type="text"
            name="timezone"
            disabled
            v-model="settings.timezone"
            :errors="errors"
        />

        <form-group
            :label="$t('app.components.settings.lang')"
            type="text"
            name="lang"
            v-model="settings.lang"
            :errors="errors"
        />

        <b-list-group horizontal class="mb-4">
          <b-list-group-item><flag iso="ru" /></b-list-group-item>
          <b-list-group-item><flag iso="us" /></b-list-group-item>
        </b-list-group>

      </div>



      <div class="col-lg-12">
        <button type="submit" class="btn btn-success">{{ $t('base.save') }}</button>
      </div>
    </form>
  </div>
</template>

<script>

import FormGroup from "@/components/base/FormGroup";
import deepClone from 'clonedeep';
import {mapGetters} from "vuex";

export default {
  name: "Index",
  components: {
    FormGroup
  },
  data() {
    return {
      settings: {},
      errors: {}
    }
  },
  computed: {
    ...mapGetters([
      'auth'
    ])
  },
  created() {
    this.settings = deepClone(this.auth.organization)
  },
  methods: {
    submit(){

    }
  }
}
</script>

