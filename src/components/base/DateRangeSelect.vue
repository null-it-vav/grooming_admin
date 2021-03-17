<template>
  <div class="d-flex">
    <v-date-picker
        v-model="localValue"
        mode="date"
        is-range
        :model-config="modelConfig"
        :attributes="[{
          key: 'today',
          highlight: {
            color: 'purple',
            fillMode: 'solid',
          },
          dates: new Date(),
          }]"
    >
      <template v-slot="{ inputValue, inputEvents }">
        <div class="d-flex align-items-center">
          <input
              class="form-control"
              :value="inputValue.start"
              v-on="inputEvents.start"
          />
          <b class="ml-2"> - </b>
          <input
              class="form-control ml-2"
              :value="inputValue.end"
              v-on="inputEvents.end"
          />

          <i class="fa fa-times ml-2 pointer" @click="reload"/>
        </div>
      </template>
    </v-date-picker>

  </div>
</template>

<script>
export default {
  name: "DateRangeSelect",
  props: {
    value: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Number | File,
      default: null
    },
  },
  watch: {
    localValue(newVal, oldVal) {
      // if (newVal !== oldVal && newVal !== (this.value || 0)) {
      if (newVal !== oldVal) {
        this.$emit('input', newVal)
      }
    },
  },
  data() {
    return {
      localValue: this.value,
      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD', // Uses 'iso' if missing
      },
    }
  },
  methods: {
    reload(){
      this.localValue = {
        end: null,
        start: null
      }

    }
  }
}
</script>

<style scoped>

</style>
