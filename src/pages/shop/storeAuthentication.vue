<template>
  <div class="box">

    <!-- 第一步:定义出4个步骤 -->
    <div class="steps-content">
      <el-steps :active="active" class="el-steps">
        <el-step title="认证信息" />
        <el-step title="证明材料" />
        <el-step title="联系信息" />
      </el-steps>
    </div>


    <!-- 第二步:定义form表单 -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="100px"
      class="el-form-content ">

      <!-- 认证信息 -->
      <div v-show="active == 1" class="rz-info public-step">
        <div class="item-title">认证信息</div>
        <!-- 主体类型 -->
        <div class="item-both">
          <el-form-item label="主体类型" prop="shopType" class="item-left item-type">
            <el-select v-model="ruleForm.shopType" placeholder="请选择主体类型">
              <el-option v-for="item in shopTypeOption" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <div class="item-right tip">注：主体类型设置后无法更改</div>
        </div>
        <!-- 真实姓名+身份证号码 -->
        <div class="item-both">
          <el-form-item label="真实姓名" prop="username" class="item-left">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="身份证号码" prop="idNo" class="item-right">
            <el-input v-model="ruleForm.idNo"></el-input>
          </el-form-item>
        </div>
        <!-- 店铺名称+所属分类 -->
        <div class="item-both">
          <el-form-item label="店铺名称" prop="shopName" class="item-left">
            <el-input v-model="ruleForm.shopName"></el-input>
          </el-form-item>
          <el-form-item label="所属分类" prop="shopSort" class="item-right">
            <el-select v-model="ruleForm.shopSort" placeholder="请选择所属分类">
              <el-option v-for="item in shopSortOption" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <!-- 所属地区+邮政编码 -->
        <div class="item-both">
          <el-form-item label="所属地区" prop="area" class="item-left">
            <el-select v-model="ruleForm.area" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮政编码" prop="postalCode" class="item-right">
            <el-input v-model="ruleForm.postalCode"></el-input>
          </el-form-item>
        </div>
        <!-- 详细地址 -->
        <div class="item-one">
          <el-form-item label="详细地址" prop="address" class="address-input">
            <el-input v-model="ruleForm.address"></el-input>
          </el-form-item>
        </div>
        <!-- 下一步 -->
        <div class="item-btn">
          <el-button @click="next" class="next-but" type="primary" plain>下一步</el-button>
        </div>

      </div>
      <!-- 证明材料 -->
      <div v-show="active == 2" class="zm-info public-step">
        <div class="item-title">认证信息</div>
        <!-- 上传证件 -->
        <el-form-item label="上传证件" prop="name" class="">
          <div class="img-list">
            <!-- 身份证正面 -->
            <div class="upload-img-item">
              <div v-if="ruleForm.cardFront != ''" class="upload-img card-img" @mouseenter="showCardFrontDiv"
                @mouseleave="hideCardFrontDiv">
                <img :src="ruleForm.cardFront" alt="" class="card-img-info">
                <!-- 预览+删除 -->
                <div class="preview-del-div" v-show="isShowCardFrontDiv">
                  <i class="el-icon-zoom-in"></i>
                  <i class="el-icon-delete"></i>
                </div>
              </div>
              <div class="upload-img" v-else>
                <img src="../../../static/img/sjrz/pic_card_z.png" alt="">
                <span>上传</span>
              </div>


              <div class="remarks">
                <span class="remarks-top">身份证正面</span>
                <span class="remarks-bottom">请上传本人（法人）身份证原件图</span>
              </div>
            </div>
            <!-- 身份证反面 -->
            <div class="upload-img-item">
              <div v-if="ruleForm.cardBack != ''" class="upload-img card-img">
                <img :src="ruleForm.cardBack" alt="" class="card-img-info">
              </div>
              <div class="upload-img" v-else>
                <img src="../../../static/img/sjrz/pic_card_f.png" alt="">
                <span>上传</span>
              </div>
              <div class="remarks">
                <span class="remarks-top">身份证反面</span>
                <span class="remarks-bottom">请上传本人（法人）身份证原件图</span>
              </div>
            </div>
            <!-- 手持身份证 -->
            <div class="upload-img-item">
              <div v-if="ruleForm.cardHold != ''" class="upload-img card-img">
                <img :src="ruleForm.cardHold" alt="" class="card-img-info">
              </div>
              <div class="upload-img" v-else>
                <img src="../../../static/img/sjrz/pic_card_s.png" alt="">
                <span>上传</span>
              </div>
              <div class="remarks">
                <span class="remarks-top">手持身份证</span>
                <span class="remarks-bottom">请上传手持身份证</span>
              </div>
            </div>
            <!-- 其他证件 -->
            <div class="upload-img-item">
              <div v-if="ruleForm.cardOther != ''" class="upload-img card-img">
                <img :src="ruleForm.cardOther" alt="" class="card-img-info">
              </div>
              <div class="upload-img" v-else>
                <img src="../../../static/img/sjrz/pic_card_other.png" alt="">
                <span>上传</span>
              </div>
              <div class="remarks">
                <span class="remarks-top">其他证件</span>
                <span class="remarks-bottom">请上传证件原件图</span>
              </div>
            </div>
          </div>
        </el-form-item>
        <!-- 上一步 下一步 -->
        <div class="item-btn zm-btn-pre-next">
          <el-button @click="pre" class="pre-but">上一步</el-button>
          <el-button @click="next" class="next-but" type="primary" plain>下一步</el-button>
        </div>

      </div>
      <!-- 联系信息 -->
      <div v-show="active == 3" class="lx-info public-step">
        <div class="item-title">联系信息</div>
        <!-- 联系电话 -->
        <el-form-item label="联系电话" prop="phone" class="phone-input">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item label="验证码" prop="vCode" class="vcode-input">
          <el-input v-model="ruleForm.vCode"></el-input>
          <el-button @click="getVcode" class="getVcode-btn" type="primary" plain>获取验证码</el-button>

        </el-form-item>

        <!-- 上一步 下一步 -->
        <div class="item-btn lx-btn-pre-sub">
          <el-button @click="pre" class="pre-but">上一步</el-button>
          <el-button @click="submitForm" class="submit-but" type="primary" plain>确认提交</el-button>
        </div>
      </div>

    </el-form>

    <!-- 第五步:设置上一步和下一步的按钮 -->
    <!-- <el-button v-if="active < 3" @click="next">下一步</el-button> -->
    <!-- <el-button v-if="active > 1" @click="pre">上一步</el-button> -->


  </div>
</template>

<script>
  export default {
    data() {
      return {
        isShowCardFrontDiv: false, //是否展示【身份证正面】隐藏div
        active: 1,
        // 主体类型选项
        shopTypeOption: [{
            value: '1',
            label: '类型一'
          },
          {
            value: '2',
            label: '类型二'
          }
        ],
        // 所属分类选项
        shopSortOption: [{
            value: '1',
            label: '分类一'
          },
          {
            value: '2',
            label: '分类二'
          }
        ],
        ruleForm: {
          shopType: '', //主体类型
          username: '', //姓名
          idNo: '', //身份证号码
          shopName: '', //店铺名称
          shopSort: '', //所属分类
          area: '', //所属地区
          postalCode: '', //邮政编码
          address: '', //详细地址
          cardFront: '1', //身份证正面
          cardBack: '', //身份证反面
          cardHold: '', //手持身份证
          cardOther: '', //其他证件
          phone: '', //联系电话
          vCode: '', //验证码


        },
        rules: {
          shopType: [{
            required: true,
            message: '请选择主体类型',
            trigger: 'change'
          }],
          username: [{
            required: true,
            message: '请输入真实姓名',
            trigger: 'blur'
          }],
          idNo: [{
            required: true,
            message: '请输入身份证号码',
            trigger: 'blur'
          }],
          shopName: [{
              required: true,
              message: '请输入店铺名称',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符',
              trigger: 'blur'
            }
          ],
          phone: [{
            required: true,
            message: '请填写联系电话',
            trigger: 'blur'
          }],
          vCode: [{
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }],

        }
      }
    },
    methods: {
      showCardFrontDiv() {
        this.isShowCardFrontDiv = true
      },
      hideCardFrontDiv() {
        this.isShowCardFrontDiv = false
      },
      // 步骤条下一步的方法
      next() {
        if (this.active++ > 3) this.active = 1
      },
      // 步骤条上一步的方法
      pre() {
        if (this.active-- < 2) this.active = 1
      },
      // 获取验证码
      getVcode() {

      },
      //提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }

    }
  }
</script>

<style scoped lang="less">
  .box {
    height: 100%;
  }

  /deep/.el-step__line {
    background: transparent;
    border-top: 4px dotted;

    .el-step__line-inner {
      border-width: 0 !important;
    }
  }

  /deep/ .el-step__icon {
    font-size: 12px;
  }

  /deep/ .el-step__title {
    font-size: 12px;
  }


  .steps-content {
    height: 74px;
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #fff;
    box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.06);
    border-radius: 6px 6px 6px 6px;
    box-sizing: border-box;
    padding: 10px 20px;

    .el-steps {
      width: 100%;
    }
  }

  //表单
  .el-form-content {
    width: 100%;
    margin-top: 20px;
    height: calc(100% - 80px);
    font-size: 12px;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;

    // 分步公共样式[高度,背景颜色]
    .public-step {
      height: calc(100% - 20px);
      background-color: #fff;
      border-radius: 6px;
      box-sizing: border-box;
      padding: 20px 15px;
      overflow: auto;
    }

    //分步公共的步骤名称样式
    .item-title {
      border-left: 2px solid #1890FF;
      font-weight: bold;
      color: #1890FF;
      padding-left: 15px;
      margin-bottom: 30px;
    }

    // 分步公共的修改input输入框的高度
    /deep/ .el-input__inner {
      height: 34px;
      line-height: 34px;
    }

    // 分步公共的修改input输入框的字体大小和颜色
    /deep/ .el-input {
      font-size: 12px;
      font-family: Microsoft YaHei-Bold, Microsoft YaHei;
      color: #333333;
    }

    // 分步公共的"上一步","下一步"按钮
    .item-btn {
      display: flex;
      justify-content: center;
      align-items: center;

      .pre-but {
        margin-right: 40px;
      }

      .next-but {}
    }

    // 解决  主体类型  下拉框长度和其他输入框不一致问题
    .item-type {
      padding-right: 82px !important;
    }

    // 认证信息
    .rz-info {
      /deep/ .el-form-item__label {
        font-size: 12px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #333333;
      }

      /deep/ .el-form-item__content {
        line-height: 34px;
        box-sizing: border-box;
      }

      .address-input /deep/ .el-input {
        width: 500px;
      }

      // 一行放两个输入框
      .item-both {
        display: flex;
        justify-content: flex-start;

        /deep/ .el-select {
          width: 100%;
        }

        .item-right,
        .item-left {
          flex: 1;
          padding-right: 70px;
          box-sizing: border-box;
        }

        // 右边的布局
        .item-right {
          margin-left: 30px;
        }

        .tip {
          display: flex;
          align-items: center;
          margin-left: 15px;
          font-size: 12px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
          color: #999999;
          margin-bottom: 28px;
          box-sizing: border-box;
        }
      }

      .item-one,
      .item-both {
        margin-top: 20px;
      }

    }

    // 证明材料
    .zm-info {

      // 四张上传图片列表
      .img-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, 460px);
        justify-content: flex-start;
        grid-row-gap: 40px;
        font-size: 12px;
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #999999;

        // 每一个上传图片
        .upload-img-item {
          display: flex;
          justify-content: flex-start;
          align-items: center;

          //展示已上传的证件照片
          .card-img {
            position: relative;
            border-radius: 4px;

            .card-img-info {
              width: 100%;
              height: 100%;
              border-radius: 4px;
            }

            .preview-del-div {
              position: absolute;
              border-radius: 4px;
              border: 1px solid #EBEEF5;
              box-sizing: border-box;
              width: 100%;
              height: 100%;
              background: rgba(0, 0, 0, 0.4);
              display: flex;
              justify-content: space-around;
              align-items: center;

              i {
                color: #fff;
                font-size: 18px;
              }
            }
          }

          // 左边上传图片
          .upload-img {
            width: 80px;
            height: 80px;
            border-radius: 4px;
            border: 1px solid #EBEEF5;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            img {
              width: 37px;
              height: 37px;
            }

            span {
              height: 20px;
              line-height: 20px;
            }
          }

          // 右边上传图片的说明
          .remarks {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            margin-left: 15px;

            span {
              height: 20px;
              line-height: 20px;
            }

            .remarks-top {
              color: #333333;
            }

            .remarks-bottom {
              color: #999999;
            }
          }
        }
      }

      // 第二步 【证明材料】下面的按钮距离上面的高度
      .zm-btn-pre-next {
        margin-top: 120px;
      }
    }

    //联系信息
    .lx-info {
      .phone-input {
        /deep/ .el-input {
          width: 300px;
        }
      }

      .vcode-input {
        /deep/ .el-form-item__content {
          display: flex;
          align-items: center;
        }

        /deep/ .el-input {
          width: 100px;
        }

        .getVcode-btn {
          margin-left: 30px;
          height: 34px;
          font-size: 12px;
          font-family: Microsoft YaHei-Regular, Microsoft YaHei;
          font-weight: 400;
        }
      }

      .lx-btn-pre-sub {
        margin-top: 200px;
      }
    }
  }
</style>
