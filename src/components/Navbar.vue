<template>
        <header id="header" class="header">   
        <div id="header_item" class="header_item">

          <div class="header_item_logo" id="header_item_logo">
            <router-link to="/" id="logo">MiniMarket</router-link>
          </div>

          <!-- search result -->
          <search-products></search-products>

        <div class="header_item_nav">
            <router-link to="/cart" class="cart">
              <i class="fa fa-shopping-bag cart_icon" aria-hidden="true"></i>
                <span id="totalcount_number">
                  <b>{{ $store.getters['product/countProduct'] }} </b> 
                </span>
              </router-link>
              <router-link to="/profile">MyProfile</router-link> 
              <router-link to="/about">About</router-link> 
              <router-link to="/feedback">Feedback</router-link>
          </div>         
      </div>
    </header>
</template>

<script>

import SearchProducts from './SearchProducts.vue'

export default {
  components:{
    SearchProducts,
  }
}
</script>

<style scoped>
.header{
  background-color:#ddd ;
}
.header_item_nav a {
  text-decoration: none;
  font-size: 1.2em;
  font-weight: bold;
  color: #2c3e50;
  margin: 10px;
}

.header_item_nav a.router-link-exact-active {
  color: #42b983;
  border-radius: 20px;
}
.header_item_nav:hover a.router-link-exact-active:hover  {
  border-radius: 20px;
  color: #42b983;
}
</style>>




 