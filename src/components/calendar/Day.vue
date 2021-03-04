<template>
    <div :class="classObject" >
        <div v-if="month_select == day.format('M')" @click="captureClick" class="pointer w-100 h-100">
          {{ day.format('D') }}
          <ul class="event-list pointer" v-if="count > 0">
              <li>{{ count }} <i class="fa fa-eye"/></li>
          </ul>
        </div>
    </div>
</template>
<script>
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
        }
    },
    computed: {
        // events() {
        //     return this.$store.state.events.filter(event => event.date.isSame(this.day, 'day'));
        // },
        classObject() {
            // let eventFormDate = this.$store.state.eventFormDate;
            // let eventFormActive = this.$store.state.eventFormActive;
            let today = this.day.isSame(this.$moment(), 'day');
            return {
                day: true,
                today,
                past: this.day.isSameOrBefore(this.$moment(), 'day') && !today,
            };
        }
    },
    methods: {
        captureClick() {
            this.$emit('daySelect', this.day.format('y-MM-DD'));
            //this.$store.commit('eventFormPos', { x: event.clientX, y: event.clientY });
            //this.$store.commit('eventFormActive', true);
            //this.$store.commit('eventFormDate', this.day);
        }
    }
}
</script>
