<template>
  <div class="page-view">
    <div class="scroll">
      <div class="hello-page">world</div>
      <button @click="backPage">返回</button>
      <router-link to="/">返回首页</router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapMutations, mapGetters} from 'vuex'

export default {
  name: 'App',
  data() {
    return {

    }
  },
  created() {
    console.log(1)
    this.load = true
  },
  computed: {
  },
  methods: {
    backPage(){
      this.page_back()
    }
  },
  components: {
  }
}
</script>

<style scoped lang="less">
.hello-page{
  // min-height:100%;
  background:#ddd;
}
</style>
