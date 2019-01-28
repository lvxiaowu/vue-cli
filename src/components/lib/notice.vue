<template>
<div class="product-notice" v-if="show&&m&&m.length" :key="time" >
  <span class="notice-close" v-touch:tap=noticeClose></span>
  <div class="notice-content" v-noticemove  >
    <div class="notice-list">
      <div class="notice-item">
        <p  :style='{"min-width":w+"px"}'>
          <a v-for='item in m' @click='noticeOpen(item)'>{{item.name}}</a>
        </p>
        <p  :style='{"min-width":w+"px"}'>
          <a v-for='item in m' @click='noticeOpen(item)'>{{item.name}}</a>
        </p>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default
{
  data() {
    return {
      time:0,
      show:true,
      mn: this.m,
      w: Global.WH().w - 68
    }
  },
  // props: ['m'],
  props: {
      m:{
        type: Array,
        default:[]
      },
    },
  methods: {
    noticeClose: function() {
      this.show = false;
    },
    noticeOpen(item){
      if(item.url){
        window.location.href=item.url
      }
    }
  },
  watch: {
    m: function() {
      this.time++;
    }
  },
  directives: {
    noticemove: {
      inserted: function(el, binding, vnode) {
        var vm=vnode.context;
        vm.w=$(".notice-content").eq(0).width()
        vm.$nextTick(function() {
          var mw = $(el).width(),
            cw = $(el).find(".notice-list p").eq(0).width(),
            _list = $(el).find(".notice-list");
          if (cw > mw) {
            cw = $(el).find(".notice-list p").eq(0).width();
            var _t = cw * 30 * 375 / Global.WH().w;
            function translate(obj, x) {
              $(obj).css("margin-left", x)
            }
            //设置效果时间
            function setTransition(obj, time) {
              obj.style.webkitTransition = 'all ' + time + 'ms linear';
              obj.style.transition = 'all ' + time + 'ms linear';
              var t = 'all ' + time + 'ms linear';
              $(obj).css({
                webkitTransition: t,
                MsTransition: t,
                msTransition: t,
                MozTransition: t,
                OTransition: t,
                transition: t
              })
            }
            _list.width(2 * cw);
            var obj = _list[0]

            function move() {
              _list.width(2 * cw);
              translate(obj, '-' + cw + 'px')
              setTransition(obj, _t);
              window.setTimeout(function() {
                _list.removeAttr('style');
                move();
              }, _t)

            }
            window.setTimeout(function() {
              move();
            }, 300)
          }

        })
      }
    },
  }
}
</script>
<style lang="less">
@import "~@/assets/ui/common/js.less";
  .product-notice{
  height:0.64rem;
  background: #fff5de;
  color: #ff7800;
  line-height: 0px;
  font-size: 0;
  overflow: hidden;
  position: relative;
  width: 100%;
  text-align: center;
  a {
    color: #ff7800;
    padding:0 12px;
  }
  .notice-close{
    background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYBAMAAAASWSDLAAAAGFBMVEUAAAD/eAD/eAD/eAD/eAD/eAD/eAD/eAC04mkxAAAAB3RSTlMA3R0YBrCvUDilmQAAAF9JREFUGNNjYDFggAJmBwZXIRhHMYXBsFABwmYSFwZiIagEUBRCMIAEISRUAkrBhMA0XALMAAvApMASMCmQBFwKLoHgIJRhGIAwGsNShHNQHYriBRTPoXgbOUBCUIIKAM1iE1PBFe/XAAAAAElFTkSuQmCC');
    height: 0.64rem;width: 0.56rem;
    position: absolute;right: 0;top: 0;
    background-repeat: no-repeat;
    background-size:0.24rem 0.24rem;background-position: center;
  }
  .notice-content{
    position: relative;white-space: nowrap;
    margin: 0  0.48rem;
    overflow: hidden;
  }
  .notice-list{
    display: block;
  }
  .notice-item{
    line-height:0.64rem;font-size: 0.28rem;
    height:0.64rem;width: 5000px;
    p{
      height:0.64rem;white-space: nowrap;vertical-align: top;float: left;
    }
  }
}
/*@keyframes mymove
{
from {transform: translateX(0)}
to {transform: translateX(-50%)}
}

@-webkit-keyframes mymove
{
from {transform: translateX(0)}
to {transform: translateX(-50%)}
}*/
</style>