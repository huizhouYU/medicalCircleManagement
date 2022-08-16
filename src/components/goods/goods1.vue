<template>
  <div style="margin:40px">
    <el-form :model="ruleForm" ref="ruleForm" label-width="126px">
      <el-row style="width:980px">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-form-item label="上传图片：" prop="imgUrl" class="avatar-item">
              <div class="row">
                <Upload :imgUrl="ruleForm.imgUrl" v-on:childImg="childImgUrl">
                  <p slot="advise-tip">图片大小不超过1M</p>
                </Upload>
              </div>
            </el-form-item>
            <el-form-item label="图片可拖曳排序：" prop="trialImgs">
              <div class="row">
                <DragUpload :allList="ruleForm.trialImgs" v-on:allList="trialImgs">
                </DragUpload>
                <div class="el-upload__tip gray-tip">每张图片大小不超过10M</div>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')" v-show="!edit">保存</el-button>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>

</template>
<script>
import Upload from "../unit/Upload.vue";
import DragUpload from '../unit/DragUpload';  // 引入vue-draggable

export default {
  data() {
    return {
      edit:false,
      name: "Home",
      ruleForm: {
        imgUrl: '',
        trialImgs: [],
      },
      dialogImageUrl: '',
      dialogVisible: false,
    };
  },
  components: {
    Upload,
    DragUpload,
  },
  methods: {
    // 上传图片
    childImgUrl(childImg) {
      this.ruleForm.imgUrl = childImg;
    },

    // 图片可拖曳排序
    trialImgs(allList) {
      this.ruleForm.trialImgs = allList
    },
    // 保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.ruleForm) // 所有数据
          let tempRuleForm = JSON.parse(JSON.stringify(this.ruleForm))

          let parmas = {
            "id": this.$route.query.id * 1,
            "imgUrl": tempRuleForm.imgUrl,
            "triaTpicList": tempRuleForm.triaTpicList
          }
          console.log(parmas)
           // api.save(parmas).then((res) => {
           //   console.log(res)
           //   alert(res.msg);
           // })
        } else {
          console.log('保存失败');
          return false;
        }
      });
    },
    // 获取数据
    getDatas() {
      let that = this;
      let id = this.$route.query.id;
      if (id) {
        api.editDatas(id).then(res => {
          if (res.data) {
            const datas = res.data;
            that.ruleForm = {
              "imgUrl": datas.imgUrl,
              "trialImgs": datas.trialImgs,
            }
            console.log(that.ruleForm)
          }
        })
      }
    },
  }
}
</script>
