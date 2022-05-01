import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/style.css'
import './assets/font-awesome-4.7.0/css/font-awesome.min.css'

import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';

const app = createApp(App)

var requireComponent = require.context("./components", true, /\w+\.(vue|js)$/)
requireComponent.keys().forEach(function(fileName) {
    var baseComponentConfig = requireComponent(fileName)
    baseComponentConfig = baseComponentConfig.default || baseComponentConfig
    var baseComponentName = baseComponentConfig.name || (
        fileName
        .replace(/^.+\//, '')
        .replace(/\.\w+$/, '')
    )
    app.component(baseComponentName, baseComponentConfig)
});

app
    .use(store)
    .use(router)
    .use(BootstrapIconsPlugin)
    .mount('#app')