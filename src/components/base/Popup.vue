<template>
  <div>
    <div
        class="show modal fade"
        :style="'display: block; overflow-x: hidden; overflow-y: auto;'"
        aria-hidden="true"
    >
      <div
          class="modal-dialog"
          :class="dialogSize ? dialogSize : 'modal-xl'"
          role="document"
      >
        <div
            class="modal-content edu-program"
        >
          <div class="modal-header">
            <h5
                id="exampleModalLabel"
                class="modal-title ml-4"
            >
              {{ caption }}
            </h5>
            <button
                type="button"
                class="close"
                aria-label="Close"
                @click="closePopup"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="container-fluid">
              <slot name="body">

              </slot>
            </div>

            <message-success-error
                class="mt-2"
                :show="success_error"
            />
          </div>

          <div class="modal-footerd-flex justify-content-center">
            <slot name="footer">
            </slot>
          </div>
        </div>
      </div>
    </div>
    <div
        class="modal-backdrop fade show"
    ></div>
  </div>
</template>

<script>

import MessageSuccessError from "@/components/base/SuccessError";
export default {
  name: 'BasePopup',
  props: {
    caption: {
      type: String,
      default: '',
    },
    dialogSize: {
      type: String,
      default: 'modal-xl',
    },
    success_error: {}
  },
  components: {
    MessageSuccessError
  },
  created() {
    this.$store.state.popup = true;
  },
  destroyed() {
    this.$store.state.popup = false;
  },
  data() {
    return {

    }
  },
  watch: {
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
    closePopup() {
      this.$emit('closePopup');
    },
  },
}
</script>
