<template>
    <div
        class="invalid-feedback"
    >
        <span
            v-for="(message, k) in invalid[name]"
            :key="k"
            class="mr-1"
        >{{ message }}</span>
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
