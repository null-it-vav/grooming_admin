<template>
  <div class="row">
    <div
        class="mb-4"
        :class="(auth.role == 'admin' ? 'col-lg-8 ' : 'col-lg-12')"
    >
      <orders :day="day" :title="$t('app.components.dashboard.orders_by_day_now')" />
    </div>
    <div class="col-lg-4 mb-4" v-if="auth.role == 'admin'">
      <promotions external_status="active"/>
    </div>
  </div>
</template>

<script>
import Orders from "@/components/orders/Index";
import Promotions from "@/components/promotions/Index";
import {mapGetters} from "vuex";

export default {
  name: "Index",
  components: { Orders,Promotions },
  computed: {
    ...mapGetters([
      'auth',
    ]),
    day() {
      var day = this.$moment().format('y-MM-DD')
      return day
    }
  }
}
</script>

<style scoped>

</style>
