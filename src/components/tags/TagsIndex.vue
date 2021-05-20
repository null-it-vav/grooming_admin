<template>
  <div class="card p-4">
    <div class="row mb-4">

      <div class="ml-auto col-3 d-flex">
        <div class="ml-auto">
          <a
              class="btn btn-purpure rounded-circle fa fa-plus"
              @click="showCreatePopup = true"
          />
        </div>
      </div>
    </div>
    <table class="table table-adaptive" v-if="tags.data.length > 0">
      <thead>
        <tr>
          <th>{{$t('app.components.tags.fields.code_title')}}</th>
          <th>{{$t('app.components.tags.fields.name')}}</th>
          <th>{{$t('app.components.tags.fields.type')}}</th>
          <th>{{$t('app.components.tags.fields.lang')}}</th>
          <th></th>
        </tr>
      </thead>
      <tr v-for="(tag, k) in tags.data" :key="k">
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
          {{ tag.type }}
        </td>
        <td :data-label="$t('app.components.tags.fields.lang')">
          {{ langs[tag.lang] }}
        </td>
        <td>
          <div class="d-flex">
            <button class="btn btn-dark rounded-circle ml-auto mb-2 mb-md-0 fa fa-pencil fa-lg" @click="openUpdatePopup(tag)"/>
          </div>
        </td>
      </tr>
    </table>
    <tag-create
      v-if="showCreatePopup"
      @closePopup="closePopup"
      :tag="tag"
      :can-select-type="true"
    />
  </div>
</template>

<script>
import {tags} from "@/api";
import TagCreate from "@/components/tags/TagCreate";
import deepClone from 'clonedeep';

export default {
  name: "IndexTags",
  components: {TagCreate},
  data() {
    return {
      tags: {
        data: [],
        page: 1,
        per_page: this.qty ? this.qty : 15,
        last_page: 1,
        total: 0,
      },
      tag: {
        id: null,
        name: '',
        code_title: '',
        lang: null,
        color_mark: 'ffffff',
        type: 'user'
      },
      showCreatePopup: false
    }
  },
  created() {
    this.getTags()
  },
  computed: {
    langs() {
      let data = {};
      for(let k in this.$i18n.messages){
        data[k] = this.$i18n.messages[k].language
      }
      return data;
    }
  },
  methods: {
    getTags() {
      let data = {
        page: this.tags.page,
        qty: this.tags.per_page,
      };
      tags(data)
      .then((response) => {
        this.tags.data = response.data.data.tags.data
        this.tags.total = response.data.data.tags.total
        this.tags.last_page = response.data.data.tags.last_page
      })
    },
    closePopup() {
      this.showCreatePopup = false
      this.getTags()
      this.tag = {
        id: null,
        name: '',
        code_title: '',
        lang: null,
        color_mark: 'ffffff',
        type: 'user'
      }
    },
    openUpdatePopup(tag){
      this.tag = deepClone(tag)
      this.tag.color_mark = '#'+this.tag.color_mark
      this.showCreatePopup = true
    },
  }
}
</script>

<style scoped>

</style>
