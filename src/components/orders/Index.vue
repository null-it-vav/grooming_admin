<template>
  <div class="card p-4">
    <div v-if="title">
      <div class="card-title">{{ title }}</div>
    </div>
    <div class="row mb-4">
      <div class="col-lg-3" v-if="auth.role_list.includes('admin')">
        <form-group
            v-model="master_filter"
            type="select"
            :items="masters_list"
        />
      </div>
      <div class="col-lg-3 col-xl-2">
        <form-group
            v-model="status_filter"
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

      <div class="ml-auto col-3 d-flex" v-if="auth.role_list.includes('admin') & create_new & (salons.length > 0)">
        <div class="ml-auto">
          <a
              class="btn btn-purpure rounded-circle fa fa-plus"
              @click="showCreatePopup = true"
          />
        </div>
      </div>
    </div>
    <table class="table table-bordered table-adaptive" v-if="orders.data.length > 0">
      <thead>
        <tr>
          <th>{{$t('app.components.orders.fields.name')}}</th>
          <th>{{$t('app.components.orders.fields.nickname')}}</th>
          <th>{{$t('app.components.orders.fields.date')}}</th>
          <th>{{$t('app.components.orders.fields.phone')}}</th>
          <th>{{$t('app.components.orders.fields.comment')}}</th>
          <th>{{$t('app.components.orders.fields.services')}}</th>
          <th v-if="!master_filter">{{$t('app.components.orders.fields.master')}}</th>
          <th v-if="!status_filter">{{$t('app.components.orders.fields.status')}}</th>
          <th width="60px"></th>
        </tr>
      </thead>
      <tr v-for="(order, k) in orders.data" :key="k">
        <td :data-label="$t('app.components.orders.fields.name')">{{order.name}}</td>
        <td :data-label="$t('app.components.orders.fields.nickname')">
          {{ $t('base.service_types.'+ order.type) }}<br>
          {{order.nickname}}
        </td>
        <td :data-label="$t('app.components.orders.fields.date')">
          {{order.date}}  <br>
          {{order.time_start}} - {{order.time_end}}
        </td>
        <td :data-label="$t('app.components.orders.fields.phone')">{{order.phone}}</td>
        <td :data-label="$t('app.components.orders.fields.comment')">{{order.comment}}</td>
        <td :data-label="$t('app.components.orders.fields.comment')">
          <div v-for="(service,k) in order.services" :key="k">
            {{service.name}}
          </div>
        </td>
        <td v-if="!master_filter" :data-label="$t('app.components.orders.fields.master')">{{order.master.name}}</td>
        <td v-if="!status_filter" :data-label="$t('app.components.orders.fields.status')">{{$t('app.components.orders.statuses.'+order.status)}}</td>
        <td>
          <b-dropdown  variant="link" toggle-class="text-decoration-none">
            <template #button-content >
              <i class="btn btn-dark btn-sm rounded-circle fa fa-align-justify"/>
            </template>
            <b-dropdown-item
                v-if="auth.role_list.includes('admin')"
                @click="openUpdatePopup(order)"
            >
              {{ $t('app.components.orders.actions.edit') }}
            </b-dropdown-item>
            <b-dropdown-item
                v-if="order.status == 'NEW'"
                @click="set_status(order, 'confirmed')"
            >
              {{ $t('app.components.orders.actions.check') }}
            </b-dropdown-item>
            <b-dropdown-item
                v-if="order.status == 'NEW'"
                @click="set_status(order, 'rejected')"
            >
              {{ $t('app.components.orders.actions.rejected') }}
            </b-dropdown-item>
            <b-dropdown-item
                v-if="order.status == 'CONFIRMED'"
                @click="set_status(order, 'penalty')"
            >
              {{ $t('app.components.orders.actions.penalty') }}
            </b-dropdown-item>
            <b-dropdown-item
                v-if="order.status == 'CONFIRMED'"
                @click="set_end(order)"
            >
              {{ $t('app.components.orders.actions.end') }}
            </b-dropdown-item>
            <b-dropdown-item
                v-if="auth.role_list.includes('admin')"
                @click="deleteOrder(order)"
            >
              {{ $t('app.components.orders.actions.delete') }}
            </b-dropdown-item>
          </b-dropdown>
        </td>
      </tr>
    </table>

    <div v-else-if="!page_load" class="text-center">
      <img src="~@/assets/not_found.svg"/>
      <h4 class="mt-3">{{ $t('app.components.orders.not_found') }}</h4>
    </div>


    <div class="row" v-if="orders.last_page > 1">
      <div class="col-lg-2 d-flex">
        <form-group
            custom_class="align-items-center mb-0"
          type="select"
          :items="[5,10,15]"
          v-model="orders.per_page"
        />
      </div>
      <div class="col-lg-8 d-flex">
        <b-pagination
            v-model="orders.page"
            :total-rows="orders.total"
            :per-page="orders.per_page"
            aria-controls="my-table"
            class="m-auto"
        ></b-pagination>
      </div>
      <div class="col-lg-2 d-flex align-items-center">
        <div class="ml-auto text-secondary">{{ $t('base.total') }} {{ this.orders.total }}</div>
      </div>
    </div>

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
import {masters, orders, update_order, delete_order} from "@/api";
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
    qty: {
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
        per_page: this.qty ? this.qty : 15,
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
    },
    'orders.per_page': function (){
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
      'salon_selected',
      'salons'
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
      // this.orders.data = [];
      // this.orders.total = 0;

      orders({
        page: this.orders.page,
        qty: this.orders.per_page,
        salon_id: this.salon_selected?.id,
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
        salon_id: this.salon_selected?.id
      }).then(response => {
        this.masters = response.data.data.masters.data
      })
    },
    closeCreatePopup(){
      this.showCreatePopup = false
      this.loadOrders()
    },
    set_status(order, status){
      update_order(order.id, {
        action: 'set-'+status
      })
          .then(() => {
            this.loadOrders()
          })
    },
    deleteOrder(order){
      delete_order(order.id).then(() => {
        this.loadOrders()
      })
      .catch((error) => {
        console.warn(error)
      })
    },
    set_end(order){
      var total = prompt(this.$t('app.components.orders.how_match'), 0);

      update_order(order.id, {
        action: 'set-completed',
        total: total
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
