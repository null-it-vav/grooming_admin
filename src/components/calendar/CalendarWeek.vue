<template>
  <b-card>
    <div class="mb-2 d-flex align-items-center">
      <div class="ml-auto">
        <i class="p-2 ml-auto fa fa-angle-left pointer" @click="calendarLeft" />
      </div>
      <div>
        {{ week[0] | moment('DD MMM') }} {{is_new_year ? week[0].year() : ''}} - {{ week[6] | moment('DD MMM') }} {{ week[0] | moment('Y') }}
      </div>
      <div class="mr-auto">
        <i class="p-2 mr-auto fa fa-angle-right pointer" @click="calendarRight" />
      </div>
    </div>
    <div class="cl">
      <div class="cl-view-container">
        <div class="cl-header">
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
          <div class="cl-view-scrollable" style="max-height: 500px">
            <div class="cl-view-pane">
              <div class="cl-week">
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
                    v-for="(day,k) in auth.organization.schedule"
                    :key="k"
                    class="cl-day"
                >
                  <div
                      v-for="(time,k) in hourse_cells"
                      :key="'time_'+k"
                      class="cl-hour"
                  />
                  <div
                      class="cl-event"
                      v-for="event in events.filter(event => event.date == week[k].format('Y-MM-DD'))"
                      :key="event.id"
                      :style="
                          'top:'+ calcTop(event.date, event.time_start) + 'px;' +
                          'height:'+ calcHeight(event.date, event.time_start, event.time_end) + 'px;'
                      "
                  >
                    <div
                        class="cl-event-menu"
                    >
                      {{event.id}} {{ event.time_start }} - {{ event.time_end }}
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
  </b-card>
</template>

<script>
import {mapGetters} from "vuex";
import {orders} from "@/api";

export default {
  name: "CalendarWeek",
  data() {
    return {
      shift: 0,
      events: []
    }
  },
  watch: {
    'shift': function () {
      this.loadOrders()
    }
  },
  computed: {
    ...mapGetters([
        'auth',
        'settings'
    ]),
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
    }
  },
  created() {
    this.loadOrders();
  },
  methods: {
    calendarLeft() {
      this.shift--
    },
    calendarRight() {
      this.shift++
    },
    loadOrders(){
      orders({
        page: 1,
        qty: 999,
        start: this.week[0].format('Y-MM-DD'),
        end: this.week[6].format('Y-MM-DD'),
        with_blocked: 1,
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
