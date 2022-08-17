<template>
  <div>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" height="500"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="id" label="产品编码" width="120"></el-table-column>
      <el-table-column label="商品圈" width="120">
        <template slot-scope="scope">
          <!-- <img :src="scope.row.imgUrl" alt="图片加载失败"> -->
          <img src="../../assets/images/img/brand03.jpg" alt="图片加载失败" class="item-img">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名称" width="120"></el-table-column>
      <el-table-column prop="sort" label="商品分类" width="120"></el-table-column>
      <el-table-column prop="brand" label="品牌" width="120"></el-table-column>
      <el-table-column prop="price" label="价格" width="120"></el-table-column>
      <el-table-column prop="stock" label="库存" width="120"></el-table-column>
      <el-table-column label="上架" width="100">
        <template slot-scope="scope">
          <div class="check-div" :class="scope.row.isPut?'checked-put':'unchecked-put'"></div>
        </template>
      </el-table-column>
      <el-table-column label="推荐" width="100">
        <template slot-scope="scope">
          <div class="check-div" :class="scope.row.isRecommend?'checked-put':'unchecked-put'"></div>
        </template>
      </el-table-column>
      <el-table-column prop="isForbid" label="禁售" width="100">
        <template slot-scope="scope">
          <div class="check-div" :class="scope.row.isForbid?'checked-forbid':'unchecked-forbid'"></div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
            编辑
          </el-button>
          <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div> -->
  </div>

</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          id: 12345678910, //商品编码
          imgUrl: '../../assets/images/img/brand03.jpg', //商品圈
          date: '2016-05-03',
          name: '联影核磁共振核磁共振脑部专 业CT专业医器械', //商品名称
          sort: '联影/核磁共振/uMR 870', //商品分类
          address: '上海市普陀区金沙江路 1518 弄',
          brand: '联影', //品牌
          price: '99', //价格
          stock: '999', //库存
          isPut: true, //是否上架
          isRecommend: false, //是否推荐
          isForbid: true, //是否禁售
        },{
          id: 12345678910, //商品编码
          imgUrl: '../../assets/images/img/brand03.jpg', //商品圈
          date: '2016-05-03',
          name: '联影核磁共振核磁共振脑部专 业CT专业医器械', //商品名称
          sort: '联影/核磁共振/uMR 870', //商品分类
          address: '上海市普陀区金沙江路 1518 弄',
          brand: '联影', //品牌
          price: '99', //价格
          stock: '999', //库存
          isPut: true, //是否上架
          isRecommend: false, //是否推荐
          isForbid: true, //是否禁售
        },{
          id: 12345678910, //商品编码
          imgUrl: '../../assets/images/img/brand03.jpg', //商品圈
          date: '2016-05-03',
          name: '联影核磁共振核磁共振脑部专 业CT专业医器械', //商品名称
          sort: '联影/核磁共振/uMR 870', //商品分类
          address: '上海市普陀区金沙江路 1518 弄',
          brand: '联影', //品牌
          price: '99', //价格
          stock: '999', //库存
          isPut: true, //是否上架
          isRecommend: false, //是否推荐
          isForbid: true, //是否禁售
        },{
          id: 12345678910, //商品编码
          imgUrl: '../../assets/images/img/brand03.jpg', //商品圈
          date: '2016-05-03',
          name: '联影核磁共振核磁共振脑部专 业CT专业医器械', //商品名称
          sort: '联影/核磁共振/uMR 870', //商品分类
          address: '上海市普陀区金沙江路 1518 弄',
          brand: '联影', //品牌
          price: '99', //价格
          stock: '999', //库存
          isPut: true, //是否上架
          isRecommend: false, //是否推荐
          isForbid: true, //是否禁售
        },{
          id: 12345678910, //商品编码
          imgUrl: '../../assets/images/img/brand03.jpg', //商品圈
          date: '2016-05-03',
          name: '联影核磁共振核磁共振脑部专 业CT专业医器械', //商品名称
          sort: '联影/核磁共振/uMR 870', //商品分类
          address: '上海市普陀区金沙江路 1518 弄',
          brand: '联影', //品牌
          price: '99', //价格
          stock: '999', //库存
          isPut: true, //是否上架
          isRecommend: false, //是否推荐
          isForbid: true, //是否禁售
        },{
          id: 12345678910, //商品编码
          imgUrl: '../../assets/images/img/brand03.jpg', //商品圈
          date: '2016-05-03',
          name: '联影核磁共振核磁共振脑部专 业CT专业医器械', //商品名称
          sort: '联影/核磁共振/uMR 870', //商品分类
          address: '上海市普陀区金沙江路 1518 弄',
          brand: '联影', //品牌
          price: '99', //价格
          stock: '999', //库存
          isPut: true, //是否上架
          isRecommend: false, //是否推荐
          isForbid: true, //是否禁售
        },{
          id: 12345678910, //商品编码
          imgUrl: '../../assets/images/img/brand03.jpg', //商品圈
          date: '2016-05-03',
          name: '联影核磁共振核磁共振脑部专 业CT专业医器械', //商品名称
          sort: '联影/核磁共振/uMR 870', //商品分类
          address: '上海市普陀区金沙江路 1518 弄',
          brand: '联影', //品牌
          price: '99', //价格
          stock: '999', //库存
          isPut: true, //是否上架
          isRecommend: false, //是否推荐
          isForbid: true, //是否禁售
        },{
          id: 12345678910, //商品编码
          imgUrl: '../../assets/images/img/brand03.jpg', //商品圈
          date: '2016-05-03',
          name: '联影核磁共振核磁共振脑部专 业CT专业医器械', //商品名称
          sort: '联影/核磁共振/uMR 870', //商品分类
          address: '上海市普陀区金沙江路 1518 弄',
          brand: '联影', //品牌
          price: '99', //价格
          stock: '999', //库存
          isPut: true, //是否上架
          isRecommend: false, //是否推荐
          isForbid: true, //是否禁售
        },{
          id: 12345678910, //商品编码
          imgUrl: '../../assets/images/img/brand03.jpg', //商品圈
          date: '2016-05-03',
          name: '联影核磁共振核磁共振脑部专 业CT专业医器械', //商品名称
          sort: '联影/核磁共振/uMR 870', //商品分类
          address: '上海市普陀区金沙江路 1518 弄',
          brand: '联影', //品牌
          price: '99', //价格
          stock: '999', //库存
          isPut: true, //是否上架
          isRecommend: false, //是否推荐
          isForbid: true, //是否禁售
        },{
          id: 12345678910, //商品编码
          imgUrl: '../../assets/images/img/brand03.jpg', //商品圈
          date: '2016-05-03',
          name: '联影核磁共振核磁共振脑部专 业CT专业医器械', //商品名称
          sort: '联影/核磁共振/uMR 870', //商品分类
          address: '上海市普陀区金沙江路 1518 弄',
          brand: '联影', //品牌
          price: '99', //价格
          stock: '999', //库存
          isPut: true, //是否上架
          isRecommend: false, //是否推荐
          isForbid: true, //是否禁售
        },{
          id: 12345678910, //商品编码
          imgUrl: '../../assets/images/img/brand03.jpg', //商品圈
          date: '2016-05-03',
          name: '联影核磁共振核磁共振脑部专 业CT专业医器械', //商品名称
          sort: '联影/核磁共振/uMR 870', //商品分类
          address: '上海市普陀区金沙江路 1518 弄',
          brand: '联影', //品牌
          price: '99', //价格
          stock: '999', //库存
          isPut: true, //是否上架
          isRecommend: false, //是否推荐
          isForbid: true, //是否禁售
        }, ],
        multipleSelection: []
      }
    },

    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      }
    }
  }
</script>
<style scoped lang="less">
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
</style>
