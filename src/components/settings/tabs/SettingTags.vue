<template>
  <b-card :title="$t('app.components.settings.tabs.tags')" class="mb-2">
    <div class="row">
      <div class="col-lg-2">
        <form-group
            type="select"
            key="types_filter"
            :items="[
                {value: null, text: $t('app.components.tags.fields.types.all')},
                {value: 'pet', text: $t('app.components.tags.fields.types.pet')},
                {value: 'user', text: $t('app.components.tags.fields.types.user')},
            ]"
            v-model="types_filter"
        />
      </div>
      <div class="col-lg-auto ml-auto">
        <a
            class="btn btn-purpure rounded-circle fa fa-plus"
            @click="showCreateTag = true"
        />
      </div>
    </div>
    <table class="table table-adaptive" v-if="tags.length > 0">
      <thead>
      <tr>
        <th>{{$t('app.components.tags.fields.code_title')}}</th>
        <th>{{$t('app.components.tags.fields.name')}}</th>
        <th>{{$t('app.components.tags.fields.type')}}</th>
        <th></th>
      </tr>
      </thead>
      <tr v-for="tag in tags.filter(tag => (tag.type == types_filter || types_filter == null))" :key="tag.id">
        <td :data-label="$t('app.components.tags.fields.code_title')">
          <h4 class="mb-0">
            <span
                class="badge border"
                :style="`background-color: #${tag.color_mark};color: ${ $options.filters.invert_color(tag.color_mark) }`"
            >
              {{ tag.code_title }}
            </span>
          </h4>
        </td>
        <td :data-label="$t('app.components.tags.fields.name')">
          {{ tag.name }}
        </td>
        <td :data-label="$t('app.components.tags.fields.type')">
          {{ $t(`app.components.tags.fields.types.${tag.type}`) }}
        </td>
        <td>
          <div class="d-flex">
            <a class="btn btn-dark rounded-circle ml-auto mb-2 mb-md-0 fa fa-pencil fa-lg" @click="openUpdatePopup(tag)"/>
          </div>
        </td>
      </tr>
    </table>
    <tag-create
        v-if="showCreateTag"
        :by-client="true"
        :tag="tag"
        @closePopup="closeCreateTag"
        :can-select-type="true"
    />
  </b-card>
</template>

<script>
import {mapGetters} from "vuex";
import FormGroup from "@/components/base/FormGroup";
import TagCreate from "@/components/tags/TagCreate";
import deepClone from 'clonedeep';
import store from "@/store/app";

export default {
  name: "SettingTags",
  components: {TagCreate, FormGroup},
  computed: {
    ...mapGetters([
      'tags'
    ]),
  },
  data() {
    return {
      tag: {
        color_mark: 'ffffff',
        type: 'pet'
      },
      types_filter: null,
      showCreateTag: false
    }
  },
  methods: {
    openUpdatePopup(tag){
      this.tag = deepClone(tag)
      this.tag.color_mark  = '#'+tag.color_mark
      this.showCreateTag = true
    },
    closeCreateTag() {
      store.dispatch('getAuth').then(() => {})
      this.tag = {
        color_mark: 'ffffff',
        type: 'pet'
      };
      this.showCreateTag = false
    }
  }
}
</script>
