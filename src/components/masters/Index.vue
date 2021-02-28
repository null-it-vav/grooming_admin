<template>
  <div class="card p-4">

    <div class="row ">
      <div class="col-lg-2 mb-4">
        <b-checkbox
          switch
          size="sm"
          v-model="show_deleted"
        >
          {{ $t('app.components.masters.show_deleted') }}
        </b-checkbox>
      </div>
      <div class="ml-auto col-lg-4 mb-4">
        <div class="ml-auto d-flex">
          <a
              class="btn btn-purpure rounded-circle fa fa-plus m-0 ml-lg-auto"
              @click="showCreatePopup = true"
          />
          <a class="btn btn-purpure rounded ml-auto ml-lg-2" @click="setMeMaster()" v-if="auth.role_list.includes('admin') & !auth.role_list.includes('master')">
            {{ $t('app.components.masters.set_me_master') }}
          </a>
        </div>
      </div>
    </div>
    <div
        v-for="master in masters.data"
        :key="master.id"
        class="row border-bottom mt-2"
    >
      <div class="col-lg-8 d-flex mb-3 mb-md-1">
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
      <div class="col-lg-4 d-flex align-items-center mb-3 mb-md-1">
        <b-checkbox
            v-model="master.active"
            switch
            class="ml-lg-auto"
            @change="setActive(master)"
        >
          {{ $t('app.components.masters.active') }}
        </b-checkbox>

        <button class="btn btn-dark rounded-circle ml-auto ml-lg-2 fa fa-pencil fa-lg" @click="openUpdatePopup(master)"/>
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
import {masters, delete_master, create_master, update_masters} from "@/api";
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
      'auth',
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
    setActive(master){
      this.errors = {};
      var data = new FormData()
      data.append('name', master.name)
      data.append('description', master.description)
      data.append('email', master.email)

      data.append('position', master.position)
      data.append('salon_id', master.salon_id)
      data.append('profit', master.profit)
      data.append('active', master.active ? 1 : 0)



      for (var day in master.schedule){
        data.append('schedule['+day+'][active]', master.schedule[day].active ? 1 : 0)
        data.append('schedule['+day+'][start]', master.schedule[day].start)
        data.append('schedule['+day+'][end]', master.schedule[day].end)
      }




      update_masters(master.id, data)
          .then(() => {
            this.success_error.success = true
          }).catch((error) => {
            this.success_error.error = true
            console.warn(error)
          })
    },
    setMeMaster(){
      create_master({
        action: 'attach-yourself',
        salon_id: this.salon_selected.id,
      })
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
    },
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
              if (error.response?.data.msg)
                this.success_error.msg = [error.response?.data.msg]
            })
    }
  }
}
</script>
