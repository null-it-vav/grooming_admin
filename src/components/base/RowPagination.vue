<template>
  <div class="row">
    <div class="col-lg-2 d-flex">
      <form-group
          custom_class="align-items-center mb-0"
          type="select"
          :items="[5,10,15]"
          v-model="rows.per_page"
      />
    </div>
    <div class="col-lg-8 d-flex">
      <b-pagination
          v-if="rows.last_page > 1"
          v-model="rows.page"
          :total-rows="rows.total"
          :per-page="rows.per_page"
          class="m-auto"
      ></b-pagination>
    </div>
    <div class="col-lg-2 d-flex align-items-center">
      <div class="ml-auto text-secondary">{{ $t('base.total') }} {{ this.rows.total }}</div>
    </div>
  </div>
</template>
<script>
import FormGroup from "@/components/base/FormGroup";
export default {
  name: "RowPagination",
  components: {FormGroup},
  props: {
    rows: {
      type: Object,
    }
  }
}
</script>
