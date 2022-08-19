<template>
  <div class="content">
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
    <!-- 第二模块 类目搜索 -->
    <div class="searchSort">
      <span>类目搜索:</span>
      <div class="input-box">
        <el-input v-model="inputKey" placeholder="可输入分类名称" class="input-search"></el-input>
        <button class="btn-search">
          <img src="../../assets/images/icon_search.png" alt="">
        </button>
      </div>
    </div>
    <!-- 第三模块 三级联动 -->
    <div class="multistage-linkage">
      <div class="module-uls">
        <!-- 一级菜单 -->
        <ul class="item-a">
          <li v-for="(item,index) in linkageData" :key="item.id" :class="{'selected':selectIndex.item1 == item.id}"
            @click="chooseItem1(index,item.id)">
            {{item.name}} <i class="iconfont">&#xe62b;</i>
          </li>
        </ul>
        <!-- 二级菜单 -->
        <ul class="item-b" v-show="isShowFlag2">
          <li v-for="(item,index) in item2ChildData" :key="item.id" :class="{'selected':selectIndex.item2 == item.id}"
            @click="chooseItem2(index,item.id)">
            {{item.name}}<i class="iconfont">&#xe62b;</i>
          </li>
        </ul>
        <!-- 三级菜单 -->
        <ul class="item-c" v-show="isShowFlag3">
          <li v-for="(item,index) in item3ChildData" :key="item.id" :class="{'selected':selectIndex.item3 == item.id}"
            @click="chooseItem3(index,item.id)">
            {{item.name}}<i class="iconfont">&#xe62b;</i>
          </li>
        </ul>
      </div>
      <div class="selectedTitle-box">
        <span>您当前选择的是：</span>
        <span class="selectedTitle">{{chooseClassify}}</span>
      </div>
      <div class="next-box">
        <button class="next-btn" @click="nextStep()" :class="{'next-btn-t':isNextFlag}">下一步，发布商品</button>
      </div>
      <!-- 协议明细 -->
      <div class="agreement-box">
        <span>
          特别提醒用户认真阅读本《用户服务协议》(下称《协议》) 中各条款。除非您接受本《协议》条款，否则您无权使用本网站提供的相关服务。您的使用行为将视为对本《协议》的接受，并同意接受本《协议》各项条款的约束。
          一、定义
          "用户"指符合本协议所规定的条件，同意遵守本网站各种规则、条款（包括但不限于本协议），并使用本网站的个人或机构。
          "卖家"是指在本网站上出售物品的用户。"买家"是指在本网站购买物品的用户。
          "成交"指买家根据卖家所刊登的交易要求，在特定时间内提出最优的交易条件，因而取得依其提出的条件购买该交易物品的权利。
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        inputKey: '',
        selectIndex: {
          item1: '-1',
          item2: '-1',
          item3: '-1'
        },
        isNextFlag:false,//是否允许跳转下一步
        chooseClassify: "", //选中的类目 拼接
        chosedData: [{
          id: '',
          name: ''
        }, {
          id: '',
          name: ''
        }, {
          id: '',
          name: ''
        }], //选中的类目
        isShowFlag2: false, //二级菜单是否显示
        isShowFlag3: false, //三级菜单是否显示
        item2ChildData: null, //二级菜单内容
        item3ChildData: null, //三级菜单内容
        //多级联动数据
        linkageData: [],
      }
    },
    mounted() {
      this.loadData()
    },
    methods: {
      async loadData() {
        await axios.get("http://localhost:8080/static/testData/classifyData.json").then(res => {
          console.log(res);
          if (res.status == 200) {
            this.linkageData = res.data.linkageData
          } else {
            this.$message.error("数据请求失败，请稍后再试！")
          }
          if (this.$route.query.chosedData !== undefined) {
            this.chosedData = this.$route.query.chosedData
            this.setData()
          }
        })
      },
      back() {
        this.$router.back()
      },
      // 给选择的类目赋值
      setData() {
        this.chooseClassify = this.chosedData[0].name
        if (this.chosedData[1].name != '') {
          this.chooseClassify += " > " + this.chosedData[1].name
          this.isNextFlag = true
          if (this.chosedData[2].name != '') {
            this.chooseClassify += " > " + this.chosedData[2].name
          }
        }
      },
      //选择一级分类
      chooseItem1(val, id) {
        //将选中的一栏进行标记
        this.selectIndex.item1 = id;
        // 将二级和三级分类选中状态取消
        this.selectIndex.item2 = "-1"
        this.selectIndex.item3 = "-1"
        // 将一级分类选中的数据赋值
        this.chosedData[0].id = id
        this.chosedData[0].name = this.linkageData[val].name
        //清空二级和三级选中的数据
        this.chosedData[1].id = ''
        this.chosedData[1].name = ''
        this.chosedData[2].id = ''
        this.chosedData[2].name = ''
        //调用setData方法，将选中的类目拼接成字符串
        this.setData()
        //根据一级分类动态赋值二级分类
        this.item2ChildData = this.linkageData[val].child
        //只有二级菜单有数据才会显示二级菜单
        if (this.item2ChildData != null && this.item2ChildData.length > 0) {
          this.isShowFlag2 = true
        }
        //没选择二级分类，不展示三级分类
        this.isShowFlag3 = false
      },
      //选择二级分类
      chooseItem2(val, id) {
        //将选中的一栏进行标记
        this.selectIndex.item2 = id
        // 将三级分类选中状态取消
        this.selectIndex.item3 = "-1"
        // 将二级分类选中的数据赋值
        this.chosedData[1].id = id
        this.chosedData[1].name = this.item2ChildData[val].name
        //清空三级选中的数据
        this.chosedData[2].id = ''
        this.chosedData[2].name = ''
        //调用setData方法，将选中的类目拼接成字符串
        this.setData()
        //解决的问题：二级菜单变换，一级菜单选中的菜单样式没变
        this.selectIndex.item1 = this.item2ChildData[0].parentId
        this.item3ChildData = this.item2ChildData[val].child
        //只有三级菜单有数据才会显示三级菜单
        if (this.item3ChildData != null && this.item3ChildData.length > 0) {
          this.isShowFlag3 = true
        }
      },
      //选择三级分类
      chooseItem3(val, id) {
        //将选中的一栏进行标记
        this.selectIndex.item3 = id;
        // 将三级分类选中的数据赋值
        this.chosedData[2].id = id
        this.chosedData[2].name = this.item3ChildData[val].name
        //调用setData方法，将选中的类目拼接成字符串
        this.setData()
        //解决的问题：三级菜单变换，二级菜单选中的菜单样式没变
        this.selectIndex.item2 = this.item3ChildData[0].parentId
        //对应的一级菜单选中样式也得校验
        this.selectIndex.item1 = this.item2ChildData[0].parentId
      },
      //下一步
      nextStep() {
        this.$router.replace({
          path: '/publishGood',
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

  // 第二模块 类目搜索
  .searchSort {
    margin-top: 15px;
    height: 74px;
    background-color: #fff;
    padding: 20px 15px;
    border-radius: 6px 6px 6px 6px;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    span {
      letter-spacing: 1px;
      font-size: 12px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #333333;
      display: inline-block;
      min-width: 60px;
    }

    .input-box {
      margin-left: 30px;
      width: 620px;
      height: 34px;
      display: flex;
      align-items: center;

      // input 输入框
      .input-search {
        width: 560px;
        height: 34px;
        font-size: 12px;

        /deep/ .el-input__inner {
          height: 34px;
          line-height: 34px;
        }

      }

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
      }
    }
  }

  // 第三模块 多级联动
  .multistage-linkage {
    background-color: #fff;
    margin-top: 20px;
    // height: 500px;
    padding: 15px 20px 20px 20px;
    box-sizing: border-box;

    //改变滚动条样式  start
    .item-a::-webkit-scrollbar,
    .item-b::-webkit-scrollbar,
    .item-c::-webkit-scrollbar {
      width: 4px;
    }

    .item-a::-webkit-scrollbar-thumb,
    .item-b::-webkit-scrollbar-thumb,
    .item-c::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: rgba(0, 0, 0, 0.2);
    }

    .item-a::-webkit-scrollbar-track,
    .item-b::-webkit-scrollbar-track,
    .item-c::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 0;
      background: rgba(0, 0, 0, 0.1);
    }

    //改变滚动条样式  end
    .module-uls {
      display: flex;
      justify-content: flex-start;
      height: 374px;

      .item-a,
      .item-b,
      .item-c {
        height: 100%;
        width: 260px;
        padding: 10px 0px;
        border-radius: 10px 10px 10px 10px;
        box-sizing: border-box;
        border: 1px solid #EBEEF5;
        overflow-y: auto;

        li {
          width: 100%;
          height: 32px;
          box-sizing: border-box;
          padding: 0px 10px 0px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #333333;
        }

        li:hover {
          color: #1890FF;
          background-color: #E6F7FF;
        }

        .selected {
          color: #1890FF;
          background-color: #E6F7FF;
        }
      }

      .item-b,
      .item-c {
        margin-left: 7px;

        .selected {
          border-left: 1px solid #1890FF;
        }
      }
    }

    //您当前选择的是
    .selectedTitle-box {
      margin-top: 20px;
      font-size: 12px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #333333;

      .selectedTitle {
        color: #1890FF;
      }
    }

    //下一步，发布商品
    .next-box {
      width: 100%;
      margin-top: 30px;
      display: flex;
      justify-content: center;
      align-items: center;

      .next-btn {
        width: 136px;
        height: 34px;
        background: #bbb;
        border-radius: 6px 6px 6px 6px;
        border: none;
        font-size: 12px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #FFFFFF;
      }
      .next-btn-t{
        background: #1890FF;
      }
    }

    // 协议明细
    .agreement-box {
      margin-top: 40px;
      width: 100%;
      max-height: 140px;
      box-sizing: border-box;
      border-radius: 6px 6px 6px 6px;
      border: 1px solid #EBEEF5;
      padding: 7px 15px;
      overflow-y: auto;
      font-size: 12px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #888888;
    }

  }
</style>
