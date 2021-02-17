<template>
  <base-popup
      :caption="$t('app.components.promotions.update')"
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
              :label="$t('app.components.promotions.fields.name')"
              type="text"
              name="name"
              required
              v-model="promotion.name"
              :errors="errors"
          />
        </div>
        <div class="col-lg-6">
          <form-group
              :label="$t('app.components.promotions.fields.description')"
              type="text"
              name="description"
              required
              v-model="promotion.description"
              :errors="errors"
          />
        </div>

        <div class="col-lg-6">
          <form-group
              :label="$t('app.components.promotions.fields.start')"
              type="date"
              name="start"
              required
              v-model="promotion.start"
              :errors="errors"
          />
        </div>

        <div class="col-lg-6">
          <form-group
              :label="$t('app.components.promotions.fields.finish')"
              type="date"
              name="finish"
              required
              v-model="promotion.finish"
              :errors="errors"
          />
        </div>
        <div class="col-lg-6">


          <form-group
              :label="$t('app.components.services.field.image')"
              type="photo"
              :errors="errors"
              name="image"
              v-model="new_image"
          />

          <b-img
              v-if="!new_image && promotion.image"
              :src="promotion.image"
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
import {update_promotion} from "@/api";

export default {
  name: "Update",
  props: {
    promotion: {
      type: Object
    }
  },
  data() {
    return {
      map: null,
      errors:{},
      success_error: {
        success: false,
        error: false
      },
      new_image: null
    }
  },
  created() {

  },
  components: {FormGroup, BasePopup},
  methods: {
    submit(){
      var data = new FormData()
      data.append('name', this.promotion.name)
      data.append('description', this.promotion.description)
      data.append('start', this.promotion.start)
      data.append('finish', this.promotion.finish)

      if (this.new_image)
        data.append('image', this.new_image)

      update_promotion(this.promotion.id, data)
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
    },
    closePopup() {
      this.$emit('closePopup');
    },

  }
}
</script>
