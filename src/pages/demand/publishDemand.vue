<template>
  <div>
    <!-- 头部页面标题 -->
    <div class="header-title">
      <div class="back" @click="back()">
        <i class="iconfont">&#xe610;</i>
      </div>
      <div class="title">
        需求管理
        <i class="iconfont">&#xe62b;</i>
        发布需求
      </div>
    </div>
    <!-- 编辑需求区域 -->
    <div class="eidt-box">
      <!-- 信息类型+设备品牌 -->
      <div class="item-name-brand">
        <div class="item">信息类型：
          <!-- <input type="text" placeholder="请输入商品名称"> -->
          <el-select v-model="demandInfo.infoType" class="select-infoType">
            <el-option v-for="item in infoTypeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="item2">设备品牌：
          <input type="text" placeholder="请输入设备品牌" v-model="demandInfo.infoBrand">
          <!-- <el-select v-model="demandInfo.infoBrand" class="select-infoBrand" >
            <el-option v-for="item in infoBrandOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select> -->
        </div>
        <div class="item3">设备型号：
          <!-- <input type="text" placeholder="请输入设备型号" v-model="demandInfo.infoBrand"> -->
          <el-select v-model="demandInfo.infoModel" class="select-infoModel">
            <el-option v-for="item in infoModelOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- 信息标题 -->
      <div class="demandTitle">信息标题：
        <input type="text" placeholder="请输入信息标题" v-model="demandInfo.infoTitle" class="demand-title-input">
      </div>
      <!-- 产品主图 -->
      <div class="product-images">产品主图：
        <div label="图片可拖曳排序：" prop="trialImgs" class="content-images">
          <div class="row">
            <DragUpload :allList="ruleForm.trialImgs" v-on:allList="trialImgs" :limit="limit">
            </DragUpload>
            <div class="el-upload__tip gray-tip">请：图片上传不超过5张，图片支持jpg/png格式，不超过500kb，尺寸为800*800</div>
          </div>
        </div>
      </div>
      <!-- 故障描述 -->
      <div class="product-detail">
        <span>故障描述：</span>
        <edit class="edit"></edit>
      </div>
      <div class="submit">
        <button class="but-submit">提交</button>
      </div>

    </div>

  </div>
</template>

<script>
  import edit from '../../components/unit/edit.vue'
  import DragUpload from '../../components/unit/DragUpload'; // 引入vue-draggable
  export default {
    components: {
      DragUpload,
      edit
    },
    data() {
      return {
        limit: 5,
        // 发布信息
        demandInfo: {
          infoType: '', //信息类型
          infoBrand: '', //设备品牌
          infoModel: '', //设备型号
          infoTitle: '', //信息标题
        },
        //信息类型
        infoTypeOptions: [{
          value: '1',
          label: '类型一'
        }, {
          value: '2',
          label: '类型二'
        }],
        infoModelOptions: [{
          value: '1',
          label: '型号一'
        }, {
          value: '2',
          label: '型号二'
        }],
        ruleForm: {
          imgUrl: '',
          trialImgs: [],
        },
      }
    },
    mounted() {},
    methods: {
      back() {
        this.$router.back()
      },
      // 图片可拖曳排序
      trialImgs(allList) {
        this.ruleForm.trialImgs = allList
      },

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
      // width: 88px;
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

      i {
        padding: 0px 4px;
        font-size: 12px;
      }
    }
  }

  // 编辑需求区域
  .eidt-box {
    background-color: #FFFFFF;
    padding: 20px 35px 30px 15px;
    margin-top: 15px;
    box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.06);
    border-radius: 6px 6px 6px 6px;
    font-size: 12px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #333333;

    // 信息类型+设备品牌
    .item-name-brand {
      margin-top: 30px;
      display: flex;
      justify-content: flex-start;

      .item,
      .item2,
      .item3 {
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }

      .select-infoType {
        margin-left: 30px;
      }

      input {
        margin-left: 30px;
        width: 240px;
        height: 34px;
        background: #FFFFFF;
        border-radius: 4px 4px 4px 4px;
        padding-left: 15px;
        border: 1px solid #EBEEF5;
        outline: none;
        box-sizing: border-box;
      }

      .item2,
      .item3 {
        margin-left: 50px;
      }

      .item2 input {
        margin-left: 0px;
      }

      /deep/ .el-input__inner {
        height: 34px;
        line-height: 34px;
        width: 240px;
      }

      /deep/ .el-input__icon {
        line-height: 34px;
      }
    }
  }

  // 信息标题
  .demandTitle {
    margin-top: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 12px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #333333;

    input {
      margin-left: 30px;
      width: 300px;
      height: 34px;
      background: #FFFFFF;
      border-radius: 4px 4px 4px 4px;
      padding-left: 15px;
      border: 1px solid #EBEEF5;
      outline: none;
      box-sizing: border-box;
    }
  }



  // 产品主图
  .product-images {
    margin-top: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 12px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #333333;

    .content-images {
      margin-left: 30px;
    }

    .gray-tip {
      font-size: 12px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #BBBBBB;
      margin-top: 5px;
    }
  }

  // 故障描述
  .product-detail {
    margin-top: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    font-size: 12px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #333333;

    span {
      margin-top: 15px;
    }

    .edit {
      margin-left: 30px;
      height: 366px;
    }
  }

  // 提交
  .submit {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;

    .but-submit {
      width: 92px;
      height: 34px;
      background: #1890FF;
      border-radius: 6px 6px 6px 6px;
      font-size: 12px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #FFFFFF;
      border: none;
      outline: none;
    }
  }
</style>
