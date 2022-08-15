<template>
  <el-container class="content">
    <el-header class="header">
      <home-header></home-header>
    </el-header>
    <el-container>
      <!-- 左侧菜单栏 -->
      <el-aside width="200px" class="aside">
        <MenuTree></MenuTree>
      </el-aside>
      <el-container>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
  import MenuTree from '@/components/home/menustree.vue';
  import homeHeader from '@/components/home/homeHeader.vue';
  export default {
    components: {
      MenuTree,
      homeHeader
    },

    created() {
      console.log(this.$router)
      // 获取token
      const token = localStorage.getItem('token')
      console.log('token', token)
      if (!token) {
        // 没有token 返回登录页
        this.$router.push({
          name: 'login'
        })
      }
    },
    data() {
      return {
        uniqueOpened: true, //是否只保持一个子菜单的展开
        menuList: [{
            id: 1,
            parentid: '0',
            name: '商品',
            icon: 'HomeFilled',
            url: '/homepage',
            children: [{
              id: 3,
              parentid: '2',
              name: '商品列表',
              icon: '',
              url: '/shopList'
            }, ]
          },
          {
            id: 2,
            parentid: '0',
            name: '订单管理',
            icon: 'UserFilled',
            children: [{
                id: 3,
                parentid: '2',
                name: '订单列表',
                icon: '',
                url: '/grade',
              },
              {
                id: 5,
                parentid: '2',
                name: '管理订单',
                icon: '',
                url: '/grade',
              }
            ]
          },
          {
            id: 6,
            parentid: '0',
            name: '个人信息',
            icon: 'List',
            children: [{
              id: 3,
              parentid: '2',
              name: '密码修改',
              icon: '',
              url: '/password'
            }, ]
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .content {
    height: 100%;
  }

  .header {
    height: 80px !important;
    border-bottom: 1px solid #eee;
    padding:0;
    
  }

  .aside {
    height: calc(100%-120px);
    border-right: 1px solid #eee;
  }

  .main {
    /* background-color: bisque; */
  }
</style>
