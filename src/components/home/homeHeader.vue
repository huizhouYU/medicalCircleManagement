<template>
  <div class="header-box">
    <div class="img-box">
      <img src="../../assets/images/logo.png" alt="">
    </div>
    <div class="header-right">
      <div class="w-box">
        <div class="n-box"></div>
      </div>
      <span title="阿里巴巴图标矢量库">阿里巴巴图标矢量库</span>
    </div>

  </div>
</template>

<script>
</script>

<style scoped lang="less">
  .header-box {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 20px;
    box-sizing: border-box;


    .img-box {
      width: 200px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 120px;
        height: 60px;
      }
    }

    .header-right {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    .w-box {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-image: linear-gradient(45deg, #4aa2ff, #33ee68);
      display: flex;
      justify-content: center;
      align-items: center;

      .n-box {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        margin: auto;
        background-color: #fff;

      }
    }

    span {
      display: inline-block;
      font-size: 12px;
      margin-left: 10px;
      color: #999;
      width: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      box-sizing: border-box;
    }
  }
</style>
