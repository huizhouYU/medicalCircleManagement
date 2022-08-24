<template>
  <div class="">
    <!-- 头部页面标题 -->
    <div class="header-title">
      <div class="back">
        <i class="iconfont">&#xe610;</i>
      </div>
      <div class="title">订单管理</div>
    </div>
    <!-- 搜索栏 -->
    <div class="search-box">
      <!-- 订单状态下拉框 -->
      <el-select v-model="orderStateValue" placeholder="订单状态" class="orderState-div">
        <el-option v-for="item in orderStateOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <!-- 下单时间 -->
      <div class="order-time">
        <span>下单时间：</span>
        <el-date-picker class="el-date-editor-div" v-model="orderTime" type="daterange" align="right" unlink-panels
          start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <el-input v-model="inputKey" placeholder="请输入订单编号/收货人" class="input-search"></el-input>
      <button class="but-search">查询</button>
    </div>
    <!-- 订单列表 -->
    <!-- 自定义表格 -->
    <div class="table-item">
      <table border="0" cellspacing="0" cellpadding="0" width="100%">
        <thead>
          <!-- <th style="width: 2%;"> -->
          <!-- <input id="js-all-checkbox" type="checkbox" @click="checkAll(this)"> -->
          <!-- </th> -->
          <!-- <th style="width: 2%;">
          </th> -->
          <th style="width: 22%;" colspan="2">商品名称</th>
          <th style="width: 12%;">数量</th>
          <th style="width: 12%;">价格</th>
          <th style="width: 12%;">买家</th>
          <th style="width: 12%;">订单状态</th>
          <th style="width: 12%;">实付金额</th>
          <th style="width: 15%;">评价</th>

        </thead>
        <tbody>
          <template v-for="(item,index) in currentPageData">
            <tr class="order-info">
              <td colspan="8">
                <el-checkbox v-model="item.checked" @change="clickCheckbox(index)"></el-checkbox>
                <span>订单编号: {{item.number}}</span>
                <span>下单时间: {{item.orderTime}}</span>
                <span class="payWay-span">支付方式: {{item.payWay}}</span>
                <i class="iconfont">&#xe675;</i>
              </td>
            </tr>
            <tr class="order-detail">
              <td colspan="2" class="img-name-no-td" style="width: 22%;">
                <div class="img-name-no">
                  <img :src="item.imgUrl" alt="">
                  <div class="name-no">
                    <span :title="item.name"> {{item.name}}</span>
                    <span>编号: {{item.goodNo}}</span>
                  </div>
                </div>
              </td>
              <td>{{item.num}}</td>
              <td>￥：{{item.price}}</td>
              <td>{{item.buyer}}</td>
              <td>
                <template v-if="item.OrderStatus==1">买家未付款
                  <div class="orderState-detail">订单详情</div>
                </template>
                <template v-else-if="item.OrderStatus==2">买家已付款
                  <div class="orderState-detail">订单详情</div>
                  <div class="orderState-detail">发货</div>
                </template>
                <template v-else-if="item.OrderStatus==3">商品运输中
                  <div class="orderState-detail">订单详情</div>
                  <div class="orderState-detail">修改发货信息</div>
                </template>
                <template v-else-if="item.OrderStatus==4">交易已完成
                  <div class="orderState-detail">订单详情</div>
                </template>
              </td>
              <td>{{item.orderPrice}}
                <div>(免运费)</div>
                <template v-if="item.OrderStatus==1">
                  <div class="orderState-detail">修改价格</div>
                </template>
              </td>
              <td><span class="evaluate">{{item.evaluate}}</span></td>
            </tr>
          </template>
        </tbody>
      </table>
      <div class="bottoms-box">
        <div class="left">
          <el-checkbox v-model="isAddAllTerminalStatus" @change="allSelectTerminal">全选</el-checkbox>
          <button @click="deleteChoosed" class="pl-delete-btn">
            取消订单
          </button>
        </div>

        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :page-sizes="[1,5,10, 15, 20, 25]" :page-size="pageSize" :current-page.sync="currentPage" :pager-count="5"
          :background="false" layout="total, sizes, prev, pager, next, jumper" :total="totalNum">
        </el-pagination>

      </div>
    </div>


  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        //输入的订单编号/收货人
        inputKey: '',
        //选择的订单状态
        orderStateValue: '',
        // 订单状态
        orderStateOptions: [{
            value: '1',
            label: '待付款'
          },
          {
            value: '2',
            label: '待发货'
          },
          {
            value: '3',
            label: '已发货'
          },
          {
            value: '4',
            label: '已完成'
          }
        ],
        //选择的订单时间
        orderTime: '',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        //总数据内容
        tableData: [],
        isAddAllTerminalStatus: false, //是否全选订单
        pagerCount: 4, //设置页码显示最多的数量
        isAddAllTerminalStatus: false,
        currentPage: 1, //当前页
        totalPage: 0, //总页数
        totalNum: 0, //总条数
        pageSize: 10, //当前显示条数
        currentPageData: [], //当前页显示内容
        multipleSelection: [], //选择的订单编号

      }
    },
    mounted() {
      this.loadData()
    },
    methods: {
      //选择某一个订单
      clickCheckbox(val) {
        if (this.currentPageData[val].checked) {
          this.multipleSelection.push(this.currentPageData[val].number)
        } else {
          var ls_Selection = []
          for (var i = 0; i < this.multipleSelection.length; i++) {
            if (this.multipleSelection[i] != this.currentPageData[val].number) {
              ls_Selection.push(this.currentPageData[val].number)
            }
          }
          this.multipleSelection = ls_Selection;
        }
      },
      // 全选订单
      allSelectTerminal() {
        for (var i = 0; i < this.currentPageData.length; i++) {
          this.currentPageData[i].checked = this.isAddAllTerminalStatus
          this.multipleSelection.push(this.currentPageData[i].number)
        }
        if (!this.isAddAllTerminalStatus) {
          this.multipleSelection = []
        }
      },
      //删除
      deleteChoosed() {
        if(this.multipleSelection.length>0){
          this.$confirm('数据删除后将无法找回, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '模拟数据删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }else{
          this.$message({
            type: 'error',
            message: '请先选择要删除的订单!'
          });
        }
      },
      // 计算页码等
      computeSize() {
        this.totalNum = this.tableData.length
        this.totalPage = Math.ceil(this.totalNum / this.pageSize);
        // 计算得0时设置为1
        this.totalPage = this.totalPage == 0 ? 1 : this.totalPage;
        this.setCurrentPageData();
      },
      // 设置当前页面数据，对数组操作的截取规则为[0~10],[10~20]...,
      setCurrentPageData() {
        let begin = (this.currentPage - 1) * this.pageSize;
        let end = this.currentPage * this.pageSize;
        this.currentPageData = this.tableData.slice(
          begin,
          end
        );
      },
      async loadData() {
        await axios.get("http://localhost:8080/static/testData/orders.json").then(res => {
          console.log(res);
          if (res.status == 200) {
            this.tableData = res.data.ordersData
            console.log(this.tableData)
            console.log(this.tableData.length)
          } else {
            this.$message.error("数据请求失败，请稍后再试！")
          }
          this.computeSize()
        })
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.loadData();
      },
      handleCurrentChange(val) {
        this.setCurrentPageData();
      },

    }


  }
</script>

<style lang="less" scoped>
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

  // 搜索栏
  .search-box {
    margin-top: 15px;
    height: 74px;
    background-color: #fff;
    box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.06);
    border-radius: 6px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 15px;
    box-sizing: border-box;
    font-size: 12px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #333333;

    /deep/ .el-input__inner {
      height: 34px;
      line-height: 34px;
      font-size: 12px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #333333;
    }

    // 订单状态下拉框
    .orderState-div {
      width: 112px;
      height: 34px;
      border-radius: 6px 6px 6px 6px;
      border: 1px solid #EBEEF5;
      outline: none;
      box-shadow: 0px;
      box-sizing: border-box;



      /deep/ .el-input__icon {
        line-height: 34px;
      }

    }

    // 下单时间
    .order-time {
      margin-left: 25px;

      .el-date-editor-div {
        margin-left: 30px;
        width: 250px;
      }

      /deep/ .el-date-editor .el-range-input {
        font-size: 12px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #333333;
      }

      /deep/ .el-date-editor .el-range-separator,
      /deep/ .el-date-editor .el-range__icon {
        font-size: 12px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        line-height: 26px;
      }

      /deep/ .el-date-editor .el-range__close-icon {
        line-height: 28px;
      }
    }

    // 请输入订单编号/收货人
    .input-search {
      width: 220px;
      margin-left: 25px;
    }

    .but-search {
      margin-left: 40px;
      width: 64px;
      height: 34px;
      background: #1890FF;
      border-radius: 6px 6px 6px 6px;
      box-sizing: border-box;
      color: #FFFFFF;
      border: none;
      font-size: 12px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
    }
  }

  //自定义表格
  .table-item {
    min-width: 600px;
    // height: 439px;
    margin-top: 20px;
    background-color: #fff;
    box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.06);
    box-sizing: border-box;
    border-radius: 6px;
    padding: 0px 15px 20px 15px;

    table {
      width: 100%;
      border: none;
      border-collapse: collapse;
      box-sizing: border-box;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #333333;
      font-size: 12px;
      table-layout: fixed;
      border-bottom: 1px solid #EBEEF5;

      //表头
      thead {
        border-bottom: 1px solid #EBEEF5;
        height: 55px;
        box-sizing: border-box;
        font-size: 12px;
        font-family: Microsoft YaHei-Bold, Microsoft YaHei;
        font-weight: bold;
        color: #333333;
        display: flex;
        align-items: center;

        tr {
          display: table;
          width: 100%;
          table-layout: fixed;
        }
      }

      tbody {
        display: block;
        height: 360px;
        width: 100%;
        overflow-y: auto;
        overflow-x: hidden;

        tr {
          display: table;
          width: 100%;
          table-layout: fixed;
        }
      }

      th,
      td {
        border: none;
        text-align: center;
      }

      .order-info {
        height: 40px;

        td {
          text-align: left;
        }

        span {
          margin-right: 30px;
        }
        .payWay-span{
          margin-right: 10px;
        }
        i{
          font-size: 12px;
          color:#333;
          cursor: pointer;
        }
        
      }

      .order-detail:last-child {
        border-bottom: none;
      }

      .order-detail {
        height: 100px;
        border-bottom: 1px solid #EBEEF5;

        .img-name-no-td {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding-bottom: 15px;
        }

        .img-name-no {
          display: flex;
          justify-content: flex-start;

          img {
            width: 70px;
            height: 70px;
            box-sizing: border-box;
          }

          .name-no {
            flex: 1;
            margin-left: 20px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-around;

            span {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }

        .orderState-detail {
          margin: 5px;
          cursor: pointer;
          font-size: 12px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #1890FF;
        }

        // 评价
        .evaluate {
          text-align: center;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
      }
    }

    .bottoms-box {
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .pl-delete-btn {
        margin-left: 20px;
        width: 72px;
        height: 24px;
        background: #FF7575;
        border: none;
        font-size: 12px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #FFFFFF;
      }
    }
  }
</style>
