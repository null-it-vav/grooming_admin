<template>
  <div>
    <b-card>
      <div class="row">
        <div class="col-md-2">
          <form-group
              type="select"
              :items="[
                  { value: null, text: $t('base.service_types.select') },
                  { value: 'cat', text: $t('base.service_types.cat') },
                  { value: 'dog', text: $t('base.service_types.dog') },
                  { value: 'other', text: $t('base.service_types.other') }
              ]"
              v-model="filters.type"
              custom_class="mb-3 mb-md-0"
          />
        </div>
        <div class="col-md-2" v-if="filters.type">
          <form-group
              type="select"
              :items="categories.reduce((result, category) => {
              if (category.type == filters.type) {
                result.push({value: category.id, text: category.title });
                return result;
              }
              return result;
              }, [{value:null, text: $t('app.components.shop.category.select')}])"
              v-model="filters.category_id"
              custom_class="mb-3 mb-md-0"
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
      <shop-create-item
          v-if="showCreatePopup"
          :item="item"
          :categories="categories"
          @closePopup="closePopup"
      />
    </b-card>

    <div class="row mt-2">
      <div class='col-lg-3' v-for="item in items.data" :key="item.id">
        <b-card
          :img-src="item.images && item.images.length ? item.images[0].url : ''"
          :title="item.title"
        >
          <div v-html="item.description.replaceAll('\n', '<br>')"></div>
          <div>
            {{ $t('app.components.shop.item.fields.supplier_price') }}: <b>{{ item.supplier_price }}</b>
          </div>
          <div>
            {{ $t('app.components.shop.item.fields.price') }}: <b>{{ item.price }}</b>
          </div>
          <div>
            {{ $t('app.components.shop.item.fields.new_price') }}: <b>{{ item.new_price }}</b>
          </div>
          <div class="mb-2">
            {{ $t('app.components.shop.item.fields.count') }}: <b>{{ item.count }}</b>
          </div>
          <a class="btn btn-primary" @click="editItem(item)">{{ $t('base.edit') }}</a>
        </b-card>
      </div>
    </div>

    <b-pagination
        v-if="items.last_page > 1"
        v-model="items.page"
        :total-rows="items.total"
        :per-page="items.per_page"
        aria-controls="my-table"
        class="m-auto"
    ></b-pagination>

  </div>
</template>

<script>
import {shop_categories, shop_items} from "@/api";
import FormGroup from "@/components/base/FormGroup";
import ShopCreateItem from "@/components/shop/manage/ShopCreateItem";
import deepClone from "clonedeep";

export default {
  name: "ShopItems",
  components: {ShopCreateItem, FormGroup},
  data() {
    return {
      filters: {
        type: null,
        category_id: null,
      },
      categories: [],
      showCreatePopup: false,
      item: {
        id: null,
      },
      items: {
        data: [],
        page: 1,
        per_page: 15,
        total: 0
      }
    }
  },
  created() {
    this.getCategories()
    this.getItems()
  },
  watch: {
    'filters.type': function () {
      this.getItems()
      this.filters.category_id = null
    },
    'filters.category_id': function () {
      this.getItems()
    },
  },
  methods: {
    getCategories() {
      shop_categories({
      })
          .then(response => {
            this.categories = response.data.data.categories
          })
    },
    getItems() {
      shop_items({
        page: this.items.page,
        qty: this.items.per_page,
        type: this.filters.type,
        category_id: this.filters.category_id,
      })
      .then(response => {
        this.items.data = response.data.data.items.data
        this.items.total = response.data.data.items.total
      })
    },
    closePopup() {
      this.item = {
        id: null
      };
      this.showCreatePopup = false
      this.getItems()
    },
    editItem(item){
      this.item = deepClone(item)
      this.showCreatePopup = true
    }
  }
}
</script>
