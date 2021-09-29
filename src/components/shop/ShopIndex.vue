<template>
  <div>
    <div class="row">
      <div class="col-md-2 mb-2">
        <b-card>
          <div class="list-group border-none">
            <router-link
                :to="{ name: 'home.shop.orders' }" class="list-group-item"
            >
              <i class="fa fa-cart-plus"/>
              <span class="mx-3">{{$t('app.components.shop.tabs.orders')}}</span>
            </router-link>
            <router-link
                :to="{ name: 'home.shop.categories' }" class="list-group-item"
            >
              <i class="fa fa-list"/>
              <span class="mx-3">{{$t('app.components.shop.tabs.categories')}}</span>
            </router-link>
            <router-link
                :to="{ name: 'home.shop.items' }" class="list-group-item"
            >
              <i class="fa fa-shopping-bag"/>
              <span class="mx-3">{{$t('app.components.shop.tabs.items')}}</span>
            </router-link>
          </div>
        </b-card>
      </div>
      <div class="col-md-10">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopIndex"
}
</script>

<style scoped>

</style>
