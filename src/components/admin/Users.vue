<template>
  <div class="card p-4">

    <div class="col-lg-12 mb-2 alert position-fixed fixed-bottom">
      <message-success-error
          :show="success_error"
      />
    </div>

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
          <th></th>
        </tr>
      </thead>
      <tr v-for="(user, k) in users.data" :key="k">
        <td :data-label="$t('app.components.users.fields.name')">{{user.name}}</td>
        <td :data-label="$t('app.components.users.fields.email')">{{user.email}}</td>
        <td :data-label="$t('app.components.users.fields.organization_name')">
          <form-group
            v-model="user.organization_id"
            :errors="{}"
            type="select"
            :group="true"
            :items="organizations_list"
            v-if="!user.role_list.includes('super-admin')"
          >
            <template v-slot:append>
              <div class="input-group-append">
                <span class="input-group-text pointer" @click="save_org_id(user)">
                  <i class="fa fa-floppy-o"></i>
                </span>
              </div>
            </template>
          </form-group>
        </td>
        <td>
          <div v-for="(role, k) in user.role_list" :key="k">
            {{ roles[role] }}
          </div>
        </td>
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
import {admin_users, organizations, admin_user_save} from "@/api";
import FormGroup from "@/components/base/FormGroup";
import MessageSuccessError from "@/components/base/SuccessError";

export default {
  name: "AdminUsers",
  components: {MessageSuccessError, FormGroup},
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
      },
      roles: {
        'super-admin': 'Супер админ',
        'admin': "Админ",
        'master': "Мастер"
      },
      success_error: {
        success: false,
        error: false
      },
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
    'success_error.success': function (){
      if (this.success_error.success) {
        setTimeout(() => {
          this.success_error.success = false;
        }, 4000);
      }
    },
    'success_error.error': function (){
      if (this.success_error.error) {
        setTimeout(() => {
          this.success_error.error = false;
        }, 4000);
      }
    }
  },
  methods: {
    save_org_id(user){
      admin_user_save(user.id, {
        _method: 'patch',
        action: 'set-organization',
        organization_id: user.organization_id
      }).then(() => {
        this.success_error.success = true
        this.getUsers()
      }).catch((error) => {
        this.success_error.error = true
        console.error(error)
      })
    },
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
