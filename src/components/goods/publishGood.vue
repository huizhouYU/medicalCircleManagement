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
      <div class="classifyTitle">产品类目：
        <span @click="preStep()">{{chooseClassify}}</span>
      </div>
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
              <el-select v-model="chosedXS" class="select-item">
                <el-option v-for="item in xsOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="item">
            <div class="title">价格</div>
            <div class="content">
              <input type="number" name="" id="" placeholder="请输入商品价格">
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
              <el-select v-model="chosedDegree" class="select-item" placeholder="请选择">
                <el-option v-for="item in newOrOrdDegreeOptions" :key="item.value" :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="item">
            <div class="title">保质期限</div>
            <div class="content">
              <input type="text" name="" id="" placeholder="产品P/N码或识别码">
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        chooseClassify: '',
        chosedData: [],
        chosedDegree:'',//选择的新旧程度
        chosedXS: '1',//选择的销售方式
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


      }
    },
    mounted() {
      this.getParams()
    },
    methods: {
      getParams() {
        this.chosedData = this.$route.query.chosedData
        this.chooseClassify = this.chosedData[0].name
        if (this.chosedData[1].name != '') {
          this.chooseClassify += " > " + this.chosedData[1].name
          if (this.chosedData[2].name != '') {
            this.chooseClassify += " > " + this.chosedData[2].name
          }
        }
      },
      back() {
        this.$router.back()
      },
      //返回上一步
      preStep() {
        this.$router.replace({
          path: '/addGoods',
          query: {
            chosedData: this.chosedData
          }
        })
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
      flex-wrap: wrap;

      .item,
      .item2 {
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }

      input {
        margin-left: 30px;
        width: 300px;
        height: 34px;
        background: #FFFFFF;
        border-radius: 4px 4px 4px 4px;
        border: 1px solid #EBEEF5;
        outline: none;
      }

      .item2 {
        margin-left: 210px;
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
          // height: 32px;
          box-sizing: border-box;
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
      }
    }
  }
</style>
