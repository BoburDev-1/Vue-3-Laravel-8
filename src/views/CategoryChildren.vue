<template>

<main id="main" class="main home">

      <div class="main_">

        <div class="product">             
              <category-product 
                :catId="categoryid" :catChildrenId="catChildrenId"></category-product>
        </div>

        <div class="sidebar">
            <category-sidebar 
              :catId="categoryid" :catChildrenId="catChildrenId"></category-sidebar>
        </div>

      </div>

            <!-- MiniCart -->
      <mini-cart></mini-cart>

  </main>

</template>

<script>

import MiniCart from '@/components/MiniCart'

export default {
  name:'CategoryChildren',
  props:[
    'categoryid','catChildrenId'
  ],
  components:{
    MiniCart,
  },
}
</script>

<style>

</style>


