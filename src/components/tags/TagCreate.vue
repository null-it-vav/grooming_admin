<template>
  <base-popup
    @closePopup="closePopup"
    :caption="tag.id ? $t('app.components.tags.update') : $t('app.components.tags.create')"
    :success_error="success_error"
    dialog-size="modal-xs"
  >
    <template v-slot:body>
      <form
        @submit.prevent="submit"
        class="row"
      >
        <div class="col-12">
          <form-group
              :label="$t('app.components.tags.fields.color_mark')"
              type="color-mark-picker"
              v-model="tag.color_mark"
              name="color_mark"
          />
        </div>
        <div class="col-12">
          <form-group
            type="text"
            :maxlength="3"
            :label="$t('app.components.tags.fields.code_title')"
            :errors="errors"
            name="name"
            v-model="tag.code_title"
          />
        </div>
        <div class="col-12">
          <form-group
            type="text"
            :label="$t('app.components.tags.fields.name')"
            :errors="errors"
            name="name"
            v-model="tag.name"
          />
        </div>
        <div class="col-12" v-if="canSelectType && tag.id == null">
          <form-group
              type="select"
              :label="$t('app.components.tags.fields.type')"
              :errors="errors"
              :items="[
                  {value: 'pet', text: $t('app.components.tags.fields.types.pet')},
                  {value: 'user', text: $t('app.components.tags.fields.types.user')},
              ]"
              name="name"
              v-model="tag.type"
          />
        </div>
        <div class="col-12" v-if="!byClient">
          <form-group
            type="select"
            :items="langs"
            :label="$t('app.components.tags.fields.lang')"
            :errors="errors"
            name="lang"
            v-model="tag.lang"
          />
        </div>
        <div class="col-lg-12 d-flex">
          <button type="submit" class="m-auto btn btn-success">
            {{ tag.id ? $t('base.update') : $t('base.create') }}
          </button>
        </div>
      </form>
    </template>
  </base-popup>
</template>

<script>
import BasePopup from "@/components/base/Popup";
import FormGroup from "@/components/base/FormGroup";
import { tag_create, tag_update } from "@/api";

export default {
  name: "TagCreate",
  components: {FormGroup, BasePopup},
  props: {
    tag: {
      type: Object,
      default: () => ({
        id: null,
        name: '',
        code_title: '',
        lang: null,
        color_mark: 'ffffff',
        type: 'user'
      })
    },
    byClient: {
      type: Boolean,
      default: false
    },
    canSelectType: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      errors: {},
      success_error: {
        success: false,
        error: false
      },
    }
  },
  computed: {
    langs() {
      let data = [];
      for(let k in this.$i18n.messages){
        data.push({
          value: k,
          text: this.$i18n.messages[k].language
        })
      }
      return data;
    }
  },
  methods: {
    closePopup(data = {}) {
      this.$emit('closePopup', data)
    },
    submit(){
      let data = {
        name: this.tag.name,
        code_title: this.tag.code_title,
        type: this.tag.type,
        lang: this.tag.lang,
        color_mark: this.tag.color_mark.hex ? this.tag.color_mark.hex.replace('#','') : this.tag.color_mark.replace('#',''),
      }

      let q = null

      if (this.tag.id){
        q = tag_update(this.tag.id,data)
      }else {
        if (this.byClient){
          q = tag_create(data)
        }else {
          q = tag_create({
            tags: [
              data
            ]})
        }
      }

      q.then((response) => {
        this.success_error.success = true
        setTimeout(() => {
          this.closePopup(response.data.data)
        }, 2000);
      })
      .catch((error) => {
        this.success_error.error = true
        if (error.response?.data?.errors) this.errors = error.response?.data?.errors
      })

    }
  }
}
</script>

<style scoped>

</style>
