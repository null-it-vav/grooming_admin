<template>
  <base-popup
      :caption="$t('app.components.packages.create')"
      @closePopup="closePopup"
      :success_error="success_error"
  >
    <template v-slot:body>
      <form
          @submit.prevent="submit"
      >
        <div class="row">
          <div class="col-lg-4">
            <form-group
                :label="$t('base.service_type')"
                type="select"
                :items="[
                    { value: null, text: $t('base.service_types.select') },
                    { value: 'cat', text: $t('base.service_types.cat') },
                    { value: 'dog', text: $t('base.service_types.dog') },
                    { value: 'other', text: $t('base.service_types.other') }
                ]"
                required
                v-model="filter_type"
            />
          </div>
          <div class="col-lg-4" v-if="filter_type">
            <form-group
                :label="$t('app.components.packages.model')"
                type="select"
                :items="[
                    { value: null, text: $t('app.components.packages.types.select') },
                    { value: 'organization', text: $t('app.components.packages.types.organization') },
                    { value: 'salon', text: $t('app.components.packages.types.salon') },
                    { value: 'master', text: $t('app.components.packages.types.master') }
                ]"
                required
                v-model="model.model"
            />
          </div>
          <div class="col-lg-4" v-if="filter_type && model.model">
            <form-group
              v-if="model.model == 'salon'"
              :label="$t('app.components.packages.types.salon')"
              type="select"
              v-model="model.model_id"
              :items="salons.map(salon => { return {value: salon.id, text: salon.address} })"
            />
            <form-group
              v-if="model.model == 'master'"
              :label="$t('app.components.packages.types.master')"
              type="select"
              v-model="model.model_id"
              :items="masters.map(master => { return {value: master.id, text: master.name} })"
            />
          </div>
        </div>
        <div class="row" v-if="filter_type">
          <div class="col-lg-4">
            <form-group
                :label="$t('app.components.packages.name')"
                type="textarea"
                v-model="model.name"
                required
            />
          </div>
          <div class="col-lg-4">
            <form-group
                type="number"
                :label="$t('app.components.packages.discount')"
                v-model="model.discount"
                required
            />
          </div>
        </div>
        <div class="row" v-if="filter_type">
          <div class="col-lg-4">
            <form-group
                :label="$t('app.components.packages.started_at')"
                type="date"
                v-model="model.started_at"
                required
            />
          </div>
          <div class="col-lg-4">
            <form-group
                :label="$t('app.components.packages.start_published_at')"
                type="date"
                v-model="model.start_published_at"
                required
            />
          </div>
          <div class="col-lg-4">
            <form-group
                :label="$t('app.components.packages.end_published_at')"
                type="date"
                v-model="model.end_published_at"
                required
            />
          </div>
        </div>
        <div v-if="filter_type">
          <div
              class="row mb-3"
              v-for="(package_service,k) in package_services"
              :key="k"
          >
            <div class="col-lg-6">
              <form-group
                  :label="$t('app.components.packages.service')"
                  type="select"
                  custom_class="mb-0"
                  v-model="package_service.service_id"
                  :items="services_filtered"
                  required
              />
            </div>
            <div class="col-lg-2">
              <form-group
                  :label="$t('app.components.packages.service_count')"
                  type="number"
                  custom_class="mb-0"
                  v-model="package_service.service_count"
                  required
              />
            </div>
            <div class="col-lg-1 d-flex align-items-center" v-if="k > 0">
              <a class="btn btn-danger rounded-circle fa fa-trash  mt-4" @click="deletePackage(k)"/>
            </div>
          </div>
        </div>
        <div class="row" v-if="filter_type">
          <div class="col-12">
            <a class="btn btn-purpure rounded-circle fa fa-plus" @click="addPackageService"/>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 d-flex">
            <button type="submit" class="m-auto btn btn-success">
              {{ $t('base.create') }}
            </button>
          </div>
        </div>
      </form>
    </template>
  </base-popup>
</template>

<script>
import BasePopup from "@/components/base/Popup";
import {services, package_create} from "@/api";
import FormGroup from "@/components/base/FormGroup";
import {mapGetters} from "vuex";
export default {
  name: "PackageCreate",
  components: {FormGroup, BasePopup},
  data() {
    return {
      errors: {},
      success_error: {
        success: false,
        error: false
      },
      model: {
        model: null,
        model_id: null,
        name: '',
        started_at: null,
        start_published_at: null,
        end_published_at: null,
        discount: 0,
      },
      services: [],
      filter_type: null,
      package_services: [
        {
          service_id: null,
          service_count: null,
        }
      ],
    }
  },
  created() {
    this.getServices()
  },
  watch: {
    'filter_type': function () {
      this.package_services = [{
        service_id: null,
        service_count: null,
      }]
    },
    'model.model': function () {
      this.model.model_id = null
    }
  },
  computed: {
    ...mapGetters([
      'salons',
        'masters'
    ]),
    services_filtered() {
      let data = []
      this.services.forEach(s => {
        if (s.type == this.filter_type) {
          data.push({
            value: s.id,
            text: s.name
          })
        }
      })
      return data
    }
  },
  methods: {
    closePopup() {
      this.$emit('closePopup');
    },
    getServices() {
      services({
        page: 1,
        qty: 999,
      })
          .then(response => {
            this.services = response.data.data.services.data
          })
    },
    addPackageService() {
      this.package_services.push({
        service_id: null,
        service_count: null,
      })
    },
    deletePackage(k){
      console.log(k)
      this.package_services.splice(k, 1)
    },
    submit() {
      let data = {
        model: this.model.model,
        model_id: this.model.model_id,
        name: this.model.name,
        started_at: this.model.started_at,
        start_published_at: this.model.start_published_at,
        end_published_at: this.model.end_published_at,
        discount: this.model.discount,
      }
      package_create(data)
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
    }
  }
}
</script>

<style scoped>

</style>
