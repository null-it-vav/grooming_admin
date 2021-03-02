<template>
  <div class="card p-4">
    <div class="row mb-3">
      <div class="col-lg-3">
        <form-group
            v-model="filters.email"
            type="text"
            placeholder="Email пользователя"
        />
      </div>
      <div class="col-lg-3">
        <form-group
            v-model="filters.organization_id"
            type="select"
            :items="organizations_list"
        />
      </div>
    </div>
    <table class="table table-bordered table-adaptive" v-if="users.data.length > 0">
      <thead>
        <tr>
          <th>{{$t('app.components.users.fields.name')}}</th>
          <th>{{$t('app.components.users.fields.email')}}</th>
          <th>{{$t('app.components.users.fields.organization_name')}}</th>
        </tr>
      </thead>
      <tr v-for="(user, k) in users.data" :key="k">
        <td :data-label="$t('app.components.users.fields.name')">{{user.name}}</td>
        <td :data-label="$t('app.components.users.fields.email')">{{user.email}}</td>
        <td :data-label="$t('app.components.users.fields.organization_name')">{{user.organization ? user.organization.name : ''}}</td>
      </tr>
    </table>

    <div class="row" v-if="users.last_page > 1">
      <div class="col-lg-2 d-flex">
        <form-group
            custom_class="align-items-center mb-0"
            type="select"
            :items="[5,10,15]"
            v-model="users.per_page"
        />
      </div>
      <div class="col-lg-8 d-flex">
        <b-pagination
            v-model="users.page"
            :total-rows="users.total"
            :per-page="users.per_page"
            aria-controls="my-table"
            class="m-auto"
        ></b-pagination>
      </div>
      <div class="col-lg-2 d-flex align-items-center">
        <div class="ml-auto text-secondary">{{ $t('base.total') }} {{ this.users.total }}</div>
      </div>
    </div>

  </div>
</template>

<script>
import {admin_users, organizations} from "@/api";
import FormGroup from "@/components/base/FormGroup";

export default {
  name: "AdminUsers",
  components: {FormGroup},
  data() {
    return {
      user: {},
      users: {
        data: [],
        page: 1,
        per_page: 10,
        last_page: 1,
        total: 0,
      },
      filters: {
        email: '',
        organization_id: null,
      },
      organizations: {
        data: [],
        page: 1,
        per_page: 500,
        last_page: 1,
        total: 0,
      }
    }
  },
  created() {
    this.loadOrganizations()
    this.getUsers()
  },
  computed: {
    organizations_list(){
      var data = [];
      data.push({ value: null, text: this.$t('app.components.admin.organizations.select') });

      this.organizations.data.forEach(org => {
        data.push({
          value: org.id,
          text: org.id+" "+org.name
        })
      })

      return data
    }
  },
  watch: {
    'users.page': function(){
      this.getUsers()
    },
    'users.per_page': function(){
      this.getUsers()
    },
    'filters.email': function(){
      this.getUsers()
    },
    'filters.organization_id': function(){
      this.getUsers()
    },
  },
  methods: {
    loadOrganizations() {
      organizations({
        page: this.organizations.page,
        qty: this.organizations.per_page,
      }).then(response => {
        this.organizations.data = response.data.data.organizations.data
        this.organizations.total = response.data.data.organizations.total
        this.organizations.last_page = response.data.data.organizations.last_page

      }).catch(error => {
        console.warn(error)
      })
    },
    getUsers(){
      admin_users({
        page: this.users.page,
        qty: this.users.per_page,
        email: this.filters.email,
        organization_id: this.filters.organization_id,
      })
          .then(response => {
            this.users.data = response.data.data.users.data
            this.users.total = response.data.data.users.total
            this.users.last_page = response.data.data.users.last_page
          })
    }
  }
}
</script>
