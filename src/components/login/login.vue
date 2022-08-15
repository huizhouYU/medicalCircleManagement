<template>
  <div class="content">
    <div class="login-box">
      <el-form label-position="top" label-width="80px" :model="loginForm" class="login-form">
        <h2>登录</h2>
        <el-form-item label="用户名" class="form-label" >
          <el-input v-model="loginForm.username" placeholder="请输入用户名" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" class="form-label">
          <el-input v-model="loginForm.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="验证码" class="form-label">
          <div class="login-code">
            <el-input v-model="loginForm.verCode" placeholder="请输入验证码" class="login-code-input"></el-input>
            <div id="v_container"></div>
          </div>
        </el-form-item>
        <el-button type="primary" round class="login-btn" @click="login">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  GVerify
} from '../../assets/js/verifyCode.js'
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        verCode: ''
      },
      verifyCode: ''
    }
  },
  mounted () {
    this.verifyCode = new GVerify('v_container')
  },
  methods: {

    // 验证验证码的函数
    checkCode () {
      if (this.loginForm.verCode.length <= 0) {
        this.$message.error('请输入验证码！')
        return false
      }
      var verifyFlag = this.verifyCode.validate(this.loginForm.verCode)
      if (!verifyFlag) {
        this.$message.error('验证码输入有误！')
        this.verifyCode = new GVerify('v_container') // 更新验证码
        this.loginForm.verCode = '' // 清空输入框
        return false
      } else {
        return true
      }
    },
    // 登录
    login () {
      if (this.loginForm.username === '' && this.loginForm.password === '') {
        this.$message.error('用户名和密码不能为空！')
        return ''
      }
      if (!this.checkCode()) {
        return ''
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
    async newlogin () {
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
    }

  }
}
</script>

<style scoped>
  #v_container {
    vertical-align: middle;
    box-sizing: border-box;
    height: 40px;
    width: 100px;
    cursor: pointer;
  }

  .content {
    height: 100%;
    background: url(../../assets/images/login_bg.png) no-repeat;
    background-size: cover;
  }

  .login-box {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .login-form {
    background-color: rgba(255, 255, 255, 0.8);
    width: 400px;
    border-radius: 10px;
    padding: 10px;
    box-sizing: border-box;
  }

  .login-btn {
    width: 100%;
    margin: 20px 0px 10px 0px;
    letter-spacing: 2px;
  }

  a {
    text-decoration: none;
    color: #ff905c;
  }

  a:hover {
    text-decoration: underline;
  }

  .login-code {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .login-code-input {
    margin-right: 10px;
  }

  .el-form-item {
    margin-bottom: 0rem;
  }

  .form-label /deep/ .el-form-item__label {
    padding: 0px;
  }
</style>
