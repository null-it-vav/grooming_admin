<template>
  <div>
    <div class="py-2">
      <router-link
          :to="{ name: 'home.clients' }"
          class="btn btn-rounded btn-hint-white"
      >
        <i class="fa fa-chevron-left"/> {{ $t('base.back') }}
      </router-link>
    </div>
    <form @submit.prevent="saveClientData">
      <div
          v-if="client"
          class="card p-4 mb-2"
      >
        <div class="card-body p-0">
          <div class="row">
            <div class="col-lg-12 d-flex align-content-center">
              <div
                  class="pointer"
                  @click="changePhoto"
              >
                <b-avatar
                    :src="client.photo"
                    size="4rem"
                    class="mr-3"
                />
              </div>

              <input
                  id="userAvatar"
                  ref="avatar"
                  type="file"
                  style="display: none;"
                  :value="avatarField"
                  @change="handlePhotoUpload()"
              >
              <form-group
                  :label="$t('app.components.clients.fields.name')"
                  type="text"
                  v-model="client.name"
              />
            </div>
            <div class="col-lg-6">
              <form-group
                  :label="$t('app.components.clients.fields.email')"
                  type="text"
                  v-model="client.email"
              />
            </div>
            <div class="col-lg-6">
              <form-group
                  :label="$t('app.components.clients.fields.phone')"
                  type="text"
                  v-model="client.phone"
              />
            </div>
            <div class="col-lg-3">
              <form-group
                  :label="$t('app.components.clients.fields.discount_type')"
                  type="select"
                  name="discount_type"
                  :items="[
                  {value: null, text: $t('app.components.clients.discount_types.null')},
                  {value: 'total', text: $t('app.components.clients.discount_types.total')},
                  {value: 'percent', text: $t('app.components.clients.discount_types.percent')}
              ]"
                  v-model="client.discount_type"
              />
            </div>
            <div class="col-lg-3" v-if="client.discount_type">
              <form-group
                  :label="$t('app.components.clients.fields.discount')"
                  type="number"
                  name="discount"
                  v-model="client.discount"
                  :group="client.discount_type == 'percent'"
              >
                <template v-slot:append  v-if="client.discount_type == 'percent'">
                  <div class="input-group-append">
                <span class="input-group-text pointer">
                  %
                </span>
                  </div>
                </template>
              </form-group>
            </div>
            <div class="col-lg-3">
              <form-group
                  :label="$t('app.components.clients.fields.next_discount_type')"
                  type="select"
                  name="next_discount_type"
                  :items="[
                  {value: null, text: $t('app.components.clients.discount_types.null')},
                  {value: 'total', text: $t('app.components.clients.discount_types.total')},
                  {value: 'percent', text: $t('app.components.clients.discount_types.percent')}
              ]"
                  v-model="client.next_discount_type"
              />
            </div>
            <div class="col-lg-3" v-if="client.next_discount_type">
              <form-group
                  :label="$t('app.components.clients.fields.discount')"
                  type="number"
                  name="discount"
                  v-model="client.next_discount"
                  :group="client.next_discount_type == 'percent'"
              >
                <template v-slot:append  v-if="client.next_discount_type == 'percent'">
                  <div class="input-group-append">
                <span class="input-group-text pointer">
                  %
                </span>
                  </div>
                </template>
              </form-group>
            </div>
            <div class="col-lg-6">
              <label>{{ $t('app.components.clients.fields.tags') }}</label>
              <a-select
                  class="mb-4"
                  mode="multiple"
                  v-model="client_tags"
                  @search="fetchTags"
                  @blur="fetchTagsValue = ''"
                  :filter-option="false"
              >
                <div slot="dropdownRender" slot-scope="menu">
                  <div @click="addItem" class="add-tag">
                    {{ $t('app.components.tags.create') }}
                  </div>
                  <v-nodes :vnodes="menu" />
                </div>
                <a-select-option
                    v-for="(tag,k) in tags.filter(tag => tag.type == 'user' && tag.name.includes(fetchTagsValue))"
                    :key="k"
                    :value="tag.id"
                    :label="tag.name"
                    :aria-label="tag.name"
                >
                  <div class="ant-select-dropdown-menu-item-tags">
                    <div
                        class="ant-select-dropdown-menu-item-tags-code_title my-auto"
                        :style="`background-color: #${tag.color_mark};color: ${ $options.filters.invert_color(tag.color_mark) }`"
                    >
                      {{ tag.code_title }}
                    </div>
                    {{ tag.name }}
                  </div>
                </a-select-option>
              </a-select>
            </div>
            <div class="col-lg-12">
              <button type="submit" class="m-auto btn btn-success">
                {{ $t('base.update') }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <b-card
          :title="$t('app.components.clients.additional_phones')"
          class="mb-2"
      >
        <div
            class="row"
            v-for="(additional_phone,k) in client.additional_phones"
            :key="k"
        >
          <div class="col-lg-4">
            <form-group
                type="text"
                :label="$t('app.components.clients.additional_phone.who')"
                v-model="additional_phone.who"
            />
          </div>
          <div class="col-lg-4">
            <form-group
                type="text"
                :label="$t('app.components.clients.additional_phone.name')"
                v-model="additional_phone.name"
            />
          </div>
          <div class="col-lg-3">
            <form-group
                type="text"
                v-model="additional_phone.phone"
                :label="$t('app.components.clients.additional_phone.phone')"
            />
          </div>
          <div class="col-lg-auto mt-3 ml-auto d-flex align-items-center">
            <i class="pointer btn btn-danger rounded-circle fa fa-trash" @click="deleteAdditionalPhone(k)"/>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-auto mb-2">
            <button
                type="submit"
                class="m-auto btn btn-success"
                v-if="client.additional_phones && client.additional_phones.length > 0"
            >
              {{ $t('base.update') }}
            </button>
          </div>
          <div class="col-lg-auto ml-auto">
            <a
                class="btn btn-purpure rounded-circle fa fa-plus"
                @click="addAdditionalPhone"
            />
          </div>
        </div>
      </b-card>
    </form>
    <div class="card p-4 mb-2">
      <div class="card-body p-0 d-flex flex-wrap">
        <router-link
            v-for="(pet, k) in client.pets"
            :key="k"
            :to="{name: 'home.client.pet.index', params: {
              client_id: client_id,
              pet_id: pet.id
            }}"
            class="pet-card"
        >
          <div>
            <b-avatar :src="pet.phone"/>
          </div>
          <div
              class="pet-card-about"
          >
            <div>
              <b>{{ pet.nickname }} </b>
              <span class="pet-card-about-breed">{{ breeds && breeds.find(breed => breed.id == pet.breed_id) ? breeds.find(breed => breed.id == pet.breed_id).name : '' }}</span>
            </div>
            <div class="d-flex flex-wrap">
              <div
                  v-for="(tag,k) in pet.tags"
                  :key="k"
                  class="ant-select-dropdown-menu-item-tags-code_title mb-1"
                  :style="`background-color: #${tag.color_mark};color: ${ $options.filters.invert_color(tag.color_mark) }`"
                  v-b-tooltip="tag.name"
              >
                {{ tag.code_title }}
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <div class="card p-4">
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{$t('app.components.orders.fields.date')}}</th>
            <th>{{$t('app.components.orders.fields.status')}}</th>
            <th>{{$t('app.components.clients.pets.fields.nickname')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order,k) in orders.data" :key="k">
            <td>
              {{ order.id }}
            </td>
            <td>
              {{order.date}} {{order.time_start}} - {{order.time_end}}
            </td>
            <td>
              {{$t('app.components.orders.statuses.'+order.status)}}
            </td>
            <td>
              {{ order.pet.nickname }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="row" v-if="orders.last_page > 1">
        <div class="col-lg-2 d-flex">
          <form-group
              custom_class="align-items-center mb-0"
              type="select"
              :items="[5,10,15]"
              v-model="orders.per_page"
          />
        </div>
        <div class="col-lg-8 d-flex">
          <b-pagination
              v-model="orders.page"
              :total-rows="orders.total"
              :per-page="orders.per_page"
              aria-controls="my-table"
              class="m-auto"
          ></b-pagination>
        </div>
        <div class="col-lg-2 d-flex align-items-center">
          <div class="ml-auto text-secondary">{{ $t('base.total') }} {{ this.orders.total }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {clients, orders, client_update} from "@/api";
import FormGroup from "@/components/base/FormGroup";
import {mapGetters} from "vuex";

export default {
  name: "Show",
  components: {
    FormGroup,
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  props: {
    client_id: null
  },
  computed: {
    ...mapGetters([
        'breeds',
        'tags'
    ]),
    client_tags: {
      get() {
        let data = []
        if (this.client.tags)
          this.client.tags.forEach(tag => {
            data.push(tag.id)
          })
        return data
      },
      set(value) {
        this.fetchTagsValue = ''
        let tags = this.tags.filter(tag => value.includes(tag.id))
        this.client.tags = tags
      }
    }
  },
  data() {
    return {
      client: {},
      orders: {
        data: [],
        page: 1,
        per_page: this.qty ? this.qty : 15,
        last_page: 1,
        total: 0,
      },
      image: null,
      avatarField: null,
      fetchTagsValue: '',
    }
  },
  created() {
    this.getClient()
    this.getOrders()
  },
  methods: {
    getClient() {
      clients({
        id: this.client_id,
        with: [
            'pets.tags',
            'tags'
        ]
      })
          .then((response) => {
            this.client = response.data.data.clients.data[0]
          })
    },
    getOrders(){
      orders({
        page: this.orders.page,
        qty: this.orders.per_page,
        client_id: this.client_id,
        with: [
            'pet'
        ]
      }).then(response => {
        this.orders.data = response.data.data.orders.data
        this.orders.total = response.data.data.orders.total
        this.orders.last_page = response.data.data.orders.last_page
      })
    },
    saveClientData() {
      let data = {
        _method: 'patch',
        discount_type: this.client.discount_type,
        discount: this.client.discount,
        next_discount_type: this.client.next_discount_type,
        next_discount: this.client.next_discount,
        name: this.client.name,
        phone: this.client.phone,
        additional_phones: this.client.additional_phones,
        tags: this.client_tags
      }
      client_update(this.client.id, data)
    },
    changePhoto(){
      document.getElementById('userAvatar').click()
    },
    handlePhotoUpload(){
      if (this.$refs.avatar.files[0]){
        let data = new FormData()
        data.append('_method', 'patch')
        data.append('action', 'set-photo')
        data.append('photo', this.$refs.avatar.files[0])

        client_update(this.client.id, data)
        .then(response => {
          this.client.pohot = response.data.data.user.photo
        })
      }
    },
    addAdditionalPhone(){
      this.client.additional_phones.push({
        who: '',
        name: '',
        phone: ''
      })
    },
    deleteAdditionalPhone(k) {
      this.client.additional_phones.splice(k, 1)
      this.saveClientData()
    },
    addItem() {

    },
    fetchTags(value) {
      this.fetchTagsValue = value
    },
  }
}
</script>

<style scoped>

</style>
