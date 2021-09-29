<template>
  <b-card class="mb-2">
    <div class="row">
      <div class="col-md-3 col-6">
        <form-group
            type="select"
            :items="[
                { value: null, text: $t('base.service_types.select') },
                { value: 'cat', text: $t('base.service_types.cat') },
                { value: 'dog', text: $t('base.service_types.dog') },
                { value: 'other', text: $t('base.service_types.other') }
            ]"
            v-model="filter_type"
        />
      </div>
      <div class="ml-auto col-auto d-flex">
        <div>
          <a
              class="btn btn-purpure rounded-circle fa fa-plus"
              @click="showCreatePopup = true"
          />
        </div>
      </div>
    </div>
    <table class="table table-adaptive">
      <thead>
      <tr>
        <th>#</th>
        <th>{{$t('app.components.shop.category.fields.type')}}</th>
        <th>{{$t('app.components.shop.category.fields.title') }}</th>
        <th>{{$t('app.components.shop.category.fields.visible') }}</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(category, k) in categories" :key="k">
        <td>
          {{ category.id }}
        </td>
        <td :data-label="$t('app.components.shop.category.fields.type')">{{ $t(`base.service_types.${category.type}`) }}</td>
        <td :data-label="$t('app.components.shop.category.fields.title')">{{ category.title }}</td>
        <td :data-label="$t('app.components.shop.category.fields.visible')">{{ category.visible ? $t(`base.yes`) : $t(`base.not`) }}</td>
        <td>
          <button class="btn btn-dark rounded-circle fa fa-pencil" @click="editCategory(category)"/>
        </td>
      </tr>
      </tbody>
    </table>

    <shop-create-category
      v-if="showCreatePopup"
      :category="category"
      @closePopup="closePopup"
    />
  </b-card>
</template>

<script>
import {shop_categories} from "@/api";
import FormGroup from "@/components/base/FormGroup";
import ShopCreateCategory from "@/components/shop/manage/ShopCreateCategory";
import deepClone from "clonedeep";
export default {
  name: "ShopCategories",
  components: {ShopCreateCategory, FormGroup},
  data() {
    return {
      filter_type: null,
      showCreatePopup: false,
      categories: [],
      category: {
        id: null,
        title: null,
        type: null,
        visible: false,
      },
    }
  },
  created() {
    this.getCategories()
  },
  watch: {
    filter_type: function () {
      this.getCategories()
    }
  },
  methods: {
    getCategories() {
      shop_categories({
        type: this.filter_type
      })
      .then(response => {
        this.categories = response.data.data.categories
      })
    },
    closePopup() {
      this.showCreatePopup = false
      this.getCategories()
    },
    editCategory(category){
      this.category = deepClone(category)
      this.showCreatePopup = true
    }
  }
}
</script>
