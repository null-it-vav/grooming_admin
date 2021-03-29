<template>
  <base-popup
      :caption="$t('app.components.calendar.disabled_time')"
      @closePopup="closePopup"
      :success_error="success_error"
  >
    <template v-slot:body>
      <form
          @submit.prevent="submit"
          class="row"
      >
        <div class="col-lg-4">
          <form-group
              :label="$t('app.components.orders.fields.date')"
              v-model="day"
              type="text"
              disabled
              :errors="errors"
          />
        </div>
        <div class="col-lg-4">
          <form-group
              :label="$t('app.components.orders.fields.time_start')"
              v-model="time_start"
              type="select"
              required
              :items="times"
              :errors="errors"
          />
        </div>
        <div class="col-lg-4">
          <form-group
              name="duration"
              :label="$t('app.components.orders.fields.duration')"
              type="select"
              required
              v-model="duration"
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
        </div>
        <div class="col-lg-12 d-flex mt-2">
          <button type="submit" class="m-auto btn btn-success">
            {{$t('app.components.calendar.disabled_save')}}
          </button>
        </div>
      </form>
    </template>
  </base-popup>
</template>

<script>
import BasePopup from "@/components/base/Popup";
import FormGroup from "@/components/base/FormGroup";
import {create_orders} from "@/api";
import {mapGetters} from "vuex";
export default {
name: "CreateDisabledTime",
  components: {FormGroup, BasePopup},
  props: {
    day: {
      type: String
    },
    first_hour: {
      type: Number
    },
    last_hour: {
      type: Number
    },
    master_id: {
      type: Number
    }
  },
  data() {
    return {
      errors: {},
      success_error: {
        success: false,
        error: false
      },
      time_start: null,
      duration: null,
    }
  },
  computed: {
    ...mapGetters([
      'auth',
    ]),
    times() {
      var start = new Date((new Date()).setHours(this.first_hour, 0, 0,0))
      var array = [];
      for(let i = 0; i < ((this.last_hour - this.first_hour) * 2); i++){
        array.push(this.$moment(start).format("HH:mm"));
        start = new Date(start.getTime() + 30*60000);
      }
      return array
      // return this.day_times.map(row => format('hh:mm', (new Date(row.time))))
    },
  },
  methods: {
    closePopup(reload = false) {
      this.$emit('closePopup', {reload: reload});
    },
    submit() {
      create_orders(this.auth.organization.id, {
        date: this.day,
        time_start: this.time_start,
        blocked: 1,
        duration: this.duration,
        master_id: this.master_id
      })
          .then(() => {
            this.success_error.success = true
            setTimeout(() => {
              this.closePopup(true)
            }, 2000);
          })
          .catch((error) => {
            this.success_error.error = true
            if (error.response?.data?.errors) this.errors = error.response?.data?.errors
            if (error.response.status == 403){
              this.success_error.msg = [error.response?.data.message]
            }
          })
    }
  }
}
</script>

<style scoped>

</style>
