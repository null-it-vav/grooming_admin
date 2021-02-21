<template>
  <base-popup
      :caption="$t('app.components.orders.update')"
      @closePopup="closePopup"
      :success_error="success_error"
      dialogSize="modal-xl"
  >
    <template v-slot:body>
      <form
          @submit.prevent="submit"
          class="row"
      >
        <div class="col-lg-4">
          <form-group
              type="text"
              :label="$t('app.components.orders.fields.name')"
              v-model="order.name"
              required
              name="name"
              :errors="errors"
          />
          <form-group
              type="text"
              :label="$t('app.components.orders.fields.phone')"
              v-model="order.phone"
              name="phone"
              required
              :errors="errors"
          />
          <form-group
              type="email"
              :label="$t('app.components.orders.fields.email')"
              v-model="order.email"
              name="email"
              required
              :errors="errors"
          />
          <form-group
              type="text"
              :label="$t('app.components.orders.fields.nickname')"
              v-model="order.nickname"
              name="nickname"
              required
              :errors="errors"
          />
          <form-group
              type="textarea"
              :label="$t('app.components.orders.fields.comment')"
              v-model="order.comment"
              name="comment"
              required
              :errors="errors"
          />
        </div>
        <div class="col-lg-4">
          <form-group
              :label="$t('app.components.orders.fields.master')"
            type="select"
            :items="masters_select"
            required
            :errors="errors"
            v-model="order.master_id"
          />

          <div v-if="order.master_id" class="form-group">

            <v-date-picker
                :locale="$i18n.locale"
                v-model="select_date"
                :attributes="attributes"
                required
            >
              <template v-slot="{ inputValue, inputEvents }">
                <label>{{$t('app.components.orders.fields.date')}}</label>
                <input
                    class="form-control"
                    :value="inputValue"
                    v-on="inputEvents"
                />
              </template>
            </v-date-picker>
          </div>
          <form-group
              :label="$t('app.components.orders.fields.time_start')"
              v-if="order.date"
              v-model="order.time_start"
              type="select"
              required
              :items="times"
              :errors="errors"
          />

        </div>

        <div class="col-lg-4">
          <form-group
              :label="$t('base.service_type')"
              type="select"
              :items="[
                  { value: null, text: $t('base.service_types.select'), disabled: true },
                  { value: 'cat', text: $t('base.service_types.cat') },
                  { value: 'dog', text: $t('base.service_types.dog') },
                  { value: 'other', text: $t('base.service_types.other') }
              ]"
              required

              v-model="filter_type"
          />
          <div v-for="s in services" :key="s.id" class="mb-2">
            <div class="d-flex">
              <b-checkbox :value="s.id" v-model="services_select" size="sm"  switch/>
              {{s.name}}
            </div>
          </div>

          <form-group
              :label="$t('app.components.orders.fields.total_price')"
              v-model="order.total_price"
              type="number"
              name="total_price"
              :errors="errors"
          />
        </div>
        <div class="col-lg-12 d-flex mt-2">
          <button type="submit" class="m-auto btn btn-success">
            {{$t('base.update')}}
          </button>
        </div>
      </form>
    </template>
  </base-popup>
</template>

<script>
import BasePopup from "@/components/base/Popup";
import FormGroup from "@/components/base/FormGroup";
import {masters, services, workingDiapasons, update_order} from "@/api";
import {mapGetters} from "vuex";
import format from "date-format";

export default {
  name: "Update",
  props: {
    order: {
      type: Object
    }
  },
  data() {
    return {
      map: null,
      errors:{},
      masters: [],
      select_date: this.order.date,
      wdList: [],
      success_error: {
        success: false,
        error: false,
        msg: null
      },
      day_times: [],
      filter_type: this.order.type,
      services: [],
      services_select: [],
      old_date: this.order.date
    }
  },
  computed: {
    ...mapGetters([
        'auth',
      'salon_selected'
    ]),
    masters_select(){
      var data = [];
      data.push({
        value: null,
        text: this.$t('base.select')
      })

      this.masters.forEach(m => {
        data.push({ value: m.id, text: m.name })
      })

      return data
    },
    times() {
      return this.day_times.map(row => row.time)
      // return this.day_times.map(row => format('hh:mm', (new Date(row.time))))
    },
    attributes() {
      return [
        {
          dot: 'green',
          dates: this.wdAllowedDates,
        },
        // {
        //   key: 'today',
        //   highlight: true,
        //   dates: new Date()
        // }
      ]
    },

    wdAllowedDates(){
      if(!this.wdList){
        return []
      }
      let output = []
      this.wdList.forEach(item=>{

        output.push(new Date(item.days))
      })
      return output;
    },
  },
  watch: {
    'order.master_id': function (){
      this.loadDates()
    },
    'select_date': function (){
      this.order.date = format('yyyy-MM-dd', this.select_date)
      this.loadByDay()
    },
    'filter_type': function (){
      this.services_select = [];
      this.loadServices()
    }
  },
  created() {
    this.loadMasters()
    this.loadDates()
    this.loadByDay()
    this.loadServices()

    this.order.services.forEach(row => {
      this.services_select.push(row.id)
    })
  },
  components: {FormGroup, BasePopup},
  methods: {
    submit(){
      var data = {};
      data.name = this.order.name
      data.phone = this.order.phone
      data.email = this.order.email
      data.nickname = this.order.nickname
      data.comment = this.order.comment
      data.master_id = this.order.master_id
      data.date = this.order.date
      data.time_start = this.order.time_start
      data.total_price = this.order.total_price
      data.services = this.services_select

      update_order(this.order.id, data)
          .then(() => {
            this.success_error.success = true
            this.errors = {}
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
    },
    closePopup() {
      this.$emit('closePopup');
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

    loadServices(){
      services({
        page: 1,
        qty: 999,
        type: this.filter_type
      }).then(response => {
        this.services = response.data.data.services.data
      })
    },

    loadDates(){
      workingDiapasons({
        organization_id: this.auth.organization.id,
        master_id: this.order.master_id,
        type: "days"
      }).then(response => {

        this.wdList = response.data
      })
    },
    loadByDay(){
      workingDiapasons({
        organization_id: this.auth.organization.id,
        master_id: this.order.master_id,
        type: "by_day",
        day: this.order.date,
        without_order_id: this.order.id
      }).then(response => {
        this.day_times = response.data

        if (this.old_date == this.order.date){
          this.day_times.unshift({
            time: this.order.time_start
          })
        }
      })
    },
    allowedDates(val) {
      return this.wdAllowedDates.find(item=> item === val)
    },
  }
}
</script>
