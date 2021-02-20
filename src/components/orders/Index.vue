<template>
  <div class="card p-4">
    <div v-if="title">
      <div class="card-title">{{ title }}</div>
    </div>
    <div class="row mb-4">
      <div class="col-lg-3"  v-if="auth.role == 'admin'">
        <form-group
            v-model="master_filter"
            :errors="{}"
            type="select"
            :items="masters_list"
        />
      </div>
      <div class="col-lg-2">
        <form-group
            v-model="status_filter"
            :errors="{}"
            type="select"
            :items="[
                {value: null, text: $t('app.components.orders.filters.status_select')},
                {value: 'NEW', text: $t('app.components.orders.statuses.NEW')},
                {value: 'CONFIRMED', text: $t('app.components.orders.statuses.CONFIRMED')},
                {value: 'REJECTED', text: $t('app.components.orders.statuses.REJECTED')},
                {value: 'PENALTY', text: $t('app.components.orders.statuses.PENALTY')},
            ]"
        />
      </div>

      <div class="col-lg-3 mb-3" v-if="!day">
        <date-range-select
          v-model="filter_date_range"
        />
      </div>

      <div class="ml-auto col-2 d-flex" v-if="auth.role == 'admin' && create_new">
        <div class="ml-auto">
          <a
              class="btn btn-purpure rounded-circle fa fa-plus"
              @click="showCreatePopup = true"
          />
        </div>
      </div>
    </div>
    <table class="table table-bordered table-adaptive" v-if="orders.data.length">
      <thead>
        <tr>
          <th>{{$t('app.components.orders.fields.name')}}</th>
          <th>{{$t('app.components.orders.fields.nickname')}}</th>
          <th>{{$t('app.components.orders.fields.date')}}</th>
          <th>{{$t('app.components.orders.fields.phone')}}</th>
          <th>{{$t('app.components.orders.fields.comment')}}</th>
          <th v-if="!master_filter">{{$t('app.components.orders.fields.master')}}</th>
          <th v-if="!status_filter">{{$t('app.components.orders.fields.status')}}</th>
          <th></th>
        </tr>
      </thead>
      <tr v-for="(order, k) in orders.data" :key="k">
        <td :data-label="$t('app.components.orders.fields.name')">{{order.name}}</td>
        <td :data-label="$t('app.components.orders.fields.nickname')">{{order.nickname}}</td>
        <td :data-label="$t('app.components.orders.fields.date')">{{order.date}} {{order.time_start}}</td>
        <td :data-label="$t('app.components.orders.fields.phone')">{{order.phone}}</td>
        <td :data-label="$t('app.components.orders.fields.comment')">{{order.comment}}</td>
        <td v-if="!master_filter" :data-label="$t('app.components.orders.fields.master')">{{order.master.name}}</td>
        <td v-if="!status_filter" :data-label="$t('app.components.orders.fields.status')">{{$t('app.components.orders.statuses.'+order.status)}}</td>
        <td>

          <b-dropdown  variant="link" toggle-class="text-decoration-none" >
            <template #button-content >
              <i class="btn btn-dark btn-sm rounded-circle fa fa-align-justify"/>
            </template>
            <b-dropdown-item
                v-if="auth.role == 'admin'"
                @click="openUpdatePopup(order)"
            >
              {{ $t('app.components.orders.actions.edit') }}
            </b-dropdown-item>
            <b-dropdown-item
                v-if="order.status == 'NEW'"
                @click="set_status(order, 'approve')"
            >
              {{ $t('app.components.orders.tooltip.check') }}
            </b-dropdown-item>
            <b-dropdown-item
                v-if="order.status == 'NEW'"
                @click="set_status(order, 'rejected')"
            >
              {{ $t('app.components.orders.tooltip.rejected') }}
            </b-dropdown-item>
            <b-dropdown-item
                v-if="order.status == 'CONFIRMED'"
                @click="set_status(order, 'penalty')"
            >
              {{ $t('app.components.orders.tooltip.penalty') }}
            </b-dropdown-item>
          </b-dropdown>
        </td>
      </tr>
    </table>

    <div v-else-if="!page_load" class="text-center">
      <img src="~@/assets/not_found.svg"/>
      <h4 class="mt-3">{{ $t('app.components.orders.not_found') }}</h4>
    </div>

    <div v-if="page_load" class="d-flex">
      <b-spinner class="m-auto my-5"></b-spinner>
    </div>

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

    <update
      v-if="showUpdatePopup"
      :order="order"
      @closePopup="closeUpdatePopup"
    />
  </div>
</template>

<script>
import {masters, orders, update_orders} from "@/api";
import {mapGetters} from "vuex";
import Create from "@/components/orders/Create";
import Update from "@/components/orders/Update";
import FormGroup from "@/components/base/FormGroup";
import deepClone from "clonedeep";
import DateRangeSelect from "@/components/base/DateRangeSelect";

export default {
  name: "Index",
  components: {DateRangeSelect, FormGroup, Create, Update},
  props: {
    day: {
      required: false
    },
    title: {
      required: false
    },
    create_new: {
      required: false,
      default: true
    }
  },
  data() {
    return {
      page_load: false,
      showCreatePopup: false,
      showUpdatePopup: false,
      orders: {
        data: [],
        page: 1,
        per_page: 15,
        last_page: 1,
        total: 0,
      },
      order: {},
      master_filter: null,
      status_filter: null,
      filter_start: null,
      filter_end: null,
      filter_date_range: null,
      masters: [],
    }
  },
  watch: {
    'filter_date_range': function (){
      this.filter_start = this.filter_date_range.start

      this.filter_end = this.filter_date_range.end
      this.loadOrders()
    },
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
    },
    'status_filter': function (){
      this.loadOrders()
    }
  },
  created() {
    this.loadOrders()
    this.loadMasters()
  },
  computed: {
    ...mapGetters([
      'auth',
      'salon_selected'
    ]),
    masters_list: function (){
      var data = [];
      data.push({
        value: null,
        text: this.$t('app.components.orders.filters.master_select')
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
      this.page_load = true;
      this.orders.data = [];
      this.orders.total = 0;

      orders({
        page: this.orders.page,
        qty: this.orders.per_page,
        salon_id: this.salon_selected.id,
        status: this.status_filter,
        master_id: this.master_filter,
        start: this.filter_start ? this.filter_start : this.day,
        end: this.filter_end ? this.filter_end : this.day,
      }).then(response => {
        this.orders.data = response.data.data.orders.data
        this.orders.total = response.data.data.orders.total
        this.orders.last_page = response.data.data.orders.last_page

        this.page_load = false;
      }).catch(error => {
        console.warn(error)
        this.page_load = false;
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
    },
    set_status(order, status){
      update_orders(order.id, {
        action: 'set-'+status
      })
          .then(() => {
            this.loadOrders()
          })
    },
    openUpdatePopup(order){
      this.showUpdatePopup = true
      this.order = deepClone(order)
    },
    closeUpdatePopup(){
      this.showUpdatePopup = false
      this.loadOrders()
    }
  }
}
</script>

<style>
  .dropdown .dropdown-toggle {
    padding: 0px !important;
    margin: 0px !important;
    box-shadow: none !important;
  }
</style>
