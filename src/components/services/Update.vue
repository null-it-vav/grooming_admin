<template>
  <base-popup
      :caption="$t('app.components.services.update')"
      @closePopup="closePopup"
      :success_error="success_error"
  >
    <template v-slot:body>
      <form
          @submit.prevent="submit"
          class="row"
      >
        <div class="col-lg-4">
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
              type="text"
              :label="$t('app.components.services.field.name')"
              :errors="errors"
              name="name"
              required
              v-model="service.name"
          />
          <form-group
              type="textarea"
              :label="$t('app.components.services.field.description')"
              :errors="errors"
              name="description"
              required
              v-model="service.description"
          />
          <div class="form-group">
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
        </div>
        <div class="col-lg-4">
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
          <div v-if="service.type == 'cat' || service.type == 'dog'">
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

        </div>
        <div class="col-lg-4">
          <form-group
              :label="$t('app.components.services.field.image')"
              type="photo"
              :errors="errors"
              name="image"
              v-model="new_image"
              :cropped="4/3"
              @set_crop_image="set_crop_image"
          />

          <b-img
              v-if="!new_image && service.image"
              :src="service.image"
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
import {update_service} from "@/api";

export default {
  name: "Update",
  props: {
    service: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {
        name: "",
        description: "",
        price: "",
        type: "",
        duration: "",
        image: null,
        baby: false,
      }
    },
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
  data() {
    return {
      errors:{},
      new_image: null,
      new_image_crop: null,
      success_error: {
        success: false,
        error: false
      },
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
      var data = new FormData()
      data.append('name', this.service.name)
      data.append('description', this.service.description)
      data.append('price', this.service.price)
      data.append('type', this.service.type)
      data.append('duration', this.service.duration)
      data.append('color_mark', this.service.color_mark)
      data.append('aggressive', this.service.aggressive ? 1 : 0)
      data.append('koltun', this.service.koltun ? 1 : 0)
      data.append('baby', this.service.baby ? 1 : 0)
      data.append('baby_duration', this.service.baby_duration)
      data.append('baby_price', this.service.baby_price)

      if (this.service.aggressive) {
        data.append('aggressive_duration', this.service.aggressive_duration)
        data.append('aggressive_price', this.service.aggressive_price)
      }
      if (this.service.koltun) {
        data.append('koltun_duration', this.service.koltun_duration)
        data.append('koltun_price', this.service.koltun_price)
      }



      if (this.new_image_crop)
        data.append('image', this.new_image_crop)

      update_service(this.service.id, data)
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
