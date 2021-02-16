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
            <option v-for="item in items" :value="item.value">{{ item.text }}</option>
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

        <vue-masked-input
            v-else-if="type == 'snils'"
            :required="required"
            class="form-control"
            :class="(name in errors) ? 'is-invalid' : ''"
            :name="name"
            v-model="localValue"
            :disabled="disabled"
            mask="111-111-111 11"
        />

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
    </div>
</template>

<script>
import validSign from '@base/components/base/validSign';
import VueMaskedInput from 'vue-masked-input';

export default {
    name: "FormGroup",
    components: {
        validSign,
        VueMaskedInput,
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
            type: String | Number,
            default: ''
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
            localValue: this.value
        }
    },
    watch: {
        localValue(newVal, oldVal) {
            // if (newVal !== oldVal && newVal !== (this.value || 0)) {
            if (newVal !== oldVal) {
                this.$emit('input', newVal)
            }
        },
    }
}
</script>

<style scoped>

</style>
