<template>

  <div class="container d-flex justify-content-center align-items-center">
    <div class="card py-4">
        <h5 class="font-weight-normal">My Profile</h5> <span class="notify-text">Feel free to edit your basic information such as name, email etc.</span>
        <div class="mt-3"> <span class="accounts">Merged Accounts</span>
            <div class="d-flex justify-content-between p-2 outline"> <img src="https://i.imgur.com/G1pXs7D.jpg" class="rounded" width="150">
                <div class="d-flex flex-column mr-1">
                    <div class="d-flex flex-row"> <button class="btn btn-primary btn-sm buttons">Upload new photo</button> <button class="btn btn-outline-danger buttons btn-sm ml-3">Remove</button> </div> <span class="image-size">Image format with max size of 3MB</span>
                </div>
            </div>
        </div>
        <div class="mt-3">
            <div class="row">
                <div class="col-md-6">
                    <div class="inputbox mt-3"> <input type="text" name="name" class="form-control" required="required"> <span>First Name</span> </div>
                </div>
                <div class="col-md-6">
                    <div class="inputbox mt-3"> <input type="text" name="name" class="form-control" required="required"> <span>Last Name</span> </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="inputbox mt-3"> <input type="text" name="name" class="form-control" required="required"> <span>Email Address</span> </div>
                </div>
            </div>
        </div>
    </div>
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

<style>

</style>