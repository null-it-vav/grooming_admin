<template>
  <div class="card p-4">
    <clients-base>
      <template v-slot:actions="props">
        <router-link
            v-if="props.client.chat"
            :to="{name: 'home.client.chat', params: {client_id: props.client.id, chat_id: props.client.chat.id}}"
            class="btn btn-dark btn-sm rounded-circle fa fa-comment mr-2"
        />
        <router-link
            :to="{name: 'home.client.show', params: {client_id: props.client.id}}"
            class="btn btn-dark btn-sm rounded-circle fa fa-eye mr-2"
        />
        <router-link
            :to="{name: 'home.client.transactions', params: {client_id: props.client.id}}"
            class="btn btn-dark btn-sm rounded-circle fa fa-list mr-2"
        />
      </template>
    </clients-base>
  </div>
</template>

<script>
import {clients} from "@/api";
import {mapGetters} from "vuex";
import ClientsBase from "@/components/clients/ClientsBase";

export default {
  name: "ClientsIndex",
  components: {
    ClientsBase
  },
  data() {
    return {
      clients: {
        data: [],
        page: 1,
        per_page: this.qty ? this.qty : 15,
        last_page: 1,
        total: 0,
      },
      show_3m_before: false,
      filters: {
        phone: '',
        tag: ''
      },
      fetchTagsValue: '',
    }
  },
  computed: {
    ...mapGetters([
      'tags',
    ]),
  },
  watch: {
    'clients.page': function(){
      this.getClients()
    },
    'clients.per_page': function (){
      this.getClients()
    },
    'show_3m_before': function () {
      this.getClients()
    },
    'filters.tag': function () {
      this.getClients()
    }
  },
  created() {
    this.getClients()
  },
  methods: {
    getClients() {
      clients({
        page: this.clients.page,
        qty: this.clients.per_page,
        with_last_order: 1,
        phone: this.filters.phone,
        tag_id: this.filters.tag,
        with: [
            'chat',
            'pets'
        ]
      })
      .then((response) => {
        this.clients.data = response.data.data.clients.data
        this.clients.total = response.data.data.clients.total
        this.clients.last_page = response.data.data.clients.last_page
      })
    },
    fetchTags(value){
      this.fetchTagsValue = value
    }
  }
}
</script>

