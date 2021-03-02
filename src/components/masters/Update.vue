<template>
  <base-popup
      :caption="$t('app.components.masters.update')"
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
              v-model="master.password"
              :errors="errors"
          />
        </div>
        <div class="col-lg-6">
          <form-group
              :label="$t('app.components.masters.fields.password_confirmation')"
              type="password"
              name="password_confirmation"
              v-model="master.password_confirmation"
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
          <form-group
              :label="$t('app.components.masters.fields.salon')"
              type="select"
              :items="salons.map(salon => { return {value: salon.id, text: salon.address} })"
              name="salon"
              v-model="master.salon_id"
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
              v-model="new_photo"
              accept="image/png"
              @set_crop_image="set_crop_image"
              :cropped="12/12"
          />
          <b-img
              v-if="!new_photo && master.photo"
              :src="master.photo"
              fluid
              class="my-3 mx-auto"
          />
        </div>

        <div class="col-lg-12 d-flex">
          <button type="submit" class="m-auto btn btn-success">
            {{ $t('base.update') }}
          </button>
        </div>
      </form>
    </template>
  </base-popup>
</template>

<script>
import BasePopup from "@/components/base/Popup";
import FormGroup from "@/components/base/FormGroup";
import {update_masters} from "@/api";
import {mapGetters} from "vuex";

export default {
  name: "Update",
  components: { BasePopup, FormGroup },
  props: {
    master: {
      type: Object,
    }
  },
  data() {
    return {
      new_photo: null,
      new_photo_crop: null,
      errors: {},
      success_error: {
        success: false,
        error: false
      },
      times: [
        "00:00" , "01:00", "02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"
      ],
    }
  },
  computed: {
    ...mapGetters([
      'salon_selected',
      'salons'
    ])
  },

  methods: {
    closePopup() {
      this.$emit('closePopup');
    },
    set_crop_image(data){
      this.new_photo_crop = data;
    },
    submit(){
      this.errors = {};
      var data = new FormData()
      data.append('name', this.master.name)
      data.append('description', this.master.description)
      data.append('email', this.master.email)

      if (this.master.password) {
        data.append('password', this.master.password)
        data.append('password_confirmation', this.master.password_confirmation)
      }


      data.append('position', this.master.position)
      data.append('salon_id', this.master.salon_id)
      data.append('profit', this.master.profit)

      if (this.new_photo_crop)
        data.append('photo', this.new_photo_crop)


      for (var day in this.master.schedule){
        data.append('schedule['+day+'][active]', this.master.schedule[day].active ? 1 : 0)
        data.append('schedule['+day+'][start]', this.master.schedule[day].start)
        data.append('schedule['+day+'][end]', this.master.schedule[day].end)
      }




      update_masters(this.master.id, data)
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
