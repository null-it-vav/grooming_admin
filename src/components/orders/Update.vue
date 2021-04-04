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
              name="duration"
              :label="$t('app.components.orders.fields.duration')"
              type="select"
              v-model="order.duration"
              :items="[
                  { value: 30, text: $t('base.durations.30') },
                  { value: 60, text: $t('base.durations.60') },
                  { value: 90, text: $t('base.durations.90') },
                  { value: 120, text: $t('base.durations.120') },
                  { value: 150, text: $t('base.durations.150') },
                  { value: 180, text: $t('base.durations.180') },
                  { value: 210, text: $t('base.durations.210') },
                  { value: 240, text: $t('base.durations.240') },
                  { value: 270, text: $t('base.durations.270') },
                  { value: 300, text: $t('base.durations.300') },
                  { value: 330, text: $t('base.durations.330') },
                  { value: 360, text: $t('base.durations.360') },
                  { value: 390, text: $t('base.durations.390') },
                  { value: 420, text: $t('base.durations.420') },
                  { value: 450, text: $t('base.durations.450') },
                  { value: 480, text: $t('base.durations.480') },
              ]"
          />

          <form-group
              :label="$t('app.components.orders.fields.total_price')"
              v-model="order.total_price"
              type="number"
              name="total_price"
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
              <template v-slot="{ inputValue, togglePopover }">
                <label>{{$t('app.components.orders.fields.date')}}</label>
                <div
                    class="input-group"
                    @click="togglePopover()"
                >
                  <input
                      required
                      disabled
                      class="form-control"
                      :value="inputValue"
                      style="background-color: #fff"
                  />
                  <div class="input-group-append date-button">
                    <i
                        class="input-group-text fa fa-calendar pointer"
                    />
                  </div>
                </div>
              </template>
            </v-date-picker>
          </div>

          <div v-if="order.date && times.length == 0 && !times_load" class="text-danger">
            {{ $t('app.components.orders.day_full') }}
          </div>
          <form-group
              :label="$t('app.components.orders.fields.time_start')"
              v-if="order.date && times.length > 0"
              v-model="order.time_start"
              type="select"
              required
              :items="times"
              :errors="errors"
          />

<!--          <form-group-->
<!--              :label="$t('app.components.orders.fields.time_start')"-->
<!--              v-if="order.date"-->
<!--              v-model="order.time_start"-->
<!--              type="select"-->
<!--              required-->
<!--              :items="times"-->
<!--              :errors="errors"-->
<!--          />-->

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
      old_date: this.order.date,
      times_load: true
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
      this.$set(this.order, 'time_start', null)
      this.$set(this.order, 'time_end', null)
    },
    'filter_type': function (){
      this.services_select = [];
      this.loadServices()
    },
    'order.duration': function (){
      if (this.order.date) {
        this.loadDates()
        this.loadByDay()
      }
    },
    'services_select': function () {
      let duration = 0;
      this.services.forEach(row => {
        if (this.services_select.includes(row.id)){
          duration += row.duration
        }
      })
      if (duration)
        this.order.duration = duration;
      // if (this.order.services.length > 0) {
      //   this.loadByDay()
      // }
    }
  },
  async created() {
    this.times_load = true
    await this.loadMasters()
    await this.loadDates()
    await this.loadByDay()
    await this.loadServices()
    this.times_load = false
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
      data.duration = this.order.duration
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
    async loadMasters(){
      masters({
        page: 1,
        qty: 999,
        salon_id: this.salon_selected.id
      }).then(response => {
        this.masters = response.data.data.masters.data
      }).catch(() => {
      })
    },

    async loadServices(){
      services({
        page: 1,
        qty: 999,
        type: this.filter_type
      }).then(response => {
        this.services = response.data.data.services.data
      }).catch(() => {
      })
    },

    async loadDates(){
      workingDiapasons({
        organization_id: this.auth.organization.id,
        master_id: this.order.master_id,
        type: "days",
        services: this.order.services.map((row) => row.id),
        duration: this.order.duration
      }).then(response => {
        this.wdList = response.data
      }).catch(() => {
      })
    },
    async loadByDay(){
      workingDiapasons({
        organization_id: this.auth.organization.id,
        master_id: this.order.master_id,
        type: "by_day",
        day: this.order.date,
        exclude_order_id: this.order.id,
        services: this.order.services.map((row) => row.id),
        duration: this.order.duration
      }).then(response => {
        this.day_times = response.data
        // if (this.old_date == this.order.date){
        //   this.day_times.unshift({
        //     time: this.order.time_start
        //   })
        // }
      }).catch(() => {
      })
    },
    allowedDates(val) {
      return this.wdAllowedDates.find(item=> item === val)
    },
  }
}
</script>
