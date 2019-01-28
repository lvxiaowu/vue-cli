import { mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data: function() {
    return {
      load: false,
    };
  },
  methods: {
    self(p) {
      window.window.RouterReplace = true;
      this.$router.replace(p);
    },
    self(p, d) {
      const { a, b } = d || {};
      if (b && b == 2) window.RouterDirection = 'back';
      if (b && b == 1) window.RouterDirection = 'forward';
      window.window.RouterReplace = true;
      if (a) window.RouterDirectionLimit = a;
      this.$router.replace(p);
    },
    jump(p) {
      window.RouterReplace = false;
      this.$router.push(p);
    },
    openUrl(u, query) {
      var vm = this,
        query = query || {};
      if (u.indexOf('path:') == 0) {
        var url = u.replace('path:', '');
        vm.openLink({
          path: url,
          query: query
        });
      } else window.location.href = Global.creatUrl(u, query);
    },
    openLink(p, t) {
      var vm = this;
      if (t) {
        const { href } = vm.$router.resolve(p);
        window.location.href = href;
        // window.open(href, '_blank')
      } else {
        vm.$router.push(p);
      }
    },
  },
  watch: {
    load: function() {
      //页面加载loading
      var _this = this
      var JS_page_load = document.getElementById('JS_page_load')
      var JS_page_msk = document.getElementById('JS_page_load_msk')
      if (JS_page_load) {
        if(_this._loadTime) clearTimeout(_this._loadTime)
        if (_this.load){
          JS_page_load.style.display = 'block';
          JS_page_load.classList.add('load-leave')
          _this._loadTime = setTimeout(function(){
            JS_page_load.style.display = 'none';
            JS_page_msk.style.display = 'none';
          },200)
        }else{
          JS_page_load.style.display = 'block';
          JS_page_msk.style.display = 'block';
          JS_page_load.classList.remove('load-leave')
        }
      }
    }
  },
  components: {}
};
