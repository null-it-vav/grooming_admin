<template>
  <div :class="custom_class ? custom_class : 'mb-3'">
    <label v-if="label && group">{{ label }} <span v-if='required == ""' class="text-danger">*</span></label>

    <div
        :class="[
            (group ? 'input-group' : ''),
            (name in errors) ? 'is-invalid' : '',
            (prepend_name in errors) ? 'is-invalid' : '',
            (append_name in errors) ? 'is-invalid' : '',
        ]"
    >
      <label v-if="label && !group">{{ label }} <span v-if='required == ""' class="text-danger">*</span></label>

      <slot name="prepend">
      </slot>
      <input
          v-if="type == 'text'"
          type="text"
          :maxlength="maxlength"
          :placeholder="placeholder"
          :class="[
            (name in errors) ? 'is-invalid' : '',
            (prepend_name in errors) ? 'is-invalid' : '',
            (append_name in errors) ? 'is-invalid' : '',
          ]"
          class="form-control"
          v-model="localValue"
          :name="name"
          :required="required"
          :disabled="disabled"
          :autocomplete="autocomplete"
          @keyup.enter="$emit('keyupenter')"
      />
      <select
          v-else-if="type == 'select'"
          :required="required"
          class="form-control"
          v-model="localValue"
          :class="[
            (name in errors) ? 'is-invalid' : '',
            (prepend_name in errors) ? 'is-invalid' : '',
            (append_name in errors) ? 'is-invalid' : '',
            sm == '' ? 'form-control-sm' : ''
          ]"
          :disabled="disabled"
      >
        <option v-for="(item,k) in items" :key="k" :value="item.text ? item.value : item" :disabled="item.disabled">{{ item.text ? item.text : item }}</option>
      </select>

      <v-select
          v-else-if="type == 'select_find'"
          v-model="localValue"
          :options="items"
      />

      <input
          v-else-if="type == 'password'"
          type="password"
          :class="[
            (name in errors) ? 'is-invalid' : '',
            (prepend_name in errors) ? 'is-invalid' : '',
            (append_name in errors) ? 'is-invalid' : '',
          ]"
          class="form-control"
          :name="name"
          :required="required"
          :disabled="disabled"
          v-model="localValue"
          :autocomplete="autocomplete"
      />
      <input
          v-else-if="type == 'number'"
          type="number"
          :class="[
            (name in errors) ? 'is-invalid' : '',
            (prepend_name in errors) ? 'is-invalid' : '',
            (append_name in errors) ? 'is-invalid' : '',
          ]"
          class="form-control"
          :name="name"
          :required="required"
          :disabled="disabled"
          v-model="localValue"
          :placeholder="placeholder"
          :autocomplete="autocomplete"
      />
      <input
          v-else-if="type == 'email'"
          type="email"
          :class="[
            (name in errors) ? 'is-invalid' : '',
            (prepend_name in errors) ? 'is-invalid' : '',
            (append_name in errors) ? 'is-invalid' : '',
          ]"
          class="form-control"
          :name="name"
          :required="required"
          :disabled="disabled"
          v-model="localValue"
          :placeholder="placeholder"
          :autocomplete="autocomplete"
      />
<!--      <input-->
<!--          v-else-if="type == 'date'"-->
<!--          type="date"-->
<!--          :class="[-->
<!--            (name in errors) ? 'is-invalid' : '',-->
<!--            (prepend_name in errors) ? 'is-invalid' : '',-->
<!--            (append_name in errors) ? 'is-invalid' : '',-->
<!--          ]"-->
<!--          class="form-control"-->
<!--          :name="name"-->
<!--          :required="required"-->
<!--          :disabled="disabled"-->
<!--          v-model="localValue"-->
<!--          :placeholder="placeholder"-->
<!--      />-->

      <v-date-picker
          v-else-if="type == 'date'"
          mode="date"
          :class="[
                  (name in errors) ? 'is-invalid' : '',
                  (prepend_name in errors) ? 'is-invalid' : '',
                  (append_name in errors) ? 'is-invalid' : '',
                ]"
          :name="name"
          :required="required"
          :model-config="{
            type: 'string',
            mask: 'YYYY-MM-DD',
          }"
          v-model="localValue"
      >
        <template v-slot="{ inputValue, inputEvents }">
          <div class="d-flex align-items-center">
            <input
                class="form-control"
                :value="inputValue"
                v-on="inputEvents"
            />
          </div>
        </template>

      </v-date-picker>

      <input
          v-else-if="type == 'checkbox'"
          type="checkbox"
          :class="[
            (name in errors) ? 'is-invalid' : '',
            (prepend_name in errors) ? 'is-invalid' : '',
            (append_name in errors) ? 'is-invalid' : '',
          ]"
          class="custom-checkbox"
          :name="name"
          :required="required"
          :disabled="disabled"
          v-model="localValue"
          :placeholder="placeholder"
      />
      <b-checkbox
          v-else-if="type == 'switch'"
          switch
          :class="[
            (name in errors) ? 'is-invalid' : '',
            (prepend_name in errors) ? 'is-invalid' : '',
            (append_name in errors) ? 'is-invalid' : '',
          ]"
          class="mt-2"
          size="sm"
          :name="name"
          :required="required"
          :disabled="disabled"
          v-model="localValue"
          :placeholder="placeholder"
      >
      </b-checkbox>
      <div
          v-else-if="type == 'color-mark-picker'"
      >
        <b-dropdown
            variant="link"
            toggle-class="text-decoration-none"
            class="color-mark-picker"
            dropright
        >
          <template #button-content>
            <div class="border rounded-circle" :style="`width:30px;height:30px;background-color: ${localValue.hex ? localValue.hex : localValue};`"></div>
          </template>
          <template #default>
            <sketch-picker v-model="localValue" />
          </template>
        </b-dropdown>
      </div>
      <div
          v-else-if="type == 'photo'"
          :class="[
            (name in errors) ? 'is-invalid' : '',
            (prepend_name in errors) ? 'is-invalid' : '',
            (append_name in errors) ? 'is-invalid' : '',
          ]"
      >
        <b-form-file
            :accept="accept"
            type="file"
            :name="name"
            :required="required"
            :disabled="disabled"
            v-model="localValue"
        />
      </div>

      <textarea
          v-else
          :class="[
            (name in errors) ? 'is-invalid' : '',
            (prepend_name in errors) ? 'is-invalid' : '',
            (append_name in errors) ? 'is-invalid' : '',
          ]"
          class="form-control"
          :name="name"
          :required="required"
          :disabled="disabled"
          v-model="localValue"
          :placeholder="placeholder"
      />


      <slot name="append">
      </slot>
    </div>
    <valid-sign
        :name="name"
        :prepend_name="prepend_name"
        :append_name="append_name"
        :invalid="errors"
    />

    <div
        v-if="type == 'photo'"
    >
      <b-img
          v-if="url && !cropped"
          :src="url"
          fluid
          class="my-3 mx-auto"
      />

      <cropper
          v-if="cropped && url"
          ref="cropper"
          class="cropper mt-3"
          :src="url"
          :stencil-props="{
            aspectRatio: cropped
          }"
          @change="change"
      ></cropper>

      <div v-if="cropped && crop_file_size_mb" class="mt-2 d-flex align-content-center">
        <img src="~@/assets/undo.svg" class="pointer mr-2" @click="rotate(-90)" width="15px" />
        <img src="~@/assets/redo.svg" class="pointer mr-2" @click="rotate(90)" width="15px" />
        {{ $t('base.file_size', {size : crop_file_size_mb}) }}
      </div>
    </div>
  </div>
</template>

<script>
import validSign from '@/components/base/validSign';

export default {
  name: "FormGroup",
  components: {
    validSign,
  },
  props: {
    custom_class: {
      type: String,
      default: null,
      required: false
    },
    group: {
      type: Boolean,
      default: false,
      required: false
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    prepend_name: {
      type: String,
      default: ''
    },
    append_name: {
      type: String,
      default: ''
    },
    value: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Number | File,
      default: null
    },
    errors: {
      required: false,
      default: function () { return {} },
    },
    required: {
      required: false
    },
    sm: {
      required: false
    },
    accept: {
      required: false,
      default: function () { return "*";}
    },
    cropped: {
      required: false,
      default: function () { return null;}
    },
    placeholder: {
      required: false
    },
    maxlength: {
      required: false
    },
    autocomplete: {
      required: false
    },
    items: Array,
    disabled: Boolean
  },
  data() {
    return {
      localValue: this.value,
      tmpImageSrc: null,
      url: null,
      crop_file_size_mb: 0,
    }
  },
  watch: {
    value: function (){
      if (this.value){
        this.localValue = this.value
      }
    },
    localValue(newVal, oldVal) {
      // if (newVal !== oldVal && newVal !== (this.value || 0)) {
      if (newVal !== oldVal) {
        this.$emit('input', newVal)
        if (this.type == 'photo') this.tmpImage();
      }
    },
  },
  methods: {
    rotate(angle) {
      this.$refs.cropper.rotate(angle);
    },
    // eslint-disable-next-line no-unused-vars
    change({coordinates, canvas}){
      // var file = this.srcToFile(canvas.toDataURL(), 'photo', 'image/png');
      // var file = new File([canvas.toBlob()], 'photo', {type:'image/png'})
      // var img = canvas.toDataURL();
      // var file = this.dataURItoBlob(img);


      canvas.toBlob((blob) => {
        var file = new File([blob], "crop.png", { type: "image/png" })
        this.crop_file_size_mb = Math.round(file.size / 1024 / 1024 * 10) / 10
        this.$emit('set_crop_image', file)
      }, 'image/png');

    },
    dataURItoBlob(dataURI) {
      var byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
      else
        byteString = unescape(dataURI.split(',')[1]);
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], {type:mimeString});
    },
    handleInput(val){
      this.$emit('input', val)
    },
    tmpImage(){
      if (this.localValue) {
        if (this.errors[this.name]) delete this.errors[this.name]
        this.url = URL.createObjectURL(this.localValue)
        this.handleInput(this.localValue)
        // if (this.url && this.square != null){
        //   let img = new Image();
        //   img.onload = () => {
        //     if (img.width != img.height){
        //       if (!this.errors[this.name]) this.$set(this.errors, this.name, [])
        //       this.errors[this.name].push(this.$t('base.validation.image.square'))
        //
        //       this.$set(this.errors, this.name, this.errors[this.name])
        //       this.set_null()
        //     }
        //   }
        //   img.src = this.url;
        // }
      }else{
        this.set_null()
      }
    },
    set_null(){
      this.crop_file_size_mb = 0
      this.url = null;
      this.localValue = null;
      this.handleInput(this.localValue)
    }
  }
}
</script>

<style scoped>

</style>
