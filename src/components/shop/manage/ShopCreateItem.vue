<template>
  <base-popup
      :caption="item.id ? $t('app.components.shop.item.update') : $t('app.components.shop.item.create')"
      @closePopup="closePopup"
      :success_error="success_error"
  >
    <template v-slot:body>
      <form
          @submit.prevent="submit"
          class="row"
      >
        <div class="col-md-4">
          <form-group
              :label="$t('app.components.shop.item.fields.type')"
              type="select"
              required
              :items="[
                 { value: null, text: $t('base.service_types.select') },
                 { value: 'cat', text: $t('base.service_types.cat') },
                 { value: 'dog', text: $t('base.service_types.dog') },
                 { value: 'other', text: $t('base.service_types.other') }
              ]"
              v-model="filters_type"
              :errors="errors"
          />
        </div>
        <div class="col-md-4">
          <form-group
              type="select"
              required
              :disabled="!filters_type"
              :label="$t('app.components.shop.item.fields.category')"
              :items="categories.reduce((result, category) => {
              if (category.type == filters_type) {
                result.push({value: category.id, text: category.title });
                return result;
              }
              return result;
              }, [])"
              v-model="item.category_id"
              name="category_id"
              :errors="errors"
          />
        </div>
        <div class="col-md-4">
          <form-group
              type="text"
              :label="$t('app.components.shop.item.fields.title')"
              required
              name="title"
              v-model="item.title"
              :errors="errors"
          />
        </div>
        <div class="col-md-6">
          <form-group
              :label="$t('app.components.shop.item.fields.images')"
              type="files"
              :errors="errors"
              name="images"
              v-model="images"
          />
          <div v-for="image in item.images" :key="`image_${image.id}`" class="d-flex align-items-center mb-1">
            {{ image.name }} <i class="fa fa-trash pointer ml-auto"/>
          </div>
        </div>
        <div class="col-md-6">
          <form-group
              type="textarea"
              :label="$t('app.components.shop.item.fields.description')"
              required
              name="description"
              v-model="item.description"
              :errors="errors"
          />
        </div>
        <div class="col-md-6">
          <form-group
              type="number"
              :label="$t('app.components.shop.item.fields.supplier_price')"
              required
              name="supplier_price"
              v-model="item.supplier_price"
              step="0.01"
              :errors="errors"
          />
        </div>
        <div class="col-md-6">
          <form-group
              type="number"
              :label="$t('app.components.shop.item.fields.price')"
              required
              name="price"
              v-model="item.price"
              step="0.01"
              :errors="errors"
          />
        </div>
        <div class="col-md-6">
          <form-group
              type="number"
              :label="$t('app.components.shop.item.fields.new_price')"
              name="new_price"
              v-model="item.new_price"
              step="0.01"
              :errors="errors"
          />
        </div>
        <div class="col-md-6">
          <form-group
              type="number"
              :label="$t('app.components.shop.item.fields.count')"
              name="count"
              v-model="item.count"
              step="1"
              :errors="errors"
          />
        </div>
        <div class="col-lg-12 d-flex mt-2">
          <button type="submit" class="m-auto btn btn-success">
            {{ item.id ? $t('base.update') : $t('base.create') }}
          </button>
        </div>
      </form>
    </template>
  </base-popup>
</template>

<script>
import BasePopup from "@/components/base/Popup";
import FormGroup from "@/components/base/FormGroup";
import {shop_item_create} from "@/api";

export default {
  name: "ShopCreateItem",
  components: {FormGroup, BasePopup},
  props: {
    item: {
      required: false,
      default: () => ({
        id: null,
      })
    },
    categories: Array
  },
  data() {
    return {
      filters_type: null,
      new_image_crop: null,
      success_error: {
        success: false,
        error: false
      },
      images: null,
      errors:{},
    }
  },
  created() {
    if (this.item.category_id){
      let category = this.categories.find(cat => cat.id == this.item.category_id)
      if (category){
        this.filters_type = category.type
      }
    }
  },
  methods: {
    set_crop_image(data){
      this.new_image_crop = data;
    },
    closePopup() {
      this.$emit('closePopup')
    },
    submit() {
      let data = new FormData();
      data.append('id', this.item.id)
      data.append('category_id', this.item.category_id)
      data.append('title', this.item.title)
      data.append('description', this.item.description)
      data.append('supplier_price', this.item.supplier_price)
      data.append('price', this.item.price)
      data.append('new_price', this.item.new_price || '')
      data.append('count', this.item.count || 0)

      if (this.images) {
        this.images.forEach(image => {
          data.append('images[]', image)
        })
      }

      shop_item_create(data)
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

<style scoped>

</style>
