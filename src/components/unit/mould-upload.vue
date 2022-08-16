<template>
    <div>
        <div class="upload-img-box" :style="(width > 0 && height > 0)? 'width:'+width+'px;height:'+height+'px;line-height:'+height+'px' : ''">
            <Icon type="md-add" size="20" v-if="!img" />
            <img :src="img" class="upload-img-url" v-else />
            <input type="file" class="upload-img-file" @change="upload($event)" ref="multifile"/>
            <i-circle :percent="progress" class="upload-process" :size="size ? size : 80" v-if="load"></i-circle>
        </div>
    </div>
</template>

<script>
    export default {
        props: { img_url: {}, file_name: {} , size:{} , width:{}, height:{}},
        data() {
            return {
                img: "",
                load: false,
                progress: 0
            };
        },
        mounted() {
            this.img = this.img_url;
        },
        methods: {
            //选择文件
            upload(e) {
                var file = e.currentTarget.files;
                var that =this;
                var reader = new FileReader();
                reader.onload = function(e) {
                    var data = e.target.result;
                    var image = new Image();
                    image.onload=function(){
                        var width = image.width;
                        var height = image.height;
                        var floatnum = (width/height).toFixed(2);
                        console.log(floatnum);
                        that.fileUpload(file[0]);
                        // if( floatnum == 1.77 || floatnum == 1.78){
                        //     that.fileUpload(file[0]);
                        // }else{
                        //     return that.$message.error('图片比例不正确');
                        // }

                    };
                    image.src = data;
                }
                reader.readAsDataURL(file[0]);
                //
            },
            //上传文件
            fileUpload(img) {
                // if (img == undefined) return false;
                // //获取文件后缀名
                // var arr = img["name"].split(".");
                // var img_type = arr[1];
                // let OSS = require("ali-oss");
                // let client = new OSS({
                //     region: "oss-cn-hangzhou",
                //     //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
                //     accessKeyId: "LTAIWdxCuPiIzLfm",
                //     accessKeySecret: "z1zLih5CgWNkWfuzHj7SbpJKVdME2a",
                //     bucket: "ykp-new"
                // });
                // // client.options.endpoint.protocol = "https:";
                // //获取当前时间
                // var date = new Date();
                // var file_name =
                //     date.getFullYear() +
                //     "/" +
                //     (date.getMonth() + 1) +
                //     "/" +
                //     date.getDate() +
                //     "/" +
                //     date.getHours() +
                //     "_" +
                //     date.getMinutes() +
                //     "_" +
                //     date.getSeconds() +
                //     "_" +
                //     date.getMilliseconds();
                // let filename = this.file_name + file_name + "." + img_type;
                // let res_file = img;
                // let that = this;
                // async function put() {
                //     var fielinput = that.$refs['multifile'];
                //     fielinput.value = '';
                //     try {
                //         //object-name可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
                //         let result = await client
                //             .multipartUpload(filename, res_file, {
                //                 progress: percentage => {
                //                     that.progress = parseInt(percentage * 100);
                //                     console.log('上传进度：'+that.progress);
                //                     //console.log(percentage); // 上传文件进度
                //                 }
                //             })
                //             .then(res => {

                //                 that.img = that.oss_url + res.name;
                //                 that.$emit("change", res.name);
                //                 setTimeout(()=>{that.load = false;},500);
                //                 //that.$emit("change", res.name);
                //             })
                //             .catch(err => {
                //                 setTimeout(()=>{that.load = false;},500);
                //                 return that.$Message.error("文件上传失败");
                //                 //return that.toast(0, "上传失败");
                //             });
                //     } catch (e) {
                //         setTimeout(()=>{that.load = false;},500);
                //         return that.$Message.error("文件上传失败");
                //     }

                // }
                // this.load = true;
                // this.progress = 0;
                // put();
            }
        },
        watch:{
            img_url:{
                handler(v,o){
                    this.img = this.img_url;
                },
                deep : true
            }
        }
    };
</script>

<style scoped>
    .upload-process {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 50%;
        left: 50%;
		transform: translate(-50%,-50%);
    }
    .upload-img-box {
        width: 80px;
        height: 80px;
        background: #f8f8f8;
        text-align: center;
        line-height: 80px;
        border-radius: 5px;
        cursor: pointer;
        position: relative;
        color: #999;
        overflow: hidden;
    }
    .upload-img-url {
        width: 100%;
        height: 100%;
    }
    .upload-img-file {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;
        cursor: pointer;
    }
</style>