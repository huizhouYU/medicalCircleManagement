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
          path: '/goodsIndex',
          name: '商品列表',
          component: () => import("../components/goods/goodsIndex.vue"),
        }, {
          path: '/goods1',
          name: '上传图片',
          component: () => import("../components/goods/goods1.vue"),
        },
        {
          path: '/goods2',
          name: '富文本',
          component: () => import("../components/goods/goods2.vue"),
        }
      ]
    }
  ]
})
