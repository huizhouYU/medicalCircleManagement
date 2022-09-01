<template>
  <div class="content">
    <!-- 头部页面标题 -->
    <div class="header-title">
      <div class="back">
        <i class="iconfont">&#xe610;</i>
      </div>
      <div class="title">商品回收站</div>
    </div>
    <!-- 模块二 搜索条件 + 添加商品 -->
    <!-- <div class="search-add"> -->
    <!-- 搜索部分 -->
    <div class="search">

      <!-- input 输入关键字  -->
      <div class="input-box">
        <el-select v-model="inputKeyType" class="key-selectType">
          <el-option v-for="item in inputKeyOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="inputKey" placeholder="请输入商品名称/关键字" class="input-search"></el-input>
        <button class="btn-search" @click="selectData()">
          <img src="../../assets/images/icon_search.png" alt="">
        </button>
      </div>
    </div>
    <goods-recovery-items class="items"></goods-recovery-items> 
  </div>
</template>

<script>
  import GoodsRecoveryItems from '../goods/goodsRecoveryItems.vue'
  export default {
    components: {
      GoodsRecoveryItems
    },
    data() {
      return {

        //商品状态
        inputKeyOptions: [{
          value: '1',
          label: '产品编码'
        }, {
          value: '2',
          label: '产品名称'
        }],
        inputKeyType: '1', //搜索的关键字的类型
        inputKey: '', //输入商品名称/关键字

      }
    },
    methods: {

      //根据条件筛选数据
      selectData() {
        alert("不要点啦！后台接口数据还没做呢。。。")
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

  // 模块二 搜索条件
  .search {
    margin-top: 15px;
    height: 74px;
    background-color: #fff;
    box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.06);
    border-radius: 6px 6px 6px 6px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    // 请输入商品名称/关键字
    .input-box {
      margin-left: 15px;
      width: 380px;
      height: 34px;
      background: #FFFFFF;
      border-radius: 6px 6px 6px 6px;
      border: 1px solid #EBEEF5;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;

      //输入的关键字的类型
      .key-selectType {
        height: 34px;
        width: 140px;
        box-sizing: border-box;
        font-size: 12px;
        margin-left: -1px;

        //下拉框的样式修改
        /deep/ .el-input__inner {
          height: 34px;
          line-height: 34px;
          font-size: 12px;
          border-radius: 4px 0px 0px 4px;
        }

        //下拉框的箭头修改
        /deep/ .el-input__icon {
          line-height: 34px;
        }

      }


      // input 输入框
      .input-search {
        width: 320px;
        height: 34px;
        margin-left: -1px;

        /deep/ .el-input__inner {
          height: 34px;
          line-height: 34px;
          border-radius: 0px;
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
        cursor: pointer;

        img {
          width: 20px;
          height: 20px;
        }
      }
    }

  }

  // 模块三 商品列表
  .items {
    margin-top: 20px;
  }
</style>
