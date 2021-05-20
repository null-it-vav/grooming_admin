<template>
    <div>
        <div
            v-if="show.error"
            class="row pt-10"
        >
            <div class="col-lg-12 m-auto">
                <div
                    class="alert alert-warning alert-dismissible fade mb-0 show"
                    role="alert"
                >
                    <strong>{{$t('base.popup.error')}}</strong>&nbsp;
                    <span v-if="!show.msg">{{$t('base.popup.data_not_update')}}</span>
                    <div v-for="(m, k) in show.msg" :key="k">
                        {{ m }}
                    </div>
                    <button
                        type="button"
                        class="close"
                        data-dismiss="alert"
                        aria-label="Close"
                        @click="show.error = false"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        </div>
        <div
            v-if="show.success"
            class="row pt-10"
        >
            <div class="col-lg-12 m-auto">
                <div
                    class="alert alert-success alert-dismissible fade mb-0 show"
                    role="alert"
                >
                    <strong  v-if="!show.msg">{{ success_message ? success_message : $t('base.data_update') }}</strong>&nbsp;
                    <div v-for="(m, k) in show.msg" :key="k">
                      {{ m }}
                    </div>

                    <button
                        type="button"
                        class="close"
                        data-dismiss="alert"
                        aria-label="Close"
                        @click="show.success = false"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'MessageSuccessError',
  props: {
    success_message: null,
    error_message: null,
    show: {
      type: Object,
      default() {
        return {
          error: false,
          success: false,
          invalid: {},
          msg: []
        };
      },
    },
  },
  watch: {
    'show.success': function (){
      if (this.show.success) {
        setTimeout(() => {
          this.show.success = false;
        }, 4000);
      }
    },
    'show.error': function (){
      if (this.show.error) {
        setTimeout(() => {
          this.show.error = false;
        }, 4000);
      }
    }
  },
};
</script>

<style scoped>

</style>
