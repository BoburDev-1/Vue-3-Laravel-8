<template>

  <div class="reklama">
      <div class="reklama_block">
          <h1>REKLAMA</h1>
      </div>
  </div>
  <main id="product_content">
    <div class="main_container">
        <div class="main_container_item_1">
          
        <div class="img_zoom_container">
          <img :src="imgsrc(products.img)" :alt="products.img" id="myimage">
          <div id="myresult" class="img_zoom_result none"></div>
        </div>

        <div class="img">
          <p id="imgp">&#128269; Rasmni kattalashtirish <a href="#" :data-img-link="products.img" id="first_img">asosiy rasm</a> </p>
          <p style="display: flex; justify-content: space-around; ">
              <a href="" data-img-link="1" class="img_change">1</a>
              <a href="" data-img-link="2" class="img_change">2</a>
              <a href="" data-img-link="3" class="img_change">3</a>
          </p>

        <div class="myimage_children">
                <p v-for="(image, imageIndex) in images " :key="imageIndex">
                  <img 
                  :src="imgsrc(image)" 
                  :alt="image"
                  @click="openModal(),imageChange(imageIndex)"
                  >
              </p>
        </div>

        </div>

      </div>

      <div class="main_container_item_2">
        	<div class="main_container_item_2_block">
          <h3>{{ products.title }}</h3>
          <span id="narx">{{ products.price }} sum</span>
          <div>     

            <button 
            type="button" 
            class="btn btn-success m-2 p-2"
            @click="addProductToCart({ index:null, productId: products.id, event:$event})"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-x-fill" viewBox="0 0 16 16">
            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7.354 5.646 8.5 6.793l1.146-1.147a.5.5 0 0 1 .708.708L9.207 7.5l1.147 1.146a.5.5 0 0 1-.708.708L8.5 8.207 7.354 9.354a.5.5 0 1 1-.708-.708L7.793 7.5 6.646 6.354a.5.5 0 1 1 .708-.708z"/>
          </svg> korzinka
          </button>

          </div>
            <p class="star" title="Maxsulotni sifati">

            </p>
          
            <p class="product_text"><b>Brand nomi : </b>  {{ products.title }}</p>
            <p class="product_text"><b>Turi : </b>  {{ products.title }}</p>
            <p class="product_text"><b>Modeli : </b>  {{ products.title }}</p>
            <p class="product_text"><b>Vazni / Sigimi : </b>  {{ products.title }}</p>
            <p class="product_text"><b>Ishlab Chiqaruvchi : </b>  {{ products.title }}</p>         
            <p class="product_text"><b>Rangi : </b> {{ products.title }}</p>
            <p class="product_text"><b>O'lchami :</b> {{ products.title }}</p>

    <!--ACCORDION-->
            <button class="accordion green-accordion"
                @click="accordion($event)"
              >
              Mahsulotning afzalliklari
              </button>

            <div class="panel">
                <ul class="accordion-ul">
                  <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li> 
                  <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li> 
                  <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li> 
                </ul>
            </div>

            <button class="accordion red-accordion"
              @click="accordion($event)"
            >
            Mahsulotning kamchiliklari
            </button>
            <div class="panel">
                <ul class="accordion-ul">
                  <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li> 
                  <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li> 
                  <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li> 
                </ul>
            </div>
		        </div>
       </div>
    </div>
</main>

<!-- modal -->
<div v-if="modal" class="modal_">

  <div class="modal_window">
    <span class="modal_close" @click="closeModal()">&times;</span>
    <div class="modal_window_img">
        <img :src="imgsrc(imgSet)" :alt="products.img" >
    </div>
    <div class="modal_window_img_children">
        <div class="modal_window_img_children_">
                <p v-for="(image, imageIndex) in images " :key="imageIndex">
                  <img 
                  :src="imgsrc(image)" 
                  :alt="image" 
                  :class="[{'modal_img_selected':imageIndex == index}]"
                  @click="imageChange(imageIndex)"
                  >
              </p>
        </div>
    </div>

    <a class="modal_prev" @click="prev()">&#10094;</a>
    <a class="modal_next" @click="next()">&#10095;</a>

  </div>
</div>
  
</template>

<script>

import axios from 'axios'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  props:['productid'],
  components:{
    
  },
  data(){
  return {
    modal:false,
    index:0,
    imgSet:'',
    images:['30kg_1.jpg', '30kg_3.jpg', '30kg_2.jpg', ],
  }
 },
 methods:{
   ...mapMutations({
     loadCart:'product/loadCart'
   }),
   ...mapActions({
     addProductToCart:'product/addProductToCart',
     getProduct:'product/getProduct',
   }),
   
   accordion(e){
     e.target.classList.toggle("activeaccordion");
    let panel = e.target.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
   },
   // modal
   openModal(){
     this.modal = true
   },
   closeModal(){
      this.modal = false  
   },
   next() {
      this.index = (this.index + 1) % this.images.length;
      this.indexModal(this.index)
    },
   prev() {
      if ( this.index == 0 ) {
        this.index = 2
      } else {
        this.index = (this.index - 1) % this.images.length;
      }      
      this.indexModal(this.index)
    },
    indexModal(e){
      this.imgSet =  this.images[e]
    },
    imageChange(src){
      this.indexModal(this.index = src);
    },
    current(){

    },
 },
 created(){
   this.getProduct({ productId:this.productid })
 },
 computed:{
   ...mapState({
     cart:state => state.product.cart,
     products:state => state.product.products
   }),
   ...mapGetters({
     imgsrc:'product/imgsrc'
   }),

 },
 mounted(){
   this.loadCart();
 }

}
</script>

<style scoped>

.reklama{
  width: 100%;
  max-width: 1280px;
  height: 200px;
}
.reklama_block{
  width: 70%;
  height: 100%;
  margin: 0 auto;
  border: 2px solid red;  
}

#product_content{
  width: 100%;
  max-width: 1280px;  
}
.main_container{
  width: 800px;
  height: 800px;
  margin: 0 auto;  
  display: flex;
  justify-content: space-between;
}
.main_container_item_1{
  width: 50%;
  border: 2px solid #ddd;  
}
.main_container_item_2{
  width: 50%;
  border: 2px solid #ddd;  
}

#myimage{
  width: 90%;
  max-width: 100%;
}
.myimage_children {
  width: 100%;
  height: 200px;
  cursor: pointer;
  display: flex;
}
.myimage_children p {
  width: 33.33%;
}
.myimage_children p img{
  height: 120px; 
  width: 100%;
}
/* .img_zoom_container{

} */

.main_container_item_2_block{
  padding: 20px;
}
.product_text{
	font-size: 1.2em;
	color: gray;
  text-align: left;
}
.product_text b{
	color: #555;;
}
.product_text:hover b{
	color:black;
}

/* ACCORDION */
.accordion {
  z-index: 2;
  position: relative;
  background-color: #eee;   
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 1.1em;  
  transition: 0.4s;
}
.accordion:focus{
	outline: none;
}
.activeaccordion, .accordion:hover {
  background-color: #ccc;
}
.accordion:after {
  content: '\002B';
  color: #777;
  font-weight: bold;
  float: right;
  margin-left: 5px;
}

.activeaccordion:after {
  content: "\2212";
}

.panel {
  padding: 0 18px;
  background-color: white;
  max-height: 0;
  position: relative;  
  overflow: hidden;
  transition: max-height 0.2s ease-out;
  z-index: 2;
}
.red-accordion{
  color: red; 
}
.green-accordion{
  color: green; 
}
.accordion-ul{  
  font-size: 1.1em;
  margin-left: 10px; 
}  
.accordion-ul li{ 
  list-style-type:initial;
}
#shadow{
  font-size:12em;
  color: #ddd;
  font-weight: bold;
  position: absolute;
  z-index: -1;
  margin-left: -100px;
}

/* modal */
.modal_{
  width: 100%;
  height: 100%;
  z-index: 3;
  background-color: green;
  position: fixed;
  top: 0;
}
.modal_window{
   margin: 0 auto;
   max-width: 1000px;   
}
.modal_window_img{
  width: 100%;  
  height: 600px;  
}
.modal_window_img img{
  max-width: 100%;
  height: 600px;
  margin: 0 auto;
  user-select: none;
}
.modal_window_img_children{
  width: 100%;
  height: 300px;
  margin-top: 30px;
}
.modal_window_img_children_{
  display: flex;
  justify-content: center;
}
.modal_window_img_children_ img{
  max-width: 80%;
  height: 180px;
  margin: 0 10px;
  cursor: pointer;
}
.modal_close{
  position: absolute;
  top: 0;
  right: 10%;
  cursor: pointer;
  font-size: 4em;
  color: black;
}
.modal_prev{
  position: absolute;
  top: 40%;
  left: 10%;
  color: black;  
  font-size: 4em;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
}
.modal_next{
  position: absolute;
  top: 40%;
  right: 10%;
  color: black;  
  font-size: 4em;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
}
.modal_next:hover, .modal_prev:hover{
  background: white;
}
/* animation add modal */
.modal_window_img img, .modal_window_img_children img, #caption {  
  -webkit-animation-name: zoom;
  -webkit-animation-duration: 0.6s;
  animation-name: zoom;
  animation-duration: 0.6s;
}

@-webkit-keyframes zoom {
  from {-webkit-transform:scale(0)} 
  to {-webkit-transform:scale(1)}
}

@keyframes zoom {
  from {transform:scale(0)} 
  to {transform:scale(1)}
}
.modal_img_selected{
  outline: 6px solid green;
  border: 6px solid red;
  border-radius: 20px;
  transition: .5s;
}

</style>>


