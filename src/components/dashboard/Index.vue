<template>
  <div>
    <orders
        v-if="auth.role_list.includes('admin') || auth.role_list.includes('master')"
        :qty="5"
        :day="day"
        :title="$t('app.components.dashboard.orders_by_day_now')"
    />
    <div
      class="col-lg-12"
      v-if="auth.role_list.includes('super-admin')"
    >
      <organizations-list
      />
    </div>
  </div>
</template>

<script>
import Orders from "@/components/orders/Index";
import {mapGetters} from "vuex";
import OrganizationsList from "@/components/admin/OrganizationsList";

export default {
  name: "Index",
  components: {OrganizationsList, Orders },
  computed: {
    ...mapGetters([
      'auth',
    ]),
    day() {
      var day = this.$moment().format('y-MM-DD')
      return day
    },
  },

}
</script>

<style scoped>

</style>
