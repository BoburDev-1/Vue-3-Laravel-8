import { createStore } from 'vuex'
import { categoryModule } from './categoryModule'
import { productModule } from './productModule'

export default createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        category: categoryModule,
        product: productModule,
    }
})