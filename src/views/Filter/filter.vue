<template>
  <div catch:touchmove>
    <ul class="filter-bar" id="filter-bar" @click="filterMsk=true">
      <li
        v-for="(item,index) in filerData"
        :key="index"
        @click="tabClick(item,index)"
        :class="{cur:getTabCur(item,index),open:tabCur==index}"
        :style="filterStyle"
      >
        <p>{{getTabCurName(item)}}</p>
        <template v-if="item.children&&item.children.length>1">
          <span class="icon" v-if="item.config.mode==='multiple'"></span>
          <em v-else></em>
        </template>
      </li>
    </ul>
    <div class="filter-content" v-if="tabCur>=0" :style="filterTop">
      <template v-for="(fd,listKey) in filerData">
        <div :key="listKey" v-if="tabCur==listKey" class="filter-content-view">
          <div scroll-y class="filter-content-box" v-for="(group,k) in fd.list" :key="k">
            <ul :class="fd.config.tags?'tags':'list'">
              <li
                v-for="(item,key) in group"
                :key="key"
                @click="filterClick(item,fd)"
                :class="{cur:getFilerCur(item,fd)}"
              >
                <p>{{item.name}}</p>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </div>
    <div class="filter-msk" @click="closeMsk" v-if="tabCur>=0" :style="filterTop"></div>
  </div>
</template>
<script>
let throttleOutPut = null;
export default {
  props: {
    config: {
      type: Object,
      default() {
        return null;
      }
    },
    group: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      tabCur: -1,
      filterStyle: {
        width: '33%'
      },
      filterTop: '',
      filerData: [],
      filerDataList: []
    };
  },
  onReady() {
    const barInfo = getApp().globalData.barInfo;
    const top = this.getRem(84) + barInfo.fullHeight;
    this.filterTop = `top:${top}px`;
  },
  created() {
    this.resetData(this.group);
    throttleOutPut = this.throttle(() => {
      const data = {};
      this.filerData.forEach(item => {
        data[item.key] = item.routerPath;
        let _l = this.filerData;
        let a = null;
        item.routerPath.forEach((key, n) => {
          a = _l[key];
          if (_l[key].children) _l = _l[key].children;
        });
        data[item.key] = {
          path: item.routerPath,
          obj: a
        };
      });
      this.$emit('change', data);
    }, 30);
  },
  computed: {
    listStyle() {
      if (this.tabCur && this.filerData && this.filerData[this.tabCur]) {
        return this.filerData[this.tabCur].config.tags ? 'tags' : 'list';
      }
      return 'list';
    }
  },
  methods: {
    throttle(func, wait) {
      let lastTime = null;
      let timeout;
      return function() {
        let context = this;
        let now = new Date();
        // 如果上次执行的时间和这次触发的时间大于一个执行周期，则执行
        if (now - lastTime - wait > 0) {
          // 如果之前有了定时任务则清除
          if (timeout) {
            clearTimeout(timeout);
            timeout = null;
          }
          func.apply(context, arguments);
          lastTime = now;
        } else if (!timeout) {
          timeout = setTimeout(() => {
            // console.log('throttleBar change')
            // 改变执行上下文环境
            func.apply(context, arguments);
          }, wait);
        }
      };
    },
    resetData() {
      const data = this.group;
      const { defaultValue = {} } = this.config;

      const changePath = function(item, val, check) {
        if (item.val === val && check) {
          check(item);
        }
        if (!item.children) return null;
        item.children.map((el, n) => {
          el.pathName = [...[item.pathName], ...[el.name]].join('/');
          const path = JSON.parse(JSON.stringify(item.path || []));
          el.path = [...path, ...[n]];
          el.children = changePath(el, val, check);
          return el;
        });
        return item.children;
      };

      this.filerData = data.map((item, index) => {
        let config = {
          mode: 'single',
          max: 1,
          layer: 1
        };
        item.nameShow = '';
        item.cacheDate = [];
        item.routerPath = [];
        item.path = [];
        item.config = { ...config, ...item.config };
        item.path.push(index);
        item.pathName = [item.name].join('/');
        item.children = changePath(item, defaultValue[item.key], r => {
          // item.children = changePath(item, -1000, r => {
          item.routerPath = r.path;
          item.cacheDate = r.path;
        });
        return item;
      });
      this.$forceUpdate();
      this.filterStyle = { width: `${100 / this.filerData.length}%` };
      console.log('filerData', this.filerData);
    },
    getTabCurName(item) {
      let name = [];
      if (item.routerPath && item.routerPath.length) {
        let list = this.filerData;
        item.routerPath.forEach(key => {
          const o = list[key];
          name.push(o.name);
          list = o.children || [];
        });
      } else {
        name = [item.name];
      }
      if (name.length <= 2) {
        return name.pop();
      } else {
        name.shift();
        // return name.join('/');
        return name.pop();
      }
    },
    getTabCur(item, index) {
      return this.tabCur === index || this.inPath(item.routerPath, item.path);
    },
    getFilerCur(item, root) {
      return this.inPath(root.cacheDate, item.path);
    },
    closeMsk() {
      this.tabCur = -1;
    },
    inPath(routerPath, path) {
      if (!routerPath || !path) return false;
      path = JSON.parse(JSON.stringify(path));
      routerPath = JSON.parse(JSON.stringify(routerPath));
      const index = path.length;
      const a = routerPath.slice(0, index);
      return JSON.stringify(a) === JSON.stringify(path);
    },
    resultChange() {
      if (throttleOutPut) throttleOutPut();
    },
    tabClick(item, index) {
      if (this.filerData[index]) {
        this.tabCur = index;
        this.rebuildList();
      } else {
        return null;
      }
    },
    rebuildList() {
      const index = this.tabCur;
      if (!this.filerData[index]) {
        return false;
      }
      let layer = 1;
      const item = this.filerData[index];
      if (item.config) {
        layer = item.config.layer || 1;
      }
      let list = [];
      if (layer === 1) {
        list = [item.children || []];
      } else {
        if (item.cacheDate.length === 0) {
          let a = item.children || [];
          list.push(a);
        } else {
          let _l = this.filerData;
          item.cacheDate.forEach((key, n) => {
            _l = _l[key].children;
            if (_l) list.push(_l);
          });
        }
      }
      // console.log(list)
      this.filerData[index].list = list;
      this.$forceUpdate();
    },
    filterClick(item, root, f) {
      const { config = {} } = root;
      let { routerPath = [] } = root;
      if (item.children && item.children.length) {
        root.cacheDate = item.path;
        if (f) {
          root.cacheDate = item.path;
          root.routerPath = item.path;
          this.tabCur = -1;
        }
        this.rebuildList();
      } else {
        if (!this.inPath(root.cacheDate, item.path)) {
          root.cacheDate = item.path;
          root.routerPath = item.path;
          this.tabCur = -1;
        } else if (!config.required) {
          root.cacheDate = [];
          root.routerPath = [];
          this.tabCur = -1;
        }
      }
      this.$forceUpdate();
    },
    parentClick(n, m) {
      if (
        this.filerData &&
        this.filerData[n] &&
        this.filerData[n].children[m]
      ) {
        this.tabCur = n;
        this.filterClick(
          this.filerData[n].children[m],
          this.filerData[n],
          true
        );
        this.resultChange();
      }
    }
  },
  watch: {
    group() {
      this.resetData();
    },
    config() {
      this.resetData();
    },
    tabCur(v) {
      if (v === -1) {
        this.resultChange();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.filter-bar {
  width: 100%;
  position: relative;
  z-index: 4;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  li {
    flex: 1;
    line-height: 42px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    box-sizing: border-box;
    p {
      color: #868686;
      font-size: 14px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    em {
      display: inline-block;
      width: 0;
      height: 0;
      border-left: 3px solid transparent;
      border-right: 3px solid transparent;
      border-top: 3px solid #7b7b7b;
      vertical-align: middle;
      margin-left: 3px;
      position: relative;
      top: -0.5px;
      transition: transform 200ms;
    }
    &.cur,
    &.open {
      p {
        color: #f09d38;
      }
      em {
        border-bottom: 0;
        border-top: 3px solid #f09d38;
      }
    }
    &.open {
      em {
        transform: rotateZ(180deg);
      }
    }
  }
}
.filter-content {
  position: absolute;
  z-index: 3;
  top: 42px;
  left: 0;
  right: 0;
  background-color: #fff;
  max-height: 200px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  .filter-content-view {
    display: flex;
    flex-direction: row;
  }
  .filter-content-box {
    max-height: 200px;
  }
  ul {
    overflow: hidden;
    li {
      height: 45px;
      line-height: 45px;
      font-size: 14px;
      color: #868686;
      padding: 0 12px;
      text-align: center;
      p {
        display: inline-block;
        line-height: 22px;
        height: 22px;
      }
      &.cur {
        p {
          color: #f09d38;
          border-bottom: 2px solid #f09d38;
        }
      }
    }

    &.list {
      li {
        position: relative;
      }
    }
  }

  .tags {
    margin: 0 5px;
    padding-top: 12px;
    line-height: 0;
    font-size: 0;
    padding-bottom: 16px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    li {
      padding: 0;
      padding-bottom: 10px;
      height: 30px;
      line-height: 0;
      p {
        height: 30px;
        line-height: 30px;
        color: #999;
        font-size: 12px;
        margin: 0 5px;
        padding: 0 22px;
        text-align: center;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(237, 237, 237, 1);
        border-radius: 2px;
      }
      &.cur {
        p {
          background: rgba(240, 157, 56, 0.1);
          border: 1px solid rgba(240, 160, 61, 1);
          border-radius: 2px;
          color: rgba(240, 157, 56, 1);
        }
      }
    }
  }
  .filter-content-box {
    flex: 1;
    overflow-y: auto;
    transition: all 0.4s;
    &:nth-child(2) {
      background: rgba(251, 251, 251, 1);
    }
    &:nth-child(3) {
      background: rgba(243, 243, 243, 1);
    }
  }
}
.filter-msk {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>