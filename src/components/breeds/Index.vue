<template>
  <div class="card p-4">
    <div class="row mb-4">
      <div class="col-lg-4">
        <form-group
            type="select"
            :items="[
                    { value: null, text: $t('base.service_types.select') },
                    { value: 'cat', text: $t('base.service_types.cat') },
                    { value: 'dog', text: $t('base.service_types.dog') },
                ]"
            :label="$t('app.components.services.field.type')"
            :errors="errors"
            name="type"
            v-model="breed_type"
        />
      </div>
      <div class="ml-auto col-3 d-flex">
        <div class="ml-auto">
          <a
              class="btn btn-purpure rounded-circle fa fa-plus"
              @click="showCreatePopup = true"
          />
        </div>
      </div>
    </div>
    <table class="table table-adaptive" v-if="breeds.data.length > 0">
      <thead>
      <tr>
        <th>{{$t('app.components.services.field.type')}}</th>
        <th>{{$t('app.components.breeds.name')}}</th>
        <th></th>
      </tr>
      </thead>
      <tr v-for="(breed, k) in breeds.data" :key="k">
        <td>
          {{$t('base.service_types.'+ breed.type) }}
        </td>
        <td>
          {{ breed.name }}
        </td>
        <th>
          <button class="btn btn-dark rounded-circle ml-auto mb-2 mb-md-0 fa fa-pencil fa-lg" @click="openUpdatePopup(breed)"/>
        </th>
      </tr>
    </table>

    <div class="row" v-if="breeds.last_page > 1">
      <div class="col-lg-2 d-flex">
        <form-group
            custom_class="align-items-center mb-0"
            type="select"
            :items="[5,10,15]"
            v-model="breeds.per_page"
        />
      </div>
      <div class="col-lg-8 d-flex">
        <b-pagination
            v-model="breeds.page"
            :total-rows="breeds.total"
            :per-page="breeds.per_page"
            aria-controls="my-table"
            class="m-auto"
        ></b-pagination>
      </div>
      <div class="col-lg-2 d-flex align-items-center">
        <div class="ml-auto text-secondary">{{ $t('base.total') }} {{ this.breeds.total }}</div>
      </div>
    </div>
    <create
      v-if="showCreatePopup"
      @closePopup="closeCreatePopup"
    />
    <update
        v-if="showUpdatePopup"
        @closePopup="closeUpdatePopup"
        :breed="breed"
    />
  </div>
</template>

<script>
import {breeds} from "@/api";
import FormGroup from "@/components/base/FormGroup";
import Create from "@/components/breeds/Create";
import Update from "@/components/breeds/Update";
import deepClone from "clonedeep";

export default {
  name: "Index",
  components: {Create, FormGroup, Update},
  data() {
    return {
      breeds: {
        data: [],
        page: 1,
        per_page: this.qty ? this.qty : 15,
        last_page: 1,
        total: 0,
      },
      showCreatePopup: false,
      showUpdatePopup: false,
      breed: {},
      breed_type: null
    }
  },
  watch: {
    'breed_type': function () {
      this.getBreeds()
    }
  },
  created() {
    this.getBreeds()
  },
  methods: {
    closeCreatePopup() {
      this.showCreatePopup = false
      this.getBreeds()
    },
    closeUpdatePopup() {
      this.showUpdatePopup = false
      this.getBreeds()
    },
    openUpdatePopup(breed){
      this.showUpdatePopup = true
      this.breed = deepClone(breed)
    },
    getBreeds() {
      let data = {
        page: this.breeds.page,
        qty: this.breeds.per_page,
      };
      if (this.breed_type){
        data.cats = this.breed_type == 'cat' ? 1 : 0
      }
      if (this.breed_type){
        data.dogs = this.breed_type == 'dog' ? 1 : 0
      }

      breeds(data)
          .then((response) => {
            this.breeds.data = response.data.data.breeds.data
            this.breeds.total = response.data.data.breeds.total
            this.breeds.last_page = response.data.data.breeds.last_page
          })
    }
  }
}
</script>
