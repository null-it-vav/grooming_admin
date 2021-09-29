<template>
  <base-popup
    :caption="category.id ? $t('app.components.shop.category.update') : $t('app.components.shop.category.create')"
    @closePopup="closePopup"
    :success_error="success_error"
  >
    <template v-slot:body>
      <form
          @submit.prevent="submit"
          class="row"
      >
        <div class="col-md-6">
          <form-group
              type="select"
              :label="$t('app.components.shop.category.fields.type')"
              required
              :items="[
                  { value: null, text: $t('base.service_types.select') },
                  { value: 'cat', text: $t('base.service_types.cat') },
                  { value: 'dog', text: $t('base.service_types.dog') },
                  { value: 'other', text: $t('base.service_types.other') }
              ]"
              name="type"
              v-model="category.type"
          />
        </div>
        <div class="col-md-6">
          <form-group
              type="text"
              :label="$t('app.components.shop.category.fields.title')"
              required
              name="title"
              v-model="category.title"
          />
        </div>
        <div class="col-md-6">
          <form-group
              type="switch"
              :label="$t('app.components.shop.category.fields.visible')"
              name="visible"
              v-model="category.visible"
          />
        </div>
        <div class="col-lg-12 d-flex mt-2">
          <button type="submit" class="m-auto btn btn-success">
            {{ category.id ? $t('base.update') : $t('base.create') }}
          </button>
        </div>
      </form>
    </template>
  </base-popup>
</template>

<script>
import BasePopup from "@/components/base/Popup";
import FormGroup from "@/components/base/FormGroup";
import {shop_category_create} from "@/api";
export default {
name: "ShopCreateCategory",
  components: {FormGroup, BasePopup},
  props: {
    category: {
      required: false,
      default: () => ({
        id: null,
        title: null,
        type: null,
        visible: false,
      })
    },
  },
  data() {
    return {
      success_error: {
        success: false,
        error: false
      },
    }
  },
  methods: {
    closePopup() {
      this.$emit('closePopup')
    },
    submit() {
      shop_category_create({
        id: this.category.id,
        title: this.category.title,
        type: this.category.type,
        visible: this.category.visible ? 1 : 0,
      })
      .then(() => {
        this.success_error.success = true
        setTimeout(() => {
          this.closePopup()
        }, 2000);
      })
      .catch(e => {
        this.success_error.error = true
        console.warn(e)
      })
    }
  }
}
</script>
