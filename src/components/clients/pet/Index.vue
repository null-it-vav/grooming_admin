<template>
  <div>
    <div class="col-lg-12 mb-2 alert position-fixed fixed-bottom">
      <message-success-error
          :show="success_error"
      />
    </div>

    <div class="py-2">
      <router-link
          :to="{name: 'home.client.show', params: {client_id: client_id}}"
          class="btn btn-rounded btn-hint-white"
      >
        <i class="fa fa-chevron-left"/> Назад
      </router-link>
    </div>

    <div class="card p-4">
      <form
          @submit.prevent="updatePet"
          class="row"
      >
        <div class="col-lg-6">
          <form-group
            type="text"
            v-model="pet.nickname"
            :errors="errors"
            :label="$t('app.components.clients.pets.fields.nickname')"
          />
        </div>
        <div
            class="col-lg-6"
            v-if="pet.type != 'other'"
        >
          <label>{{ $t('app.components.clients.pets.fields.breed') }}</label>
          <a-select
              v-model="pet.breed_id"
              show-search
              @search="fetchBreeds"
              :filter-option="false"
          >
            <a-select-option
                v-for="(breed,k) in breeds.filter(row => (row.type == pet.type && row.name.includes(fetchBreedValue)))"
                :key="k"
                :value="breed.id"
                :label="breed.name"
            >
              {{ breed.name }}
            </a-select-option>
          </a-select>
        </div>
        <div class="col-lg-6">
          <label>{{ $t('app.components.clients.pets.fields.tags') }}</label>
          <a-select
              mode="multiple"
              v-model="pet_tags"
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
                v-for="(tag,k) in tags.filter(tag => tag.type == 'pet' && tag.name.includes(fetchTagsValue))"
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
        <div class="col-lg-6">
          <form-group
            v-model="pet.birthday"
            type="date"
            :errors="errors"
            :label="$t('app.components.clients.pets.fields.birthday')"
          />
        </div>
        <div class="col-lg-6">
          <form-group
            v-model="pet.aggressive"
            type="switch"
            :errors="errors"
            :label="$t('app.components.clients.pets.fields.aggressive')"
          />
        </div>
        <div class="col-lg-12 mt-2">
          <button type="submit" class="btn btn-success">
            {{$t('base.update')}}
          </button>
        </div>
      </form>
    </div>

    <tag-create
      v-if="showCreateTag"
      :by-client="true"
      :tag="{
        color_mark: 'ffffff',
        type: 'pet'
      }"
      @closePopup="closeCreateTag"
    />
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import { pets, pet_update } from "@/api";
import FormGroup from "@/components/base/FormGroup";
import TagCreate from "@/components/tags/TagCreate";
import MessageSuccessError from "@/components/base/SuccessError";

export default {
  name: "Index",
  components: {
    MessageSuccessError,
    TagCreate,
    FormGroup,
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  props: {
    client_id: null,
    pet_id: null
  },
  computed: {
    ...mapGetters([
      'tags',
        'breeds'
    ]),
    pet_tags: {
      get() {
        let data = []
        this.pet.tags.forEach(tag => {
          data.push(tag.id)
        })
        return data
      },
      set(value) {
        this.fetchTagsValue = ''
        let tags = this.tags.filter(tag => value.includes(tag.id))
        this.pet.tags = tags
      }
    }
  },
  data() {
    return {
      pet: {
        tags: []
      },
      errors: {},
      showCreateTag: false,
      fetchingBreeds: true,
      success_error: {
        success: false,
        error: false
      },
      fetchBreedValue: '',
      fetchTagsValue: '',
    }
  },
  created() {
    this.getPet()
  },
  methods: {
    getInvert(color){
      return window.invert('#'+(color || 'ffffff'), true)
    },
    getPet(){
      pets({
        id: this.pet_id,
        with: [
            'tags'
        ]
      })
      .then(response => {
        this.pet = response.data.data.pets.data[0]
      })
    },
    addItem() {
      this.showCreateTag = true
    },
    closeCreateTag(data){
      this.showCreateTag = false
      if (data.tag){
        this.$store.state.tags.push(data.tag)
        this.pet.tags.push(data.tag)
      }
    },
    updatePet(){
      pet_update(this.pet.id, {
        nickname: this.pet.nickname,
        birthday: this.pet.birthday,
        aggressive: this.pet.aggressive ? 1 : 0,
        tags: this.pet_tags,
        type: this.pet.type,
        breed_id: this.pet.breed_id,
      })
      .then(() => {
        this.success_error.success = true
      })
    },
    fetchBreeds(value){
      this.fetchBreedValue = value
    },
    fetchTags(value) {
      this.fetchTagsValue = value
    },
  }
}
</script>

<style scoped>

</style>
