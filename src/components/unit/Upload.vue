<template>
  <div>
    <div class="upload-wrap">
    <!-- 编辑/查看时图片显示 -->
      <div ref="ShowImg" v-if="imgUrl">
        <div class="img-wrapper">
          <el-image :src="imgUrl"></el-image>
          <div class="operate-wrap">
            <div class="operate-bg"></div>
            <i class="el-icon-delete del-icon" @click="deleImg()"></i>
            <i class="el-icon-zoom-in preview-icon" @click="handlePreview()"></i>
          </div>
        </div>
      </div>
	  <!-- 新增时 点击上传图片 -->
      <el-upload list-type="picture-card" :multiple='multiple' action="http://upload.qiniu.com/" :data="qiniuUploadForm" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-error="handleImageError" :on-success="handleCoverSuccess" :before-upload="beforeCoverUpload" accept=".gif,.jpeg,.jpg,.JPG,.JPEG,.png,.svg,.ico" title="点击上传">
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>
    <!-- 弹框显示原图 -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="childImg||imgUrl" alt="">
    </el-dialog>
    <!-- 提示性文本 -->
    <div class="row">
      <div slot="tip" class="el-upload__tip" style="line-height:24px;color:#999999">
        <slot name="advise-tip"></slot>
      </div>
    </div>

  </div>
</template>
<script>

export default {
  props: {
    imgUrl: String,
  },
  data() {
    return {
      childImg: '',
      qiniuUploadForm: {}, // 七牛图片的上传对象
      dialogVisible: false,
      multiple: false,
    }
  },
  methods: {
    // 上传图片成功
    handleCoverSuccess(res) {
      this.childImg = "https://XXXX.com/" + res.retInfo;
      this.$emit('childImg', this.childImg);
    },
    // 上传图片失败
    handleImageError(err, file) {
      if (err.status == 614) {
        this.$message.error("七牛云上已存在同名称图片！");
      } else {
        this.$message.error(JSON.stringify(err));
      }
    },
    beforeCoverUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        this.$message.error('图片大小不超过1M');
        return;
      }
      // return api.getQiniuToken().then((res) => { // 这里需要配置自己的七牛云api接口
      //   // 配置上传的七牛token
      //   this.qiniuUploadForm = {
      //     token: res.retInfo,
      //     name: file.name,
      //     key: Math.floor(Math.random() * 10 + 1) + file.name,
      //   };
      // });
    },

    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.childImg = file.url;
      this.$emit('childImg', this.childImg);
      this.dialogVisible = true;
    },
    // 删除图片
    deleImg() {
      this.childImg = '';
      this.$refs.ShowImg.innerHTML = "";
      this.$emit('childImg', this.childImg);
    },
    // 预览
    handlePreview() {
      this.dialogVisible = true;
    },
  },
}
</script>
<style lang="less" scoped>
.upload-wrap {
  max-width: 150px;
  overflow: hidden;
  white-space: nowrap;
  & > div {
    display: inline-block;
    vertical-align: middle;
  }
}
.img-wrapper {
  position: relative;
  margin-right: 20px;
  margin-bottom: 20px;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  width: 148px;
  height: 148px;
  overflow: hidden;
  &:hover {
    .operate-wrap {
      display: block;
    }
  }
}
.operate-wrap {
  display: none;
}
.operate-bg {
  background: #000000;
  width: 148px;
  height: 148px;
  opacity: 0.4;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 8;
}
.del-icon {
  position: absolute;
  top: 0;
  right: 36px;
  font-size: 25px;
  line-height: 142px;
  color: #ffffff;
  z-index: 10;
}
.preview-icon {
  position: absolute;
  top: 0;
  left: 36px;
  font-size: 25px;
  line-height: 142px;
  color: #ffffff;
  z-index: 10;
}
</style>
