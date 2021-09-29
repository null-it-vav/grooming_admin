<template>
  <div class="card p-4">
    <div class="row mb-2">

      <div class="ml-auto col-auto d-flex">
        <div class="ml-auto">
          <a
              class="btn btn-purpure rounded-circle fa fa-plus"
              @click="showCreatePopup = true"
          />
        </div>
      </div>
    </div>
    <package-create
      v-if="showCreatePopup"
      @closePopup="closePopup"
    />
  </div>
</template>

<script>
import { packages } from "@/api";
import PackageCreate from "@/components/packages/PackageCreate";

export default {
  name: "PackagesIndex",
  components: {PackageCreate},
  data() {
    return {
      packages: {
        data: [],
        page: 1,
        per_page: 15,
        last_page: 1,
        total: 0,
      },
      showCreatePopup: false
    }
  },
  created() {
    this.getPackages()
  },
  methods: {
    getPackages() {
      packages({
        page: this.packages.page,
        qty: this.packages.per_page
      })
    },
    closePopup() {
      this.showCreatePopup = false
      this.getPackages()
    }
  }
}
</script>

<style scoped>

</style>
