<template>
  <div style="height: calc(100vh - 200px)" >
    <div class="row">
      <div class="col-lg-6 m-auto text-center d-flex justify-content-between align-items-center">
        <i class="p-2 fa fa-angle-left pointer"
           @click="previousWeek"
        />
        <div class="px-2 text-center">
          <b>{{ week }}</b>
        </div>
        <i class="p-2 fa fa-angle-right pointer"
           @click="nextWeek"
        />
      </div>
    </div>
    <div
        ref="scheduler"
        style="height: calc(100% - 10px) !important;"
    >
    </div>

    <update
        v-if="showUpdatePopup"
        :order="select_order"
        @closePopup="closeUpdatePopup"
    />

    <create-disabled-time
      v-if="showCreateDisabledTime"
      :day="viewMenuDay"
      :first_hour="auth.organization.min_first_last_hour.first_hour"
      :last_hour="auth.organization.min_first_last_hour.last_hour"
      :master_id="this.master_filter"
      @closePopup="closeCreateBlockTime"
    />

    <div
        v-if="viewMenu"
        id="right-click-menu"
        :style="{
            top:top, left:left, right:right
          }"
    >
      <ul
          v-on:blur="closeMenu"
      >
        <li>{{viewMenuDay}}</li>
        <li v-if="days_disabled.includes(viewMenuDay)" @click="setDayStatus(0)" class="pointer">{{ $t('app.components.calendar.enabled') }}</li>
        <li v-else class="pointer" @click="setDayStatus(1)">{{ $t('app.components.calendar.disabled') }}</li>
        <li class="pointer" @click="createBlockTime()">{{ $t('app.components.calendar.disabled_time') }}</li>
      </ul>
    </div>

  </div>
</template>

<script>
import "dhtmlx-scheduler";
import "dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_limit"
import "dhtmlx-scheduler/codebase/locale/locale_ru"
import {masters, order, orders, update_masters, update_order, delete_order} from "@/api";
import {mapGetters} from "vuex";
import Update from "@/components/orders/Update";
import CreateDisabledTime from "@/components/calendar/CreateDisabledTime";

export default {
  name: 'scheduler',
  components: {CreateDisabledTime, Update},
  props: {
    master_filter: {}
  },
  data() {
    return {
      masters: {
        data: [],
        page: 1,
        per_page: 999,
        last_page: 1,
        total: 0,
      },
      orders: [],
      showUpdatePopup: false,
      select_order: {},
      viewMenu: false,
      viewMenuDay: null,
      days_disabled: [],
      top: null,
      left: null,
      right: null,
      week: "",
      showCreateDisabledTime: false,
    }
  },
  watch: {
    'salon_selected.id': function(){
      this.loadOrders()
      this.loadMasters()
    },
    'master_filter': function () {
      this.loadOrders()
    }
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

      this.masters.data.forEach(master => {
        data.push({
          value: master.id,
          text: master.name
        })
      })

      return data
    },
  },
  created() {
    this.loadMasters()
    //this.loadOrders()
  },
  mounted() {
    // eslint-disable-next-line no-undef
    scheduler.skin = "material";
    // eslint-disable-next-line no-undef
    scheduler.config.header = []
    // eslint-disable-next-line no-undef
    scheduler.xy.nav_height = 0;
    // eslint-disable-next-line no-undef
    scheduler.config.dblclick_create = false
    // eslint-disable-next-line no-undef
    scheduler.config.drag_create = false
    // eslint-disable-next-line no-undef
    scheduler.config.details_on_dblclick = false
    // eslint-disable-next-line no-undef
    scheduler.config.time_step = 30

    // eslint-disable-next-line no-undef
    scheduler.config.first_hour = this.auth.organization.min_first_last_hour.first_hour
    // eslint-disable-next-line no-undef
    scheduler.config.last_hour = this.auth.organization.min_first_last_hour.last_hour

    // eslint-disable-next-line no-undef
    scheduler.templates.hour_scale = function(date){
      // eslint-disable-next-line no-undef
      //console.log(date);
      // eslint-disable-next-line no-undef
      //return scheduler.date.date_to_str(scheduler.config.hour_date)(date);
      // eslint-disable-next-line no-undef
      return date.getHours() + " - " + (date.getHours() + 1)
    };


    // eslint-disable-next-line no-undef
    scheduler.attachEvent("onEmptyClick", (day, ev) => {
      if (this.master_filter){
        let date = this.$moment(day).format('YYYY-MM-DD')
        if (this.viewMenuDay == date) {
          this.viewMenuDay = null
          this.viewMenu = false;
        } else {
          this.viewMenuDay = date

          this.top = ev.clientY+5 + 'px';

          if (ev.clientX > (window.outerWidth / 2)) {
            this.left = null;
            this.right = (window.outerWidth - ev.clientX) + 'px'
          } else {
            this.left = ev.clientX+5 + 'px';
            this.right = null
          }



          this.viewMenu = true;
        }
      }


      return true;
    })

    // eslint-disable-next-line no-undef
    scheduler.attachEvent("onEventChanged", (id, ev) => {
      let day = this.$moment(ev.start_date).format('YYYY-MM-DD')
      let time_start = this.$moment(ev.start_date).format('HH:mm')
      let time_end = this.$moment(ev.end_date).format('HH:mm')
      let data = {
        action: 'set-period',
        date: day,
        time_start: time_start,
        time_end: time_end
      }

      update_order(id, data).then(() => {
        this.loadOrders()
      })
    });

    // eslint-disable-next-line no-undef
    scheduler.attachEvent("onDblClick", (id) => {
      order(id).then(response => {
        if (response.data.data.order.blocked){
          if (confirm("Вы точно хотите разблокировать время?")){
            delete_order(id).then(() => {
              this.loadOrders()
            })
          }
        }else {
          this.select_order = response.data.data.order
          this.showUpdatePopup = true
        }
      })

    });

    // eslint-disable-next-line no-undef
    scheduler.init(this.$refs.scheduler, new Date(), "week");
    this.calcWeekTitle();
  },
  methods: {
    calcWeekTitle(){
      // console.log(scheduler.getState().max_date, scheduler.getState().min_date)
      // eslint-disable-next-line no-undef
      this.filter_start = this.$moment(scheduler.getState().min_date).format("YYYY-MM-DD")
      // eslint-disable-next-line no-undef
      this.filter_end = this.$moment(scheduler.getState().max_date).format("YYYY-MM-DD")
      this.week = this.filter_start + " - " + this.filter_end
      this.loadOrders()
    },
    previousWeek(){
      // eslint-disable-next-line no-undef
      var currentDate = scheduler.getState().date, currentMode = scheduler.getState().mode;
      // eslint-disable-next-line no-undef
      var prevDate = scheduler.date.add(currentDate, -1, currentMode);
      // eslint-disable-next-line no-undef
      scheduler.setCurrentView(prevDate)
      this.calcWeekTitle()
    },
    nextWeek(){
      // eslint-disable-next-line no-undef
      var currentDate = scheduler.getState().date, currentMode = scheduler.getState().mode;
      // eslint-disable-next-line no-undef
      var nextDate = scheduler.date.add(currentDate, 1, currentMode);
      // eslint-disable-next-line no-undef
      scheduler.setCurrentView(nextDate)
      this.calcWeekTitle()
    },
    closeMenu(){
      this.viewMenu = false
    },
    closeUpdatePopup(){
      this.showUpdatePopup = false
      this.loadOrders()
    },
    createBlockTime(){
      this.showCreateDisabledTime = true
      this.closeMenu()
    },
    closeCreateBlockTime(data) {
      this.showCreateDisabledTime = false
      if (data.reload) {
        this.loadOrders()
      }
    },
    setDayStatus(status) {
      let action = 'set-disabled-day';

      if (status == 0) action = 'delete-disabled-day';

      let r = new FormData()
      r.append('action', action)
      r.append('date', this.viewMenuDay)

      update_masters(this.master_filter, r)
          .then(() => {
            this.viewMenu = false
            this.viewMenuDay = null
            this.loadOrders()
          })
    },
    loadOrders(){
      // eslint-disable-next-line no-undef
      scheduler.clearAll()
      this.days_disabled = []
      // eslint-disable-next-line no-undef
      scheduler.deleteMarkedTimespan();

      orders({
        page: 1,
        qty: 999,
        salon_id: this.salon_selected?.id,
        status: this.status_filter,
        master_id: this.master_filter,
        start: this.filter_start ? this.filter_start : this.day,
        end: this.filter_end ? this.filter_end : this.day,
        with_blocked: 1
      }).then(response => {
        let events = []

        response.data.data.orders.data.forEach(event => {
          if (event.blocked) {
            events.push({
              id: event.id,
              start_date: event.date + " " + event.time_start,
              end_date: event.date + " " + event.time_end,
              text: ``,
              color: 'gray'
            })
          }else {
            events.push({
              id: event.id,
              start_date: event.date + " " + event.time_start,
              end_date: event.date + " " + event.time_end,
              text: `#${event.id} <div class="d-none d-md-block"> ${event.name}<br> ${event.phone}<br> ${event.nickname} </div>`
            })
          }
        })
        // eslint-disable-next-line no-undef
        scheduler.parse(events)

        let disabled_days = response.data.data.disabled_days
        for (var day in disabled_days){
          if (disabled_days[day]){
            this.days_disabled.push(day)
            // eslint-disable-next-line no-undef
            scheduler.addMarkedTimespan({
              days:  new Date(day),
              zones: "fullday",
              type:  "dhx_time_block",
              css:   "red_section" // the name of applied CSS class
            });
          }
        }

        // eslint-disable-next-line no-undef
        scheduler.render()
      }).catch(error => {
        console.warn(error)
        this.page_load = false;
      })
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
      })
    },
  }
}
</script>

<style>
@import "~dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css";
</style>

<style>
.dhx_cal_event.dhx_cal_select_menu.dhx_cal_event_selected .dhx_body {
  display: none !important;
}
#right-click-menu {
  background: #FAFAFA;
  border: 1px solid #BDBDBD;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
  display: block;
  list-style: none;
  margin: 0;
  padding: 0;
  position: fixed;
  z-index: 999999;
}
#right-click-menu ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
#right-click-menu li {
  border-bottom: 1px solid #E0E0E0;
  margin: 0;
  padding: 5px 14px;
}

#right-click-menu li:hover:first-child {
  background: white;
  color: black;
}

#right-click-menu li:last-child {
  border-bottom: none;
}

#right-click-menu li:hover {
  background: #1E88E5;
  color: #FAFAFA;
}
.dhx_body {
  overflow: auto;
}
</style>
