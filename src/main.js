/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import PostLists from './components/PostLists.vue'
import UserInfo from './components/UserInfo.vue'
import Post from './components/Post.vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: PostLists
  },
  {
    path: '/UserInfo/:userId', 
    name: 'user',
    component: UserInfo,
    props: true
  },
  {
    path: '/Post/:postId',
    name: 'post',
    component: Post,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
