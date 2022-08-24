<template>
  <div class="box">
    <!-- 头部页面标题 -->
    <div class="header-title">
      <div class="back">
        <i class="iconfont">&#xe610;</i>
      </div>
      <div class="title">
        店铺装修
      </div>
    </div>

    <!-- 编辑区域 -->
    <div class="eidt-box">
      <!-- 产品主图 -->
      <div class="product-images">店铺店标：
        <div label="图片可拖曳排序：" prop="trialImgs" class="content-images">
          <div class="row">
            <DragUpload :allList="ruleForm.trialImgs" v-on:allList="trialImgs" :limit="limit">
            </DragUpload>
            <div class="el-upload__tip gray-tip">请上传300*300的图片，大小不超过2m</div>
          </div>
        </div>
      </div>

      <!-- 店铺店标 -->
      <!-- <div class="shop-logo">
        <span class="shop-logo-title">店铺店标：</span>
        <div class="logo-tip">
          <img src="../../../src/assets/images/img/brand04.jpg" alt="">
          <span>请上传300*300的图片，大小不超过2m</span>
        </div>
      </div> -->
      <!-- 店铺横幅 -->
      <div class="div-item shop-banner">
        <span class="shop-banner-title">店铺横幅：</span>
        <div class="banner-tip">
          <img src="../../../src/assets/images/img/brand04.jpg" alt="">
          <span>请上传300*300的图片，大小不超过2m</span>
        </div>
      </div>

      <!-- 店铺名称 + 联系电话 -->
      <div class="div-item shop-name-tel">
        <div class="shop-name">店铺名称：
          <input type="text" placeholder="请输入店铺名称" v-model="shopInfo.name">
        </div>
        <div class="shop-tel">联系电话：
          <input type="text" placeholder="请输入联系电话" v-model="shopInfo.tel">
        </div>

      </div>
      <!-- 店铺地址 -->
      <div class="div-item shop-address">店铺地址：
        <input type="text" placeholder="请输入店铺地址" v-model="shopInfo.address" class="shop-address-input">
      </div>

      <!-- 店铺简介： -->
      <div class="shop-detail">
        <span>店铺简介：</span>
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
        limit:1,//上传限制图片数量
        shopInfo: {
          logoUrl: '', //店铺logo
          bannerUrl: '', //店铺横幅
          name: '', //店铺名称
          tel: '', //联系电话
          address: '', //店铺地址
        },
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
  .box {
    height: 100%;
  }

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


  // 编辑区域
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

    // 除第一个模块,每个模块距离上一个模块高度为20px
    .div-item {
      margin-top: 20px;
    }

    // 店铺店标
    // 店铺横幅
    .shop-logo,
    .shop-banner {
      display: flex;
      align-items: center;

      .shop-logo-title,
      .shop-banner-title {
        margin-top: -10px;
      }

      .logo-tip,
      .banner-tip {
        margin-left: 30px;
        display: flex;
        flex-direction: column;

        span {
          margin-top: 10px;
          font-size: 12px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #BBBBBB;
        }
      }

    }

    //店铺店标图片
    .logo-tip img {
      width: 70px;
      height: 70px;
    }

    //店铺横幅图片
    .banner-tip img {
      width: 560px;
      height: 70px;
    }

    //  店铺名称 + 联系电话
    .shop-name-tel {
      display: flex;
      justify-content: flex-start;

      .shop-name,
      .shop-tel {
        display: flex;
        justify-content: flex-start;
        align-items: center;

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
      }

      .shop-tel {
        margin-left: 40px;
      }
    }

    // 信息标题
    .shop-address {
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

    // 店铺简介
    .shop-detail {
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
