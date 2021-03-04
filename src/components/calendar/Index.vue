<template>
  <div>
    <div class="row mb-2">
      <div class="col">


<!--        <b-dropdown size="lg"  variant="link" toggle-class="text-decoration-none" no-caret>-->
<!--          <template #button-content>-->
<!--            <a-->
<!--                class="btn btn-purpure fa fa-plus rounded-circle"-->
<!--            />-->
<!--          </template>-->
<!--          <b-dropdown-item >{{ $t('app.components.calendar.new_order') }}</b-dropdown-item>-->
<!--          <b-dropdown-item >{{ $t('app.components.calendar.new_action') }}</b-dropdown-item>-->
<!--        </b-dropdown>-->

      </div>

      <div class="mx-auto col  d-flex align-items-center">

        <i class="p-2 ml-auto fa fa-angle-left pointer" @click="calendarLeft" />
        <div class="px-2 text-center" style="width: 120px">
          <b>{{ months[month] }} {{ year }}</b>
        </div>
        <i class="p-2 mr-auto fa fa-angle-right pointer" @click="calendarRight" />
      </div>
      <div class="col"></div>
    </div>

    <div id="calendar-area" class="mb-4">
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
              :count="monthOrders[year + '-'+ monthFormat(month) + '-' + monthFormat(day.format('D'))]"
              :key="year + '-'+ monthFormat(month) + '-' + monthFormat(day.format('D'))"
              :attr-day="year + '-'+ monthFormat(month) + '-' + monthFormat(day.format('D'))"
          />
        </div>
      </div>
    </div>
    <orders-popup
      v-if="showOrdersPopup"
      :day="selectDay"
      @closePopup="closeOrdersPopup"
    />
  </div>
</template>

<script>
import {orders} from "@/api";
import CalendarDay from './Day';
import {mapGetters} from "vuex";
import OrdersPopup from "@/components/calendar/OrdersPopup";
export default {
  name: "CalendarIndex",
  components: {
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
      }
    }
  },
  created() {
    this.loadOrders()
  },
  watch: {
    'salon_selected.id': function(){
      this.loadOrders()
    },
    'year': function () {
      this.loadOrders()
    },
    'month': function () {
      this.loadOrders()
    }
  },
  methods: {
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
      }).then((r) => { this.monthOrders = r.data.data.count_by_days })
    },
    monthFormat(m){
      if (m < 9) return "0"+m;
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
      console.log(needDay)
    },
  },
  computed: {
    ...mapGetters([
      'salon_selected'
    ]),
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
