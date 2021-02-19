<template>
  <div
      class="invalid-feedback"
  >
    <span
        v-for="(message, k) in invalid[name]"
        :key="k"
        class="mr-1"
    >
      {{ message }}
    </span>
    <span
        v-for="(message, k) in invalid[prepend_name]"
        :key="k"
        class="mr-1"
    >
      {{ message }}
    </span>
    <span
        v-for="(message, k) in invalid[append_name]"
        :key="k"
        class="mr-1"
    >
      {{ message }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'validSign',
  props: {
    name: {
      type: String,
      default: '',
    },
    prepend_name: {
      type: String,
      default: ''
    },
    append_name: {
      type: String,
      default: ''
    },
    invalid: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {

    }
  }
}
</script>
