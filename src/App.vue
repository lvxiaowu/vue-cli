<template>
  <div id="app" class="page-body">
    <div class="page-view">
      <transition :name="transitionName" @after-enter="transitionComplete">
        <keep-alive>
          <router-view class="page-scroll"></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
export default {
  name: 'App',
  data() {
    return {
      transitionName: ''
    };
  },
  computed: {
    ...mapGetters(['direction'])
  },
  methods: {
    updateDirection(to, from) {
      var router = this.$router;
      var _direction = router.app.$store.state.direction;
      var _transitionName = 'page-forward';
      if (this.$root.routeHistory.length || _direction == 'back') {
        var _page = to;
        if (_direction == 'back') {
          _page = from;
        }
        if (window.RouterDirectionLimit) {
          _transitionName = window.RouterDirectionLimit;
        } else {
          _transitionName =
            _page.meta && _page.meta.animate
              ? _page.meta.animate
              : 'page' + '-' + router.app.$store.state.direction;
        }
      }
      //不需要页面切换动画(如底部tab页面) 或自定义 动画 meta.animate
      // 考虑前进和后退动效一致
      if (to.meta && to.meta.animate) {
        _transitionName = to.meta.animate;
      }
      this.transitionName = _transitionName;
      this.pushHistory(to, true);
    },
    pushHistory: function(h, t) {
      var vm = this;
      if (!window.RouterHistoryLimit && h.name && !h.params.historyLimit) {
        if (window.RouterReplace) {
          var len = this.$root.routeHistory.length;
          if (len) this.$root.routeHistory[len - 1] = h;
        } else this.$root.routeHistory.push(h);
      }
      window.RouterDirection = 'forward';
      window.RouterDirectionLimit = '';
      window.RouterHistoryLimit = false;
      window.RouterReplace = false;
    },
    transitionComplete() {
      this.$store.commit('$setDirection', { direction: 'forward' });
    }
  },
  watch: {
    $route: 'updateDirection'
  }
};
</script>

<style lang="less">
@import '~@/assets/ui/v1/style.less';
.page-scroll {
  background: #f5f5f5;
}
</style>
