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

        <!-- 输入关键字 -->
        <el-input placeholder="请输入标题/设备型号关键字" v-model="inputKey"
          class="input-with-select search-select-input public-interval">
          <el-select v-model="inputKeyType" slot="prepend" placeholder="请选择">
            <el-option v-for="item in inputKeyOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>

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
        ///搜索关键字类型
        inputKeyOptions: [{
          value: '1',
          label: '标题'
        }, {
          value: '2',
          label: '设备型号'
        }],
        inputKeyType: '', //选择的搜索关键字类型
        //输入的标题/设备型号 关键字
        inputKey: '',
        //选择的信息类型
        infoValue: '',
        //信息类型
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

  // 模块二 搜索条件 + 发布需求
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

      /deep/.el-input__icon {
        line-height: 34px;
      }

      // 本店分类
      // 商品状态
      .choose-store-sort {
        width: 112px;
        height: 34px;
        margin: 20px 25px 20px 15px;
        border-radius: 6px 6px 6px 6px;
        box-sizing: border-box;

        /deep/ .el-input__inner {
          height: 34px;
          line-height: 34px;
        }
      }

      // 请输入标题/设备型号关键字
      .search-select-input {
        width: 400px;

        /deep/.el-input {
          width: 110px;
        }

        /deep/ .el-input__icon {
          line-height: 34px;
        }

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
            border-radius: 6px 0px 0px 6px;
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
            border-radius: 0px 6px 6px 0px;
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
