<template>

  <div class="product_sort">
    <ul class="product_sort_ul">
      <li><a href="#" @click="sortProductsIndex({type:'low'})">Arzon</a></li>
      <li><a href="#" @click="sortProductsIndex({type:'top'})">Qimmat</a></li>
    </ul>
  </div>

  <div class="product_">
        <div class="product_item" v-for="(product, index) in products" :key="index">          
            <img :src="imgsrc(product.img)" alt="">
                <h5>
                  <a 
                  :href="'/category/product/'+product.id"
                  class="product_link"
                  >
                    {{ product.title }}
                  </a>
                </h5>
            <p>{{ product.price }} sum</p>
          <div class="product_item_cart">
              <i class="fa fa-heart-o product_item_favorite" aria-hidden="true" @click="favoriteProduct(product.id, $event)"></i>

              <i class="fa fa-shopping-cart product_addcart_icon" @click="addProductToCart({ index, productId: product.id, event:$event})" aria-hidden="true"></i>
          </div>

        </div>
  </div>
</template>

<script>

import {mapState, mapActions, mapMutations, mapGetters} from 'vuex'

export default {

  data(){
    return {

    }    
  },
  methods:{

    ...mapMutations({
      loadCart:'product/loadCart',
      saveCart:'product/saveCart',
      setProducts:'product/setProducts',   
    }),
    ...mapActions({
      addProductToCart:'product/addProductToCart',
      getProductsIndex:'product/getProductsIndex',
      sortProductsIndex:'product/sortProductsIndex', 
    }),

    favoriteProduct(id, event){
       event.target.classList.toggle("fa-heart");
       event.target.classList.toggle("fa-heart-o");
    },
    
  },
  computed:{
    ...mapState({
      products:state => state.product.products,
      loading:state => state.product.loading,
      cart:state => state.product.cart,
    }),
    ...mapGetters({
        imgsrc:'product/imgsrc',
        sortedPosts:'product/sortedPosts',
    }),

  },
  mounted(){
    this.loadCart();
    this.getProductsIndex();
  },
  created(){

  },

}
</script>

<style scoped>

</style>