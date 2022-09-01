<template>
  <div class="menus-div">
    <div @click="changeCollapse()" class="collapse-div">
      <img src="../../assets/images/logo.png" alt="" v-show="!isCollapse">
      <img src="../../assets/images/logo_img.png" alt="" v-show="isCollapse">
      <!-- <i class="iconfont" v-show="!isCollapse" title="收起">&#xe661;</i>
      <i class="iconfont" v-show="isCollapse" title="展开">&#xe662;</i> -->
    </div>
    <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" text-color="#999" :unique-opened="true"
      @open="handleOpen" @close="handleClose" @select="handleSelect" router active-text-color="#1890FF"
      :collapse="isCollapse">

      <template v-for="(item,index) in navMenuData">
        <el-submenu :index="item.index">
          <template slot="title">
            <i :class="item.iconfont"></i>
            <span>{{item.name}}</span>
          </template>
          <template v-for="item2 in item.child">
            <el-menu-item :index="item2.index">{{item2.name}}</el-menu-item>
          </template>
        </el-submenu>
      </template>

    </el-menu>
  </div>
</template>

<script>
  export default {
    props: ['getIsCollapse'],
    data() {
      return {
        isCollapse: false,
        activeIndex: "/goodsIndex",
        navMenuData: [{
            index: "1",
            name: "商品",
            iconfont: "el-icon-location",
            child: [{
                index: "/goodsIndex",
                name: "商品列表"
              }, {
                index: '/goodsRecovery',
                name: "商品回收站"
              }
              // , {
              //   index: "/goods1",
              //   name: "上传图片"
              // }, {
              //   index: "/goods2",
              //   name: "富文本"
              // },
            ]
          },
          {
            index: "2",
            name: "订单",
            iconfont: "el-icon-menu",
            child: [{
                index: "/orderManage",
                name: "订单管理"
              }
              // , {
              //   index: "/timeSelect",
              //   name: "时间选择器"
              // }
            ]
          },
          {
            index: "3",
            name: "需求管理",
            iconfont: "el-icon-document",
            child: [{
              index: "/demandManage",
              name: "需求管理"
            }]
          },
          {
            index: "4",
            name: "店铺设置",
            iconfont: "el-icon-setting",
            child: [{
                index: "/shopSetting",
                name: "店铺装修"
              }, {
                index: "/shopCarousel",
                name: "店铺轮播"
              },
              {
                index: "/storeAuthentication",
                name: "商家认证"
              }
            ]
          },

        ]
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      changeCollapse() {
        this.isCollapse = !this.isCollapse
        this.getIsCollapse(this.isCollapse)
      }
    },
    mounted() {
      this.activeIndex = this.$route.path.substring(1, this.$route.path.length);
    }
  };
</script>

<style scoped lang="less">
  //菜单栏上面的展开与收起
  .collapse-div {
    z-index: 1;
    // position: absolute;

    margin-right: 10px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 10px;
    color: #333;

    i {
      border: 1px solid #333;
      padding: 10px;
      border-radius: 50%;
      cursor: pointer;
    }
  }

  .menus-div {
    position: relative;
    // background-color: #fff;
    background-color: #222020;
    height: 100%;
  }

  /deep/ .el-menu {
    background-color: #222020;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .el-menu {
    border: none;
    box-sizing: border-box;
    transition: all 10ms;
  }

  // 菜单栏选中的背景颜色
  .el-menu-item.is-active {
    background-color: #E6F7FF !important;
  }

  // 一级菜单文字颜色
  .el-submenu__title {
    color: #333 !important;
  }

  // 二级菜单文字大小
  .el-menu-item {
    font-size: 12px;
  }
</style>
