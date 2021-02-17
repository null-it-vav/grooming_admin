<template>
  <div class="card p-4">
    <div class="row mb-2">
      <div class="col-lg-3 col">
        <form-group
          type="select"
          :items="[
              { value: null, text: $t('base.service_types.select') },
              { value: 'cat', text: $t('base.service_types.cat') },
              { value: 'dog', text: $t('base.service_types.dog') },
              { value: 'other', text: $t('base.service_types.other') }
          ]"
          :errors="{}"
          v-model="filter_type"
        />
      </div>
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
        v-for="service in services.data"
        :key="service.id"
        class="row mb-3"
    >
      <div class="col-10 d-flex">
        <div class="mr-2">
          <b-avatar class="mr-3" :src="service.image"></b-avatar>
        </div>

        <div>
          <div>
            <b>{{ service.name }}</b>
          </div>
          <div>
            {{ service.description }}
          </div>
        </div>
      </div>
      <div class="col-2 d-flex align-items-center">
        <button class="btn btn-dark rounded-circle ml-auto fa fa-pencil fa-lg" @click="openUpdatePopup(service)"/>
        <button class="ml-2 btn btn-dark rounded-circle fa fa-trash fa-lg" @click="deleteService(service.id)"/>
      </div>
    </div>

    <b-pagination
        v-if="services.last_page > 1"
        v-model="services.page"
        :total-rows="services.total"
        :per-page="services.per_page"
        aria-controls="my-table"
        class="m-auto"
    ></b-pagination>

    <create
      v-if="showCreatePopup"
      @closePopup="closeCreatePopup"
    />

    <update
      v-if="showUpdatePopup"
      :service="service"
      @closePopup="closeUpdatePopup"
    />
  </div>
</template>

<script>
import { services, delete_service } from "@/api";
import FormGroup from "@/components/base/FormGroup";
import Create from "@/components/services/Create";
import Update from "@/components/services/Update";
import deepClone from 'clonedeep';

export default {
  name: "Index",
  components: {Update, Create, FormGroup},
  data(){
    return {
      services: {
        data: [],
        page: 1,
        per_page: 15,
        last_page: 1,
        total: 0,
      },
      service: {},
      filter_type: null,
      showCreatePopup: false,
      showUpdatePopup: false,
    }
  },
  created() {
    this.loadServices()
  },
  watch: {
    'services.page': function(){
      this.loadServices()
    },
    'filter_type': function(){
      this.loadServices()
    },
  },
  methods: {
    loadServices(){
      services({
        page: this.services.page,
        qty: this.services.per_page,
        type: this.filter_type
      }).then(response => {
        this.services.data = response.data.data.services.data
        this.services.total = response.data.data.services.total
        this.services.last_page = response.data.data.services.last_page
      })
    },
    closeCreatePopup(){
      this.loadServices()
      this.showCreatePopup = false;
    },
    openUpdatePopup(item){
      this.showUpdatePopup = true
      this.service = deepClone(item)
    },
    closeUpdatePopup(){
      this.loadServices()
      this.showUpdatePopup = false;
    },
    deleteService(service_id){
      if (confirm(this.$t('base.are_you_sure_delete'))) {
        delete_service(service_id).then(() => {
          this.loadServices()
        })
      }
    }
  }
}
</script>

