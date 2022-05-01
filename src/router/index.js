import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Cart from '../views/Cart'
import Profile from '../views/Profile'
import Feedback from '../views/Feedback'
import SuccessMessage from '../views/SuccessMessage'
import Category from '../views/Category'
import Product from '../views/Product'
import CategoryChildren from '../views/CategoryChildren'



const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        props: true
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile
    },
    {
        path: '/feedback',
        name: 'feedback',
        component: Feedback
    },
    {
        path: '/success',
        name: 'success',
        component: SuccessMessage
    },
    {
        path: '/category/:id',
        component: Category,
        name: 'category',
        props: true
    },
    {
        path: '/category/:categoryid/:catChildrenId',
        component: CategoryChildren,
        name: 'categorychildren',
        props: true
    },
    {
        // product
        path: '/category/product/:productid',
        component: Product,
        name: 'product',
        props: true
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),

})

export default router