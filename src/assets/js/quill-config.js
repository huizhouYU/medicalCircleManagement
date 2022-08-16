/*富文本编辑图片上传配置*/
const uploadConfig = {
    action: '/admin/goods/upTempImg',  // 必填参数 图片上传地址
    methods: 'POST',  // 必填参数 图片上传方式
    token: '',  // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
    name: 'file',  // 必填参数 文件的参数名
    size: 500,  // 可选参数   图片大小，单位为Kb, 1M = 1024Kb
    accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'  // 可选 可上传的图片格式
};

// toolbar工具栏的工具选项（默认展示全部）
const toolOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean'],
    ['link', 'image', 'video']
];

// toolbar标题
const titleConfig = [
  { Choice: '.ql-insertMetric', title: '跳转配置' },
  { Choice: '.ql-bold', title: '加粗' },
  { Choice: '.ql-italic', title: '斜体' },
  { Choice: '.ql-underline', title: '下划线' },
  { Choice: '.ql-header', title: '段落格式' },
  { Choice: '.ql-strike', title: '删除线' },
  { Choice: '.ql-blockquote', title: '块引用' },
  { Choice: '.ql-code', title: '插入代码' },
  { Choice: '.ql-code-block', title: '插入代码段' },
  { Choice: '.ql-font', title: '字体' },
  { Choice: '.ql-size', title: '字体大小' },
  { Choice: '.ql-list[value="ordered"]', title: '编号列表' },
  { Choice: '.ql-list[value="bullet"]', title: '项目列表' },
  { Choice: '.ql-direction', title: '文本方向' },
  { Choice: '.ql-header[value="1"]', title: 'h1' },
  { Choice: '.ql-header[value="2"]', title: 'h2' },
  { Choice: '.ql-align', title: '对齐方式' },
  { Choice: '.ql-color', title: '字体颜色' },
  { Choice: '.ql-background', title: '背景颜色' },
  { Choice: '.ql-image', title: '图像' },
  { Choice: '.ql-video', title: '视频' },
  { Choice: '.ql-link', title: '添加链接' },
  { Choice: '.ql-formula', title: '插入公式' },
  { Choice: '.ql-clean', title: '清除字体格式' },
  { Choice: '.ql-script[value="sub"]', title: '下标' },
  { Choice: '.ql-script[value="super"]', title: '上标' },
  { Choice: '.ql-indent[value="-1"]', title: '向左缩进' },
  { Choice: '.ql-indent[value="+1"]', title: '向右缩进' },
  { Choice: '.ql-header .ql-picker-label', title: '标题大小' },
  { Choice: '.ql-header .ql-picker-item[data-value="1"]', title: '标题一' },
  { Choice: '.ql-header .ql-picker-item[data-value="2"]', title: '标题二' },
  { Choice: '.ql-header .ql-picker-item[data-value="3"]', title: '标题三' },
  { Choice: '.ql-header .ql-picker-item[data-value="4"]', title: '标题四' },
  { Choice: '.ql-header .ql-picker-item[data-value="5"]', title: '标题五' },
  { Choice: '.ql-header .ql-picker-item[data-value="6"]', title: '标题六' },
  { Choice: '.ql-header .ql-picker-item:last-child', title: '标准' },
  { Choice: '.ql-size .ql-picker-item[data-value="small"]', title: '小号' },
  { Choice: '.ql-size .ql-picker-item[data-value="large"]', title: '大号' },
  { Choice: '.ql-size .ql-picker-item[data-value="huge"]', title: '超大号' },
  { Choice: '.ql-size .ql-picker-item:nth-child(2)', title: '标准' },
  { Choice: '.ql-align .ql-picker-item:first-child', title: '居左对齐' },
  { Choice: '.ql-align .ql-picker-item[data-value="center"]', title: '居中对齐' },
  { Choice: '.ql-align .ql-picker-item[data-value="right"]', title: '居右对齐' },
  { Choice: '.ql-align .ql-picker-item[data-value="justify"]', title: '两端对齐' }
]

const handlers = {
    image: function image() {
        var self = this;

        var fileInput = this.container.querySelector('input.ql-image[type=file]');
        if (fileInput === null) {
            fileInput = document.createElement('input');
            fileInput.setAttribute('type', 'file');
            // 设置图片参数名
            if (uploadConfig.name) {
                fileInput.setAttribute('name', uploadConfig.name);
            }
            // 可设置上传图片的格式
            fileInput.setAttribute('accept', uploadConfig.accept);
            fileInput.classList.add('ql-image');
            // 监听选择文件
            fileInput.addEventListener('change', function () {
                let res_file = fileInput.files[0];
                var arr = res_file["name"].split(".");
                var img_type = arr[1];
                let OSS = require("ali-oss");
                let client = new OSS({
                    region: "oss-cn-hangzhou",
                    //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
                    accessKeyId: "LTAIWdxCuPiIzLfm",
                    accessKeySecret: "z1zLih5CgWNkWfuzHj7SbpJKVdME2a",
                    bucket: "ykp-new"
                });
                // client.options.endpoint.protocol = "https:";
                //获取当前时间
                var date = new Date();
                var file_name =
                    date.getFullYear() +
                    "/" +
                    (date.getMonth() + 1) +
                    "/" +
                    date.getDate() +
                    "/" +
                    date.getHours() +
                    "_" +
                    date.getMinutes() +
                    "_" +
                    date.getSeconds() +
                    "_" +
                    date.getMilliseconds();
                let filename = "/edit/richtext/" + file_name + "." + img_type;
                async function put() {
                    try {
                        //object-name可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
                        let result = await client
                            .multipartUpload(filename, res_file, {
                                progress: (percentage) => {
                                    //文件上传进度
                                }
                            })
                            .then(res => {
                                let length = self.quill.getSelection(true).index;
                                self.quill.insertEmbed(length, 'image', 'https://ykp-new.oss-cn-hangzhou.aliyuncs.com/' + res.name);
                                self.quill.setSelection(length + 1);
                            })
                            .catch(err => {
                                console.log('上传失败');
                            });
                    } catch (e) {
                        console.log('上传失败');
                    }
                }
                put();
                //console.log(fileInput.files[0]);
                // // 创建formData
                // var formData = new FormData();
                // formData.append(uploadConfig.name, fileInput.files[0]);
                // formData.append('object','product');
                // // 如果需要token且存在token
                // if (uploadConfig.token) {
                //     formData.append('token', uploadConfig.token)
                // }
                // // 图片上传
                // var xhr = new XMLHttpRequest();
                // xhr.open(uploadConfig.methods, uploadConfig.action, true);
                // // 上传数据成功，会触发
                // xhr.onload = function (e) {
                //     if (xhr.status === 200) {
                //         var res = JSON.parse(xhr.responseText);
                //         let length = self.quill.getSelection(true).index;
                //         //这里很重要，你图片上传成功后，img的src需要在这里添加，res.path就是你服务器返回的图片链接。
                //         self.quill.insertEmbed(length, 'image', 'https://shop-made.oss-cn-hangzhou.aliyuncs.com/'+res.msg);
                //         self.quill.setSelection(length + 1)
                //     }
                //     fileInput.value = ''
                // };
                // // 开始上传数据
                // xhr.upload.onloadstart = function (e) {
                //     fileInput.value = ''
                // };
                // // 当发生网络异常的时候会触发，如果上传数据的过程还未结束
                // xhr.upload.onerror = function (e) {
                // };
                // // 上传数据完成（成功或者失败）时会触发
                // xhr.upload.onloadend = function (e) {
                //     // console.log('上传结束')
                // };
                // xhr.send(formData)
            });
            this.container.appendChild(fileInput);
        }
        fileInput.click();
    }
};

export default {
    placeholder: '',
    theme: 'snow',  // 主题
    modules: {
        toolbar: {
            container: toolOptions,  // 工具栏选项
            handlers: handlers  // 事件重写
        }
    }
};
