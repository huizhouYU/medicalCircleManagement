<template>
  <div class="content">
    <div class="left">
      <img src="../../../static/img/login/left-bg.png" alt="">
    </div>
    <div class="right">
      <div class="login-content">
        <div class="owl" id="owl" :class="[{password:isHide},'owl']">
          <div class="hand"></div>
          <div class="hand hand-r"></div>
          <div class="arms">
            <div class="arm"></div>
            <div class="arm arm-r"></div>
          </div>
        </div>
        <span class="title">欢迎登录</span>

        <el-form label-position="top" label-width="80px" :model="loginForm" class="login-form">
          <el-form-item label="" class="form-label">
            <el-input v-model="loginForm.username" placeholder="请输入用户名" clearable>
              <template #prefix>
                <div class="prefix"><img src="../../../static/img/login/user.png" alt=""></div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="" class="form-label">
            <el-input v-model="loginForm.password" placeholder="请输入密码" show-password @focus="isHide = true"
              @blur="isHide = false">
              <template #prefix>
                <div class="prefix"><img src="../../../static/img/login/key.png" alt=""></div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="" class="form-label">
            <div class="login-code">
              <el-input v-model="loginForm.verCode" placeholder="请输入验证码" class="login-code-input"></el-input>
              <!-- <div id="v_container" class="v_container"></div> -->
              <canvas id="canvas" width="100" height="40" @click="draw()" style="border-radius: 5px;"></canvas>
            </div>
          </el-form-item>
          <div class="eg-pass">
            <el-checkbox label="记住密码" v-model="isRememberPass"></el-checkbox>
            <ul>
              <li @click="remberpass()">忘记密码？</li>
              <li @click="register()">立即注册</li>
            </ul>
          </div>
          <el-button type="primary" round class="login-btn" @click="login">登录</el-button>
        </el-form>
        <!-- 选择一下方式登录 -->
        <div class="other">
          <span>无需注册，选择一下方式登录</span>
          <ul>
            <li><img src="../../../static/img/login/QQ.png" alt="QQ登录" @click="otherLogin(1)"></li>
            <li><img src="../../../static/img/login/weixin.png" alt="微信登录" @click="otherLogin(2)"></li>
            <li><img src="../../../static/img/login/zfb.png" alt="支付宝登录" @click="otherLogin(3)"></li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {
    GVerify
  } from '../../assets/js/verifyCode.js'
  export default {
    data() {
      return {
        isRememberPass: false, //记住密码
        isHide: false,
        loginForm: {
          username: '',
          password: '',
          verCode: ''
        },
        verifyCode: '',
        show_num: ''
      }
    },
    mounted() {
      this.draw();
      this.getCookie()
    },
    created() {
      //设置点击回车键直接登录
      document.onkeydown = (e) => {
        var e = event || window.event;
        if (e && e.keyCode == 13) {
          this.login();
        }
      }
    },
    methods: {

      draw() {
        this.show_num = [];
        var canvas_width = document.getElementById('canvas').clientWidth;
        var canvas_height = document.getElementById('canvas').clientHeight;
        var canvas = document.getElementById("canvas"); //获取到canvas的对象，演员
        var context = canvas.getContext("2d"); //获取到canvas画图的环境，演员表演的舞台
        canvas.width = canvas_width;
        canvas.height = canvas_height;
        var sCode =
          "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0,q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,z,x,c,v,b,n,m";
        var aCode = sCode.split(",");
        var aLength = aCode.length; //获取到数组的长度

        for (var i = 0; i <= 3; i++) {
          var j = Math.floor(Math.random() * aLength); //获取到随机的索引值
          var deg = Math.random() * 30 * Math.PI / 180; //产生0~30之间的随机弧度
          var txt = aCode[j]; //得到随机的一个内容
          this.show_num[i] = txt;
          var x = 10 + i * 20; //文字在canvas上的x坐标
          var y = 20 + Math.random() * 8; //文字在canvas上的y坐标
          context.font = "bold 23px 微软雅黑";

          context.translate(x, y);
          context.rotate(deg);

          context.fillStyle = this.randomColor();
          context.fillText(txt, 0, 0);

          context.rotate(-deg);
          context.translate(-x, -y);
        }
        for (var i = 0; i <= 5; i++) { //验证码上显示线条
          context.strokeStyle = this.randomColor();
          context.beginPath();
          context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
          context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
          context.stroke();
        }
        for (var i = 0; i <= 30; i++) { //验证码上显示小点
          context.strokeStyle = this.randomColor();
          context.beginPath();
          var x = Math.random() * canvas_width;
          var y = Math.random() * canvas_height;
          context.moveTo(x, y);
          context.lineTo(x + 1, y + 1);
          context.stroke();
        }
      },
      //得到随机的颜色值
      randomColor() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return "rgb(" + r + "," + g + "," + b + ")";
      },
      // 验证验证码的函数
      checkCode() {
        if (this.loginForm.verCode.length <= 0) {
          this.$message.error('请输入验证码！')
          return false
        }
        var num = this.show_num.join("");
        var val = this.loginForm.verCode;
        if (val == num) {
          return true
        } else {
          this.$message.error('验证码输入错误！')
          this.loginForm.verCode = '';
          this.draw();
          return false
        }
      },
      // 登录
      login() {
        if (this.loginForm.username === '' && this.loginForm.password === '') {
          this.$message.error('用户名和密码不能为空！')
          return ''
        }
        if (!this.checkCode()) {
          return ''
        }
        //是否记住密码
        if (this.isRememberPass) {
          this.setCookie(this.loginForm.username, this.loginForm.password, 7)
        } else {
          this.clearCookie();
        }

        // this.$http.post('login', this.loginForm).then(res => {
        //   console.log(res)
        //   // 对象结构赋值
        //   const {data, meta: {msg, status}} = res.data
        //   if (msg === 200) {
        //     // 登录成功 跳转首页
        //     this.$router.push({
        //       name: 'home'
        //     })
        //   }
        // })
        // 假设用户名和密码正确
        localStorage.setItem('token', '11111') //保存一个token值
        // 登录成功 跳转首页
        this.$router.push({
          name: 'home'
        })
      },
      async newlogin() {
        if (this.loginForm.username === '' && this.loginForm.password === '') {
          this.$message.error('用户名和密码不能为空！')
          return ''
        }
        const res = await this.$http.post('login', this.loginForm)
        // 对象结构赋值
        const {
          data,
          meta: {
            msg,
            status
          }
        } = res.data
        if (msg === 200) {
          // 保存token值
          localStorage.setItem('token', data.token)
          // 登录成功 跳转首页
          this.$router.push({
            name: 'home'
          })
        }
      },
      getCookie() {
        if (document.cookie.length > 0) {
          var arr = document.cookie.split(";");
          for (var i = 0; i < arr.length; i++) {
            var userKey = arr[i].split("=");
            if (userKey[0].trim() == "userName") {
              this.loginForm.username = userKey[1];
            } else if (userKey[0].trim() == "userPws") {
              this.loginForm.password = userKey[1];
            } else if (userKey[0].trim() == "isRemember") {
              this.isRememberPass = Boolean(userKey[1]);
            }
          }
        }
      },
      //存储
      setCookie(userName, userPws, days) {
        var curDate = new Date();
        curDate.setTime(curDate.getTime() + 24 * 60 * 60 * 1000 * days); //设置cookie存储的有效时间
        window.document.cookie = "userName" + "=" + userName + ";path=/;expires=" + curDate.toGMTString();
        window.document.cookie = "userPws" + "=" + userPws + ";path=/;expires=" + curDate.toGMTString();
        window.document.cookie = "isRemember" + "=" + this.isRemember + ";path=/;expires=" + curDate.toGMTString();
      },
      //如果用户不选择记住密码清除cookie
      clearCookie() {
        this.setCookie("", "", -1);
      },
      //忘记密码
      remberpass() {
        alert("正在做呢，催啥？？？");
      },
      //注册
      register() {
        alert("正在做呢，催啥？？？");
      },
      //其他方式登录
      otherLogin(val) {
        alert("催啥？点啥？走走走...")
      }
    }
  }
</script>

<style scoped lang="less">
  .content {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .left,
    .right {
      width: 700px;
      height: 650px;
    }

    .left {
      img {
        width: 100%;
        height: 100%;
      }
    }

    .right {
      display: flex;
      justify-content: center;
      align-items: center;

      .login-content {
        margin-top: 60px;
        position: relative;
        background: #FFFFFF;
        box-shadow: 0px 0px 43px 0px rgba(0, 0, 0, 0.08);
        width: 400px;
        height: 535px;
        padding: 25px 30px 35px 30px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;

        .title {
          font-size: 30px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #333333;
        }

        /deep/ .el-input__prefix {
          top: 2px !important;
        }

        /deep/ .el-input__inner {
          background-color: rgba(230, 247, 255, 0.3);
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #DBDBDB;
        }

        /deep/ .el-input__inner:focus {
          border: 1px solid #1890FF;
        }

        .login-form {
          margin-top: 35px;

          .form-label {
            margin-bottom: 30px;
          }

          //输入验证码
          .login-code {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .login-code-input {
              width: 220px;
            }

            .v_container {
              height: 40px;
            }
          }

          //记住密码+ 忘记密码
          .eg-pass {
            display: flex;
            justify-content: space-between;
            align-items: center;

            /deep/ .el-checkbox__inner {
              border-radius: 8px;
            }

            /deep/ .el-checkbox__label,
            /deep/ .el-checkbox__input.is-checked+.el-checkbox__label {
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #DBDBDB;
            }

            ul {
              display: flex;
              justify-content: center;
              align-items: center;

              li {
                box-sizing: border-box;
                padding: 0 5px;
                font-size: 12px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #1890FF;
                border-right: 1px solid #EEEEEE;
                cursor: pointer;
              }

              li:last-child {
                border: none;
              }
            }
          }

          // 登录
          .login-btn {
            width: 100%;
            border-radius: 10px;
            height: 50px;
            background: #1890FF;
            margin-top: 30px;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #FFFFFF;
          }

        }

      }

      /* 接下来是猫头鹰的样式 */
      .owl {
        width: 211px;
        height: 108px;
        /* 背景图片 */
        background: url("../../../static/img/login/owl-login.png") no-repeat;
        /* 绝对定位 */
        position: absolute;
        top: -100px;
        /* 水平居中 */
        left: 50%;
        transform: translateX(-50%);
      }

      .owl .hand {
        width: 34px;
        height: 34px;
        border-radius: 40px;
        background-color: #39b4ff;
        /* 绝对定位 */
        position: absolute;
        left: 12px;
        bottom: -8px;
        /* 沿Y轴缩放0.6倍（压扁） */
        transform: scaleY(0.6);
        /* 动画过渡 */
        transition: 0.3s ease-out;
      }

      .owl .hand.hand-r {
        left: 170px;
      }

      .owl.password .hand {
        transform: translateX(42px) translateY(-15px) scale(0.7);
      }

      .owl.password .hand.hand-r {
        transform: translateX(-42px) translateY(-15px) scale(0.7);
      }

      .owl .arms {
        position: absolute;
        top: 58px;
        width: 100%;
        height: 41px;
        overflow: hidden;
      }

      .owl .arms .arm {
        width: 40px;
        height: 65px;
        position: absolute;
        left: 20px;
        top: 40px;
        background: url("../../../static/img/login/owl-login-arm.png") no-repeat;
        transform: rotate(-20deg);
        transition: 0.3s ease-out;
      }

      .owl .arms .arm.arm-r {
        transform: rotate(20deg) scaleX(-1);
        left: 158px;
      }

      .owl.password .arms .arm {
        transform: translateY(-40px) translateX(40px);
      }

      .owl.password .arms .arm.arm-r {
        transform: translateY(-40px) translateX(-40px) scaleX(-1);
      }

      /*猫头鹰的样式  结束 */
      .other {
        margin-top: 30px;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #DBDBDB;
        display: flex;
        flex-direction: column;
        align-items: center;

        ul {
          margin-top: 20px;
          display: flex;
          justify-content: center;
          align-items: center;

          li {
            margin: 0px 10px;

            img {
              cursor: pointer;
            }

          }
        }
      }
    }


  }
</style>
