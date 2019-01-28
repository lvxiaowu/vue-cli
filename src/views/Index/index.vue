<template>
<!-- 书写格式: scroll类包裹可滚动区域 , 其它区域一般用于固定定位，如底部 button -->
  <div class="index-page">
     <div class="scroll">
        <div>888888</div>
        <div>{{count.num}}</div>
        <button @click="setCount">+++++</button>
        <button @click="jumpPage">跳转页面</button>
    </div>
    <button class="button-wrap">登录按钮</button>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapMutations, mapGetters, mapActions } from 'vuex';
export default {
  name: 'App',
  data() {
    return {};
  },
  created() {
    this.init();
    // load动画是全局的，this.load = true 即可消失
    this.load = true
  },
  computed: {
    ...mapGetters(['count'])
  },
  methods: {
    init() {
     this.$http.post("/news/index", "type=top&key=123456").then(res => {
         console.log("打印：",res);
       });
    },
    jumpPage(){
      this.jump({name:'Hello'})
    },
    setCount() {
      //   this.$setCount({num:4})
      this.$A_setCount({ num: 5 });
      this.$A_setLocation();
    },
    ...mapMutations(['$setCount']),
    ...mapActions(['$A_setCount', '$A_setLocation'])
  },
  components: {}
};
</script>

<style scoped lang="less">
  .button-wrap {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.24rem;
    z-index: 8;
    background-color: #fff;
  }
</style>
