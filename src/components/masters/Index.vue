<template>
  <div class="card p-4">

    <div class="row mb-4">
      <div class="col-2">
        <b-checkbox
          switch
          size="sm"
          v-model="show_deleted"
        >
          {{ $t('app.components.masters.show_deleted') }}
        </b-checkbox>
      </div>
      <div class="ml-auto col-2 d-flex">
        <div class="ml-auto">
          <a
              class="btn btn-purpure rounded-circle fa fa-plus"
              @click="showCreatePopup = true"
          />
        </div>
      </div>
    </div>
    <div
        v-for="master in masters.data"
        :key="master.id"
        class="row mb-3"
    >
      <div class="col-10 d-flex">
        <div class="mr-2">
          <b-avatar class="mr-3" :src="master.photo"></b-avatar>
        </div>

        <div>
          <div>
            <b>{{ master.name }}</b>
          </div>
          <div>
            {{ master.description }}
          </div>
        </div>
      </div>
      <div class="col-2 d-flex align-items-center">
        <button class="btn btn-dark rounded-circle ml-auto fa fa-pencil fa-lg" @click="openUpdatePopup(master)"/>
        <button v-if="!master.deleted_at" class="btn btn-dark rounded-circle ml-2 fa fa-trash fa-lg" @click="deleteMater(master)"/>
      </div>
    </div>

    <b-pagination
        v-if="masters.last_page > 1"
        v-model="masters.page"
        :total-rows="masters.total"
        :per-page="masters.per_page"
        aria-controls="my-table"
        class="m-auto"
    ></b-pagination>

    <div class="col-lg-12 mb-2 alert position-fixed fixed-bottom">
      <message-success-error
          :show="success_error"
      />
    </div>

    <create
        v-if="showCreatePopup"
        @closePopup="closeCreatePopup"
    />
    <update
        v-if="showUpdatePopup"
        :master="master"
        @closePopup="closeUpdatePopup"
    />
  </div>
</template>

<script>
import { masters, delete_master } from "@/api";
import {mapGetters} from "vuex";
import Create from "@/components/masters/Create";
import Update from "@/components/masters/Update";
import deepClone from 'clonedeep';
import MessageSuccessError from "@/components/base/SuccessError";

export default {
  name: "Index",
  components: {MessageSuccessError, Update, Create},
  data(){
    return {
      master: {},
      masters: {
        data: [],
        page: 1,
        per_page: 15,
        last_page: 1,
        total: 0,
      },
      success_error: {
        success: false,
        error: false,
        msg: null
      },
      showCreatePopup: false,
      showUpdatePopup: false,
      show_deleted: false,
    }
  },
  created() {
    this.loadMasters()
  },
  computed: {
    ...mapGetters([
      'salon_selected'
    ])
  },
  watch: {
    'show_deleted': function(){
      this.loadMasters()
    },
    'masters.page': function(){
      this.loadMasters()
    },
    'salon_selected.id': function(){
      this.loadMasters()
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
    loadMasters(){
      masters({
        page: this.masters.page,
        qty: this.masters.per_page,
        salon_id: this.salon_selected.id,
        show_deleted: this.show_deleted ? 1 : 0
      }).then(response => {
        this.masters.data = response.data.data.masters.data
        this.masters.total = response.data.data.masters.total
        this.masters.last_page = response.data.data.masters.last_page
      })
    },
    closeCreatePopup(){
      this.showCreatePopup = false
      this.loadMasters()
    },
    openUpdatePopup(master){
      this.showUpdatePopup = true
      this.master = deepClone(master)
    },
    closeUpdatePopup(){
      this.showUpdatePopup = false
      this.loadMasters()
    },
    deleteMater(master){
      if (confirm(this.$t('app.components.masters.confirm_delete')))
        delete_master(master.id)
            .then(() => {
              this.success_error.success = true
              this.loadMasters()
            })
            .catch(error => {
              this.success_error.error = true
              if (error.response.status == 403){
                this.success_error.msg = [error.response?.data.message]
              }
            })
    }
  }
}
</script>
