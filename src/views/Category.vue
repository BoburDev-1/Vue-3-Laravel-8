<template>

  <main id="main" class="main home">
      <div class="main_">

        <div class="product">
              <category-product :catId="id"></category-product>
        </div>

        <div class="sidebar">
            <category-sidebar :catId="id"></category-sidebar>
        </div>

      </div>

      <!-- MiniCart -->
      <mini-cart></mini-cart>

  </main>

</template>

<script>

import CategoryProduct from '@/components/CategoryProduct.vue'
import CategorySidebar from '@/components/CategorySidebar.vue'
import MiniCart from '@/components/MiniCart'

export default {
  props:['id'],
  components:{
    CategoryProduct,
    CategorySidebar,
    MiniCart,
  },
}
</script>

<style>

</style>