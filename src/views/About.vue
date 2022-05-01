<template>

<div class="about">

  <div class="about_block">

    <main>

  <div class="container marketing mt-5">

    <!-- Three columns of text below the carousel -->
    <div class="row">
      <div class="col-lg-4">
        <img src="../assets/about-page-avatar/man_3.jpg" class="circle_about_avatar" alt="" srcset="">

        <h2>Director</h2>
        <p>Some representative placeholder content for the three columns of text below the carousel. This is the first column.</p>
        <p><a class="btn btn-secondary" href="#">View details &raquo;</a></p>
      </div><!-- /.col-lg-4 -->
      <div class="col-lg-4">
        <img src="../assets/about-page-avatar/man_1.jpg" class="circle_about_avatar" alt="" srcset="">

        <h2>Manager</h2>
        <p>Another exciting bit of representative placeholder content. This time, we've moved on to the second column.</p>
        <p><a class="btn btn-secondary" href="#">View details &raquo;</a></p>
      </div><!-- /.col-lg-4 -->
      <div class="col-lg-4">
        <img src="../assets/about-page-avatar/man_2.jpg" class="circle_about_avatar" alt="" srcset="">

        <h2>HR Manager</h2>
        <p>And lastly this, the third column of representative placeholder content.</p>
        <p><a class="btn btn-secondary" href="#">View details &raquo;</a></p>
      </div><!-- /.col-lg-4 -->
    </div><!-- /.row -->


    <!-- START THE FEATURETTES -->

    <hr class="featurette-divider">

    <div class="row featurette">
      <div class="col-md-7">
        <h2 class="featurette-heading">First featurette heading. <span class="text-muted">It’ll blow your mind.</span></h2>
        <p class="lead">Some great placeholder content for the first featurette here. Imagine some exciting prose here.</p>
      </div>
      <div class="col-md-5">
        <img src="../assets/about-page-avatar/woman_1.jpeg" class="circle_about_avatar_big" alt="" srcset="">

      </div>
    </div>

    <hr class="featurette-divider">

    <div class="row featurette">
      <div class="col-md-7 order-md-2">
        <h2 class="featurette-heading">Oh yeah, it’s that good. <span class="text-muted">See for yourself.</span></h2>
        <p class="lead">Another featurette? Of course. More placeholder content here to give you an idea of how this layout would work with some actual real-world content in place.</p>
      </div>
      <div class="col-md-5 order-md-1">
        <img src="../assets/about-page-avatar/woman_2.webp" class="circle_about_avatar_big"  alt="" srcset="">

      </div>
    </div>

    <hr class="featurette-divider">

    <div class="row featurette">
      <div class="col-md-7">
        <h2 class="featurette-heading">And lastly, this one. <span class="text-muted">Checkmate.</span></h2>
        <p class="lead">And yes, this is the last block of representative placeholder content. Again, not really intended to be actually read, simply here to give you a better view of what this would look like with some actual content. Your content.</p>
      </div>
      <div class="col-md-5">
        <img src="../assets/about-page-avatar/man_5.jpg" class="circle_about_avatar_big"  alt="" srcset="">

      </div>
    </div>

    <hr class="featurette-divider">

    <!-- /END THE FEATURETTES -->

  </div><!-- /.container -->


  <!-- FOOTER -->
  <footer class="container">
    <p class="float-end"><a href="#">Back to top</a></p>
    <p>&copy; 2017–2021 Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
  </footer>
</main>

  </div>

</div>


</template>

<script>

import Header from '../components/Navbar.vue'
import { mapMutations } from 'vuex'

export default {
  components:{Header},
   methods:{
     ...mapMutations({
         loadCart:'product/loadCart',
     }),
   },
   mounted(){
     this.loadCart();
   }

}
</script>

<style scoped>
.about_block{
  margin-top: 40px;
}
.circle_about_avatar{
  width: 140px;
  height: 140px;
  border-radius: 50%;
}
.circle_about_avatar_big{
  width: 500px;
  height: 500px;
}
</style>>

