<template>
  <div class="card p-4">
    <div class="row mb-4">

      <div class="ml-auto col-2 d-flex">
        <div class="ml-auto">
          <a
              class="btn btn-purpure rounded-circle fa fa-plus"
              @click="showCreatePopup = true"
          />
        </div>
      </div>
    </div>


    <div
        v-for="promotion in promotions.data"
        :key="promotion.id"
        class="row mb-3"
    >
      <div class="col-10 d-flex">
        <div class="mr-2">
          <b-avatar class="mr-3" size="4em" :src="promotion.image">
            <i class="fa fa-star fa-lg" v-if="!promotion.image"/>
          </b-avatar>
        </div>
        <div>
          <div>
            <b>{{ promotion.name }}</b>
          </div>
          <div :class="'status_' + promotion.status">
            <i>{{ $t('app.components.promotions.statuses.'+promotion.status) }}</i>
          </div>
          <div class="text-muted">
            {{ promotion.description }}
          </div>
        </div>
      </div>
      <div class="col-2 d-flex align-items-center">
        <button class="btn btn-dark rounded-circle ml-auto fa fa-pencil fa-lg" @click="openUpdatePopup(promotion)"/>
        <button class="ml-2 btn btn-dark rounded-circle fa fa-trash fa-lg" @click="deletePromotion(promotion.id)"/>
      </div>
    </div>


    <b-pagination
        v-if="promotions.last_page > 1"
        v-model="promotions.page"
        :total-rows="promotions.total"
        :per-page="promotions.per_page"
        aria-controls="my-table"
        class="m-auto"
    ></b-pagination>

    <create
      v-if="showCreatePopup"
      @closePopup="closeCreatePopup"
    />

    <update
        v-if="showUpdatePopup"
        :promotion="promotion"
        @closePopup="closeUpdatePopup"
    />

  </div>
</template>

<script>
import deepClone from "clonedeep";
import Create from "@/components/promotions/Create";
import Update from "@/components/promotions/Update";
import {promotions,delete_promotion} from "@/api";

export default {
  name: "Index",
  components: {Create,Update},
  data() {
    return {
      showCreatePopup: false,
      showUpdatePopup: false,
      promotion: {},
      promotions: {
        data: [],
        page: 1,
        per_page: 15,
        last_page: 1,
        total: 0,
      },
    }
  },
  watch: {
    'promotions.page': function(){
      this.loadPromotions()
    }
  },
  created() {
    this.loadPromotions();
  },
  methods: {
    loadPromotions(){
      promotions({
        page: this.promotions.page,
        qty: this.promotions.per_page
      }).then(response => {
        this.promotions.data = response.data.data.promotions.data
        this.promotions.total = response.data.data.promotions.total
        this.promotions.last_page = response.data.data.promotions.last_page
      })
    },
    openUpdatePopup(promotion){
      this.showUpdatePopup = true
      this.promotion = deepClone(promotion)
    },
    deletePromotion(promotion_id){
      if (confirm(this.$t('base.are_you_sure_delete'))){
        delete_promotion(promotion_id)
        .then(() => {
          this.loadPromotions()
        })
      }
    },
    closeCreatePopup(){
      this.showCreatePopup = false
      this.loadPromotions()
    },
    closeUpdatePopup(){
      this.showUpdatePopup = false
      this.loadPromotions()
    },
  }
}
</script>

<style scoped>
  .status_expect { color: #bebebd }
  .status_active { color: green }
  .status_inactive { color: black }
</style>
