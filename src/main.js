import Vue from 'vue'
import App from './App.vue'
import HomePage from './components/HomePage.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {path: '/', component: HomePage}
]

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
