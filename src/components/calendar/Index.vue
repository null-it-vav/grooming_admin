<template>
  <div>
    <div class="row mb-2">
      <div class="col col-lg-3">
        <a
            class="btn btn-purpure"

        >
          {{ $t("app.base.create") }}
        </a>
      </div>
      <div class="ms-auto col col-lg-3 d-flex align-items-center">

        <i class="p-2 ms-auto fa fa-angle-left pointer" @click="calendarLeft" />
        <div class="px-2" style="width: 120px">
          {{ year }} {{ months[month] }}
        </div>
        <i class="p-2 fa fa-angle-right pointer" @click="calendarRight" />
      </div>
    </div>

    <div id="calendar-area" class="mb-4">
      <div id="day-bar">
        <div>Пн</div>
        <div>Вт</div>
        <div>Ср</div>
        <div>Чт</div>
        <div>Пт</div>
        <div>Сб</div>
        <div>Вс</div>
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
              @daySelect="daySelect"
              :count="monthOrders[year + '-'+ monthFormat(month) + '-' + day.format('D')]"
              :key="year + '-'+ monthFormat(month) + '-' + day.format('D')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import CalendarDay from './Day';
export default {
  name: "CalendarIndex",
  components: {
    CalendarDay
  },
  data() {
    return {
      selectDay: '',
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
  methods: {
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
