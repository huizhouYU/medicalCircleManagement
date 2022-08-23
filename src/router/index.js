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
          path: '/addGoods',
          name: '添加商品',
          component: () => import("../components/goods/addGoods.vue"),
        },
        {
          path: '/publishGood',
          // title:'发布商品',
          name: 'publishGood',
          component: () => import("../components/goods/publishGood.vue"),
        }, {
          path: '/goods1',
          name: '上传图片',
          component: () => import("../components/goods/goods1.vue"),
        },
        {
          path: '/goods2',
          name: '富文本',
          component: () => import("../components/goods/goods2.vue"),
        },
        {
          path: '/orderManage',
          name: '订单管理',
          component: () => import("../pages/order/orderManage.vue"),
        },
        {
          path: '/timeSelect',
          name: '时间选择器',
          component: () => import("../pages/order/timeSelect.vue"),
        }
      ]
    }
  ]
})
