<template>

<div class="alert alert-success mt-5">
  <strong>Success!</strong> You should <a href="#" class="alert-link">Home</a>.
</div>
  
</template>

<script>
import { mapMutations } from 'vuex'
export default {

 methods:{
     ...mapMutations({
         loadCart:'product/loadCart',
     }),
 },
 mounted(){
     this.loadCart()
 }
}
</script>

<style scoped>

</style>