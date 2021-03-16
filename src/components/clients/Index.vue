<template>
  <div class="card p-4">
    <div class="row mb-4">
      <div class="col-lg-4">
        <b-checkbox
            switch
            size="sm"
            v-model="show_3m_before"
        >
          {{ $t('app.components.clients.show_3m_before') }}
        </b-checkbox>
      </div>
    </div>
    <table class="table table-bordered table-adaptive" v-if="clients.data.length > 0">
      <thead>
      <tr>
        <th>{{$t('app.components.clients.fields.phone')}}</th>
        <th>{{$t('app.components.clients.fields.name')}}</th>
        <th>{{$t('app.components.clients.fields.nickname')}}</th>
        <th>{{$t('app.components.clients.fields.last_order')}}</th>
        <th>{{$t('app.components.clients.fields.last_services')}}</th>
      </tr>
      </thead>
      <tr v-for="(client, k) in clients.data" :key="k">
        <td>
          {{ client.phone }}
        </td>
        <td>
          <div v-for="(row, k) in client.data" :key="k">
            {{ row.name }}
          </div>
        </td>
        <td>
          <div v-for="(row, k) in client.data" :key="k">
            {{ row.type ? $t('base.service_types.'+ row.type) : '' }} {{ row.nickname }}
          </div>
        </td>
        <td>
          {{ client.last_order.date }}
        </td>
        <td>
          <div v-for="(row, k) in client.last_order.services" :key="k">
            {{ row.name }}
          </div>
        </td>
      </tr>
    </table>

    <div class="row" v-if="clients.last_page > 1">
      <div class="col-lg-2 d-flex">
        <form-group
            custom_class="align-items-center mb-0"
            type="select"
            :items="[5,10,15]"
            v-model="clients.per_page"
        />
      </div>
      <div class="col-lg-8 d-flex">
        <b-pagination
            v-model="clients.page"
            :total-rows="clients.total"
            :per-page="clients.per_page"
            aria-controls="my-table"
            class="m-auto"
        ></b-pagination>
      </div>
      <div class="col-lg-2 d-flex align-items-center">
        <div class="ml-auto text-secondary">{{ $t('base.total') }} {{ this.clients.total }}</div>
      </div>
    </div>

  </div>
</template>

<script>
import {clients} from "@/api";
import FormGroup from "@/components/base/FormGroup";

export default {
  name: "Index",
  components: {FormGroup},
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
    }
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
        show_3m_before: this.show_3m_before ? true : null
      })
      .then((response) => {
        this.clients.data = response.data.data.clients.data
        this.clients.total = response.data.data.clients.total
        this.clients.last_page = response.data.data.clients.last_page
      })
    }
  }
}
</script>

