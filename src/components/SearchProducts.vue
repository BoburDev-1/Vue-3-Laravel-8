<template>

  <div class="search_product">

    <input 
    ype="search" 
    maxlength="20" 
    class="search_product_input"
    placeholder="Search Produch ....."
    v-model="search_product"
    >
    <i class="fa fa-search search_product_icon" aria-hidden="true"></i>
  <!-- search result -->
    <div class="search_product_result" v-show="result_block">
        <div class="search_product_result_block">

          <div class="search_product_result_block_item"
          v-for="result in results"
          :key="result.id"
          >
            
            <div class="search_product_result_block_item_img">
              <img :src="require('../assets/img/'+result.img)" alt="">
            </div>
            <div class="search_product_result_block_item_link">
              <p><a 
              :href="'/category/product/'+result.id"
              >{{ result.title }}</a></p>
              <span>{{ result.price }} sum</span>
            </div>
          </div>

          <div 
          class="search_product_result_block_item"          
          v-show="result_empty"
          >
          <h5 
          class="text-danger p-5 fst-italic"        
          >Siz izlagan maxsulot tizimda yuq </h5>
          </div>
          
        </div>
      </div>

  </div>
  
</template>

<script>

import axios from 'axios'

export default {
  data(){
  return {
    search_product:'',
    results:[],
    result_block:false,
    result_empty:false,
  }
 },
 methods:{
  isEmpty(object) {
      for( var key in object)
        if (object.hasOwnProperty(key)){
         return true;}
         else{return false;}         
    },
 },
 watch:{
   search_product(value){
 
     if ( value.length == 0  ) {
       this.results = []
       this.result_block = false
     }
     else{
       this.result_block = true

     let response = axios.get('http://laravel-vue-frilans-backend/api/search/'+value )
     .then(res => {

      this.results = res.data.data

      if (res.data.data == '' ) {
        this.result_empty = true
      }else{
        this.result_empty = false
      }
     })
     .catch(error => console.log(error ))
     }

   }
 }

}
</script>

<style >

</style>