<template>
  <div id="NavMenu">
    <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" text-color="#999" :unique-opened="true"
      @select="handleSelect" router active-text-color="#ffd04b">

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
    name: "NavMenu",
    data() {
      return {
        activeIndex: "1-1",
        navMenuData: [{
            index: "1",
            name: "商品",
            iconfont: "el-icon-location",
            child: [{
              index: "/goods1",
              name: "商品列表"
            }, {
              index: "/goods2",
              name: "商品列表2"
            }, {
              index: "/shop3",
              name: "选项3"
            }]
          },
          {
            index: "2",
            name: "订单",
            iconfont: "el-icon-menu",
            child: [{
              index: "3-1",
              name: "选项1"
            }, {
              index: "3-2",
              name: "选项2"
            }, {
              index: "3-3",
              name: "选项3"
            }]
          },
          {
            index: "3",
            name: "个人信息",
            iconfont: "el-icon-document",
            child: [{
              index: "3-1",
              name: "选项1"
            }, {
              index: "3-2",
              name: "选项2"
            }, {
              index: "3-3",
              name: "选项3"
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
  .NavMenu {

    .el-submenu .el-menu-item {
      max-width: 200px;
    }
  }

  .el-menu {
    border: none;
  }
</style>
