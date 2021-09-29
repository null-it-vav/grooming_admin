<template>
  <div>
    <div class="py-2">
      <router-link
          :to="{ name: 'home.clients' }"
          class="btn btn-rounded btn-hint-white"
      >
        <i class="fa fa-chevron-left"/> {{ $t('base.back') }}
      </router-link>
    </div>
    <b-card>
      <b-card-body>
        <table class="table">
          <thead>
          <tr>
            <th>#</th>
            <th>{{$t('app.components.clients.transactions.fields.type')}}</th>
            <th>{{$t('app.components.clients.transactions.fields.type_funds')}}</th>
            <th>{{$t('app.components.clients.transactions.fields.value')}}</th>
            <th>{{$t('app.components.clients.transactions.fields.created_at')}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(transaction,k) in transactions.data" :key="k">
            <td>
              {{ transaction.id }}
            </td>
            <td>
              {{$t(`app.components.clients.transactions.types.${transaction.type}`)}}
            </td>
            <td>
              {{$t(`app.components.clients.transactions.types_funds.${transaction.type_funds}`)}}
            </td>
            <td>
              {{ transaction.value }}
            </td>
            <td>
              {{ transaction.created_at | moment('DD.MM.YYYY HH:mm') }}
            </td>
          </tr>
          </tbody>
        </table>
        <div class="row" v-if="transactions.last_page > 1">
          <div class="col-lg-2 d-flex">
            <form-group
                custom_class="align-items-center mb-0"
                type="select"
                :items="[5,10,15]"
                v-model="transactions.per_page"
            />
          </div>
          <div class="col-lg-8 d-flex">
            <b-pagination
                v-model="transactions.page"
                :total-rows="transactions.total"
                :per-page="transactions.per_page"
                aria-controls="my-table"
                class="m-auto"
            ></b-pagination>
          </div>
          <div class="col-lg-2 d-flex align-items-center">
            <div class="ml-auto text-secondary">{{ $t('base.total') }} {{ this.transactions.total }}</div>
          </div>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import {transactions} from "@/api";
import FormGroup from "@/components/base/FormGroup";

export default {
  name: "ClientTransactions",
  components: {FormGroup},
  props: {
    client_id: null
  },
  data() {
    return {
      transactions: {
        per_page: 15,
        page: 1,
        data: [],
        total: 0
      },
    }
  },
  watch: {
    'transactions.per_page': function () {
      this.getTransactions()
    },
    'transactions.page': function () {
      this.getTransactions()
    },
  },
  created() {
    this.getTransactions()
  },
  methods: {
    getTransactions() {
      transactions({
        page: this.transactions.page,
        qty: this.transactions.per_page,
        user_id: this.client_id
      })
      .then(response => {
        this.transactions.data = response.data.data.transactions.data
        this.transactions.total = response.data.data.transactions.total
      })
      .catch(() => {

      })
    }
  }
}
</script>

<style scoped>

</style>
