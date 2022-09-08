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
          class="choose-store-sort public-interval" clearable :filterable="true">
        </el-cascader>
        <!-- 商品状态 -->
        <el-select v-model="value" placeholder="商品状态" class="choose-shop-state public-interval" clearable>
          <el-option v-for="item in shopStateOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <!-- input 输入关键字  -->
        <el-input placeholder="请输入关键字" v-model="inputKey" class="input-with-select search-select-input public-interval">
          <el-select v-model="inputKeyType" slot="prepend" placeholder="请选择">
            <el-option v-for="item in inputKeyOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="selectData()"></el-button>
        </el-input>
      </div>
      <!-- 添加商品 -->
      <button class="btn-add " @click="toAddGoods">添加商品 </button>
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
        //搜索关键字类型
        inputKeyOptions: [{
          value: '1',
          label: '产品编码'
        }, {
          value: '2',
          label: '产品名称'
        }],
        inputKeyType: '1', //搜索的关键字的类型
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
    flex-wrap: wrap;

    //公共上下间距
    .public-interval {
      margin: 20px 0px;
    }

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
        box-sizing: border-box;
        font-size: 12px;

        /deep/.el-select-dropdown__item span {
          font-size: 12px;
        }

        /deep/ .el-select-dropdown__empty {
          font-size: 12px !important;
        }
      }

      .choose-shop-state {
        margin-left: 0px;
      }

      /deep/ .el-cascader {
        line-height: 0px !important;
      }

      // 输入关键字
      .search-select-input {
        width: 400px;

        /deep/.el-input {
          width: 110px;
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
            border-radius: 6px 0px 0px 6px;
          }
        }

        // input 输入框
        .input-search {
          width: 320px;
          height: 34px;
          margin-left: -1px;

          /deep/ .el-input__inner {
            border-radius: 0px 6px 6px 0px;
          }
        }

        //搜索按钮
        /deep/.el-input-group__append button.el-button {
          background-color: #1890FF;
          border-color: #1890FF;
          color: #fff;
        }

        /deep/.el-input-group__append {
          border-color: #1890FF;
          overflow: hidden;
        }

        /deep/.el-button {
          line-height: unset;
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
      margin: 20px 20px 20px 15px;
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
