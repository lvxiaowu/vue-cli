<template>
  <div class="page-view">
    <div class="scroll">
      <div class="hello-page"> hello page</div>
      <router-link to="/world">跳转到world 页面</router-link>
      <button @click="backPage">返回</button>
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
      // this.page_back()
      this.$router.back()
    }
  },
  components: {
  }
}
</script>

<style scoped lang="less">
.hello-page{
  background:#ddd;
}
</style>
