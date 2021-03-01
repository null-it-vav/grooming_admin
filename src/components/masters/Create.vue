<template>
  <base-popup
      :caption="$t('app.components.masters.create')"
      @closePopup="closePopup"
      :success_error="success_error"
      dialogSize="modal-lg"
  >
    <template v-slot:body>
      <form
          @submit.prevent="submit"
          class="row"
      >
        <div class="col-lg-6">
          <form-group
              :label="$t('app.components.masters.fields.name')"
              type="text"
              name="name"
              required
              v-model="master.name"
              :errors="errors"
          />
        </div>
        <div class="col-lg-6">
          <form-group
              :label="$t('app.components.masters.fields.email')"
              type="email"
              name="email"
              required
              v-model="master.email"
              :errors="errors"
          />
        </div>
        <div class="col-lg-6">
          <form-group
              :label="$t('app.components.masters.fields.password')"
              type="password"
              name="password"
              required
              v-model="master.password"
              :errors="errors"
          />
        </div>

        <div class="col-lg-6">
          <form-group
              :label="$t('app.components.masters.fields.position')"
              type="text"
              name="position"
              required
              v-model="master.position"
              :errors="errors"
          />
        </div>


        <div class="col-lg-6">
          <form-group
              :label="$t('app.components.masters.fields.description')"
              type="textarea"
              name="description"
              v-model="master.description"
              :errors="errors"
          />
        </div>
        <div class="col-lg-6">
          <form-group
              :label="$t('app.components.masters.fields.profit')"
              type="number"
              name="profit"
              v-model="master.profit"
              :errors="errors"
          />
        </div>

        <div class="col-lg-6">
          <label>{{$t('app.components.masters.fields.schedule')}}</label>
          <div v-for="(day, k) in master.schedule" :key="k" class="mb-2">
            <div class="d-flex align-items-center">
              <div class="form-group">
                <b-form-checkbox v-model="master.schedule[k].active" name="check-button" switch size="sm">
                  {{$t('base.days.'+k)}}
                </b-form-checkbox>
              </div>

              <form-group
                  class="ml-4"
                  type="select"
                  :disabled="!master.schedule[k].active"
                  :items="times"
                  v-model="master.schedule[k].start"
                  :errors="errors"
              />

              <form-group
                  class="ml-4"
                  type="select"
                  :disabled="!master.schedule[k].active"
                  :items="times"
                  v-model="master.schedule[k].end"
                  :errors="errors"
              />
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <form-group
              :label="$t('app.components.masters.fields.photo')"
              type="photo"
              :errors="errors"
              name="photo"
              :square="true"
              v-model="master.photo"
              @set_crop_image="set_crop_image"
          />
        </div>

        <div class="col-lg-12 d-flex">
          <button type="submit" class="m-auto btn btn-success">
            {{ $t('base.create') }}
          </button>
        </div>
      </form>
    </template>
  </base-popup>
</template>

<script>
import BasePopup from "@/components/base/Popup";
import FormGroup from "@/components/base/FormGroup";
import {create_master} from "@/api";
import {mapGetters} from "vuex";

export default {
  name: "Create",
  components: { BasePopup, FormGroup },
  data() {
    return {
      errors: {},
      success_error: {
        success: false,
        error: false
      },
      times: [
        "01:00", "02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00", "24:00"
      ],
      photo_crop: null,
      master: {
        name: '',
        description: '',
        email: '',
        password: '',
        position: '',
        salon_id: '',
        profit: 100,
        photo: null,
        schedule: [
          { active: false, start: "10:00", end: "19:00" },
          { active: false, start: "10:00", end: "19:00" },
          { active: false, start: "10:00", end: "19:00" },
          { active: false, start: "10:00", end: "19:00" },
          { active: false, start: "10:00", end: "19:00" },
          { active: false, start: "10:00", end: "19:00" },
          { active: false, start: "10:00", end: "19:00" },
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'salon_selected'
    ])
  },
  methods: {
    set_crop_image(data){
      this.photo_crop = data;
    },
    closePopup() {
      this.$emit('closePopup');
    },
    submit(){
      this.errors = {};
      var data = new FormData()
      data.append('name', this.master.name)
      data.append('description', this.master.description)
      data.append('email', this.master.email)
      data.append('password', this.master.password)
      data.append('position', this.master.position)
      data.append('salon_id', this.salon_selected.id)
      data.append('profit', this.master.profit)

      if (this.photo_crop)
        data.append('photo', this.photo_crop)
      else
        data.append('photo', this.master.photo)

      for (var day in this.master.schedule){
        data.append('schedule['+day+'][active]', this.master.schedule[day].active ? 1 : 0)
        data.append('schedule['+day+'][start]', this.master.schedule[day].start)
        data.append('schedule['+day+'][end]', this.master.schedule[day].end)
      }




      create_master(data)
          .then(() => {
            this.success_error.success = true
            setTimeout(() => {
              this.closePopup()
            }, 2000);
          })
          .catch((error) => {
            this.success_error.error = true
            if (error.response?.data?.errors) this.errors = error.response?.data?.errors

            if (error.response.status == 413){
              this.errors = {
                photo: [
                  this.$t('base.validation.file_to_large')
                ]
              }

              this.$forceUpdate();
            }

          })
    }
  }
}
</script>

<style scoped>

</style>
