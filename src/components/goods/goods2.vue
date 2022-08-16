<template>
  <div>
    富文本编辑器
    <!-- 富文本编辑器 -->
    <edit class="edit"></edit>
  </div>

</template>

<script>
  import edit from '../unit/edit.vue'
  export default {
    components: {
      edit
    }
  }
</script>

<style scoped lang="less">
  .edit{
    // height: 200px;
  }

</style>
