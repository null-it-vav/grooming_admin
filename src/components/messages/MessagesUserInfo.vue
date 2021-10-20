<template>
  <div>
    <div v-if="!user_id">
      <b-card>
        <a class="btn btn-primary" @click="showMessageUserAppend = true">Привязать клиента</a>
      </b-card>
    </div>
    <div v-else>
      <b-card>
        {{ client.name }} <br>
        {{ client.phone }} <br>
        {{ client.email }}
      </b-card>
    </div>

    <messages-user-append
      v-if="showMessageUserAppend"
      :conversation_type="conversation_type"
      :conversation_id="conversation_id"
      @closePopup="closeMessagesUserAppend"
    />
  </div>
</template>

<script>
import {clients} from "@/api";
import MessagesUserAppend from "@/components/messages/MessagesUserAppend";

export default {
  name: "MessagesUserInfo",
  components: {MessagesUserAppend},
  props: {
    user_id: null,
    conversation_type: null,
    conversation_id: null,
  },
  watch: {
    'user_id': function () {
      this.getClient()
    }
  },
  created() {
    this.getClient()
  },
  data() {
    return {
      client: {},
      showMessageUserAppend: false
    }
  },
  methods: {
    getClient() {
      if (this.user_id) {
        clients({
          id: this.user_id,
          with: [
            'pets.tags',
            'tags'
          ]
        })
            .then((response) => {
              this.client = response.data.data.clients.data[0]
            })
      }
    },
    closeMessagesUserAppend()
    {
      this.showMessageUserAppend = false
      this.$emit('reload')
    }
  }
}
</script>

<style scoped>

</style>
