import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

const vm = new Vue({
    // TODO:vue实例时，添加router注入$route(路由的规则)\$router(vue-router的实例)
    router,
    render: h => h(App)
}).$mount('#app')

console.log(vm, 'vm===')