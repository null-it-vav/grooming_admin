<template>
  <div class="card p-4">
    <div class="row">
      <div class="col-lg-4 mb-2">
        <form-group
            v-if="auth.role_list.includes('admin')"
            custom_class="mb-0"
            v-model="master_filter"
            type="select"
            :items="masters_list"
        />
      </div>

      <div class="mx-auto col-lg-4 mb-2  d-flex align-items-center" v-if="!master_filter">

        <i class="p-2 ml-auto fa fa-angle-left pointer" @click="calendarLeft" />
        <div class="px-2 text-center" style="width: 120px">
          <b>{{ months[month] }} {{ year }}</b>
        </div>
        <i class="p-2 mr-auto fa fa-angle-right pointer" @click="calendarRight" />
      </div>
      <div class="col-lg-4 mb-2"></div>
    </div>

    <div id="calendar-area" class="mb-4" v-if="!master_filter">
      <div id="day-bar">
        <div>{{ $t('base.days.0') }}</div>
        <div>{{ $t('base.days.1') }}</div>
        <div>{{ $t('base.days.2') }}</div>
        <div>{{ $t('base.days.3') }}</div>
        <div>{{ $t('base.days.4') }}</div>
        <div>{{ $t('base.days.5') }}</div>
        <div>{{ $t('base.days.6') }}</div>
      </div>
      <div id="calendar">
        <div
            v-for="(week,k) in weeks"
            :key="monthFormat(month) + '_' + k"
            class="calendar-week"
        >
          <calendar-day
              v-for="day in week"
              :day="day"
              @daySelect="openOrdersPopup"
              @setDayStatus="setDayStatus"
              :month_select="month"
              :count="monthOrders[year + '-'+ monthFormat(day.format('M')) + '-' + monthFormat(day.format('D'))]"
              :disabled="disabledDays[year + '-'+ monthFormat(day.format('M')) + '-' + monthFormat(day.format('D'))]"
              :can_block_day="master_filter ? true : false"
              :key="year + '-'+ monthFormat(day.format('M')) + '-' + monthFormat(day.format('D'))"
              :attr-day="year + '-'+ monthFormat(day.format('M')) + '-' + monthFormat(day.format('D'))"
          />
        </div>
      </div>
    </div>

    <scheduler v-if="master_filter" :master_filter="master_filter">

    </scheduler>

    <orders-popup
      v-if="showOrdersPopup"
      :day="selectDay"
      @closePopup="closeOrdersPopup"
    />
  </div>
</template>

<script>
import {masters, orders, update_masters} from "@/api";
import CalendarDay from './Day';
import {mapGetters} from "vuex";
import OrdersPopup from "@/components/calendar/OrdersPopup";
import FormGroup from "@/components/base/FormGroup";
import Scheduler from "@/components/calendar/Schedule";
export default {
  name: "CalendarIndex",
  components: {
    Scheduler,
    FormGroup,
    OrdersPopup,
    CalendarDay
  },
  data() {
    return {
      selectDay: '',
      showOrdersPopup: false,
      year: (new Date()).getFullYear(),
      month: (new Date()).getMonth() + 1,
      monthOrders: [],
      disabledDays: [],
      months: {
        1: this.$t("base.months.1"),
        2: this.$t("base.months.2"),
        3: this.$t("base.months.3"),
        4: this.$t("base.months.4"),
        5: this.$t("base.months.5"),
        6: this.$t("base.months.6"),
        7: this.$t("base.months.7"),
        8: this.$t("base.months.8"),
        9: this.$t("base.months.9"),
        10: this.$t("base.months.10"),
        11: this.$t("base.months.11"),
        12: this.$t("base.months.12"),
      },
      masters: {
        data: [],
        page: 1,
        per_page: 999,
        last_page: 1,
        total: 0,
      },
      master_filter: null,
    }
  },
  created() {
    if (!this.auth.role_list.includes('admin') && this.auth.role_list.includes('master')) {
      this.master_filter = this.auth.id
    } else {
      this.loadMasters()
    }
    this.loadOrders()
  },
  watch: {
    'salon_selected.id': function(){
      this.loadOrders()
      this.loadMasters()
    },
    'year': function () {
      this.loadOrders()
    },
    'month': function () {
      this.loadOrders()
    },
    'master_filter': function (){
      this.loadOrders()
    },
  },
  methods: {
    setDayStatus(data) {
      let action = 'set-disabled-day';

      if (data.status == 0) action = 'delete-disabled-day';

      let r = new FormData()
      r.append('action', action)
      r.append('date', data.day)

      update_masters(this.master_filter, r)
      .then(() => {
        if (data.status == 0) {
          this.$set(this.disabledDays, data.day, 0)
        } else {
          this.$set(this.disabledDays, data.day, 1)
        }
      })
    },
    openOrdersPopup(day){
      this.showOrdersPopup = true
      this.selectDay = day
    },
    closeOrdersPopup(){
      this.showOrdersPopup = false
    },
    loadOrders(){
      orders({
        action: 'count-by-days',
        date: this.year + ' -' + this.month,
        salon_id: this.salon_selected.id,
        master_id: this.master_filter
      }).then((r) => {
        this.monthOrders = r.data.data.count_by_days
        this.disabledDays = r.data.data.disabled_days
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
    monthFormat(m){
      if (m < 10) return "0"+m;
      return m;
    },
    calendarLeft() {
      if (this.month == 1) {
        this.month = 12;
        this.year--;
      } else {
        this.month--;
      }
    },
    calendarRight() {
      if (this.month == 12) {
        this.month = 1;
        this.year++;
      } else {
        this.month++;
      }
    },
    daySelect(day){
      var needDay = this.year + '-'+ this.monthFormat(this.month) + '-' + day
      this.selectDay = needDay;
    },
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
    days() {
      // Generating all days in current month
      let days = [];
      let currentDay = this.$moment(`${this.year}-${this.month}-1`, 'YYYY-M-D');
      do {
        days.push(currentDay);
        currentDay = this.$moment(currentDay).add(1, 'days');
      } while ((currentDay.month() + 1) === this.month);
      // Add previous days to start
      currentDay = this.$moment(days[0]);
      const SUNDAY = 0;
      const MONDAY = 1;
      if (currentDay.day() !== MONDAY) {
        do {
          currentDay = this.$moment(currentDay).subtract(1, 'days');
          days.unshift(currentDay);
        } while(currentDay.day() !== MONDAY);
      }
      // Add following days to end
      currentDay = this.$moment(days[days.length - 1]);
      if (currentDay.day() !== SUNDAY) {
        do {
          currentDay = this.$moment(currentDay).add(1, 'days');
          days.push(currentDay);
        } while(currentDay.day() !== SUNDAY);
      }
      return days;
    },
    weeks() {
      let weeks = [];
      let week = [];
      for (let day of this.days) {
        week.push(day);
        if (week.length === 7) {
          weeks.push(week);
          week = [];
        }
      }
      return weeks;
    }
  }
}
</script>
