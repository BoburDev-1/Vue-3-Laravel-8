import axios from "axios";

export const categoryModule = {
    state: () => ({
        categories: [],
        categoriesChildren: [],
    }),
    // 
    getters: { // computed degani
        showtCategoryChildren: (state) => (key) => {
            let data = state.categoriesChildren;
            let output = '';
            for (const d in data) {
                if (data[d].categories_id === key) {
                    // output += '<a href="'+ data[d].id  +'/'+data[d].title+ ' ">' + data[d].title + ' '+key+ '</a>';
                    output += '<a href="' + key + '/' + data[d].title + ' ">' + data[d].title + ' ' + key + '</a>';
                }
            }
            return output;
            // return state.categoriesChildren.filter(cat => cat.categories_id == key)
        },
        catGet(state) {
            return state.categories.map((cat) => ({...cat, children: getFunc(cat.id, state.categoriesChildren) }))
        },

    },
    mutations: {
        setCategories(state, categories) {
            state.categories = categories;
        },
        setCategoriesChildren(state, categoriesChildren) {
            state.categoriesChildren = categoriesChildren;
        },
    },
    actions: {

        getCategories({ state, commit }) {
            let response = axios.get('http://laravel-vue-frilans-backend/api/getallcategories')
                .then(res => {
                    // state.categories = res.data.data;
                    commit('setCategories', res.data.data)
                })
                .catch(error => {
                    console.log(error.response);
                })
        },
        getCategoryChildren({ state, commit }) {
            let response = axios.get('http://laravel-vue-frilans-backend/api/getallcategorieschildren')
                .then(res => {
                    // this.categoriesChildren = res.data;
                    commit('setCategoriesChildren', res.data)
                })
                .catch(error => {
                    console.log(error.response);
                })
        },
    },

    namespaced: true
}