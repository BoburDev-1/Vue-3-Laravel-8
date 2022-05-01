<template>

  <div v-show="showMiniCartBlock" class="show_mini_cart_block">
     <div class="show_mini_cart_block_height">

        <h3 v-show="!isEmpty(this.cart)" class="mini_cart_empty">Korzinka bumbuw</h3>

        <div class="show_mini_cart_block_"
          v-for="(carts, index) in cart  " :key="index"
          >
            <div class="show_mini_cart_block_img">
              <img :src="imgsrc(carts.img)" alt="">
            </div>
            <div class="show_mini_cart_block_product">
              <h5>{{ carts.title }}</h5>
              <p>{{ carts.price }} sum </p>
              <span> <b>{{ carts.count }}</b> dona</span>
              <div class="d-grid gap-2 col-6 mx-auto pt-3">
                <button class="btn btn-danger" type="button" 
                  @click="deleteProduct({id:index})"
                >Delete</button>
              </div>
            </div>
          </div><hr>
    </div>

    <div>
          <router-link 
           :to="{name:'cart'}"
           v-show="isEmpty(this.cart)"
           class="mini_cart_link"
           >Buyurtmani yuboriw</router-link>
        <span class="close_mini_cart" @click="showMiniCartBlock = false">
            &times;
        </span>
    </div>
</div>
<div v-show="$store.getters['product/countProduct'] != 0" class="show-cart">
      <span id="product_count" class="product_count">
            <!-- soni kursatadi-->
            {{ $store.getters['product/countProduct'] }}            
      </span>
      <i class="fa fa-shopping-cart show_mini_cart_icon" @click="showMiniCart()" aria-hidden="true"></i>
</div>
  
</template>

<script>

import {mapState, mapActions, mapMutations, mapGetters} from 'vuex'

export default {
 data(){
    return {
      showMiniCartBlock:false,
      totalPrice:0,
    }
  },
  methods:{
    ...mapMutations({
      loadCart:'product/loadCart',
      saveCart:'product/saveCart',
    }),
    ...mapActions({
      addProductToCart:'product/addProductToCart',
      yourAction:'post/yourAction',
      deleteProduct:'product/deleteProduct',
    }),
    getCategory(e) {
      this.selectSoni(Object.keys(this.cart).length)
    },
    showMiniCart(){
      this.loadCart()
      this.showMiniCartBlock = true;
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
      cart:state => state.product.cart,
    }),
    ...mapGetters({
        imgsrc:'product/imgsrc',
    })
  },
  mounted(){
    this.loadCart()
  }

}
</script>

<style scoped>


.show-cart{
  position: fixed;
  bottom: 50px;
  right: 250px;
  border: .2px solid green;
  padding: 10px;
  background-color: white;
  border-radius: 50%;
}
i.show_mini_cart_icon{
  font-size: 4em;
  color: green;
  cursor: pointer;
  padding: 10px;
}
.product_count{
  color: white;
  font-size: 1em;
  font-weight: bold;
  position: absolute;
  top: -10px;
  right: 10px;
  background-color: red;
  border-radius: 50%;
  width: 30px;
  height: 30px;
}
.show_mini_cart_block{
  position: fixed;
  top: 0;
  right: 0;
  z-index: 3;
  width: 100%;
  max-width: 400px;
  height: 100%;
  border: 2px solid red;  
  background-color: white;
}
.show_mini_cart_block_height{
  height: 85%;
  overflow: scroll;
  border-bottom: 8px solid green;  
}
.show_mini_cart_block_{
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.show_mini_cart_block_img{
  padding: 10px;
  width: 40%;
}
.show_mini_cart_block_img img{
  max-width: 100%;
  border-radius: 10px;
}
.show_mini_cart_block_product{
  padding: 10px;
  width: 60%;
}
.mini_cart_link{
  display: block;
  font-size: 1.5em;
  text-decoration: none;
  margin: 10px 0;
}
.close_mini_cart{
  position: fixed;
  bottom: 0px;
  font-size: 4em;
  cursor: pointer; 
}
.mini_cart_empty{
  margin: 10px;
  padding: 10px;
  font-style: italic;
}

/** MINI CART ANIMATION i.show_mini_cart_icon */
.show-cart{  
  -webkit-animation-name: zoom;
  -webkit-animation-duration: 0.6s;
  animation-name: zoom;
  animation-duration: 0.6s;
}
i.show_mini_cart_icon  {  
  -webkit-animation-name: cart_icon_anime;
  -webkit-animation-duration: 1s;
  animation-name: cart_icon_anime;
  animation-duration: 1s; /* davomiyligi */
  animation-delay: 1s; /* startgaca */
  animation-iteration-count: 2; /* neci marta qaytariliwi */
  /* animation-iteration-count: infinite; */ /* ceksiz qaytariladi */
  animation-timing-function: linear;
}
.product_count {  
  -webkit-animation-name: zoom;
  -webkit-animation-duration: 1.5s;
  animation-name: zoom;
  animation-duration: 1.5s;
}

@-webkit-keyframes zoom {
  from {-webkit-transform:scale(0)} 
  to {-webkit-transform:scale(1)}
}

@keyframes zoom {
  from {transform:scale(0)} 
  to {transform:scale(1)}
}

 /* CART ICON ANIMATION */
 @keyframes cart_icon_anime {
  from{
    transform: rotateZ(0deg);
    opacity: .2;
  }
  to{
    transform: rotateZ(360deg);
    opacity: 1;
  }
}

</style>