<template>
  <div>
    <div class="py-2">
      <router-link
          :to="{ name: 'home.services' }"
          class="btn btn-rounded btn-hint-white"
      >
        <i class="fa fa-chevron-left"/> {{ $t('base.back') }}
      </router-link>
    </div>

    <div
      class="card p-4"
    >
      <div>
        <h4>{{ service.name }}</h4>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>
              {{ $t('app.components.services.breeds.breed') }}
            </th>
            <th>
              {{ $t('app.components.services.breeds.price') }}
            </th>
            <th>
              {{ $t('app.components.services.breeds.duration') }}
            </th>
            <th v-if="service.aggressive">
              {{ $t('app.components.services.breeds.aggressive_duration') }}
            </th>
            <th v-if="service.aggressive">
              {{ $t('app.components.services.breeds.aggressive_price') }}
            </th>
            <th v-if="service.koltun">
              {{ $t('app.components.services.breeds.koltun_duration') }}
            </th>
            <th v-if="service.koltun">
              {{ $t('app.components.services.breeds.koltun_price') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(breed,k) in breeds.filter(row => row.type == service.type)" :key="k">
            <td>
              {{ breed.name }}
            </td>
            <td>
              <form-group
                type="number"
                v-model="prices[breed.id]"
              />
            </td>
            <td>
              <form-group
                  type="select"
                  :items="[
                      { value: 30, text: $t('app.components.services.durations.30') },
                      { value: 60, text: $t('app.components.services.durations.60') },
                      { value: 90, text: $t('app.components.services.durations.90') },
                      { value: 120, text: $t('app.components.services.durations.120') },
                      { value: 150, text: $t('app.components.services.durations.150') },
                      { value: 180, text: $t('app.components.services.durations.180') },
                      { value: 210, text: $t('app.components.services.durations.210') },
                      { value: 240, text: $t('app.components.services.durations.240') },
                  ]"
                  name="duration"
                  v-model="duration[breed.id]"
              />
            </td>
            <th v-if="service.aggressive">
              <form-group
                  type="number"
                  v-model="aggressive_duration[breed.id]"
              />
            </th>
            <th v-if="service.aggressive">
              <form-group
                  type="number"
                  v-model="aggressive_price[breed.id]"
              />
            </th>
            <th v-if="service.koltun">
              <form-group
                  type="number"
                  v-model="koltun_duration[breed.id]"
              />
            </th>
            <th v-if="service.koltun">
              <form-group
                  type="number"
                  v-model="koltun_price[breed.id]"
              />
            </th>
          </tr>
        </tbody>
      </table>
      <div>
        <a class="ml-auto btn btn-success" @click="submit">{{$t('base.save')}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import {organizationUpdate, service} from "@/api";
import {mapGetters} from "vuex";
import FormGroup from "@/components/base/FormGroup";

export default {
  name: "Settings",
  components: {FormGroup},
  props: {
    service_id: null
  },
  data() {
    return {
      service: {},
      prices: {},
      duration: {},
      aggressive_duration: {},
      aggressive_price: {},
      koltun_duration: {},
      koltun_price: {},
    }
  },
  computed: {
    ...mapGetters([
      'auth',
      'breeds'
    ]),
  },
  created() {
    this.getService()
    this.breeds.forEach(breed => {
      this.prices[breed.id] = 0
      this.duration[breed.id] = 0
      this.aggressive_duration[breed.id] = 0
      this.aggressive_price[breed.id] = 0
      this.koltun_duration[breed.id] = 0
      this.koltun_price[breed.id] = 0
    })
  },
  methods: {
    getService(){
      service(this.service_id, {
        prices_by_organization: 1
      })
          .then((response) => {
            this.service = response.data.data.service
            this.service.prices.forEach(price => {
              this.prices[price.breed_id] = price.price
              this.duration[price.breed_id] = price.duration
              this.aggressive_duration[price.breed_id] = price.aggressive_duration
              this.aggressive_price[price.breed_id] = price.aggressive_price
              this.koltun_duration[price.breed_id] = price.koltun_duration
              this.koltun_price[price.breed_id] = price.koltun_price
            })
          })
    },
    submit() {
      let data = {
        '_method': 'patch',
        action: 'set-prices',
        prices: []
      };
      this.breeds.forEach(breed => {
        if (this.prices[breed.id] && this.duration[breed.id]){
          let price = {
            service_id: this.service.id,
            breed_id: breed.id,
            price: this.prices[breed.id],
            duration: this.duration[breed.id],
            aggressive: 0,
            koltun: 0
          };

          if (this.service.aggressive) {
            price.aggressive_duration = this.aggressive_duration[price.breed_id]
            price.aggressive_price = this.aggressive_price[price.breed_id]
          }
          if (this.service.koltun) {
            price.koltun_duration = this.koltun_duration[price.breed_id]
            price.koltun_price = this.koltun_price[price.breed_id]
          }

          data.prices.push(price)
        }
      })
      organizationUpdate(this.auth.organization.id, data)
    }
  }
}
</script>
