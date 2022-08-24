<template>
  <div class="content">
    <!-- 头部页面标题 -->
    <div class="header-title">
      <div class="back">
        <i class="iconfont">&#xe610;</i>
      </div>
      <div class="title">需求管理</div>
    </div>
    <!-- 模块二 搜索条件 + 发布需求 -->
    <div class="search-add">
      <!-- 搜索部分 -->
      <div class="search">
        <!-- 本店分类 -->
        <el-select v-model="infoValue" placeholder="信息类型" class="choose-store-sort">
          <el-option v-for="item in infoOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>

        <!-- input 输入关键字-->
        <div class="input-box">
          <el-input v-model="inputKey" placeholder="请输入设备型号、关键字" class="input-search"></el-input>
          <button class="btn-search">
            <img src="../../assets/images/icon_search.png" alt="">
          </button>
        </div>

      </div>
      <!-- 添加商品 -->
      <button class="btn-add" @click="toAddDemand">发布需求 </button>
    </div>
    <!-- 模块三 需求列表 -->
    <demands-items class="items"></demands-items>
  </div>
</template>

<script>
  import DemandsItems from '../demand/demandsItems.vue'
  export default {
    components: {
      DemandsItems
    },
    data() {
      return {
        //选择的信息类型
        infoValue: '',
        // 输入的设备型号、关键字
        inputKey: '',
        infoOptions: [{
            value: '1',
            label: '类型一'
          },
          {
            value: '2',
            label: '类型二'
          }
        ]

      }
    },
    methods: {
      //发布需求
      toAddDemand() {
        this.$router.push('/publishDemand')
      }
    }
  }
</script>

<style scoped lang="less">
  // 头部页面标题
  .header-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    // 返回按钮
    .back {
      width: 34px;
      height: 34px;
      background: #FFFFFF;
      box-shadow: 0px 0px 32px 1px rgba(144, 145, 145, 0.15);
      border-radius: 6px 6px 6px 6px;
      text-align: center;
      line-height: 34px;
      cursor: pointer;
    }

    //标题
    .title {
      margin-left: 20px;
      height: 34px;
      padding: 0px 20px;
      background: #1890FF;
      border-radius: 6px 6px 6px 6px;
      font-size: 12px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #FFFFFF;
      text-align: center;
      line-height: 34px;
    }

  }

  // 模块二 搜索条件 + 添加商品
  .search-add {
    margin-top: 15px;
    background-color: #fff;
    box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.06);
    border-radius: 6px 6px 6px 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    // 搜索部分
    .search {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      // 本店分类
      // 商品状态
      .choose-store-sort {
        width: 112px;
        height: 34px;
        margin: 20px 25px 20px 15px;
        border-radius: 6px 6px 6px 6px;
        border: 1px solid #EBEEF5;
        box-sizing: border-box;

        /deep/ .el-input__inner {
          height: 34px;
          line-height: 34px;
        }
      }

      .choose-shop-state {
        margin-left: 0px;
      }

      // 请输入商品名称/关键字
      .input-box {
        width: 380px;
        height: 34px;
        background: #FFFFFF;
        border-radius: 6px 6px 6px 6px;
        border: 1px solid #EBEEF5;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;

        // input 输入框
        .input-search {
          width: 320px;
          height: 34px;

          /deep/ .el-input__inner {
            height: 34px;
            line-height: 34px;
          }
        }

        // 搜索按钮
        .btn-search {
          width: 60px;
          height: 34px;
          background: #1890FF;
          border-radius: 0px 6px 6px 0px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: none;
          margin-left: -2px;
          z-index: 1;

          img {
            width: 20px;
            height: 20px;
          }
        }
      }
    }

    // 发布需求
    .btn-add {
      width: 88px;
      height: 34px;
      background: #1890FF;
      border-radius: 6px 6px 6px 6px;
      border: none;
      margin-right: 20px;
      box-sizing: border-box;
      font-size: 12px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      color: #FFFFFF;
      text-align: center;
      line-height: 34px;
    }
  }

  // 模块三 需求列表
  .items {
    margin-top: 20px;
  }
</style>
