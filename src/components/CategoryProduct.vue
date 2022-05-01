<template>
    <div v-if="products.length !== 0" class="product_check" >
  
      <!-- Product sort price -->

    <div class="product_sort" v-if="catId && catChildrenId == undefined ">
      <ul class="product_sort_ul">
        <li><a href="#" 
        @click="sortProductsCategoryIndex({type:'low', categoryId:catId }),getProducts(null, catId)"
        :class="{ active_sort_link: active_sort_product_low}">
          Arzon
          </a></li>
        <li><a href="#" 
        @click="sortProductsCategoryIndex({type:'top', categoryId:catId }),getProducts(null, catId)"
        :class="{ active_sort_link: active_sort_product_top}">
          Qimmat
          </a></li>
      </ul>
    </div>

    <div class="product_sort" v-if="catChildrenId ">
      <ul class="product_sort_ul">
        <li><a href="#" 
        @click="sortProductsCategoryChildrenIndex({type:'low', categoryId:catId, catChildId:catChildrenId }),
        getProducts(null, catId, catChildrenId)"
        :class="{ active_sort_link: active_sort_product_low}"
        >
          Arzon
          </a></li>
        <li><a href="#" 
        @click="sortProductsCategoryChildrenIndex({type:'top', categoryId:catId, catChildId:catChildrenId }),
        getProducts(null, catId, catChildrenId)"
        :class="{ active_sort_link: active_sort_product_top}">
          Qimmat
          </a></li>
      </ul>
    </div>

<!-- Product show -->

    <div class="product_" >
          <div 
            class="product_item" 
            v-for="(product, index) in products"
            :key="index">          
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
                <i class="fa fa-heart-o product_item_favorite" :data-favorite-product="product.id"
                aria-hidden="true"
                @click="favoriteProduct(product.id, $event)"></i>

              <i class="fa fa-shopping-cart product_addcart_icon_incart" 
              v-if="inCartProduct(product.id)"
              @click="addProductToCart({ index, productId: product.id, event:$event})"
              :data-product-id="product.id"
                aria-hidden="true"></i>

              <i class="fa fa-shopping-cart product_addcart_icon" 
              v-else
              @click="addProductToCart({ index, productId: product.id, event:$event})"
               :data-product-id="product.id"
                aria-hidden="true"></i>
            </div>
        </div><!-- product_item_end -->
    </div>

<!-- Product Pagination -->

       <div v-if="totalLinks > 1" class="pagination d-flex justify-content-center mt-5">
              <nav aria-label="...">
                <ul class="pagination">
                  <li class="page-item"
                  :class="[{disabled:!pagination.prev_page_url }]"
                  >
                    <a 
                    class="page-link"
                    href="#"
                    tabindex="-1"                    
                    aria-disabled="true"                    
                    @click="getProducts(pagination.prev_page_url, catId, catChildrenId)"
                    >
                    Previous
                    </a>
                  </li>

                  <li class="page-item" v-for="index in totalLinks" :key="index"> 
                      <a 
                      class="page-link"
                      href="#"
                      :data-teg="pagination.next_page_url"
                      :class="[{'active_links_':cur_page == index}]"
                      @click="getProducts(index, catId, catChildrenId)"
                      >
                      {{ index }}
                      </a>
                  </li>

                  <li class="page-item"
                      :class="[{disabled:!pagination.next_page_url }]"
                    >
                    <a 
                    class="page-link"
                    href="#"
                    :data-teg="pagination.next_page_url"
                    @click="getProducts(pagination.next_page_url, catId, catChildrenId)"
                    >
                    Next
                    </a>
                  </li>
                </ul>
              </nav>
        </div>
   </div>
   
  <div v-else >

        <div v-if="loading">
        <div class="loading_block">
            <i class="fa fa-spinner fa-pulse fa-3x fa-fw loading_block_icon"></i>
            <span class="loading_block_text">Loading...</span>
        </div>
  </div>

  <div  v-show="products.length === 0" class="alert alert-info product_ m-5">
      Xozrica bu kategoriyada maxsulotlar yuq
  </div>
 
  </div>

</template>

<script>

import {mapState, mapActions, mapMutations, mapGetters} from 'vuex'

export default {
  props: ['catId', 'catChildrenId'],
  data(){
    return {
    }    
  },
  created(){
    this.getProducts(this.page_url = null, this.catId, this.catChildrenId);
  },
  methods:{
    ...mapMutations({
      loadCart:'product/loadCart',
      saveCart:'product/saveCart',
      setsortProductPrice:'product/setsortProductPrice',
    }),
    ...mapActions({
      sendData:'product/sendData',
      addProductToCart:'product/addProductToCart',
      sortProductsCategoryIndex:'product/sortProductsCategoryIndex',
      sortProductsCategoryChildrenIndex:'product/sortProductsCategoryChildrenIndex',
    }),

    favoriteProduct(id, event){
       event.target.classList.toggle("fa-heart");
       event.target.classList.toggle("fa-heart-o");
    },

    isEmpty(object) {
      for( var key in object)
        if (object.hasOwnProperty(key)){
         return true;}
         else{return false;}         
    },

  },
  computed:{
    ...mapState({
      products:state => state.product.products,
      totalLinks:state => state.product.totalLinks,
      cur_page:state => state.product.cur_page,
      pagination:state => state.product.pagination,
      loading:state => state.product.loading,
      cart:state => state.product.cart,
      active_sort_product_top:state => state.product.active_sort_product_top,
      active_sort_product_low:state => state.product.active_sort_product_low,
    }),
    ...mapGetters({
        getProducts:'product/getProducts',
        makePagination:'product/makePagination',
        imgsrc:'product/imgsrc',
        inCartProduct:'product/inCartProduct',
    })
  },
  mounted(){
    this.loadCart();
  },

}
</script>

<style scoped>
.active_links_{
  background-color: #3A67FA;
  color: white;
}
.active_sort_link{
  background-color: #28a745;
  color: white;
  padding: 10px 15px;
  border-radius: 10px;

}
</style>


