<template>
  <b-card
    :title="$t('app.components.settings.tabs.schedule')"
  >
    <div v-for="(day,k) in settings.schedule" :key="k">
      <div class="d-flex align-items-center">
        <div>
          <label>{{ day.name }}</label>
          <div class="d-flex align-items-center">
            <div class="form-group">
              <b-form-checkbox v-model="day.active" name="check-button" switch size="sm" />
            </div>

            <form-group
                class="ml-4 mb-2"
                type="select"
                :disabled="!settings.schedule[k].active"
                :items="times"
                v-model="settings.schedule[k].start"
                :errors="errors"
            />

            <div class="form-group ml-4">
              <b>-</b>
            </div>

            <form-group
                class="ml-4 mb-2"
                type="select"
                :disabled="!settings.schedule[k].active"
                :items="times"
                v-model="settings.schedule[k].end"
                :errors="errors"
            />
          </div>
        </div>
        <div class="form-group ml-4 w-50">
          <label>{{$t('app.components.settings.schedule.disabled')}}</label>
          <a-select
              mode="multiple"
              v-model="disabled[k]"
          >
            <a-select-option
                v-for="(time, j) in times.filter(time => time > settings.schedule[k].start && time < settings.schedule[k].end)"
                :key="k+'_'+j"
                :value="time"
                :label="time"
            >
              <div class="ant-select-dropdown-menu-item-tags">
                {{ time }}
              </div>
            </a-select-option>
          </a-select>
        </div>
      </div>
    </div>
    <div>
      <button type="submit" class="btn btn-success">{{ $t('base.save') }}</button>
    </div>
  </b-card>
</template>

<script>
import FormGroup from "@/components/base/FormGroup";
import {mapGetters} from "vuex";
export default {
  name: "SettingsSchedule",
  components: {FormGroup},
  props: {
    errors: {},
    settings: {}
  },
  data() {
    return {
      disabled: {
        0:[],
        1:[],
        2:[],
        3:[],
        4:[],
        5:[],
        6:[],
      }
    }
  },
  computed: {
    ...mapGetters([
      'auth'
    ]),
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
}
</script>

<style scoped>

</style>
