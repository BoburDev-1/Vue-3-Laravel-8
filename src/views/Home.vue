<template>
 
  <main id="main" class="main home">

      <div class="main_">

        <div class="product">        
              <products></products>            
        </div>

         <div class="sidebar">
            <category-sidebar></category-sidebar>
        </div>

      </div>

      <!-- MiniCart -->
      <mini-cart></mini-cart>
      
  </main>
</template>

<script>
// @ is an alias to /src
import Products from '@/components/Products.vue'
import CategorySidebar from '@/components/CategorySidebar'
import MiniCart from '@/components/MiniCart'

export default {
  name: 'Home',
  components: {
   Products,
   CategorySidebar,
   MiniCart,
  },
  data(){
    return {
   
    }
  },
  methods:{

  },
  mounted(){

  }
}
</script>
