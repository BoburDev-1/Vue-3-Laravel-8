<template>

  <ul class="categories_nav">
    <li v-for="categorie in categories" :key="categorie.id" >
    <a
      :href="'/category/'+categorie.id"
      class="categories_nav_link" 
      :class="[{'selectCategory':this.catId == categorie.id}]" >
        {{ categorie.title }}
    </a>

    <div class="categories_children_nav ">
        <p v-for="catChildren in categoriesChildren" :key="catChildren.id">
            <a      
              :href="'/category/'+categorie.id+'/'+catChildren.id"
              v-if="catChildren.categories_id === categorie.id "
              @click="$router.push({name:'categorychildren', params:{ categoryid:categorie.id, catChildrenId:catChildren.id }, query:{ plan: catChildren.id } })" 
              :class="[{'selectCategory':this.catId == categorie.id && catChildren.id == catChildrenId }]"
              >
                {{ catChildren.title }}
            </a>
         </p>
     </div>
      </li>
  </ul>
</template>

<script>

import {mapState, mapActions, mapMutations, mapGetters} from 'vuex'

export default {
  props:{
    catId:{
      type:[String, Number],
      required:false,
    },
    catChildrenId:{
      type:String,
      required:false,
    },
  },
  data(){
    return {

    }
  },
  methods:{
    ...mapMutations({
      setCategories:'category/setCategories',
      setCategoriesChildren:'category/setCategoriesChildren',
    }),
    ...mapActions({ 
      getCategories:'category/getCategories',
      getCategoryChildren:'category/getCategoryChildren',
    }),
  },
  computed: {
    ...mapState({ 
      categories:state => state.category.categories,
      categoriesChildren:state => state.category.categoriesChildren,
    }),
    ...mapGetters({
      showtCategoryChildren:'category/showtCategoryChildren',
    })
  },
  mounted(){
    this.getCategories();
    this.getCategoryChildren();
  }
}

</script>

<style>

</style>




