import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login.vue'
import Home from '../components/home/home.vue'
Vue.use(Router)

export default new Router({
  routes: [{
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [{
        path: '/goods1',
        name: '商品列表',
        component: () => import("../components/goods/goods1.vue"),
      },
      {
        path: '/goods2',
        name: '商品列表2',
        component: () => import("../components/goods/goods2.vue"),
      }]
    }
  ]
})
