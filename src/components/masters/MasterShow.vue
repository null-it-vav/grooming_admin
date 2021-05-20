<template>
  <div>
    <div class="py-2">
      <router-link
          :to="{ name: 'home.masters' }"
          class="btn btn-rounded btn-hint-white"
      >
        <i class="fa fa-chevron-left"/> Назад
      </router-link>
    </div>

    <div class="card p-4 mb-2">
      <div class="row">
        <div class="col-lg-auto">
          <b-avatar
              :src="master.photo"
              class="mr-2"
              size="4rem"
          />
        </div>
        <div class="col-lg-3">
          <form-group
            disabled
            type="text"
            v-model="master.name"
          />
        </div>
        <div class="col-lg-3">
          <form-group
              disabled
              type="text"
              v-model="master.email"
          />
        </div>
      </div>
    </div>
    <index
      :prop_master_id="master_id"
    />
  </div>
</template>

<script>
import {master} from "@/api";
import FormGroup from "@/components/base/FormGroup";
import {mapGetters} from "vuex";
import Index from "@/components/orders/Index";

export default {
  name: "MasterShow",
  components: {Index, FormGroup},
  props: {
    master_id: {
      type: String
    }
  },
  computed: {
    ...mapGetters([
      'salon_selected',
      'salons'
    ]),
    times() {
      var quarterHours = ["00", "30"];
      var times = [];
      for(var i = 0; i < 24; i++){
        for(var j = 0; j < 2; j++){
          if(i < 10){
            times.push("0" + i + ":" + quarterHours[j]);
          } else {
            times.push(i + ":" + quarterHours[j]);
          }
        }
      }
      return times
    }
  },
  data() {
    return {
      master: {},
      orders: {
        data: [],
        page: 1,
        per_page: this.qty ? this.qty : 15,
        last_page: 1,
        total: 0,
      },
    }
  },
  created() {
    this.getMaster()
    // this.getOrders()
  },
  methods: {
    getMaster(){
      master(this.master_id, {})
      .then(response => {
        this.master = response.data.data.user
      })
    },
    // getOrders() {
    //   orders({
    //     page: this.orders.page,
    //     qty: this.orders.per_page,
    //     master_id: this.master_id,
    //   }).then(response => {
    //     this.orders.data = response.data.data.orders.data
    //     this.orders.total = response.data.data.orders.total
    //     this.orders.last_page = response.data.data.orders.last_page
    //   }).catch(error => {
    //     console.warn(error)
    //   })
    // }
  }
}
</script>

<style scoped>

</style>
