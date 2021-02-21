<template>
  <base-popup
      :caption="$t('app.components.admin.organizations.create')"
      :success_error="success_error"
      @closePopup="closePopup"
  >
    <template v-slot:body>
      <form
          @submit.prevent="submit"
          class="row"
      >
        <div class="col-lg-6">
          <form-group
              type="text"
              :label="$t('app.components.admin.organizations.fields.org_name')"
              v-model="organization.org_name"
              required
              name="name"
              :errors="errors"
          />
        </div>
        <div class="col-lg-6">
          <form-group
              type="text"
              :label="$t('app.components.admin.organizations.fields.user_name')"
              v-model="organization.user_name"
              required
              name="name"
              :errors="errors"
          />
        </div>
        <div class="col-lg-6">
          <form-group
              type="email"
              :label="$t('app.components.admin.organizations.fields.user_email')"
              v-model="organization.user_email"
              required
              name="user_email"
              :errors="errors"
          />
        </div>
        <div class="col-lg-6">
          <form-group
              type="text"
              :label="$t('app.components.admin.organizations.fields.user_phone')"
              v-model="organization.user_phone"
              required
              name="user_phone"
              :errors="errors"
          />
        </div>
        <div class="col-lg-6">
          <form-group
              type="select_find"
              :items="time_zones"
              :label="$t('app.components.admin.organizations.fields.org_timezone')"
              v-model="organization.org_timezone"
              required
              name="org_timezone"
              :errors="errors"
          />
        </div>
        <div class="col-lg-6">
          <form-group
              type="select"
              :items="['ru', 'en']"
              :label="$t('app.components.admin.organizations.fields.org_lang')"
              v-model="organization.org_lang"
              required
              name="org_lang"
              :errors="errors"
          />
        </div>
        <div class="col-lg-12 d-flex mt-2">
          <i>{{$t('app.components.admin.organizations.after_create')}}</i>
        </div>
        <div class="col-lg-12 d-flex mt-2">
          <button type="submit" class="m-auto btn btn-success">
            {{$t('base.create')}}
          </button>
        </div>
      </form>
    </template>
  </base-popup>
</template>

<script>
import BasePopup from "@/components/base/Popup";
import {create_organization} from "@/api";
import FormGroup from "@/components/base/FormGroup";
import m from 'moment-timezone'

export default {
  name: "OrganizationCreatePopup",
  components: {FormGroup, BasePopup},
  data() {
    return {
      organization: {
        org_name: '',
        org_lang: '',
        org_timezone: '',
        user_name: '',
        user_email: '',
        user_phone: '',
      },
      success_error: {
        success: false,
        error: false,
        msg: null
      },
      errors: {}
    }
  },
  methods: {
    submit(){
      var data = {
        org_name: this.organization.org_name,
        org_lang: this.organization.org_lang,
        org_timezone: this.organization.org_timezone?.code,
        user_name: this.organization.user_name,
        user_email: this.organization.user_email,
        user_phone: this.organization.user_phone,
      };

      create_organization(data)
          .then(() => {
            this.success_error.success = true
            setTimeout(() => {
              this.closePopup()
            }, 2000);
          })
          .catch((error) => {
            this.success_error.error = true
            if (error.response?.data?.errors) this.errors = error.response?.data?.errors
          })
    },
    closePopup(){
      this.$emit('closePopup');
    }
  },
  computed: {
    time_zones() {
      var timeZones = m.tz.names()
      var offsetTmz=[];

      for(var i in timeZones)
      {
        var z = this.$moment.tz(timeZones[i]).format('Z');
        offsetTmz.push(
            {
              code: this.$moment.tz(timeZones[i]).format('Z').replace(':', ''),
              label: z+" " + timeZones[i]
            }
        );
      }
      return offsetTmz;
    }
  }
}
</script>

<style scoped>

</style>
