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
        <div class="col-lg-6">
          <form-group
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
        </div>
        <div class="col-lg-6">
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
      }
    },
  },
  data() {
    return {
      errors:{},
      new_image: null,
      new_image_crop: null,
      success_error: {
        success: false,
        error: false
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
      var data = new FormData()
      data.append('name', this.service.name)
      data.append('description', this.service.description)
      data.append('price', this.service.price)
      data.append('type', this.service.type)
      data.append('duration', this.service.duration)

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
