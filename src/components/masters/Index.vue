<template>
  <div class="card p-4">

    <div
        v-for="master in masters.data"
        :key="master.id"
        class="row mb-3"
    >
      <div class="col-10 d-flex">
        <div class="mr-2">
          <b-avatar class="mr-3" :src="master.photo"></b-avatar>
        </div>

        <div>
          <div>
            <b>{{ master.name }}</b>
          </div>
          <div>
            {{ master.description }}
          </div>
        </div>
      </div>
      <div class="col-2 d-flex align-items-center">
        <button class="btn btn-dark rounded-circle ml-auto fa fa-pencil fa-lg"/>
      </div>
    </div>

    <b-pagination
        v-if="masters.last_page > 1"
        v-model="masters.page"
        :total-rows="masters.total"
        :per-page="masters.per_page"
        aria-controls="my-table"
        class="m-auto"
    ></b-pagination>
  </div>
</template>

<script>
import { masters } from "@/api";

export default {
  name: "Index",
  data(){
    return {
      masters: {
        data: [],
        page: 1,
        per_page: 15,
        last_page: 1,
        total: 0,
      }
    }
  },
  created() {
    this.loadMasters()
  },
  watch: {
    'masters.page': function(){
      this.loadMasters()
    }
  },
  methods: {
    loadMasters(){
      masters({
        page: this.masters.page,
        qty: this.masters.per_page
      }).then(response => {
        this.masters.data = response.data.data.masters.data
        this.masters.total = response.data.data.masters.total
        this.masters.last_page = response.data.data.masters.last_page
      })
    }
  }
}
</script>

<style scoped>

</style>
