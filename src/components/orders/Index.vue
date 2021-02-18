<template>
  <div class="card p-4">

    <div class="row mb-4">
      <div class="col-lg-3">
        <form-group
            v-model="master_filter"
            :errors="{}"
            type="select"
            :items="masters_list"
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
    <table class="table table-bordered table-adaptive">
      <thead>
        <tr>
          <th>{{$t('app.components.orders.fields.name')}}</th>
          <th>{{$t('app.components.orders.fields.nickname')}}</th>
          <th>{{$t('app.components.orders.fields.date')}}</th>
          <th>{{$t('app.components.orders.fields.phone')}}</th>
          <th>{{$t('app.components.orders.fields.comment')}}</th>
          <th>{{$t('app.components.orders.fields.status')}}</th>
          <th></th>
        </tr>
      </thead>
      <tr v-for="(order, k) in orders.data" :key="k">
        <td :data-label="$t('app.components.orders.fields.name')">{{order.name}}</td>
        <td :data-label="$t('app.components.orders.fields.nickname')">{{order.nickname}}</td>
        <td :data-label="$t('app.components.orders.fields.date')">{{order.date}} {{order.time_start}}</td>
        <td :data-label="$t('app.components.orders.fields.phone')">{{order.phone}}</td>
        <td :data-label="$t('app.components.orders.fields.comment')">{{order.comment}}</td>
        <td :data-label="$t('app.components.orders.fields.status')">{{$t('app.components.orders.statuses.'+order.status)}}</td>
        <td>
          <button class=" btn btn-dark btn-sm rounded-circle fa fa-pencil"/>
        </td>
      </tr>
    </table>

    <b-pagination
        v-if="orders.last_page > 1"
        v-model="orders.page"
        :total-rows="orders.total"
        :per-page="orders.per_page"
        aria-controls="my-table"
        class="m-auto"
    ></b-pagination>

    <create
        v-if="showCreatePopup"
        @closePopup="closeCreatePopup"
    />
  </div>
</template>

<script>
import {masters, orders} from "@/api";
import {mapGetters} from "vuex";
import Create from "@/components/orders/Create";
import FormGroup from "@/components/base/FormGroup";

export default {
  name: "Index",
  components: {FormGroup, Create},
  data() {
    return {
      showCreatePopup: false,
      orders: {
        data: [],
        page: 1,
        per_page: 15,
        last_page: 1,
        total: 0,
      },
      master_filter: null,
      masters: []
    }
  },
  watch: {
    'orders.page': function(){
      this.loadOrders()
    },
    'salon_selected.id': function(){
      this.loadOrders()
      this.loadMasters()
      this.master_filter = null
    },
    'master_filter': function (){
      this.loadOrders()
    }
  },
  created() {
    this.loadOrders()
    this.loadMasters()
  },
  computed: {
    ...mapGetters([
      'salon_selected'
    ]),
    masters_list: function (){
      var data = [];
      data.push({
        value: null,
        text: this.$t('base.select')
      })

      this.masters.forEach(master => {
        data.push({
          value: master.id,
          text: master.name
        })
      })

      return data
    }
  },
  methods: {
    loadOrders(){
      orders({
        page: this.orders.page,
        qty: this.orders.per_page,
        salon_id: this.salon_selected.id,
        master_id: this.master_filter
      }).then(response => {
        this.orders.data = response.data.data.orders.data
        this.orders.total = response.data.data.orders.total
        this.orders.last_page = response.data.data.orders.last_page
      })
    },
    loadMasters(){
      masters({
        page: 1,
        qty: 999,
        salon_id: this.salon_selected.id
      }).then(response => {
        this.masters = response.data.data.masters.data
      })
    },
    closeCreatePopup(){
      this.showCreatePopup = false
      this.loadOrders()
    }
  }
}
</script>

<style scoped>

</style>
