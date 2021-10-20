<template>
  <div>
    <div class="row mb-4 align-items-center">
      <div class="col-lg-2">
        <form-group
            custom_class="mb-2"
            type="text"
            v-model="filters.phone"
            :placeholder="$t('app.components.clients.filters.phone')"
            @keyupenter="getClients"
            group
        >
          <template v-slot:append>
            <div class="input-group-append d-flex align-items-center">
              <div class="input-group-text h-100">
                <i class="pointer fa fa-search" @click="getClients"/>
              </div>
            </div>
          </template>
        </form-group>
      </div>
      <div class="col-lg-2">
        <a-select
            v-model="filters.tag"
            :filter-option="false"
            class="mb-2"
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
      <div class="col-auto ml-0 ml-md-auto">
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
        <th>{{$t('app.components.clients.fields.pets_count')}}</th>
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
          {{ client.pets ? client.pets.length : 0 }}
        </td>
        <td>
          {{ client.last_order ? client.last_order.date : '' }}
        </td>
        <td>

        </td>
        <td>
          <slot name="actions" :client="client"/>
        </td>
      </tr>
    </table>

    <row-pagination
        :rows="clients"
    />
  </div>
</template>

<script>
import {clients} from "@/api";
import FormGroup from "@/components/base/FormGroup";
import {mapGetters} from "vuex";
import RowPagination from "@/components/base/RowPagination";

export default {
  name: "ClientsBase",
  components: {
    RowPagination,
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

