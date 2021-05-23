<template>
  <div class="card p-4">
    <div class="row mb-4 align-items-center">
      <div class="col-lg-2 d-flex align-items-center">
        <form-group
            custom_class="mb-0"
            type="text"
            v-model="filters.phone"
            :placeholder="$t('app.components.clients.filters.phone')"
            @keyupenter="getClients"
        />
        <div class="ml-2">
          <i class="pointer fa fa-search" @click="getClients"/>
        </div>
      </div>
      <div class="col-lg-2">
        <a-select
            v-model="filters.tag"
            :filter-option="false"
        >
          <div slot="dropdownRender" slot-scope="menu">
            <div @click="filters.tag = null" class="add-tag" v-if="filters.tag">
              {{ $t('base.reset') }}
            </div>
            <v-nodes :vnodes="menu" />
          </div>
          <a-select-opt-group>
            <span slot="label">{{$t('app.components.tags.fields.types.user')}}</span>
            <a-select-option
                v-for="(tag,k) in tags.filter(row => row.type == 'user' && row.name.includes(fetchTagsValue))"
                :key="k"
                :value="tag.id"
                :label="tag.name"
            >
              {{ tag.name }}
            </a-select-option>
          </a-select-opt-group>
          <a-select-opt-group>
            <span slot="label">{{$t('app.components.tags.fields.types.pet')}}</span>
            <a-select-option
                v-for="(tag,k) in tags.filter(row => row.type == 'pet' && row.name.includes(fetchTagsValue))"
                :key="k"
                :value="tag.id"
                :label="tag.name"
            >
              {{ tag.name }}
            </a-select-option>
          </a-select-opt-group>
        </a-select>
      </div>
      <div class="col-auto ml-auto">
        <b-checkbox
            switch
            size="sm"
            v-model="show_3m_before"
        >
          {{ $t('app.components.clients.show_3m_before') }}
        </b-checkbox>
      </div>
    </div>
    <table class="table table-adaptive" v-if="clients.data.length > 0">
      <thead>
      <tr>
        <th>{{$t('app.components.clients.fields.phone')}}</th>
        <th>{{$t('app.components.clients.fields.name')}}</th>
        <th>{{$t('app.components.clients.fields.nickname')}}</th>
        <th>{{$t('app.components.clients.fields.last_order')}}</th>
        <th>{{$t('app.components.clients.fields.last_services')}}</th>
        <th></th>
      </tr>
      </thead>
      <tr v-for="(client, k) in clients.data" :key="k">
        <td>
          {{ client.phone }}
        </td>
        <td>
          {{ client.name }}
        </td>
        <td>
          <div v-if="client.last_order">
            <img
                v-if="client.last_order.type == 'cat'"
                src='~@/assets/types/cat.svg' width="15px"
            />
            <img
                v-if="client.last_order.type == 'dog'"
                src='~@/assets/types/dog.svg' width="15px"
            />
            <img
                v-if="client.last_order.type == 'other'"
                src='~@/assets/types/other.svg' width="15px"
            />
            <i :class="'fa ' + 'fa-'+client.last_order.type"/> {{ client.last_order.nickname }}
          </div>
        </td>
        <td>
          {{ client.last_order ? client.last_order.date : '' }}
        </td>
        <td>
          <div v-if="client.last_order">
            <div v-for="(row, k) in client.last_order.services" :key="k">
              {{ row.name }}
            </div>
          </div>
        </td>
        <td>
          <router-link
              v-if="client.chat"
              :to="{name: 'home.client.chat', params: {client_id: client.id, chat_id: client.chat.id}}"
              class="btn btn-dark btn-sm rounded-circle fa fa-comment mr-2"
          />
          <router-link
              :to="{name: 'home.client.show', params: {client_id: client.id}}"
              class="btn btn-dark btn-sm rounded-circle fa fa-eye"
          />
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
import {mapGetters} from "vuex";

export default {
  name: "Index",
  components: {
    FormGroup,
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
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
            'chat'
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

