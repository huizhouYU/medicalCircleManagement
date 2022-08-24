<template>
  <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" text-color="#999" :unique-opened="true"
    @select="handleSelect" router active-text-color="#1890FF">

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
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: "/goodsIndex",
        navMenuData: [{
            index: "1",
            name: "商品",
            iconfont: "el-icon-location",
            child: [{
              index: "/goodsIndex",
              name: "商品列表"
            },{
              index: "/goods1",
              name: "上传图片"
            }, {
              index: "/goods2",
              name: "富文本"
            }]
          },
          {
            index: "2",
            name: "订单",
            iconfont: "el-icon-menu",
            child: [{
              index: "/orderManage",
              name: "订单管理"
            }, {
              index: "/timeSelect",
              name: "时间选择器"
            }, {
              index: "3-3",
              name: "选项3"
            }]
          },
          {
            index: "3",
            name: "需求管理",
            iconfont: "el-icon-document",
            child: [{
              index: "/demandManage",
              name: "需求管理"
            }, {
              index: "3-2",
              name: "选项2"
            }, {
              index: "3-3",
              name: "选项3"
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
            }]
          },

        ]
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    mounted() {
      console.log(this.activeIndex)
      console.log(this.$route.path)
      this.activeIndex = this.$route.path.substring(1, this.$route.path.length);

    }
  };
</script>

<style scoped lang="less">
  .el-submenu .el-menu-item {
    max-width: 210px;
  }

  .el-menu {
    border: none;
    height: 100%;
    padding: 10px 20px;
    box-sizing: border-box;
  }

  .el-submenu .el-menu-item {
    min-width: 10px;
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
