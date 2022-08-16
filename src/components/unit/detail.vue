<template>
  <div v-loading="loading">
    <quill-editor
      :options="quillOption"
      ref="myQuillEditor"
      @ready="onEditorReady($event)"
      v-model="detail"
      class="detai-editer"
    ></quill-editor>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import quillConfig from '../../assets/js/quill-config.js'

export default {
  components: { quillEditor },
  props:{ active_id : {}  ,is_edit:{}},
  data() {
    return {
      editorOption: {
        placeholder: "请输入跑团章程",
        theme: "snow" // or 'bubble'
      },
      quillOption: quillConfig,
      detail : '',
      loading : false
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  mounted(){
    // if(this.active_id > 0) this.getData();
  },
  methods: {
    // getData(){
    //   this.loading = true;
    //   this.ajaxs('active/getDetailInfo',{
    //     data:{ id : this.active_id },
    //     success:(res) => {
    //       this.detail = res.msg;
    //       this.loading = false;
    //     }
    //   });
    // },
    onEditorReady(editor) {}
  },
  watch:{
      detail:{
          handler(v,o){
              this.$emit('change',v);
          },
          deep:true
      }
  }
};
</script>

<style>
.detai-editer{
  height: 400px;
  margin-bottom:80px;
}
</style>
