<template>
  <div class="row">
    <div class="col-lg-8 mb-4">
      <orders :day="day" />
    </div>
    <div class="col-lg-4 mb-4">
      <promotions external_status="active"/>
    </div>
  </div>
</template>

<script>
import Orders from "@/components/orders/Index";
import Promotions from "@/components/promotions/Index";

export default {
  name: "Index",
  components: { Orders,Promotions },
  computed: {
    day() {
      var day = this.$moment().format('y-MM-DD')
      return day
    }
  }
}
</script>

<style scoped>

</style>
