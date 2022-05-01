import axios from "axios";

export const productModule = {
    state: () => ({
        products: [],
        sortProductPrice: null,
        cart: {},
        loading: true,
        pagination: {},
        totalLinks: 0,
        cur_page: null,
        date: null,
        interval: null,
        active_sort_product_low: false,
        active_sort_product_top: false,
    }),
    getters: {
        countProduct: function(state) {
            return Object.keys(state.cart).length;
        },
        inCartProduct: (state) => (idProduct) => {
            if (JSON.parse(localStorage.getItem("incart"))[idProduct]) {
                console.log("bosildi ");
                return true;
            }
        },
        imgsrc: (state) => (movieId) => {
            return movieId ? require("../assets/img/" + movieId) : "";
        },
        makePagination: (state) => (meta, links) => {
            let pagination = {
                current_page: meta.current_page,
                // nav:meta.links.label,
                last_page: meta.last_page,
                next_page_url: links.next,
                prev_page_url: links.prev,
            };
            state.pagination = pagination;
        },

        getProducts: (state, getters) => (page_url, catId, catChildrenId) => {
            if (typeof page_url === "number" && catChildrenId === undefined) {
                console.log("if ");
                console.log(typeof page_url);
                page_url =
                    "http://laravel-vue-frilans-backend/api/getcategoryproduct/" +
                    catId +
                    "/" +
                    state.sortProductPrice +
                    "?page=" +
                    page_url;
                console.log(page_url);
            } else if (typeof page_url === "number" && catChildrenId !== undefined) {
                //  category product
                console.log("if else category ");
                page_url =
                    "http://laravel-vue-frilans-backend/api/getcategorychildrenproduct/" +
                    catId +
                    "/" +
                    catChildrenId +
                    "/" +
                    state.sortProductPrice +
                    "?page=" +
                    page_url;
                console.log(page_url);
            } else if (catChildrenId) {
                //  category children product
                page_url =
                    page_url ||
                    "http://laravel-vue-frilans-backend/api/getcategorychildrenproduct/" +
                    catId +
                    "/" +
                    catChildrenId +
                    "/" +
                    state.sortProductPrice +
                    "?page=" +
                    page_url;
            } else {
                console.log("else ", page_url);
                page_url =
                    page_url ||
                    "http://laravel-vue-frilans-backend/api/getcategoryproduct/" +
                    catId +
                    "/" +
                    state.sortProductPrice +
                    "?page=" +
                    page_url;
            }

            let response = axios
                .get(page_url)
                .then((res) => {
                    state.loading = false;
                    state.products = res.data.data;

                    state.totalLinks = Math.ceil(res.data.meta.total / 15);
                    state.cur_page = res.data.meta.current_page;
                    state.pagination.next = res.data.links.next;

                    getters.makePagination(res.data.meta, res.data.links);
                })
                .catch((err) => console.log(err));
        },
    },
    mutations: {
        testProps(state, test) {
            state.test = test;
        },
        setProducts(state, products) {
            state.products = products;
        },
        setsortProductPrice(state, sortProductPrice) {
            state.sortProductPrice = sortProductPrice;
        },
        setCart(state, cart) {
            state.cart = cart;
        },
        setLoading(state, loading) {
            state.loading = loading;
        },
        setPagination(state, pagination) {
            state.pagination = pagination;
        },
        setTotalLinks(state, totalLinks) {
            state.totalLinks = totalLinks;
        },
        setCurPage(state, cur_page) {
            state.cur_page = cur_page;
        },
        saveCart(state) {
            localStorage.setItem("incart", JSON.stringify(state.cart));
        },
        loadCart(state) {
            if (localStorage.getItem("incart")) {
                state.cart = JSON.parse(localStorage.getItem("incart"));
            } else {
                state.cart = {};
            }
        },
        delProduct(state, id) {
            state.cart = state.cart[id];
            delete state.cart;
        },
    },

    actions: {
        getCategories({ state, commit }) {
            let response = axios
                .get("http://laravel-vue-frilans-backend/api/getallcategories")
                .then((res) => {
                    // state.categories = res.data.data;
                    commit("setCategories", res.data.data);
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },
        // add product to cart
        addProductToCart({ commit, state }, { index, productId, event }) {
            commit("loadCart");
            // click btn animation
            event.target.classList.add("opacityOff");
            setTimeout((change) => {
                event.target.classList.remove("product_addcart_icon");
                event.target.classList.add("product_addcart_icon_incart");
                event.target.classList.remove("opacityOff");
                event.target.classList.add("opacityOn");
            }, 500);

            // add producct to cart
            let img = state.products.img || state.products[index].img;
            let title = state.products.title || state.products[index].title;
            let price = state.products.price || state.products[index].price;

            if (state.cart[productId] === undefined) {
                console.log("quwildi ");
                commit("loadCart"); //tekwiradi bor yoki yuqligiga
                state.cart[productId] = {
                    img: img,
                    title: title,
                    price: price,
                    count: 1,
                };
            } else {
                commit("loadCart"); //tekwiradi bor yoki yuqligiga
                state.cart[productId].count++;
                console.log("kupaytirildi ");
            }
            commit("saveCart");
        },

        deleteProduct({ commit, state }, { id }) {
            delete state.cart[id];
            commit("saveCart");
            console.log("action delete id => ", id);
            if (document.querySelector('[data-product-id="' + id + '"]')) {
                document.querySelector('[data-product-id="' + id + '"]').style.color =
                    "#2E3E50";
                console.log("ifda ");
            } else {
                console.log("elseda ");
            }
        },
        getProduct({ state, commmit }, { productId }) {
            let response = axios
                .get("http://laravel-vue-frilans-backend/api/getproduct/" + productId)
                .then((res) => {
                    state.products = res.data.data;
                    this.imgSet = res.data.data.img;
                    console.log(res.data.data);
                    console.log(state.products);
                })
                .catch((error) => console.log(error));
        },
        getProductsIndex({ commit }) {
            let response = axios
                .get("http://laravel-vue-frilans-backend/api/getallproduct")
                .then((res) => {
                    commit("setProducts", res.data.data);
                })
                .catch((err) => console.log(err));
        },
        sortProductsIndex({ commit, state }, { type }) {
            state.products.sort(function(a, b) {
                if (type === "top") {
                    return b.price - a.price;
                } else {
                    return a.price - b.price;
                }
            });
        },
        sortProductsCategoryIndex({ commit, state }, { type, categoryId }) {
            console.log(type, " ", categoryId);
            if (type == "low") {
                state.active_sort_product_low = true;
                state.active_sort_product_top = false;
            } else {
                state.active_sort_product_top = true;
                state.active_sort_product_low = false;
            }
            commit("setsortProductPrice", type);

            let response = axios
                .get(
                    "http://laravel-vue-frilans-backend/api/getcategoryproduct/" +
                    categoryId +
                    "/" +
                    type
                )
                .then((res) => {
                    state.loading = false;
                    commit("setProducts", res.data.data);

                    state.totalLinks = Math.ceil(res.data.meta.total / 15);
                    state.cur_page = res.data.meta.current_page;
                    state.pagination.next = res.data.links.next;
                })
                .catch((err) => console.log(err));
        },
        sortProductsCategoryChildrenIndex({ commit, state }, { type, categoryId, catChildId }) {
            let test = "test";
            if (type == 'low') {
                state.active_sort_product_low = true;
                state.active_sort_product_top = false;
            } else {
                state.active_sort_product_top = true;
                state.active_sort_product_low = false;
            }
            console.log(type, " ", categoryId, " ", catChildId);
            // state.sortProductPrice = type
            commit("setsortProductPrice", type);

            let response = axios
                .get(
                    "http://laravel-vue-frilans-backend/api/getcategorychildrenproduct/" +
                    categoryId +
                    "/" +
                    catChildId +
                    "/" +
                    type
                )
                .then((res) => {
                    state.loading = false;
                    // state.products = res.data.data;
                    commit("setProducts", res.data.data);

                    state.totalLinks = Math.ceil(res.data.meta.total / 15);
                    state.cur_page = res.data.meta.current_page;
                    state.pagination.next = res.data.links.next;
                })
                .catch((err) => console.log(err));
        },
    },

    namespaced: true,
};