<template>
  <div class="form-group">
    <label v-if="label">{{ label }}</label>
    <input
        v-if="type == 'text'"
        type="text"
        :class="(name in errors) ? 'is-invalid' : ''"
        class="form-control"
        v-model="localValue"
        :name="name"
        :required="required"
        :disabled="disabled"
    />
    <select
        v-else-if="type == 'select'"
        :required="required"
        class="form-control"
        v-model="localValue"
        :class="(name in errors) ? 'is-invalid' : ''"
        :disabled="disabled"
    >
      <option v-for="(item,k) in items" :key="k" :value="item.value">{{ item.text }}</option>
    </select>
    <input
        v-else-if="type == 'password'"
        type="password"
        :class="(name in errors) ? 'is-invalid' : ''"
        class="form-control"
        :name="name"
        :required="required"
        :disabled="disabled"
        v-model="localValue"
    />
    <input
        v-else-if="type == 'number'"
        type="number"
        :class="(name in errors) ? 'is-invalid' : ''"
        class="form-control"
        :name="name"
        :required="required"
        :disabled="disabled"
        v-model="localValue"
    />
    <input
        v-else-if="type == 'email'"
        type="email"
        :class="(name in errors) ? 'is-invalid' : ''"
        class="form-control"
        :name="name"
        :required="required"
        :disabled="disabled"
        v-model="localValue"
    />
    <input
        v-else-if="type == 'date'"
        type="date"
        :class="(name in errors) ? 'is-invalid' : ''"
        class="form-control"
        :name="name"
        :required="required"
        :disabled="disabled"
        v-model="localValue"
    />
    <input
        v-else-if="type == 'checkbox'"
        type="checkbox"
        :class="(name in errors) ? 'is-invalid' : ''"
        class="custom-checkbox"
        :name="name"
        :required="required"
        :disabled="disabled"
        v-model="localValue"
    />
    <div
        v-else-if="type == 'photo'"
        :class="(name in errors) ? 'is-invalid' : ''"
    >
      <b-form-file
          type="file"
          :name="name"
          :required="required"
          :disabled="disabled"
          v-model="localValue"
      />
    </div>

    <textarea
        v-else
        :class="(name in errors) ? 'is-invalid' : ''"
        class="form-control"
        :name="name"
        :required="required"
        :disabled="disabled"
        v-model="localValue"
    />


    <valid-sign
        :name="name"
        :invalid="errors"
    />

    <div
        v-if="type == 'photo'"
    >
      <b-img
          v-if="url"
          :src="url"
          fluid
          class="my-3 mx-auto"
      />
    </div>
  </div>
</template>

<script>
import validSign from '@/components/base/validSign';

export default {
  name: "FormGroup",
  components: {
    validSign,
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    value: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Number | File,
      default: null
    },
    errors: {},
    required: {
      required: false
    },
    items: Array,
    disabled: Boolean
  },
  data() {
    return {
      localValue: this.value,
      tmpImageSrc: null,
      url: null,
    }
  },
  watch: {
    localValue(newVal, oldVal) {
      // if (newVal !== oldVal && newVal !== (this.value || 0)) {
      if (newVal !== oldVal) {
        this.$emit('input', newVal)
        if (this.type == 'photo') this.tmpImage();
      }
    },
  },
  methods: {
    handleInput(val){
      this.$emit('input', val)
    },
    tmpImage(){
      if (this.localValue) {
        if (this.errors[this.name]) delete this.errors[this.name]

        this.url = URL.createObjectURL(this.localValue)
        this.handleInput(this.localValue)
      }else{
        this.url = null;
        this.localValue = null;
        this.handleInput(this.localValue)
      }
    }
  }
}
</script>

<style scoped>

</style>
