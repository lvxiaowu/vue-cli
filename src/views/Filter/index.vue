<template>
  <div class="page-view">
    <filterBar :group="filerData" :config="config" @change="onChange" ref="filerBar"></filterBar>
  </div>
</template>

<script>
import filterBar from './filter.vue';
import filerData from './options.js';

export default {
  data() {
    return {
      filerData: filerData,
      config: {
        defaultValue: {
          ages: String(3)
        }
      }
    };
  },
  created() {
    this.load = true;
  },
  computed: {},
  methods: {
    getData() {
      console.log('获取筛选数据');
    },
    onChange(r) {
      console.log(r);
      if (r.cats && r.cats.path.length) {
        const item = r.cats.path;
        if (item.length >= 2) this.tabCur = item[1];
      }
      const filterPost = {};
      Object.keys(r).forEach(k => {
        const item = r[k];
        if (item.obj) {
          filterPost[k] = item.obj.value;
        }
      });
      this.filterPost = filterPost;
      this.getData();
    }
  },
  components: { filterBar }
};
</script>

<style scoped lang="less">
.hello-page {
  // min-height:100%;
  background: #ddd;
}
</style>
