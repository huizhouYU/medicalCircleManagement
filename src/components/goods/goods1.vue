<template>
  <div>
    上传图片（可排序）
    <!-- <draggable-img></draggable-img> -->
    <draggable-imgs></draggable-imgs>

  </div>

</template>

<script>
  import draggableImg from '../unit/draggable_img.vue'
  import draggableImgs from '../unit/draggable_img1.vue'

  export default {
    components:{
      draggableImg,draggableImgs
    }
  }
</script>

<style>

</style>
