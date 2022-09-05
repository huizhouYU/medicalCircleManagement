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
          <!-- <home-header></home-header> -->
          <div class="header-box">
            <div class="img-box">
            </div>
            <div class="header-right">
              <span :title="username" @click="showInfoItem">{{username}}</span>
              <img src="../../assets/images/icon_logout.png" alt="" title="退出" @click="unLogin">
            </div>
          </div>
        </el-header>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
        <div class="showInfo" v-show="isShowInfo">
          <ul>
            <li>商家信息</li>
            <li>修改密码</li>
            <li>商家认证</li>
          </ul>
        </div>
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
        isShowInfo: false,
        isColl: false, //是否折叠菜单
        username: '欢迎您，迅即影像网络'
      }
    },
    methods: {
      getCollapse(val) {
        this.isColl = val
      },
      unLogin() {
        localStorage.removeItem("token");
        this.$router.replace("/Login")
      },
      showInfoItem() {
        this.isShowInfo = !this.isShowInfo
      }
    }
  }
</script>

<style scoped lang="less">
  /* 整个页面 */
  .content {
    // height: 100%;
    background-color: #F5F7FA;
    position: relative;
  }

  // 头部
  .header {
    height: 90px !important;
    border-bottom: 1px solid #eee;
    padding: 0;
    background-color: #fff;

    .header-box {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 75px;
      box-sizing: border-box;


      .img-box {
        width: 210px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 125px;
          height: 42px;
        }
      }

      .header-right {
        display: flex;
        justify-content: space-around;
        align-items: center;
        span{
          cursor: pointer;
        }

        img {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }
      }

      span {
        display: inline-block;
        width: 105px;
        height: 16px;
        font-size: 12px;
        margin-right: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        box-sizing: border-box;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        color: #333333;
      }
    }
  }

  .showInfo {
    position: absolute;
    right: 125px;
    top: 66px;
    background-color: #fff;
    border-radius: 6px;
    border: 1px solid #eee;
    width: 125px;
    font-size: 12px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    color: #333333;

    ul{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      padding: 10px;
      li{
        padding: 10px 20px;
        text-align: center;
        margin-bottom: 1px solid #fff;
        cursor: pointer;
      }
      li:hover{
        color: #1890FF;
      }
    }
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
