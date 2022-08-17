<template>
  <div>
    品牌分类
    <brand-sort></brand-sort>
    富文本编辑器
    <!-- 富文本编辑器 -->
    <edit class="edit"></edit>
  </div>

</template>

<script>
  import edit from '../unit/edit.vue'
  import brandSort from '../unit/brandSort.vue'
  export default {
    components: {
      edit,brandSort
    }
  }
</script>

<style scoped lang="less">
  .edit{
    // height: 200px;
  }

</style>
