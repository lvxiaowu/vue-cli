<template>
    <transition name="fade">
        <div class="Toast" v-if="d.ts" :class="d.class">
            <p v-html="d.m"></p>
        </div>
    </transition>
</template>

<script>
export default {
  name: 'Msg',
  data() {
    return {
      d: {
        m: '',
        t: 0.2,
        ts: false,
        class: 'fail'
      }
    };
  },
  props: ['msg'],
  watch: {
    msg: {
      handler: function(val, oldVal) {
        var _this = this;
        if (val) {
          var d = {
            m: '',
            t: 0.2,
            class: 'fail'
          };
          var _msg = this.msg['m'];
          if (typeof _msg == 'string') {
            d.m = _msg;
          } else {
            d = Object.assign(d, _msg);
          }
          this.d = d;
          if (_this.d.m) {
            _this.d.ts = true;
          }
          if (_this.th) clearTimeout(_this.th);
          if (_this.tm) clearTimeout(_this.tm);
          if (_this.d.m && !!_this.d.t) {
            _this.th = setTimeout(function() {
              _this.d.ts = false;
              _this.tm = setTimeout(function() {
                _this.d.m = '';
              }, 500);
            }, _this.d.t * 1000);
          }
        }
      },
      deep: true
    }
  }
};
</script>