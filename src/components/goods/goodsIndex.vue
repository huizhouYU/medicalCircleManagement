<template>
  <div class="content">
    <!-- 头部页面标题 -->
    <div class="header-title">
      <div class="back">
        <i class="iconfont">&#xe610;</i>
      </div>
      <div class="title">商品列表</div>
    </div>
    <!-- 模块二 搜索条件 + 添加商品 -->
    <div class="search-add">
      <!-- 搜索部分 -->
      <div class="search">
        <!-- 商品分类 -->
        <el-cascader v-model="sortValue" placeholder="商品分类" :options="options" @change="handleChange"
          class="choose-store-sort" clearable :filterable="true">
        </el-cascader>
        <!-- <el-select v-model="sortValue" placeholder="商品分类" class="choose-store-sort">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select> -->
        <!-- 商品状态 -->
        <el-select v-model="value" placeholder="商品状态" class="choose-shop-state" clearable>
          <el-option v-for="item in shopStateOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <!-- input 输入关键字  -->
        <div class="input-box">
          <el-input v-model="inputKey" placeholder="请输入商品名称/关键字" class="input-search"></el-input>
          <button class="btn-search" @click="selectData()">
            <img src="../../assets/images/icon_search.png" alt="">
          </button>
        </div>
      </div>
      <!-- 添加商品 -->
      <button class="btn-add" @click="toAddGoods">添加商品 </button>
    </div>
    <!-- 模块三 商品列表 -->
    <goods-items class="items"></goods-items>
  </div>
</template>

<script>
  import GoodsItems from '../goods/goodsItems.vue'
  export default {
    components: {
      GoodsItems
    },
    data() {
      return {
        //商品分类
        options: [{
            value: 'zhinan',
            label: '指南',
            children: [{
              value: 'shejiyuanze',
              label: '设计原则',
              children: [{
                value: 'yizhi',
                label: '一致'
              }, {
                value: 'fankui',
                label: '反馈'
              }, {
                value: 'xiaolv',
                label: '效率'
              }, {
                value: 'kekong',
                label: '可控'
              }]
            }, {
              value: 'daohang',
              label: '导航',
              children: [{
                value: 'cexiangdaohang',
                label: '侧向导航'
              }, {
                value: 'dingbudaohang',
                label: '顶部导航'
              }]
            }]
          }, {
            value: 'zujian',
            label: '组件',
            children: [{
              value: 'basic',
              label: 'Basic',
              children: [{
                value: 'layout',
                label: 'Layout 布局'
              }, {
                value: 'color',
                label: 'Color 色彩'
              }, {
                value: 'typography',
                label: 'Typography 字体'
              }, {
                value: 'icon',
                label: 'Icon 图标'
              }, {
                value: 'button',
                label: 'Button 按钮'
              }]
            }, {
              value: 'form',
              label: 'Form',
              children: [{
                value: 'radio',
                label: 'Radio 单选框'
              }, {
                value: 'checkbox',
                label: 'Checkbox 多选框'
              }, {
                value: 'input',
                label: 'Input 输入框'
              }, {
                value: 'input-number',
                label: 'InputNumber 计数器'
              }, {
                value: 'select',
                label: 'Select 选择器'
              }, {
                value: 'cascader',
                label: 'Cascader 级联选择器'
              }, {
                value: 'switch',
                label: 'Switch 开关'
              }, {
                value: 'slider',
                label: 'Slider 滑块'
              }, {
                value: 'time-picker',
                label: 'TimePicker 时间选择器'
              }, {
                value: 'date-picker',
                label: 'DatePicker 日期选择器'
              }, {
                value: 'datetime-picker',
                label: 'DateTimePicker 日期时间选择器'
              }, {
                value: 'upload',
                label: 'Upload 上传'
              }, {
                value: 'rate',
                label: 'Rate 评分'
              }, {
                value: 'form',
                label: 'Form 表单'
              }]
            }, {
              value: 'data',
              label: 'Data',
              children: [{
                value: 'table',
                label: 'Table 表格'
              }, {
                value: 'tag',
                label: 'Tag 标签'
              }, {
                value: 'progress',
                label: 'Progress 进度条'
              }, {
                value: 'tree',
                label: 'Tree 树形控件'
              }, {
                value: 'pagination',
                label: 'Pagination 分页'
              }, {
                value: 'badge',
                label: 'Badge 标记'
              }]
            }, {
              value: 'notice',
              label: 'Notice',
              children: [{
                value: 'alert',
                label: 'Alert 警告'
              }, {
                value: 'loading',
                label: 'Loading 加载'
              }, {
                value: 'message',
                label: 'Message 消息提示'
              }, {
                value: 'message-box',
                label: 'MessageBox 弹框'
              }, {
                value: 'notification',
                label: 'Notification 通知'
              }]
            }, {
              value: 'navigation',
              label: 'Navigation',
              children: [{
                value: 'menu',
                label: 'NavMenu 导航菜单'
              }, {
                value: 'tabs',
                label: 'Tabs 标签页'
              }, {
                value: 'breadcrumb',
                label: 'Breadcrumb 面包屑'
              }, {
                value: 'dropdown',
                label: 'Dropdown 下拉菜单'
              }, {
                value: 'steps',
                label: 'Steps 步骤条'
              }]
            }, {
              value: 'others',
              label: 'Others',
              children: [{
                value: 'dialog',
                label: 'Dialog 对话框'
              }, {
                value: 'tooltip',
                label: 'Tooltip 文字提示'
              }, {
                value: 'popover',
                label: 'Popover 弹出框'
              }, {
                value: 'card',
                label: 'Card 卡片'
              }, {
                value: 'carousel',
                label: 'Carousel 走马灯'
              }, {
                value: 'collapse',
                label: 'Collapse 折叠面板'
              }]
            }]
          },
          {
            value: 'ziyuan',
            label: '资源',
            children: [{
              value: 'axure',
              label: 'Axure Components'
            }, {
              value: 'sketch',
              label: 'Sketch Templates'
            }, {
              value: 'jiaohu',
              label: '组件交互文档'
            }]
          }
        ],
        //商品状态
        shopStateOptions: [{
          value: '1',
          label: '上架'
        }, {
          value: '2',
          label: '下架'
        }],
        inputKey: '', //输入商品名称/关键字
        value: '',
        sortValue: '', //选择的商品分类
      }
    },
    methods: {
      //添加商品
      toAddGoods() {
        this.$router.push('/addGoods')
      },
      //根据条件筛选数据
      selectData() {
        alert("不要点啦！后台接口数据还没做呢。。。")
      },
      handleChange(value) {
        console.log(value);
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

  // 模块二 搜索条件 + 添加商品
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


      // 本店分类
      // 商品状态
      .choose-store-sort,
      .choose-shop-state {
        width: 112px;
        height: 34px;
        margin: 20px 25px 20px 15px;
        border-radius: 6px 6px 6px 6px;
        // border: 1px solid #EBEEF5;
        box-sizing: border-box;
        font-size: 12px;

        /deep/ .el-input__inner {
          height: 34px;
          line-height: 34px;
        }

        /deep/.el-select-dropdown__item span {
          font-size: 12px;
        }

        /deep/ .el-select-dropdown__empty,
        /deep/.el-input__inner {
          font-size: 12px !important;
        }

        /deep/ .el-input__icon {
          line-height: 34px;
        }
      }

      .choose-shop-state {
        margin-left: 0px;
      }

      .choose-store-sort {
        width: 200px;
      }

      /deep/ .el-cascader {
        line-height: 0px !important;
      }

      // 请输入商品名称/关键字
      .input-box {
        width: 380px;
        height: 34px;
        background: #FFFFFF;
        border-radius: 6px 6px 6px 6px;
        border: 1px solid #EBEEF5;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;

        // input 输入框
        .input-search {
          width: 320px;
          height: 34px;

          /deep/ .el-input__inner {
            height: 34px;
            line-height: 34px;
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

    // 添加商品
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

  // 模块三 商品列表
  .items {
    margin-top: 20px;
  }
</style>
