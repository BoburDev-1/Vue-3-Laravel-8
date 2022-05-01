<template>
  <div class="cart">
    <h4 class="m-4">Buyurtmani yuboriw</h4>

    <div class="order-cart-table">
        <div class="order-cart-table-show">

  <table id="cart-table" class="cart-table">
    <tr>
      <th>Rasm</th>
      <th>Maxsulot nomi</th>
      <th>Dona</th>
      <th>Narxi</th>
      <th>Jami narxi</th>
      <th>Uchirish</th>
    </tr>

  <p v-show="!isEmpty(this.cart) " class="empty_cart">
     <b>Korzinka</b> pustoy
  </p>


    <tr v-for="(carts, index) in cart  " :key="index">
        <td class="cart-table-img">
          <img :src="imgsrc(carts.img)" style="width:100%;" alt="yyyy">
          </td>
            <td class="cart-table-title fwbold"> 
              {{ carts.title }}              
              </td>
            <td class="cart-table-count fwbold">
            <i class="fa fa-minus-circle minus" aria-hidden="true" 
              @click="minusProduct(index)" 
              ></i>
              <span class="cart-table-count-number">{{ carts.count }}</span>
            <i class="fa fa-plus-circle plus" aria-hidden="true"
              @click="plusProduct(index)" 
            ></i>
              </td>
            <td class="cart-table-price fwbold">{{ carts.price }}</td>
            <td class="cart-table-price-total fwbold">    
            <!-- ${totalOnePrice} -->
            {{ carts.count * parseFloat(carts.price) }}
            </td>
            <td class="cart-table-delete">
            <i class="fa fa-trash deleteicon" aria-hidden="true" @click="deleteProduct(index)" ></i>
            </td>
      </tr>
  </table>

        </div>
     <p id="total-price" >JAMI : <span id="total">
       {{ totalAmount }}
       </span> sum </p>
    </div>
  </div>


<div class="orders" v-show="isEmpty(this.cart)">
   <div class="orders_block">
      <div class="orders_header">
   <h3 class="mt-3 mb-3">Malumotlaringizni kiriting</h3>
<form>

  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label ">Full Name</label>
    <input type="text" class="form-control " id="exampleInputPassword1" maxlength="20"
    :class="{'is-invalid':empty_form_name, 'is-valid':valid_name } "
    v-model="name"
    >
    <p class="text-danger p-3" v-show="empty_form_name_text"> Ismingdi yozing, uzunligi 4tadan kam bulmasin </p>
    <div class="alert alert-danger" v-if="errored_name">
      <p> {{ errors[0] }} </p>
    </div>
  </div>

    <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" maxlength="30"
    :class="{'is-invalid':empty_form_mail, 'is-valid':valid_mail } "
    v-model="mail"
    >
    <p class="text-danger p-3" v-show="empty_form_mail_text"> @mail manzilingizni kiriting, uzunligi 4tadan kam bulmasin </p>
    <div class="alert alert-danger" v-if="errored_mail">
      <p> {{ errors[0] }} </p>
    </div>
  </div>

  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Phone Number</label>
    <input class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" maxlength="18"
    :class="{'is-invalid':empty_form_phone, 'is-valid':valid_phone } "
    type="text"
    v-model="phone"
    v-on:input="phoneNumberValid()"
    >   
    <p><b>Phone <span v-html="number"></span> </b></p>
    <p class="text-danger p-3" v-show="empty_form_phone_text"> Telefon raqamingizni kiriting, uzunligi 10 tadan kam bulmasin </p>
    <div class="alert alert-danger" v-if="errored_phone">
      <p> {{ errors[0] }} </p>
    </div>
  </div>

    <button type="button" class="btn btn-primary"
      @click="sendOrders()"
    >Submit</button>
  </form>
   
      </div>
    </div>
</div>

</template>

<script>

import axios from 'axios'
import { mapState, mapMutations, } from 'vuex'
export default {
  data(){
    return {
      // cart:{},
      number: '',
      totalPrice:0,
      name:'',
      mail:'',
      phone:'',
      error_name:false,
      empty_form_name:false,
      empty_form_name_text:false,
      empty_form_mail:false,
      empty_form_mail_text:false,
      empty_form_phone:false,
      empty_form_phone_text:false,
      valid_name:false,
      valid_mail:false,
      valid_phone:false,
      errors:[],
      errored_name:false,
      errored_mail:false,
      errored_phone:false,
    }
  },
  methods:{
    ...mapMutations({
      loadCart:'product/loadCart'
    }),
    deleteProduct(id) {
        delete this.cart[id];
        this.saveCart();
    },
    minusProduct(id) {
      if (this.cart[id].count == 1) {
        delete this.cart[id];
      }else{
         this.cart[id].count--;
      }
        this.saveCart();
    },
    plusProduct(id) {
        this.cart[id].count++;
        this.saveCart();
    },
    saveCart() {
      localStorage.setItem('incart', JSON.stringify(this.cart));
    },
    isEmpty(object) {
      for( var key in object)
        if (object.hasOwnProperty(key)){
         return true;}
         else{return false;}         
    },
  imgsrc(movieId) {
      let result = require('../assets/img/' + movieId);
      return result;
    },

    // orders
    sendOrders(){

// name valid
      if (this.name.length <= 4 || this.mail.length <= 4 || this.phone.length <= 11 ) {
        // name valid
         if ( this.name.length <= 4 ) {
            this.empty_form_name = true;
            this.empty_form_name_text = true;
            console.log(1 );
          }
          else{
            console.log(0 );
            this.empty_form_name = false;
            this.empty_form_name_text = false;
            this.valid_name = true
          }
          // mail valid
          if ( this.mail.length <= 4 ) {
            this.empty_form_mail = true;
            this.empty_form_mail_text = true;
          }
          else{
            this.empty_form_mail = false;
            this.empty_form_mail_text = false;
            this.valid_mail = true
          }
          // phone
          if ( this.phone.length <= 18 ) {
            this.empty_form_phone = true;
            this.empty_form_phone_text = true;
            console.log('number if ', this.phone.length );
          }
          else{
            this.empty_form_phone = false;
            this.empty_form_phone_text = false;
            this.valid_phone = true
            console.log('number else ', this.phone.length );
          }
          return
      }else{

        // aa6188@gmail.com
      let res = axios.post('http://laravel-vue-frilans-backend/api/orders',{
        name:this.name,
        mail:this.mail,
        phone:this.phone.replace(/[^0-9]/g, ""),
        orders:localStorage.getItem('incart'),
      })
      .then(res => {
        console.log(res );
        console.log(res.data );
        if (res.data === 1) {
          this.$router.push({name:'success'})
           console.log('res 1ga ' );
        }else{
          console.log('res 0ga' );
        }
      })
      .catch(error => { 
        if (error.response.data.errors.name) {
            this.errors = [];
            this.errors.push(error.response.data.errors.name[0]);
            this.errored_name = true
        }
        if (error.response.data.errors.mail) {
            this.errors = [];
            this.errors.push(error.response.data.errors.mail[0]);
            this.errored_mail = true
        }
        if (error.response.data.errors.phone) {
            this.errors = [];
            this.errors.push(error.response.data.errors.phone[0]);
            this.errored_phone = true
        }           
      })
     }
    },
    phoneNumberValid(){

      let x = event.target.value
          .replace(/\D/g, "")
          .match(/(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);

      event.target.value = !x[2] ?
          x[1] :
          "( " +
          x[1] +
          " ) " +
          (x[2] ? " " + x[2] : "") +
          (x[3] ? " " + x[3] : "") +
          (x[4] ? " " + x[4] : "") +
          (x[5] ? " " + x[5] : "");
    },

  },
computed: {
    ...mapState({
      cart:state => state.product.cart,
    }),
    totalAmount: function () {
        var total = 0;
        var data = this.cart
        Object.keys(data).forEach((e, item) => {
            total += data[e].price * data[e].count;
        });
        return total
    },
},
  mounted(){
    this.loadCart()
  },
 
}
</script>

<style scoped>
  .cart{
    width: 100%;
    max-width: 1280px;
    height: 80%;
  }

  /***/
.order-cart-table{
  width: 800px;
	margin: 0 auto;
	border:2px solid red; 
	margin-top:20px;
}
#cart-table {
  border-collapse: collapse;
  width: 100%;
}
#cart-table  td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid grey;
}
#cart-table th{
  padding: 8px;
  text-align: left;
  border-bottom: 5px solid #ddd;
  height: 60px;
}
.cart-table-img{
  width: 30%;
}
.cart-table-title{
  width: 25%;
}
.cart-table-count{
  width: 15%;
}
.cart-table-price{
  width: 15%;
}
.cart-table-price-total{
  width: 15%;
}
.cart-table-delete{
  width: 10%;
}
i.plus,.minus{
  color: grey;
  font-size: 18px;
  cursor: pointer;
}
.cart-table-count-number{
  font-size: 18px;
  margin: 0 5px;  
}
.fwbold{
  font-weight: 550;
}
#total-price{
  margin-top: 20px;
  display:block;
  width: 100%;
  font-weight: 600;  
  text-align: center;
 font-size: 20px;
}
i.deleteicon{
  color:rgb(180, 76, 94);
  font-size: 2em;
  cursor: pointer;
}
.empty_cart{
  display: block;
  margin: 0 auto;
  color: red;
  font-size: 2em;
  font-style: italic;
}

.orders{
  width: 100%;
  margin-top: 50px;
}
.orders_header{
  margin: 30px 0;
}
.orders_block{
  width: 40%;
  margin: 0 auto;
  padding: 20px 30px;
  border: 2px solid #ddd;
}
</style>