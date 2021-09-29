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
      this.loading(value, true);
    },
    hasLoadingLocal(value) {
      this.loading(value);
    }
  },
  created() {
    // localStorage.setItem('locale', window.navigator.language.slice(0, 2))
    this.$root.$i18n.locale = window.navigator.language.slice(0, 2)
  },
  methods: {
    ...mapMutations([
      'setStore',
    ]),
    loading(value, isGlobal = false){
      if (value >= 1 && this.started == false) {
        this.$Progress.start();
        this.started = true;
        if (isGlobal) this.globalLoading = true;
      }

      if (value == 0 && this.started == true) {
        this.$Progress.finish();
        this.started = false;
        if (isGlobal) this.globalLoading = false;
      }
    }
  },
};
</script>
