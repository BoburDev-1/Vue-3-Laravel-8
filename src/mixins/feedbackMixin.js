import axios from 'axios'
import { mapMutations } from 'vuex';
export default {

   data(){
    return {
      full_name:'',
      mail:'',
      message:'',
      error_full_name:false,
      empty_form_name:false,
      empty_form_name_text:false,
      empty_form_mail:false,
      empty_form_mail_text:false,
      empty_form_message:false,
      empty_form_message_text:false,
      valid_name:false,
      valid_mail:false,
      valid_message:false,

    }
  },
  methods:{
    ...mapMutations({
        loadCart:'product/loadCart',
    }),
    sendFeedback(){

      // name valid
      if (this.full_name.length <= 4 || this.mail.length <= 4 || this.message.length <= 100 ) {
        // name valid
         if ( this.full_name.length <= 4 ) {
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
          // message
          if ( this.message.length <= 100 ) {
            this.empty_form_message = true;
            this.empty_form_message_text = true;
          }
          else{
            this.empty_form_message = false;
            this.empty_form_message_text = false;
            this.valid_message = true
          }
      }else{
      let res = axios.post('http://laravel-vue-frilans-backend/api/feedback',{
        full_name:this.full_name,
        mail:this.mail,
        message:this.message
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
      .catch(error => console.log(error.response.status ))
      }
    }
  },
  mounted(){
    this.loadCart();
  }


}