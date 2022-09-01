<template>
  <el-container class="content">
   <!-- <el-header class="header">
      <home-header></home-header>
    </el-header> -->
    <el-container>
      <!-- 左侧菜单栏 -->
      <!-- :class="[{password:isHide},'owl']" -->
      <!-- :class="[{collapse-aside:isColl},'aside']" -->
      <el-aside :class="[{collapseAside:isColl},'aside']">
        <MenusTree :getIsCollapse="getCollapse"></MenusTree>
      </el-aside>
      <el-container>
        <el-header class="header">
          <home-header></home-header>
        </el-header>
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
        isColl: false, //是否折叠菜单
      }
    },
    methods: {
      getCollapse(val) {
        this.isColl = val
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
    // height: calc(100vh - 90px); // 设置左侧 aside 高度
    height: calc(100vh);
  }

  .el-main {
    height: calc(100vh - 90px); // 设置左侧 aside 高度
  }

  // 左侧菜单栏 展开形式
  .aside {
    max-width: 210px;
    border-right: 1px solid #eee;
  }

  // 左侧菜单栏 收起形式
  .collapseAside {
    max-width: 65px;
  }
  /* 加过渡给侧边导航*/
  .el-aside {
    transition: width 0.25s;
    -webkit-transition: width 0.25s;
    -moz-transition: width 0.25s;
    -webkit-transition: width 0.25s;
    -o-transition: width 0.25s;
  }

  //中间主体区域
  .main {
    padding: 20px;
    // min-width: 850px;
    // background-color: #fff;
  }
</style>
