<template>
  <base-popup
      @closePopup="closePopup"
      :success_error="success_error"
      :caption="$t('app.components.breeds.update')"
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
                ]"
              :label="$t('app.components.services.field.type')"
              :errors="errors"
              name="type"
              v-model="breed.type"
          />
        </div>
        <div class="col-lg-4">
          <div v-for="(lang,k) in $i18n.messages" :key="k">
            <form-group
                type="text"
                required
                :label="$t('app.components.breeds.name') + ' ' +lang.language"
                :errors="errors"
                name="type"
                v-model="breed.locales[k]"
            />
          </div>
        </div>
        <div class="col-lg-12 d-flex mt-2">
          <button type="submit" class="m-auto btn btn-success">
            {{$t('base.update')}}
          </button>
        </div>
      </form>
    </template>
  </base-popup>
</template>

<script>
import BasePopup from "@/components/base/Popup";
import FormGroup from "@/components/base/FormGroup";
import {breed_update} from "@/api";

export default {
  name: "Update",
  props: {
    breed: {
      type: null,
      locales: {
        ru: '',
        en: '',
      }
    },
  },
  data() {
    return {
      errors:{},
      success_error: {
        success: false,
        error: false,
        msg: null
      },
    }
  },
  components: {FormGroup, BasePopup},
  methods: {
    submit() {
      breed_update(this.breed.id, this.breed)
          .then(() => {
              this.success_error.success = true
              setTimeout(() => {
                this.closePopup()
              }, 2000);
            })
          .catch((error) => {
            this.success_error.error = true
            if (error.response?.data?.errors) this.errors = error.response?.data?.errors
            if (error.response.status == 403){
              this.success_error.msg = [error.response?.data.message]
            }
          })
    },
    closePopup() {
      this.$emit('closePopup');
    },
  }
}
</script>

<style scoped>

</style>
