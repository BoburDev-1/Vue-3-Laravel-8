<template>
 
 <div class="feedback">

   <div class="feedback_header">
     <h3>Bizga yozing</h3>
   </div>

   <div class="feedback_block">
 
   <form>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label ">Full Name</label>
    <input type="text" class="form-control " id="exampleInputPassword1" maxlength="20"
    :class="{'is-invalid':empty_form_name, 'is-valid':valid_name } "
    v-model="full_name"
    >
    <p class="text-danger p-3" v-show="empty_form_name_text"> Ismingdi yozing, uzunligi 4tadan kam bulmasin </p>
  </div>
  <!-- :class="[{'is-invalid':full_name.length ==''}]" -->
    <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" maxlength="20"
    :class="{'is-invalid':empty_form_mail, 'is-valid':valid_mail } "
    v-model="mail"
    >
    <p class="text-danger p-3" v-show="empty_form_mail_text"> @mail manzilingizni kiriting, uzunligi 4tadan kam bulmasin </p>
    <div id="emailHelp" class="form-text">Email manzilingiz </div>
  </div>

  <div class="form-floating">
  <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"
  maxlength="200"
  :class="{'is-invalid':empty_form_message, 'is-valid':valid_message } "
  v-model="message"
  ></textarea>
  <label for="floatingTextarea2">Your Message</label>
  <p class="text-danger p-3" v-show="empty_form_message_text"> Xabar yozmadingiz, xabar uzunligi 100tadan kam bulmasin </p>
  
 </div>

  <!-- <button type="submit" class="btn btn-primary">Submit</button> -->
  <button type="button" class="btn btn-primary"
    @click="sendFeedback()"
  >Submit</button>
</form>
   
   </div>


 </div>
 
</template>

<script>

import feedbackMixin from '@/mixins/feedbackMixin'

export default {

  mixins:[feedbackMixin],

}
</script>

<style scoped>

.feedback{
  width: 100%;
}
.feedback_header{
  margin: 30px 0;
}
.feedback_block{
  width: 50%;
  margin: 0 auto;
  border: 2px solid red;
  padding: 20px 30px;
  
}
</style>

