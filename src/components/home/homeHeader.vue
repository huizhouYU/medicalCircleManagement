<template>
  <div class="header-box">
    <div class="img-box">
      <!-- <img src="../../assets/images/logo.png" alt=""> -->
    </div>
    <div class="header-right">
      <span :title="username">{{username}}</span>
      <img src="../../assets/images/icon_logout.png" alt="" title="退出" @click="unLogin">
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        username:'欢迎您，迅即影像网络'
      }
    },
    methods:{
      unLogin(){
        localStorage.removeItem("token");
        this.$router.replace("/Login")
      }
    }
  }
</script>

<style scoped lang="less">
  .header-box {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 75px;
    box-sizing: border-box;


    .img-box {
      width: 210px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 125px;
        height: 42px;
      }
    }

    .header-right {
      display: flex;
      justify-content: space-around;
      align-items: center;
      img{
        width: 18px;
        height: 18px;
        cursor: pointer;
      }
    }


    span {
      display: inline-block;
      width: 105px;
      height: 16px;
      font-size: 12px;
      margin-right: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      box-sizing: border-box;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      color: #333333;
    }
  }
</style>
