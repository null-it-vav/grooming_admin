<template>
  <div>
    <div class="py-2">
      <router-link
          :to="{ name: 'home.services' }"
          class="btn btn-rounded btn-hint-white"
      >
        <i class="fa fa-chevron-left"/> Назад
      </router-link>
    </div>

    <div class="card p-4">
      <form
          @submit.prevent="submit"
      >
        <div
            v-for="(day, k) in service.schedule"
            :key="k"
            class="mb-3 border-bottom pb-3 pb-md-1"
        >
          <div class="d-flex align-items-center">
            <h4>{{ day.name }}</h4>
            <form-group
                custom_class="ml-2"
                type="checkbox"
                v-model="day.active"
            />
          </div>
          <div class="d-flex align-items-center" v-if="day.active">
            <b-badge
                v-for="(p,j) in day.periods"
                :key="j"
                class="p-2 mr-2 d-flex align-items-center"
            >
              <form-group
                  class="m-0"
                  type="select"
                  :items="times"
                  v-model="p.start"
                  custom_class="m-0"
                  required
              />
              <b class="ml-2">
                -
              </b>
              <form-group
                  class="ml-2"
                  type="select"
                  :items="times"
                  v-model="p.end"
                  custom_class="m-0"
                  required
              />

              <i class="ml-2 text-white pointer fa fa-trash" @click="deletePeriod(day, j)"/>
            </b-badge>
            <a
                class="btn btn-success rounded-circle fa fa-plus"
                @click="addPeriod(day)"
            />
          </div>
        </div>
        <div>
          <button type="submit" class="btn btn-success">{{ $t('base.save') }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {service, update_service} from "@/api";
import FormGroup from "@/components/base/FormGroup";

export default {
  name: "Schedule",
  components: {FormGroup},
  props: {
    service_id: null
  },
  data() {
    return {
      service: {},
    }
  },
  computed: {
    times() {
      var quarterHours = ["00", "30"];
      var times = [];
      for(var i = 0; i < 24; i++){
        for(var j = 0; j < 2; j++){
          if(i < 10){
            times.push("0" + i + ":" + quarterHours[j]);
          } else {
            times.push(i + ":" + quarterHours[j]);
          }
        }
      }
      return times
    }
  },
  created() {
    this.getService()
  },
  methods: {
    getService() {
      service(this.service_id, {})
          .then((response) => {
            this.service = response.data.data.service
            if (this.service.prices) {
              this.service.prices.forEach(price => {
                this.prices[price.breed_id] = price.price
                this.duration[price.breed_id] = price.duration
              })
            }
          })
    },
    deletePeriod(day, j){
      day.periods.splice(j, 1);
    },
    addPeriod(day){
      day.periods.push({
        start: "",
        end: ""
      })
    },
    submit() {
      update_service(this.service.id, {
        action: 'set-schedule',
        schedule: this.service.schedule
      }).then(response => {
        this.service.schedule = response.data.data.service.schedule
      })
    }
  }
}
</script>

<style scoped>
  .badge {
    font-size: 18px;
  }
</style>
