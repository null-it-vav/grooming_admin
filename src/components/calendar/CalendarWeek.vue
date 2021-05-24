<template>
  <b-card class="p-0" ref="clWindows">
    <div class="mb-2 row align-items-center" ref="clFilter">
      <div class="col-lg-2 mb-2">
        <form-group
            v-if="auth.role_list.includes('admin')"
            custom_class="mb-0"
            v-model="master_filter"
            type="select"
            sm
            :items="masters_list"
        />
      </div>
      <div class="ml-auto">
        <i class="p-2 ml-auto fa fa-angle-left pointer" @click="calendarLeft" />
      </div>
      <div>
        {{ week[0] | moment('DD MMM') }} {{is_new_year ? week[0].year() : ''}} - {{ week[6] | moment('DD MMM') }} {{ week[0] | moment('Y') }}
      </div>
      <div class="mr-auto">
        <i class="p-2 mr-auto fa fa-angle-right pointer" @click="calendarRight" />
      </div>
      <div class="col-lg-2"/>
    </div>
    <div class="cl">
      <div class="cl-view-container">
        <div class="cl-header" ref="clHeader">
          <div class="cl-hour-list">

          </div>
          <div
              v-for="(day,k) in auth.organization.schedule"
              :key="k"
              class="cl-day"
          >
            <div>
              {{ day.name }},
              {{ week[k] | moment('D') }}
            </div>
          </div>
        </div>
        <div class="cl-view-bottom">
          <div class="cl-view-scrollable" :style="`height: ${cl_height}px`">
            <div class="cl-view-pane">
              <div
                  class="cl-week"
                  @mousemove="testmousemove"
                  @mouseup="weekMouseUp"
              >
                <div class="cl-hour-list">
                  <div
                      v-for="(time,k) in hourse_cells / 2"
                      :key="'time_'+k"
                      class="cl-hour"
                  >
                    {{ auth.organization.min_first_last_hour.first_hour + time - 1 }}:00
                  </div>
                </div>
                <div
                    v-for="(day,k) in week"
                    :key="k"
                    class="cl-day"
                    ref="dayColumns"
                    @mouseleave="leaveCellDay(day)"
                    @mouseenter="dayColumnsEnter(day)"
                    @mouseup="mouseupCellDay(day)"
                >
                  <div
                      v-for="(time,t) in hourse_cells"
                      :key="'time_'+k+'_'+t"
                      class="cl-hour"
                      :class="{
                        'cl-hour-disabled': disabledTimes[day.format('YYYY-MM-DD')] && disabledTimes[day.format('YYYY-MM-DD')][t],
                        'cl-hour-disabled-time': (
                            !(`${(Math.round(auth.organization.min_first_last_hour.first_hour + time / 2) - 1)}:00` >= auth.organization.schedule[k]['start']) ||
                            !((auth.organization.schedule[k].end) > (`${(Math.round(auth.organization.min_first_last_hour.first_hour + time / 2) - 1)}:00`)) ||
                            !auth.organization.schedule[k].active
                        ),
                      }"
                      @mousedown="mouseDownDisabledTime(day,t)"
                      @mouseenter="addDisabledTime(day,t)"
                  />
                  <div
                      class="cl-event"
                      v-for="event in events.filter(event => event.date == week[k].format('Y-MM-DD'))"
                      :key="event.id"
                      :style="
                          'top:'+ calcTop(event.date, event.time_start) + 'px;' +
                          'height:'+ calcHeight(event.date, event.time_start, event.time_end) + 'px;'
                      "
                      :class="{
                        'cl-event-select': event.id == select_event.id
                      }"
                  >
                    <div class="mb-1">
                      <a class="fa fa-edit text-white" @click="openEvent(event)"/>
                    </div>
                    <div
                        class="cl-event-menu pointer"
                        @mousedown="testmousedown(event, $event)"
                        @touchstart="touchdown(event, $event)"
                        @mouseup="testmouseup()"
                        @touchend="testmouseup()"
                        @touchmove="touchmove"
                    >
                      {{event.date}} {{ event.time_start }} - {{ event.time_end }}
                      <div class="d-none d-md-block">
                        {{event.client.name}}<br>
                        {{event.client.phone}}<br>
                        {{event.pet.nickname}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <update
        v-if="showUpdatePopup"
        :order="open_event"
        @closePopup="closeUpdatePopup"
    />

  </b-card>
</template>

<script>
import {mapGetters} from "vuex";
import {masters, orders, update_order} from "@/api";
import Update from "@/components/orders/Update";
import FormGroup from "@/components/base/FormGroup";

export default {
  name: "CalendarWeek",
  components: {FormGroup, Update},
  data() {
    return {
      shift: 0,
      events: [],
      select_event: {},
      open_event: {},
      click_position: {
        clientY: null
      },
      test_shift: 0,
      mouse_day: '',
      weekMouseXCoordinate: {},
      showUpdatePopup: false,
      disabledTime: false,
      disabledTimes: {},
      master_filter: null,
      masters: {
        data: [],
        page: 1,
        per_page: 999,
        last_page: 1,
        total: 0,
      },
      cl_height: 500
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.pageResize);
  },
  created() {
    this.loadOrders();
    if (!this.auth.role_list.includes('admin') && this.auth.role_list.includes('master')) {
      this.master_filter = this.auth.id
    } else {
      this.loadMasters()
    }
  },
  mounted() {
    this.dayColumnsEnter()
    this.pageResize()
    window.addEventListener("resize", this.pageResize);
  },
  watch: {
    'shift': function () {
      this.loadOrders()
    },
    'master_filter': function (){
      this.loadOrders()
    },
  },
  computed: {
    ...mapGetters([
        'auth',
        'salon_selected'
    ]),
    first_time() {
      return this.auth.organization.min_first_last_hour.first_hour + ':00'
    },
    last_time() {
      return this.auth.organization.min_first_last_hour.last_hour + ':00'
    },
    hourse_cells(){
      return (this.auth.organization.min_first_last_hour.last_hour - this.auth.organization.min_first_last_hour.first_hour) * 2;
    },
    week() {
      let start_day = this.$moment().startOf('week').add(this.shift*7, 'days')
      let data = {};
      for (let i =0;i<7;i++) {
        data[i] = start_day.clone().add(i,'days')
      }
      return data
    },
    is_new_year() {
      return this.week[0].year() !== this.week[6].year()
    },
    masters_list: function (){
      var data = [];
      data.push({
        value: null,
        text: this.master_filter ? this.$t('app.components.orders.filters.full_schedule') : this.$t('app.components.orders.filters.master_select')
      })

      this.masters.data.forEach(master => {
        data.push({
          value: master.id,
          text: master.name
        })
      })

      return data
    },
  },
  methods: {
    calendarLeft() {
      this.shift--
    },
    calendarRight() {
      this.shift++
    },
    loadMasters(){
      masters({
        page: this.masters.page,
        qty: this.masters.per_page,
        salon_id: this.salon_selected.id,
        show_deleted: this.show_deleted ? 1 : 0
      }).then(response => {
        this.masters.data = response.data.data.masters.data
        this.masters.total = response.data.data.masters.total
        this.masters.last_page = response.data.data.masters.last_page
        if (this.masters.total == 1) {
          this.master_filter = this.masters.data[0].id
        }
      })
    },
    loadOrders(){
      orders({
        page: 1,
        qty: 999,
        start: this.week[0].format('Y-MM-DD'),
        end: this.week[6].format('Y-MM-DD'),
        with_blocked: 1,
        salon_id: this.salon_selected.id,
        master_id: this.master_filter,
        with: [
            'pet',
            'client'
        ]
      })
      .then(response => {
        this.events = response.data.data.orders.data
      })
    },
    calcTop(date, time){
      //сколько по 30 минут
      let a = (this.$moment(date + ' ' + time) - this.$moment(date + ' ' + this.auth.organization.min_first_last_hour.first_hour)) / 1000 / 3600 * 2
      return a * 40
    },
    calcHeight(date, time_start, time_end){
      let a = (this.$moment(date + ' ' + time_end) - this.$moment(date + ' ' + time_start)) / 1000 / 3600 * 2
      return a * 40
    },
    testmousedown(event, data){
      this.select_event = event
      this.click_position = {
        clientY: data.clientY,
        clientX: data.clientX,
      }
    },
    touchdown(event, data){
      this.select_event = event
      this.click_position = {
        clientY: data.touches[0].clientY,
        clientX: data.touches[0].clientX,
      }
      console.log(data.touches[0])
    },
    testmouseup(){
      if (this.select_event) this.saveOrder(this.select_event)
      this.select_event = {}
    },
    testmousemove(data){
      let event = this.select_event
      if (event.id){
        let y = data.clientY - this.click_position.clientY
        let shift = (y > 0) ? Math.floor(y / 40) : Math.ceil(y / 40)
        if (shift != 0){
          let time_start = this.$moment(event.date + ' ' + event.time_start).add(shift * 30, 'minutes').format('HH:mm')
          let time_end = this.$moment(event.date + ' ' + event.time_end).add(shift * 30, 'minutes').format('HH:mm')
          if (time_start >= this.first_time && time_end <= this.last_time){
            this.click_position.clientY = data.clientY
            event.time_start = time_start
            event.time_end = time_end
            event.changed = true
          }
        }
        if (this.mouse_day){
          let need_day = this.weekMouseXCoordinate.filter(row => row.start < data.clientX && data.clientX < row.end)
          if (need_day[0]){
            let day = this.$moment(event.date).startOf('week').clone().add(need_day[0].index, 'days').format('YYYY-MM-DD')
            if (this.select_event.date != day){
              event.date = day
              event.changed = true
            }
          }
        }
      }
    },
    weekMouseUp(){
      if (this.select_event) this.saveOrder(this.select_event)
      this.select_event = {}
    },
    dayColumnsEnter(day = null) {
      if (this.select_event.id) return true;
      if (day) this.mouse_day = day.format('YYYY-MM-DD')
      let data = []
      let k = 0;
      this.$refs.dayColumns.forEach(day => {
        data.push({
          index: k,
          start: day.getBoundingClientRect().x,
          end: day.getBoundingClientRect().x + day.clientWidth
        })
        k++;
      })
      this.weekMouseXCoordinate = data
    },
    touchmove(data){
      let event = this.select_event
      if (event.id) {
        let y = data.touches[0].clientY - this.click_position.clientY
        let shift = (y > 0) ? Math.floor(y / 40) : Math.ceil(y / 40)
        if (shift != 0){
          let time_start = this.$moment(event.date + ' ' + event.time_start).add(shift * 30, 'minutes').format('HH:mm')
          let time_end = this.$moment(event.date + ' ' + event.time_end).add(shift * 30, 'minutes').format('HH:mm')
          if (time_start >= this.first_time && time_end <= this.last_time){
            this.click_position.clientY = data.touches[0].clientY
            event.time_start = time_start
            event.time_end = time_end
            event.changed = true
          }
        }

        let need_day = this.weekMouseXCoordinate.filter(row => row.start < data.touches[0].clientX && data.touches[0].clientX < row.end)
        if (need_day[0]){
          let day = this.$moment(event.date).startOf('week').clone().add(need_day[0].index, 'days').format('YYYY-MM-DD')
          if (this.select_event.date != day){
            event.date = day
            event.changed = true
          }
        }

      }
    },
    saveOrder(event){
      if (event.id && event.changed){
        let data = {
          action: 'set-period',
          date: event.date,
          time_start: event.time_start,
          time_end: event.time_end
        }
        event.changed = false
        update_order(event.id, data).then(() => {
          //this.loadOrders()
        })
      }
    },
    openEvent(event){
      this.open_event = event
      this.showUpdatePopup = true
    },
    closeUpdatePopup(){
      this.showUpdatePopup = false
    },
    mouseDownDisabledTime(day, time) {
      if (!this.disabledTime) {
        this.disabledTime = true
        let d = day.format('YYYY-MM-DD')
        if (!this.disabledTimes[d]) this.disabledTimes[d] = {}
        this.disabledTimes[d][time] = this.disabledTimes[d][time] ? !this.disabledTimes[d][time] : true
      }
    },
    addDisabledTime(day, time){
      let d = day.format('YYYY-MM-DD')
      if (this.disabledTime) {
        if (!this.disabledTimes[d]) this.disabledTimes[d] = {}
        this.disabledTimes[d][time] = this.disabledTimes[d][time] ? !this.disabledTimes[d][time] : true
      }
    },
    mouseupCellDay(day){
      if (this.disabledTime){
        this.disabledTime = false
      }
      let d = day.format('YYYY-MM-DD')
      console.log(this.disabledTimes[d])
    },
    leaveCellDay(day){
      if (this.disabledTime) {
        let d = day.format('YYYY-MM-DD')
        console.log(this.disabledTimes[d])
        this.mouse_day = null
      }
    },
    pageResize() {
      let top = this.$refs.clWindows.getBoundingClientRect().top
      let height = window.innerHeight;

      this.cl_height = height - top - this.$refs.clFilter.clientHeight - this.$refs.clHeader.clientHeight - 50;
    }
  }
}
</script>

<style>
 .cl-event {
   left: 0%;
   width: 100%;
   background-color: rgb(179, 156, 219);
   margin-left: 0px;
   margin-right: 0px;
   text-decoration: inherit;
 }
</style>
