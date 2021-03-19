<template>
  <div class="card p-4">
    <div class="row mb-4">

      <div class="ml-auto col-3 d-flex">
        <div class="ml-auto">
          <a
              class="btn btn-purpure rounded-circle fa fa-plus"
              @click="showCreatePopup = true"
          />
        </div>
      </div>
    </div>

    <div v-if="salons.data.length > 0">
      <div
          v-for="salon in salons.data"
          :key="salon.id"
          class="row mb-3"
      >
        <div class="col-9 col-md-10 d-flex">
          <div>
            <div>
              <b>{{ salon.address }}</b>
            </div>
            <div>
              <a :href="'https://www.google.com/maps/place/'+salon.lat + ' '+salon.long" target="_blank">({{ salon.lat }}, {{ salon.long }})</a>
            </div>
          </div>
        </div>
        <div class="col-3 col-md-2 d-md-flex align-items-center">
          <button class="btn btn-dark rounded-circle ml-auto mb-2 mb-md-0 fa fa-pencil fa-lg" @click="openUpdatePopup(salon)"/>
          <button class="btn btn-dark rounded-circle ml-md-2 fa fa-trash fa-lg" @click="deleteSalon(salon)"/>
        </div>
      </div>
    </div>

    <div v-else-if="!page_load" class="text-center">
      <h4 class="my-5">{{ $t('app.components.salons.create_first') }}</h4>
    </div>

    <div class="col-lg-12 mb-2 alert position-fixed fixed-bottom">
      <message-success-error
          :show="success_error"
      />
    </div>

    <b-pagination
        v-if="salons.last_page > 1"
        v-model="salons.page"
        :total-rows="salons.total"
        :per-page="salons.per_page"
        aria-controls="my-table"
        class="m-auto"
    ></b-pagination>

    <create
      v-if="showCreatePopup"
      @closePopup="closeCreatePopup"
    />

    <update
        v-if="showUpdatePopup"
        :salon="salon"
        @closePopup="closeUpdatePopup"
    />

    <delete-salon-popup
      v-if="showDeletePopup"
      :salon="salon"
      @closePopup="closeDeletePopup"
    />

  </div>
</template>

<script>
import {salons, delete_salon} from "@/api";
import Create from "@/components/salons/Create";
import Update from "@/components/salons/Update";
import deepClone from 'clonedeep';
import store from "@/store/app";
import MessageSuccessError from "@/components/base/SuccessError";
import DeleteSalonPopup from "@/components/salons/DeleteSalonPopup";


export default {
  name: "Index",
  components: {DeleteSalonPopup, MessageSuccessError, Update, Create},
  data() {
    return {
      page_load: false,
      salons: {
        data: [],
        page: 1,
        per_page: 15,
        last_page: 1,
        total: 0,
      },
      success_error: {
        success: false,
        error: false
      },
      salon: {},
      showCreatePopup: false,
      showUpdatePopup: false,
      showDeletePopup: false,
    }
  },
  created() {
    this.loadSalons()
  },
  watch: {
    'salons.page': function(){
      this.loadSalons()
    }
  },
  methods: {
    loadSalons(){
      this.page_load = true
      salons({
        page: this.salons.page,
        qty: this.salons.per_page
      }).then(response => {
        this.page_load = false
        this.salons.data = response.data.data.salons.data
        this.salons.total = response.data.data.salons.total
        this.salons.last_page = response.data.data.salons.last_page
      }).catch((error) => {
        console.warn(error)
        this.page_load = false
      })
    },
    closeCreatePopup() {
      this.showCreatePopup = false
      this.loadSalons()
    },
    deleteSalon(salon){
      delete_salon(salon.id).then(() => {
        store.dispatch('getAuth').then(() => {})
        this.loadSalons()
      }).catch((error) => {
        if (error.response?.data?.errors) this.errors = error.response?.data?.errors
        // this.success_error.error = true
        if (error.response?.data?.code == 2) {
          //если в салоне есть мастера и записи
          this.salon = deepClone(salon)
          this.showDeletePopup = true
        }
      })

    },
    openUpdatePopup(salon){
      this.showUpdatePopup = true
      this.salon = deepClone(salon)
    },
    closeDeletePopup() {
      this.showDeletePopup = false
      this.loadSalons()
    },
    closeUpdatePopup(){
      this.showUpdatePopup = false
      this.loadSalons()
    }
  }
}
</script>
