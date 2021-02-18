<template>
  <base-popup
    :caption="$t('app.components.calendar.popup.orders.title')"
    @closePopup="closePopup"
  >
    <template v-slot:body>
      <index
        :day="day"

      />
    </template>
  </base-popup>
</template>

<script>
import BasePopup from "@/components/base/Popup";
import Index from "@/components/orders/Index";

export default {
  name: "OrdersPopup",
  components: {Index, BasePopup},
  props: {
    day: {
      type: String
    }
  },
  methods: {
    closePopup(){
      this.$emit('closePopup')
    }
  }
}
</script>
