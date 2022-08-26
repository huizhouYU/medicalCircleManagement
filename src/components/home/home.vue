<template>
  <el-container class="content">
    <el-header class="header">
      <home-header></home-header>
    </el-header>
    <el-container>
      <!-- 左侧菜单栏 -->
      <el-aside class="aside">
        <MenusTree></MenusTree>
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
  import MenusTree from '@/components/home/menustree.vue';
  import homeHeader from '@/components/home/homeHeader.vue';
  export default {
    components: {
      MenusTree,
      homeHeader
    },

    created() {
      // console.log(this.$router)
      // 获取token
      const token = localStorage.getItem('token')
      if (!token) {
        // 没有token 返回登录页
        this.$router.push({
          name: 'login'
        })
      }
    },
    data() {
      return {
      }
    }
  }
</script>

<style scoped lang="less">
  /* 整个页面 */
  .content {
    // height: 100%;
    background-color: #F5F7FA;
  }

  // 头部
  .header {
    height: 90px !important;
    border-bottom: 1px solid #eee;
    padding: 0;
    background-color: #fff;
  }
  // 头部下面的主体内容:左侧菜单栏+中间内容
  .el-aside {
      height: calc(100vh - 90px);// 设置左侧 aside 高度
  }
  .el-main {
      height: calc(100vh - 90px);// 设置左侧 aside 高度
  }

  // 左侧菜单栏
  .aside {
    width: 210px !important;
    border-right: 1px solid #eee;
  }

  //中间主体区域
  .main {
    padding: 20px;
    // min-width: 850px;
    // background-color: #fff;
  }
</style>
