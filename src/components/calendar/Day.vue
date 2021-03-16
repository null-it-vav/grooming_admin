<template>
    <div :class="classObject" >
        <div v-if="month_select == day.format('M')" class="d-flex flex-column w-100 h-100">
          {{ day.format('D') }}
          <ul class="event-list pointer" v-if="count > 0" @click="captureClick">
              <li>{{ count }} <i class="fa fa-eye"/></li>
          </ul>
          <div v-if="can_block_day && auth.role_list.includes('admin')" class="mt-auto">
            <div v-if="disabled" class="pointer" @click="setDayStatus(0)">
              <i class="fa fa-check" v-b-tooltip.hover :title="$t('app.components.calendar.enabled')" />
            </div>
            <div v-else class="pointer" @click="setDayStatus(1)">
               <i class="fa fa-close" v-b-tooltip.hover :title="$t('app.components.calendar.disabled')" />
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
    props: {
      day: {
        type: Object,
        default: null,
      },
      count: {
        type: Number,
        default: 0
      },
      month_select: {
        type: Number,
        default: 0
      },
      disabled: {
        type: Number,
        default: 0
      },
      can_block_day: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapGetters([
        'auth',
      ]),
      classObject() {
        // let eventFormDate = this.$store.state.eventFormDate;
        // let eventFormActive = this.$store.state.eventFormActive;
        let today = this.day.isSame(this.$moment(), 'day');
        return {
          day: true,
          today,
          past: this.day.isSameOrBefore(this.$moment(), 'day') && !today,
          // disabled: this.disabled
        };
      }
    },
    methods: {
      setDayStatus(status){
        this.$emit('setDayStatus', {
          day: this.day.format('Y-MM-DD'),
          status: status
        });
      },
      captureClick() {
        this.$emit('daySelect', this.day.format('y-MM-DD'));
        //this.$store.commit('eventFormPos', { x: event.clientX, y: event.clientY });
        //this.$store.commit('eventFormActive', true);
        //this.$store.commit('eventFormDate', this.day);
      }
    }
}
</script>
