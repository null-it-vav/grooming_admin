<template>
  <div class="card p-4">

    <div
        v-for="salon in salons.data"
        :key="salon.id"
        class="row mb-3"
    >
      <div class="col-10 d-flex">
        <div>
          <div>
            <b>{{ salon.address }}</b>
          </div>
          <div>
            <a :href="'https://www.google.com/maps/place/'+salon.lat + ' '+salon.long" target="_blank">({{ salon.lat }}, {{ salon.long }})</a>
          </div>
        </div>
      </div>
      <div class="col-2 d-flex align-items-center">
        <button class="btn btn-dark rounded-circle ml-auto fa fa-pencil fa-lg"/>
      </div>
    </div>


    <b-pagination
        v-if="salons.last_page > 1"
        v-model="salons.page"
        :total-rows="salons.total"
        :per-page="salons.per_page"
        aria-controls="my-table"
        class="m-auto"
    ></b-pagination>
  </div>
</template>

<script>
import {salons} from "@/api";

export default {
  name: "Index",
  data() {
    return {
      salons: {
        data: [],
        page: 1,
        per_page: 15,
        last_page: 1,
        total: 0,
      }
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
      salons({
        page: this.salons.page,
        qty: this.salons.per_page
      }).then(response => {
        this.salons.data = response.data.data.salons.data
        this.salons.total = response.data.data.salons.total
        this.salons.last_page = response.data.data.salons.last_page
      })
    }
  }
}
</script>
