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
        },
        {
          path: '/success',
          // title:'发布商品成功',
          name: 'success',
          component: () => import("../pages/goods/success.vue"),
        },
        {
          path: '/goodsRecovery',
          name: '商品回收站',
          component: () => import("../pages/goods/goodsRecovery.vue"),
        },
        {
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
          path: '/orderDetail',
          name: '订单详情',
          component: () => import("../pages/order/orderDetail.vue"),
        },
        {
          path: '/refundOrder',
          name: '退款订单',
          component: () => import("../pages/order/refundOrder.vue"),
        }, {
          path: '/refundOrderDetail',
          name: '退款详情',
          component: () => import("../pages/order/refundOrderDetail.vue"),
        },
        {
          path: '/timeSelect',
          name: '时间选择器',
          component: () => import("../pages/order/timeSelect.vue"),
        },
        {
          path: '/demandManage',
          name: '需求管理',
          component: () => import("../pages/demand/demandManage.vue"),
        },
        {
          path: '/publishDemand',
          name: '发布需求',
          component: () => import("../pages/demand/publishDemand.vue"),
        },
        {
          path: '/shopSetting',
          name: '店铺设置',
          component: () => import("../pages/shop/shopSetting.vue"),
        },
        {
          path: '/shopCarousel',
          name: '店铺轮播',
          component: () => import("../pages/shop/shopCarousel.vue"),
        },
        {
          path: '/storeAuthentication',
          name: '商家认证',
          component: () => import("../pages/shop/storeAuthentication.vue"),
        }
      ]
    }
  ]
})
