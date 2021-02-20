<template>
  <div class="row">
    <div
        class="mb-4 col-lg-12"
        v-if="auth.role == 'admin' || auth.role == 'master'"
    >
      <orders :day="day" :title="$t('app.components.dashboard.orders_by_day_now')" />
    </div>
    <div
        class="col-lg-4 mb-4"
        v-if="auth.role == 'admin'"
    >
      <promotions external_status="active"/>
    </div>
    <div
      class="col-lg-12"
      v-if="auth.role == 'super-admin'"
    >
      <organizations-list
      />
    </div>
  </div>
</template>

<script>
import Orders from "@/components/orders/Index";
import Promotions from "@/components/promotions/Index";
import {mapGetters} from "vuex";
import OrganizationsList from "@/components/admin/OrganizationsList";

export default {
  name: "Index",
  components: {OrganizationsList, Orders,Promotions },
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
