<template>
  <div>
    <form
        @submit.prevent="submit"
    >
      <div class="col-lg-12 mb-2 alert position-fixed fixed-bottom">
        <message-success-error
            :show="success_error"
        />
      </div>

      <b-card :title="$t('app.components.settings.tabs.base')"  class="mb-2">
        <div class="row">
          <div class="col-lg-6">
            <form-group
                :label="$t('app.components.settings.name')"
                type="text"
                name="name"
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
                v-model="settings.phone"
                :errors="errors"
            />
          </div>
          <div class="col-lg-6">
            <form-group
                :label="$t('app.components.settings.site')"
                type="text"
                name="site"
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
                required
                v-model="settings.email"
                :errors="errors"
            />
          </div>
          <div class="col-lg-6">
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
          </div>
          <div class="col-lg-6">
            <form-group
                :label="$t('app.components.settings.timezone')"
                type="text"
                name="timezone"
                disabled
                v-model="settings.timezone"
                :errors="errors"
            />
          </div>
          <div class="col-lg-6">
<!--            <form-group-->
<!--                :label="$t('app.components.settings.lang')"-->
<!--                type="text"-->
<!--                name="lang"-->
<!--                v-model="settings.lang"-->
<!--                :errors="errors"-->
<!--            />-->
            <b-list-group horizontal class="mb-4">
              <b-list-group-item
                  v-for="(lang,k) in langs"
                  :key="k"
                  :class="settings.lang == lang.lang ? 'active' : ''"
                  @click="settings.lang = lang.lang">
                <flag :iso="lang.iso" />
              </b-list-group-item>
            </b-list-group>
          </div>
          <div class="col-lg-12">
            <button type="submit" class="btn btn-success">{{ $t('base.save') }}</button>
          </div>
        </div>
      </b-card>

      <b-card :title="$t('app.components.settings.tabs.push_app')" class="mb-2">
        <div class="row">
          <div class="col-lg-6">
            <form-group
                :label="$t('app.components.settings.notif_before')"
                type="select"
                :items="[30, 60, 90]"
                v-model="settings.notif_before"
                :errors="errors"
            />

            <form-group
                :label="$t('app.components.settings.notif_after')"
                type="select"
                :items="[30, 45, 60]"
                v-model="settings.notif_after"
                :errors="errors"
            />

            <form-group
                :label="$t('app.components.settings.text')"
                type="text"
                v-model="settings.text"
                :errors="errors"
                name="text"
                required
            />

            <form-group
                :group="true"
                :label="$t('app.components.settings.tg_link')"
                name="tg_link"
                prepend_name="show_tg_link"
                v-model="settings.tg_link"
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
            <form-group
                :group="true"
                :label="$t('app.components.settings.wa_link')"
                name="wa_link"
                prepend_name="show_wa_link"
                v-model="settings.wa_link"
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
                v-model="new_image"
            />
            <b-img
                v-if="!new_image && settings.image"
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

      <b-card :title="$t('app.components.settings.tabs.schedule')" class="mb-2">
        <div v-for="(day,k) in settings.schedule" :key="k">
          <div class="d-flex align-items-center">
            <div class="form-group">
              <b-form-checkbox v-model="day.active" name="check-button" switch size="sm">
                {{ day.name }}:
              </b-form-checkbox>
            </div>

            <form-group
                class="ml-4"
                type="select"
                :disabled="!settings.schedule[k].active"
                :items="times"
                v-model="settings.schedule[k].start"
                :errors="errors"
            />

            <div class="form-group ml-4">
              <b>-</b>
            </div>

            <form-group
                class="ml-4"
                type="select"
                :disabled="!settings.schedule[k].active"
                :items="times"
                v-model="settings.schedule[k].end"
                :errors="errors"
            />
          </div>
        </div>
        <div>
          <button type="submit" class="btn btn-success">{{ $t('base.save') }}</button>
        </div>
      </b-card>
    </form>


  </div>
</template>

<script>

import FormGroup from "@/components/base/FormGroup";
import deepClone from 'clonedeep';
import {mapGetters} from "vuex";
import {save_settings} from "@/api";
import MessageSuccessError from "@/components/base/SuccessError";

export default {
  name: "Index",
  components: {
    MessageSuccessError,
    FormGroup
  },
  data() {
    return {
      settings: {},
      new_image: null,
      errors: {},
      times: [
        "01:00", "02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00", "24:00"
      ],
      success_error: {
        success: false,
        error: false
      },
      langs: [
        { iso: "ru", lang: "ru" },
        { iso: "us", lang: "en" },
      ]
    }
  },
  computed: {
    ...mapGetters([
      'auth'
    ]),
  },
  created() {
    this.settings = deepClone(this.auth.organization)
  },
  watch: {
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
      var data = new FormData();
      data.append('name', this.settings.name)
      data.append('phone', this.settings.phone)
      data.append('site', this.settings.site)
      data.append('email', this.settings.email)
      data.append('schedule_step', this.settings.schedule_step)
      data.append('lang', this.settings.lang)
      data.append('notif_after', this.settings.notif_after)
      data.append('notif_before', this.settings.notif_before)
      data.append('notif_before', this.settings.notif_before)
      data.append('tg_link', this.settings.tg_link)
      data.append('wa_link', this.settings.wa_link)
      data.append('show_tg_link', this.settings.show_tg_link ? 1 : 0)
      data.append('show_wa_link', this.settings.show_wa_link ? 1 : 0)
      data.append('show_email', this.settings.show_email ? 1 : 0)


      data.append('text', this.settings.text)


      if (this.new_image) {
        data.append('image', this.new_image)
      }

      for (var day in this.settings.schedule){
        data.append('schedule['+day+'][active]', this.settings.schedule[day].active ? 1 : 0)
        data.append('schedule['+day+'][start]', this.settings.schedule[day].start)
        data.append('schedule['+day+'][end]', this.settings.schedule[day].end)
      }

      save_settings(data)
        .then(() => {
          this.success_error.success = true
          this.errors = {}
        })
        .catch((error) => {
          if (error.response?.data?.errors) this.errors = error.response?.data?.errors
          this.success_error.error = true
        })
    }
  }
}
</script>

