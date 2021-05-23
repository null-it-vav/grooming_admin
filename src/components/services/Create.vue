<template>
  <base-popup
      :caption="$t('app.components.services.create')"
      @closePopup="closePopup"
      :success_error="success_error"
  >
    <template v-slot:body>
      <form
          @submit.prevent="submit"
          class="row"
      >
        <div class="col-lg-6 d-flex">
          <div class="form-group mr-auto">
            <label>{{ $t('app.components.services.field.color_mark') }}</label>
            <div>
              <b-dropdown
                  variant="link"
                  toggle-class="text-decoration-none"
                  class="color-mark-picker"
                  dropright
              >
                <template #button-content>
                  <div class="border rounded-circle" :style="`width:30px;height:30px;background-color: #${service.color_mark};`"></div>
                </template>
                <template #default>
                  <sketch-picker v-model="colors" />
                </template>
              </b-dropdown>
            </div>
          </div>
          <form-group
              class="w-75"
            type="text"
            :label="$t('app.components.services.field.name')"
            :errors="errors"
            name="name"
            required
            v-model="service.name"
          />
        </div>
        <div class="col-lg-6">
          <form-group
              type="textarea"
              :label="$t('app.components.services.field.description')"
              :errors="errors"
              name="description"
              required
              v-model="service.description"
          />
        </div>
        <div class="col-lg-6">
          <form-group
              type="number"
              :label="$t('app.components.services.field.price')"
              :errors="errors"
              name="price"
              required
              v-model="service.price"
          />
          <form-group
              type="select"
              :items="[
                  { value: 30, text: $t('app.components.services.durations.30') },
                  { value: 60, text: $t('app.components.services.durations.60') },
                  { value: 90, text: $t('app.components.services.durations.90') },
                  { value: 120, text: $t('app.components.services.durations.120') },
                  { value: 150, text: $t('app.components.services.durations.150') },
                  { value: 180, text: $t('app.components.services.durations.180') },
                  { value: 210, text: $t('app.components.services.durations.210') },
                  { value: 240, text: $t('app.components.services.durations.240') },
              ]"
              :label="$t('app.components.services.field.duration')"
              :errors="errors"
              name="duration"
              required
              v-model="service.duration"
          />
        </div>
        <div class="col-lg-6">
          <form-group
              type="select"
              required
              :items="[
                  { value: null, text: $t('base.service_types.select') },
                  { value: 'cat', text: $t('base.service_types.cat') },
                  { value: 'dog', text: $t('base.service_types.dog') },
                  { value: 'other', text: $t('base.service_types.other') }
              ]"
              :label="$t('app.components.services.field.type')"
              :errors="errors"
              name="type"
              v-model="service.type"
          />
          <form-group
              :label="$t('app.components.services.field.image')"
              type="photo"
              :errors="errors"
              name="image"
              v-model="service.image"
              required
              :cropped="4/3"
              @set_crop_image="set_crop_image"
          />
        </div>
        <div class="col-lg-6" v-if="service.type == 'cat' || service.type == 'dog'">
          <form-group
              :label="$t('app.components.services.field.baby_'+service.type)"
              type="switch"
              name="baby"
              :errors="errors"
              v-model="service.baby"
          />
          <form-group
              v-if="service.baby"
              type="select"
              :items="[
                  { value: 30, text: $t('app.components.services.durations.30') },
                  { value: 60, text: $t('app.components.services.durations.60') },
                  { value: 90, text: $t('app.components.services.durations.90') },
                  { value: 120, text: $t('app.components.services.durations.120') },
                  { value: 150, text: $t('app.components.services.durations.150') },
                  { value: 180, text: $t('app.components.services.durations.180') },
                  { value: 210, text: $t('app.components.services.durations.210') },
                  { value: 240, text: $t('app.components.services.durations.240') },
              ]"
              :label="$t('app.components.services.field.baby_duration')"
              :errors="errors"
              name="duration"
              required
              v-model="service.baby_duration"
          />
          <form-group
              v-if="service.baby"
              :label="$t('app.components.services.field.baby_price')"
              type="number"
              name="baby_price"
              :errors="errors"
              v-model="service.baby_price"
          />
        </div>
        <div class="col-lg-6">
          <form-group
              :label="$t('app.components.services.field.aggressive')"
              type="switch"
              name="aggressive"
              :errors="errors"
              v-model="service.aggressive"
          />
          <form-group
              v-if="service.aggressive"
              :label="$t('app.components.services.field.aggressive_duration')"
              type="number"
              name="aggressive_duration"
              :errors="errors"
              v-model="service.aggressive_duration"
          />
          <form-group
              v-if="service.aggressive"
              :label="$t('app.components.services.field.aggressive_price')"
              type="number"
              name="aggressive_price"
              :errors="errors"
              v-model="service.aggressive_price"
          />
        </div>
        <div class="col-lg-6">
          <form-group
              :label="$t('app.components.services.field.koltun')"
              type="switch"
              name="koltun"
              :errors="errors"
              v-model="service.koltun"
          />
          <form-group
              v-if="service.koltun"
              :label="$t('app.components.services.field.koltun_duration')"
              type="number"
              name="koltun_duration"
              :errors="errors"
              v-model="service.koltun_duration"
          />
          <form-group
              v-if="service.koltun"
              :label="$t('app.components.services.field.koltun_price')"
              type="number"
              name="koltun_price"
              :errors="errors"
              v-model="service.koltun_price"
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
import {create_service} from "@/api";

export default {
  name: "Create",
  data() {
    return {
      errors:{},
      service: {
        name: "",
        description: "",
        price: "",
        type: "",
        duration: "",
        image: null,
        baby: false,
        aggressive: false,
        koltun: false,
      },
      success_error: {
        success: false,
        error: false
      },
      new_image_crop: null,
    }
  },
  computed: {
    colors: {
      get: function () {
        return '#'+this.service.color_mark
      },
      set: function (value) {

        this.service.color_mark = value.hex.replace('#', '')
      }
    }
  },
  components: {FormGroup, BasePopup},
  methods: {
    closePopup(){
      this.$emit('closePopup');
    },
    set_crop_image(data){
      this.new_image_crop = data;
    },
    submit(){
      this.errors = {};
      var data = new FormData()
      data.append('name', this.service.name)
      data.append('description', this.service.description)
      data.append('price', this.service.price)
      data.append('type', this.service.type)
      data.append('duration', this.service.duration)
      data.append('baby', this.service.baby ? 1 : 0)
      data.append('aggressive', this.service.aggressive ? 1 : 0)
      data.append('koltun', this.service.koltun ? 1 : 0)

      if (this.new_image_crop)
        data.append('image', this.new_image_crop)

      if (this.service.aggressive) {
        data.append('aggressive_duration', this.service.aggressive_duration)
        data.append('aggressive_price', this.service.aggressive_price)
      }
      if (this.service.koltun) {
        data.append('koltun_duration', this.service.koltun_duration)
        data.append('koltun_price', this.service.koltun_price)
      }


      create_service(data)
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
                image: [
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
