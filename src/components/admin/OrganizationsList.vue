<template>
  <div class="card p-4">
    <div class="card-title">
      {{ $t('app.components.admin.organization.list') }}
    </div>

    <div v-if="page_load" class="d-flex">
      <b-spinner class="m-auto my-5"></b-spinner>
    </div>

    <table class="table table-bordered table-adaptive" v-if="organizations.data.length && !page_load">
      <thead>
        <tr>
          <th>#</th>
          <th>{{$t('app.components.admin.organization.fields.name')}}</th>
          <th>{{$t('app.components.admin.organization.fields.email')}}</th>
          <th>{{$t('app.components.admin.organization.fields.phone')}}</th>
          <th>{{$t('app.components.admin.organization.fields.created_at') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(organization, k) in organizations.data" :key="k">
          <td>
            {{ organization.id }}
          </td>
          <td>{{ organization.name }}</td>
          <td>{{ organization.email }}</td>
          <td>{{ organization.phone }}</td>
          <td>{{ organization.created_at | moment("YYYY-MM-DD") }}</td>
        </tr>
      </tbody>
    </table>

    <b-pagination
        v-if="organizations.last_page > 1"
        v-model="organizations.page"
        :total-rows="organizations.total"
        :per-page="organizations.per_page"
        aria-controls="my-table"
        class="m-auto"
    ></b-pagination>

  </div>
</template>

<script>
import {organizations} from "@/api";

export default {
  name: "OrganizationsList",
  data() {
    return {
      page_load: false,
      organizations: {
        data: [],
        page: 1,
        per_page: 15,
        last_page: 1,
        total: 0,
      }
    }
  },
  watch: {
    'organizations.page': function (){
      this.loadOrganizations()
    }
  },
  created() {
    this.loadOrganizations()
  },
  methods: {
    loadOrganizations() {
      this.page_load = true;
      organizations({
        page: this.organizations.page,
        qty: this.organizations.per_page,
      }).then(response => {
        this.organizations.data = response.data.data.organizations.data
        this.organizations.total = response.data.data.organizations.total
        this.organizations.last_page = response.data.data.organizations.last_page

        this.page_load = false;
      }).catch(error => {
        console.warn(error)
        this.page_load = false;
      })
    }
  }
}
</script>

<style scoped>

</style>
