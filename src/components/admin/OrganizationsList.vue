<template>
  <div class="card p-4">
    <div class="card-title">
      {{ $t('app.components.admin.organizations.list') }}
    </div>

    <div class="row mb-4">
      <div class="ml-auto col-2 d-flex">
        <div class="ml-auto">
          <a
              class="btn btn-purpure rounded-circle fa fa-plus"
              @click="showCreatePopup = true"
          />
        </div>
      </div>
    </div>
    <table class="table table-bordered table-adaptive" v-if="organizations.data.length && !page_load">
      <thead>
        <tr>
          <th>#</th>
          <th>{{$t('app.components.admin.organizations.fields.name')}}</th>
          <th>{{$t('app.components.admin.organizations.fields.email')}}</th>
          <th>{{$t('app.components.admin.organizations.fields.phone')}}</th>
          <th>{{$t('app.components.admin.organizations.fields.created_at') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(organization, k) in organizations.data" :key="k">
          <td>
            {{ organization.id }}
          </td>
          <td :data-label="$t('app.components.admin.organizations.fields.name')">{{ organization.name }}</td>
          <td :data-label="$t('app.components.admin.organizations.fields.email')">{{ organization.email }}</td>
          <td :data-label="$t('app.components.admin.organizations.fields.phone')">{{ organization.phone }}</td>
          <td :data-label="$t('app.components.admin.organizations.fields.created_at')">{{ organization.created_at | moment("YYYY-MM-DD") }}</td>
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

    <organization-create-popup
      v-if="showCreatePopup"
      @closePopup="closeCreatePopup"
    />

  </div>
</template>

<script>
import {organizations} from "@/api";
import OrganizationCreatePopup from "@/components/admin/OrganizationCreatePopup";

export default {
  name: "OrganizationsList",
  components: {OrganizationCreatePopup},
  data() {
    return {
      page_load: false,
      showCreatePopup: false,
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
    },
    closeCreatePopup(){
      this.showCreatePopup = false
      this.loadOrganizations()
    }
  }
}
</script>

<style scoped>

</style>
