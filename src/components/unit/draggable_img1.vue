<template>
  <div>
    <!-- <div>{{drag?'拖拽中':'拖拽停止'}}</div> -->
    <!--使用draggable组件-->
    <draggable v-model="myArray" chosenClass="chosen" forceFallback="true" group="people" animation="1000"
      @start="onStart" @end="onEnd">
      <transition-group class="tran_group">

       <!-- <div class="item" key="1">
          <img src="../../assets/images/img/brand02.jpg" alt="">
        </div>
        <div class="item" key="2">
          <img src="../../assets/images/img/brand03.jpg" alt="">
        </div>
        <div class="item" key="3">
          <img src="../../assets/images/img/brand04.jpg" alt="">
        </div>
        <div class="item" key="4">
          <img src="../../assets/images/img/brand05.jpg" alt="">
        </div> -->

        <div class="item" v-for="element in myArray" :key="element.id">{{element.url}}</div>
        <!-- <div class="item" v-for="element in myArray" :key="element.id"> -->

        <!-- <el-upload class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload> -->
        <!-- </div> -->
      </transition-group>
    </draggable>
    <!-- 上传图片 -->
    <el-upload ref="elupload" action="" multiple :auto-upload="false" :http-request="handleupload"
      list-type="picture-card" :before-upload="beforeAvatarUpload">
      <i class="el-icon-plus"></i>
    </el-upload>
    <button @click="uploadelupload">点击提交</button>
  </div>
</template>

<script>
  //导入draggable组件
  import draggable from 'vuedraggable'
  export default {
    //注册draggable组件
    components: {
      draggable,
    },
    data() {
      return {
        imageUrl: '',
        drag: false,
        //定义要被拖拽对象的数组
        myArray: [{
            people: 'cn',
            id: 1,
            url: '11'
          },
          {
            people: 'cn',
            id: 2,
            url: '22'
          },
          {
            people: 'cn',
            id: 3,
            url: '33'
          },
          {
            people: 'us',
            id: 4,
            url: '44'
          }
        ]
      };
    },
    methods: {
      //开始拖拽事件
      onStart() {
        this.drag = true;
      },
      //拖拽结束事件
      onEnd() {
        this.drag = false;
      },
      uploadelupload() {
        let formdata = new FormData()
        this.$refs.elupload.submit(); // 这里是执行文件上传的函数，其实也就是获取我们要上传的文件
        this.fileList.forEach(item => {
          formdata.append("file", item) //将每一个文件图片都加进formdata
        })
        formdata.append("score", 4)
        axios.post("接口地址", formdata).then(res => {
          console.log(res)
        })
      },
      handleupload(param) {
        this.fileList.push(param.file); // 一般情况下是在这里创建FormData对象，但我们需要上传多个文件，为避免发送多次请求，因此在这里只进行文件的获取，param可以拿到文件上传的所有信息
      },
      beforeAvatarUpload(file) {
        console.log(file)
        // 使图片显示
        this.imageUrl = URL.createObjectURL(file);
        return false
      }


    },
  };
</script>

<style scoped>
  .tran_group {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /*被拖拽对象的样式*/
  .item {
    padding: 6px;
    background-color: #fdfdfd;
    border: solid 1px #eee;
    margin-bottom: 10px;
    cursor: move;
    width: 150px;
    height: 150px;

  }

  .item img {
    width: 100%;
    height: 100%;
  }

  /*选中样式*/
  .chosen {
    border: solid 2px #3089dc !important;
  }

  /* 上传图片 */
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
