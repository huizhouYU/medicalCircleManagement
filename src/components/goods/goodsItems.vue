<template>
  <div>
    <el-table ref="multipleTable" :data="currentPageData" tooltip-effect="dark" style="width: 100%" height="439"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="id" label="产品编码" width="120"></el-table-column>
      <el-table-column label="商品图" width="100">
        <template slot-scope="scope">
          <!-- <img :src="scope.row.imgUrl" alt="图片加载失败"> -->
          <img src="../../assets/images/img/brand03.jpg" alt="图片加载失败" class="item-img">
        </template>
      </el-table-column>
      <el-table-column label="商品名称" width="200">
        <template slot-scope="scope">
          <span class="goods-name-span" :title="scope.row.name">{{scope.row.name}} </span>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="商品分类" width="200"></el-table-column>
      <el-table-column prop="brand" label="品牌" width="120"></el-table-column>
      <el-table-column prop="price" label="价格" width="100"></el-table-column>
      <el-table-column prop="stock" label="库存" width="100"></el-table-column>
      <el-table-column label="上架" width="100">
        <template slot-scope="scope">
          <el-switch class="tableScopeSwitch" @change="handleStatusChange(scope.$index, scope.row)" active-text="上架"
            inactive-text="下架" v-model="scope.row.isPut">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="推荐" width="100">
        <template slot-scope="scope">
          <el-switch class="tableScopeSwitch" @change="handleStatusChange(scope.$index, scope.row)" active-text="推荐"
            inactive-text="推荐" v-model="scope.row.isRecommend">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="isForbid" label="禁售" width="100">
        <template slot-scope="scope">
          <el-switch class="tableScopeSwitch" @change="handleStatusChange(scope.$index, scope.row)" active-text="禁售"
            inactive-text="禁售" v-model="scope.row.isForbid" active-color="#FF7575">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="editRow(scope.$index, currentPageData)" type="text" size="small">
            编辑
          </el-button>
          <el-button @click.native.prevent="deleteRow(scope.$index, currentPageData)" type="text" size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="bottoms-box">
      <div class="left">
        <el-checkbox v-model="isAddAllTerminalStatus" @change="allSelectTerminal">全选</el-checkbox>
        <button @click="deleteChoosed" class="pl-delete-btn">
          删除
        </button>
      </div>
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :page-sizes="[1,5,10, 15, 20, 25]" :page-size="pageSize" :current-page.sync="currentPage" :pager-count="5"
        :background="false" layout="total, sizes, prev, pager, next, jumper" :total="totalNum">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        pagerCount: 4, //设置页码显示最多的数量
        isAddAllTerminalStatus: false,
        currentPage: 1, //当前页
        totalPage: 0, //总页数
        totalNum: 0, //总条数
        pageSize: 10, //当前显示条数
        tableData: [], //总数据内容
        currentPageData: [], //当前页显示内容
        multipleSelection: []
      }
    },
    created() {

    },
    mounted() {
      this.loadData()

    },
    methods: {
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
        await axios.get("http://192.168.0.110:8080//static/testData/goods.json").then(res => {
          console.log(res);
          if (res.status == 200) {
            this.tableData = res.data.goodsData
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
      allSelectTerminal(e) {
        if (e === true) {
          this.$refs.multipleTable.toggleAllSelection()
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      deleteRow(index, rows) {
        this.$confirm('确定删除 1 个选择项吗？ 删除的选择项将进入回收站中', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          rows.splice(index, 1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      editRow(index, rows) {
        console.log("index", index)
        console.log("rows", rows[index])
        this.$router.replace({
          path: '/publishGood',
          query: {
            eidtData: rows[index]
          }
        })
      },
      //批量删除
      deleteChoosed() {
        if (this.multipleSelection.length > 0) {
          this.$confirm('数据删除后将无法找回, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '请求后台接口删除数据，先暂且算作删除成功？'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除1'
            });
          });
        } else {
          this.$message({
            type: 'info',
            message: '您还没有选择数据，请先选择您要删除的数据？'
          });
        }
      },
      //改变上架状态
      changePutState(index, rows) {
        console.log(rows[index].id)
        rows[index].isPut = !rows[index].isPut;
        //数据提交给后台保存
      },
      //改变推荐状态
      changeRecommendState(index, rows) {
        rows[index].isRecommend = !rows[index].isRecommend;
        //数据提交给后台保存
      },
      //改变禁售状态
      changeForbidState(index, rows) {
        rows[index].isForbid = !rows[index].isForbid;
        //数据提交给后台保存
      },
    }
  }
</script>

<style scoped lang="less">
  .el-table {
    font-size: 12px;
    color: #333333;
  }

  // ----------修改elementui开关的默认样式-----------
  .tableScopeSwitch {
    /deep/.el-switch__label {
      position: absolute;
      display: none;
      color: #fff;
    }

    /*打开时文字位置设置*/
    /deep/.el-switch__label--right {
      z-index: 1;
      right: 20px;
      /*不同场景下可能不同，自行调整*/
    }

    /*关闭时文字位置设置*/
    /deep/.el-switch__label--left {
      z-index: 1;
      left: 20px;
      /*不同场景下可能不同，自行调整*/
    }

    /*显示文字*/
    /deep/.el-switch__label.is-active {
      display: block;
    }

    /deep/ .el-switch__label * {
      font-size: 12px;
    }

    /deep/.el-switch__core,
    /deep/.el-switch.is-checked .el-switch__core {
      width: 55px !important;
    }
  }

  // ----------修改elementui表格的默认样式-----------
  /deep/.el-table__body-wrapper {
    &::-webkit-scrollbar {
      height: 7px;
      width: 7px;
    }

    &::-webkit-scrollbar-track {
      // 轨道颜色
      background-color: #fff;
    }

    &::-webkit-scrollbar-thumb {
      // 滚动块颜色
      background-color: #E6E9ED;
      // border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb:hover {
      // hover高亮
      background-color: #d5d8db;
    }
  }

  // 解决表格固定列问题
  /deep/.el-table__fixed,
  /deep/.el-table__fixed-right {
    height: calc(100% - 7px) !important;
    box-shadow: -5px -2px 10px rgba(0, 0, 0, .12) !important;

    .el-table__fixed-body-wrapper {
      height: calc(100% - 36px) !important;
    }
  }

  // 当表格没有滚动条时
  /deep/.el-table__body-wrapper.is-scrolling-none~.el-table__fixed-right {
    height: 100% !important;
    bottom: 0 !important;
    box-shadow: none !important;
  }

  // 当表格有纵向滚动条时
  /deep/ .el-table--scrollable-y .el-table__fixed-right {
    right: 7px !important;
  }

  // 当表格只有横向滚动条，没有纵向滚动条时
  /deep/.el-table--scrollable-x:not(.el-table--scrollable-y) .el-table__fixed-right {
    right: 0 !important;
  }

  //商品名称
  .goods-name-span {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  // 列表中商品圈图片
  .item-img {
    width: 50px;
    height: 50px;
  }

  .check-div {
    width: 16px;
    height: 16px;
    border-radius: 50%;
  }

  .checked-put {
    background-image: url(../../assets/images/icon_circle_blue.png);
  }

  .unchecked-put {
    background-image: url(../../assets/images/icon_circle_grey.png);
  }

  .checked-forbid {
    background-image: url(../../assets/images/icon_abandon_red.png);
  }

  .unchecked-forbid {
    background-image: url(../../assets/images/icon_abandon_grey.png);
  }

  // 列表底部的部分
  .bottoms-box {
    padding: 20px 50px 25px 15px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;

    .left {
      /deep/ .el-checkbox__label {
        font-size: 12px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #555555;
      }

      //批量删除按钮
      .pl-delete-btn {
        width: 48px;
        height: 24px;
        background: #FF7575;
        border-radius: 4px 4px 4px 4px;
        margin-left: 20px;
        text-align: center;
        line-height: 24px;
        border: none;
        color: #fff;
        font-size: 12px;
      }
    }

    /deep/.el-pagination button,
    .el-pagination span:not([class*=suffix]) {
      font-size: 12px;
      color: #777777;
    }
  }

  //修改页码样式
  .el-pagination.is-background .el-pager li {
    background-color: #fff !important;
    border: 1px solid #f4f4f5;
  }
</style>
