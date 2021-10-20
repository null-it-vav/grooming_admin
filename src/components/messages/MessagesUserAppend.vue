<template>
  <base-popup
      caption="Выбрать клиента"
      @closePopup="closePopup"
  >
    <template v-slot:body>
      <clients-base>
        <template v-slot:actions="slotProps">
          <a class="btn btn-primary" @click="addClient(slotProps.client.id)">
            Привязать
          </a>
        </template>
      </clients-base>
    </template>
  </base-popup>
</template>

<script>
import BasePopup from "@/components/base/Popup";
import ClientsBase from "@/components/clients/ClientsBase";
import {client_update} from "@/api";

export default {
  name: "MessagesUserAppend",
  components: {ClientsBase, BasePopup},
  props: {
    conversation_type: null,
    conversation_id: null,
  },
  data() {
    return {

    }
  },
  methods: {
    addClient(client_id) {
      client_update(client_id, {
        'action': 'attach-social-conversation',
        type: this.conversation_type,
        conversation_id: this.conversation_id
      })
      .then(() => {
        this.closePopup()
      })
    },
    closePopup() {
      this.$emit('closePopup')
    }
  }
}
</script>

<style scoped>

</style>
