<template>
  <div>
    <!-- 头部页面标题 -->
    <div class="header-title">
      <div class="back" @click="back()">
        <i class="iconfont">&#xe610;</i>
      </div>
      <div class="title">
        商品列表
        <i class="iconfont">&#xe62b;</i>
        添加商品
      </div>
    </div>
    <!-- 编辑商品区域 -->
    <div class="eidt-box">
      <!-- 产品类目 -->
      <div class="classifyTitle">产品类目：
        <span @click="preStep()">{{goodInfo.chooseClassify}}</span>
      </div>
      <!-- 产品名称+所属品牌 -->
      <div class="item-name-brand">
        <div class="item">产品名称：
          <input type="text" placeholder="请输入商品名称">
        </div>
        <div class="item2">所属品牌：
          <input type="text" placeholder="请输入商品名称">
        </div>
      </div>
      <!-- 产品规格： -->
      <div class="product-specs">产品规格：
        <div class="choose-item">
          <div class="item">
            <div class="title">销售类型</div>
            <div class="content">
              <el-select v-model="goodInfo.chosedXS" class="select-item" @change="isEditPrice()">
                <el-option v-for="item in xsOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="item">
            <div class="title">价格</div>
            <div class="content">
              <input type="number" name="" id="" placeholder="请输入价格" :disabled="!isEditPriceFlag">
            </div>
          </div>
          <div class="item">
            <div class="title">商品编码</div>
            <div class="content">
              <input type="text" name="" id="" placeholder="产品P/N码或识别码">
            </div>
          </div>
          <div class="item">
            <div class="title">库存</div>
            <div class="content">
              <input type="text" name="" id="" placeholder="请输入商品库存">
            </div>
          </div>
          <div class="item">
            <div class="title">新旧程度</div>
            <div class="content">
              <el-select v-model="goodInfo.chosedDegree" class="select-item" placeholder="请选择">
                <el-option v-for="item in newOrOrdDegreeOptions" :key="item.value" :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="item">
            <div class="title">保质期限</div>
            <div class="content shelf-life">
              <input type="text" name="" id="" placeholder="请输入">
              <el-select v-model="goodInfo.chosedShelfLife" class="select-item" placeholder="请选择">
                <el-option v-for="item in shelfLifeOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
      <!-- 产品主图 -->
      <div class="product-images">产品主图：
        <div label="图片可拖曳排序：" prop="trialImgs" class="content-images">
          <div class="row">
            <DragUpload :allList="ruleForm.trialImgs" v-on:allList="trialImgs">
            </DragUpload>
            <div class="el-upload__tip gray-tip">请：主图按照图片上传顺序展示，图片支持jpg/png格式，不超过10M，尺寸为800*800，拖拽图片可调整排序</div>
          </div>
        </div>
      </div>
      <!-- 产品详情 -->
      <div class="product-detail">
        <span>产品详情：</span>
        <edit class="edit"></edit>
      </div>
      <!-- 运费模板 -->
      <div class="prodect-fare">运费模板：
        <el-select v-model="goodInfo.chosedFare" class="select-item">
          <el-option v-for="item in fareOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <button class="btn-fare-list">运费模板列表</button>
      </div>
      <!-- 商品标签 -->
      <div class="prodect-tag">商品标签：
        <div class="content">
          <input type="text" name="" id="">
          <span>填写商品卖点，展示在移动端标题下方</span>
        </div>
      </div>
      <!-- 立即上架 -->
      <div class="prodect-grounding">立即上架：
        <div class="content">
          <el-switch class="tableScopeSwitch" v-model="goodInfo.groundingValue" active-color="#1890FF">
          </el-switch>
          <span class="isRecommend">是否推荐：</span>
          <el-switch class="tableScopeSwitch" v-model="goodInfo.recommendValue" active-color="#1890FF">
          </el-switch>
          <span class="remarks">被推荐的商品会显示在店铺首页</span>
        </div>
      </div>
      <div class="submit">

        <button class="but-submit">提交</button>
      </div>

    </div>

  </div>
  </div>
</template>

<script>
  import edit from '../unit/edit.vue'
  import DragUpload from '../unit/DragUpload'; // 引入vue-draggable
  export default {
    components: {
      DragUpload,
      edit
    },
    data() {
      return {
        //商品信息
        goodInfo: {
          chooseClassify: '', //选择的类目【拼接字符串】
          chosedData: [], //选择的类目
          chosedDegree: '', //选择的新旧程度
          chosedXS: '1', //选择的销售方式
          chosedShelfLife: '1', //选择的保质期【年、月、日】
          chosedFare: "1", //选择的运费模板
          groundingValue: true, //是否立即上架
          recommendValue: false, //是否推荐
        },
        //是否允许输入价格
        isEditPriceFlag: true,
        //运费模板
        fareOptions: [{
          value: '1',
          label: '当面交易'
        }, {
          value: '2',
          label: '线上交易'
        }],
        // 销售类型
        xsOptions: [{
            value: '1',
            label: '在线销售'
          },
          {
            value: '2',
            label: '咨询议价'
          }
        ],
        //新旧程度
        newOrOrdDegreeOptions: [{
            value: '1',
            label: '一成新'
          },
          {
            value: '2',
            label: '两成新'
          },
          {
            value: '3',
            label: '三成新'
          },
          {
            value: '4',
            label: '四成新'
          },

          {
            value: '5',
            label: '五成新'
          },
          {
            value: '6',
            label: '六成新'
          },
          {
            value: '7',
            label: '七成新'
          },
          {
            value: '8',
            label: '八成新'
          },
          {
            value: '9',
            label: '九成新'
          },
          {
            value: '10',
            label: '十成新'
          }
        ],
        //保质期类型【日、月、年】
        shelfLifeOptions: [{
            value: '1',
            label: '日'
          },
          {
            value: '2',
            label: '月'
          },
          {
            value: '3',
            label: '年'
          }
        ],
        ruleForm: {
          imgUrl: '',
          trialImgs: [],
        },
      }
    },
    mounted() {
      this.getParams()
    },
    methods: {
      getParams() {
        var chosedDataString = this.$route.query.chosedData
        this.goodInfo.chosedData = JSON.parse(chosedDataString)
        this.goodInfo.chooseClassify = this.goodInfo.chosedData[0].name
        if (this.goodInfo.chosedData[1].name != '') {
          this.goodInfo.chooseClassify += " > " + this.goodInfo.chosedData[1].name
          if (this.goodInfo.chosedData[2].name != '') {
            this.goodInfo.chooseClassify += " > " + this.goodInfo.chosedData[2].name
          }
        }
      },
      back() {
        this.$router.back()
      },
      //当选择“咨询议价”时，商品价格禁止输入
      isEditPrice() {
        console.log("this.isEditPriceFlag",this.isEditPriceFlag)
        if (this.goodInfo.chosedXS == 2) {
          this.isEditPriceFlag = false
        } else {
          this.isEditPriceFlag = true
        }
         console.log("this.isEditPriceFlag",this.isEditPriceFlag)
      },
      //返回上一步
      preStep() {
        this.$router.replace({
          path: '/addGoods',
          query: {
            chosedData: JSON.stringify(this.goodInfo.chosedData)
          }
        })
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

  // 编辑商品区域
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

    // 产品类目
    .classifyTitle {
      margin-right: 30px;

      span {
        margin-left: 30px;
        color: #1890FF;
      }
    }

    .item-name-brand {
      margin-top: 30px;
      display: flex;
      justify-content: flex-start;
      // flex-wrap: wrap;

      .item,
      .item2 {
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
      .item2{
        margin-right: 10px;
      }

      input {
        margin-left: 30px;
        width: 260px;
        height: 34px;
        background: #FFFFFF;
        border-radius: 4px 4px 4px 4px;
        border: 1px solid #EBEEF5;
        outline: none;
        box-sizing: border-box;
      }

      .item2 {
        margin-left: 100px;
      }
    }
  }

  // 产品规格
  .product-specs {
    margin-top: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 12px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #333333;

    .choose-item {
      margin-left: 30px;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;

      .item:first-child {
        border-radius: 4px 0px 0px 4px;
      }

      .item:last-child {
        border-radius: 0px 4px 4px 0px;
      }

      .item {
        width: 160px;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px solid #EBEEF5;
        box-sizing: border-box;

        .title {
          height: 35px;
          width: 100%;
          box-sizing: border-box;
          border-bottom: 1px solid #EBEEF5;
        }

        .content {
          flex: 1;
        }

        .title,
        .content {
          height: ;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input {
          height: 32px;
          width: 100px;
          box-sizing: border-box;
          border-radius: 4px 4px 4px 4px;
          border: 1px solid #EBEEF5;
          outline: none;
          text-align: center;
          font-size: 12px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #333333;

        }

        .el-select {
          width: 100px;
          height: 32px;
          box-sizing: border-box;
        }

        /deep/ .el-input__icon {
          line-height: 32px;
        }

        /deep/ .el-input__inner {
          border-radius: 4px 4px 4px 4px;
          border: 1px solid #EBEEF5;
          font-size: 12px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #333333;
          height: 32px;
          line-height: 32px;
        }

        // 保质期
        .shelf-life {
          input {
            height: 32px;
            width: 70px;
            margin-right: 10px;
            box-sizing: border-box;
          }

          .el-select {
            width: 60px;
            height: 32px;
            box-sizing: border-box;
          }
        }
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

  // 产品详情
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

  // 运费模板
  .prodect-fare {
    margin-top: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 12px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #333333;

    .el-select {
      margin-left: 30px;
      width: 260px;
      height: 34px;
      box-sizing: border-box;

      /deep/ .el-input__inner {
        height: 32px;
        line-height: 32px;
      }

      /deep/ .el-input__icon {
        line-height: 32px;
      }
    }

    .btn-fare-list {
      width: 104px;
      height: 34px;
      background: #1890FF;
      border-radius: 4px;
      margin-left: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      outline: none;
      color: #FFFFFF;
      border: none;
    }
  }

  // 商品标签
  .prodect-tag {
    margin-top: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 12px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #333333;

    .content {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      margin-left: 30px;

      input {
        width: 424px;
        height: 34px;
        background: #FFFFFF;
        border-radius: 4px 4px 4px 4px;
        border: 1px solid #EBEEF5;
      }

      span {
        color: #BBBBBB;
        margin-top: 5px;
      }
    }
  }

  // 立即上架
  .prodect-grounding {
    margin-top: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 12px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #333333;

    .content {
      margin-left: 30px;

      /deep/.el-switch {
        height: 30px;
        width: 78px;
        line-height: 30px;
      }

      /deep/.el-switch__core {
        width: 80px !important;
        height: 30px;
        line-height: 30px;
        border-radius: 60px;
      }

      /deep/.el-switch__core:before {
        position: absolute;
        /*content: url("~@/assets/photo.png");*/
        content: '';
        top: 0px;
        left: 1px;
        font-size: 12px;
        text-align: center;
        border-radius: 100%;
        -webkit-transition: all .3s;
        transition: all .3s;
        width: 0px;
        height: 0px;
        z-index: 2;
      }

      /deep/.el-switch.is-checked .el-switch__core:before {
        left: 100%;
        margin-left: -30px;
        z-index: 2;
        width: 28px;
        height: 28px;
      }

      /deep/.el-switch__core:after {
        width: 28px;
        height: 28px;
      }

      /deep/.el-switch.is-checked .el-switch__core::after {
        margin-left: -30px;
        top: 0px;
      }

      /deep/.el-switch.is-checked .el-switch__core {
        border-color: #7297FF;
        background-color: #7297FF;
      }

      .isRecommend {
        margin-left: 280px;
        margin-right: 30px;
      }

      .remarks {
        margin-left: 12px;
        color: #BBBBBB;
      }
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
