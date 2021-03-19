<template>
  <base-popup
      @closePopup="closePopup"
      dialogSize="modal-md"
  >
    <template v-slot:body>
      <div class="text-center">
        {{ $t("app.components.salons.delete.are_you_sure") }}
      </div>
      <div class="col-lg-12 mt-4 d-flex">
        <a class="btn btn-purpure" @click="closePopup">{{ $t("app.components.salons.delete.cancel") }}</a>
        <a class="ml-auto btn btn-danger" @click="deleteSalon">{{ $t("app.components.salons.delete.confirm") }}</a>
      </div>
    </template>
  </base-popup>
</template>

<script>
import BasePopup from "@/components/base/Popup";
import {delete_salon_confirm} from "@/api";
import store from "@/store/app";
export default {
  name: "DeleteSalonPopup",
  props: {
    salon: {
      default: Object
    }
  },
  components: {BasePopup},
  methods: {
    closePopup() {
      this.$emit('closePopup');
    },
    deleteSalon(){
      delete_salon_confirm(this.salon.id)
          .then(() => {
            store.dispatch('getAuth').then(() => {})
            this.closePopup()
          }).catch(() => {

          })
    },
  }
}
</script>

<style scoped>

</style>
