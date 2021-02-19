<template>
  <div >
    <vue-progress-bar></vue-progress-bar>
    <loading-overlay
        loader="dots"
        :active.sync="globalLoading"
        :can-cancel="false"
        :height="64"
        :width="64"
        :opacity="0.5"
        :z-index="9999"
        :is-full-page="true"
    />
    <router-view></router-view>
  </div>
</template>

<script>
import LoadingOverlay from 'vue-loading-overlay';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Core',
  components: {
    LoadingOverlay,
  },
  data() {
    return {
      started: false,
      globalLoading: false,
    };
  },
  computed: {
    ...mapGetters([
      'getStore',
    ]),
    hasLoadingGlobal() {
      return this.getStore('loading.global');
    },
    hasLoadingLocal() {
      return this.getStore('loading.local');
    },
  },
  watch: {
    hasLoadingGlobal(value) {
      this.loading(value);
    },
    hasLoadingLocal(value) {
      this.loading(value);
    }
  },
  created() {},
  methods: {
    ...mapMutations([
      'setStore',
    ]),
    loading(value){
      if (value >= 1 && this.started == false) {
        this.$Progress.start();
        this.started = true;
        this.globalLoading = true;
      }

      if (value == 0 && this.started == true) {
        this.$Progress.finish();
        this.started = false;
        this.globalLoading = false;
      }
    }
  },
};
</script>
