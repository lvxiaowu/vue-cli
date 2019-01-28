<template>
<div v-if='config&&show'>
<div class="nstslider-title" v-if='title'>{{title}}</div>
<div class="nstSlider-value">{{value|moneyFormat(1)}}{{unit}}</div>
<div class="nstSlider-pannel" ref='nstSlider'>
  <div class="nstSlider">
    <div class="bar" :style='{width: this.process+"%"}'></div>
    <div class="drag-block" :style='{left: this.process+"%"}' v-touchmove='getPoint'></div>
  </div>
</div>
<div class="nstSlider-range">
  <div class="range-l">{{config.min}}</div>
  <div class="range-r">{{config.max}}</div>
</div>
</div>
</template>

<script>
export
default {
  data() {
    return {
      show:false,
      value:0,
      process: 100,
    }
  },
  props: {
    config: {
      type: Object,
      default(){
        return null;
      }
    },
    unit: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  created(){
    var config=this.config;
    console.log(config)
    if(config.min>=0&&config.max>=0&&config.max>config.min){
      this.show=true;
    }
    else{
      this.show=true;
      // alert("nstSlider 配置错误")
    }
    if(!config.value) config.value=config.max;
    if(!config.round) config.round=1;
    this.value=config.value;
    var per=(config.max-config.min);
    this.process=(this.value-config.min)/per*100;
    this.$emit("change",this.value)
  },
  methods: {
    getPoint(el,point,n){
      var pannel=this.$refs.nstSlider,w=pannel.clientWidth,left=n+pannel.offsetLeft,config=this.config;
      left=left>=0?left:0;
      left=left<=w?left:w;
      var p=left/w;
      this.process=p*100;
      this.value=parseInt((p*(config.max-config.min)+config.min)/config.round)*config.round;
      this.$emit("change",this.value)
    }
  },
  directives: {
    touchmove: {
      bind: function(el, b, v) {
        var isTouchPad = (/hp-tablet/gi).test(navigator.appVersion);
        var hasTouch = 'ontouchstart' in window && !isTouchPad;
        var hasTouch = navigator.userAgent.toLowerCase().match(/(iphone|ipod|android|ios)/i);
        var touchStart = hasTouch ? 'touchstart' : 'mousedown';
        var touchMove = hasTouch ? 'touchmove' : 'mousemove';
        var touchEnd = hasTouch ? 'touchend' : 'mouseup';
        var distanceX;
        el.addEventListener(touchStart, function(ev) {
          var point = hasTouch ? ev.touches[0] : ev;
          distanceX = point.clientX - el.offsetLeft;
          ev.preventDefault();
        }, false);
        el.addEventListener(touchMove, function(ev) {
          var point = hasTouch ? ev.changedTouches[0] : ev;
          b.value(el,point,point.clientX - distanceX)
          ev.preventDefault();
        }, false);
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/assets/ui/common/js.less";
.nstslider-title{
  font-size: 14px;
  color: #263038;
  line-height: 20px;
  padding:0 12px;
}
.nstSlider-value{
    font-size: 40px;
    color: #263038;
    text-align: center;
    font-weight: 700;
    line-height: 50px;
}
.nstSlider-pannel {
    margin: 0 8px;
    padding-top: 18px;
    height: 24px;
    position: relative
}

.nstSlider {
    cursor: pointer;
    border-radius: 3px;
    position: relative;
    z-index: 2;
    width: 100%;
    height: 6px;
    background: #bcc0ca;
}

.nstSlider .drag-block {
    position: absolute;top: 50%;z-index: 2;
    width: 42px;
    height: 42px;
    background-image: url(//r.51gjj.com/image/static/icon-nstSlider-mark.png);
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    /*position: relative;*/
    margin-top: -21px;margin-left: -21px;

}
.nstSlider .bar {
    border-radius: 3px;
    position: absolute;
    background: #439df8;
    height: 6px;
    top: 0;
    left: 0;
    background: -webkit-linear-gradient(right,#439df8 0,#7370ff 100%);
    background: linear-gradient(to right,#439df8 0,#7370ff 100%)
}

.nstSlider-range{
  height: 14px;line-height: 14px;font-size: 12px;color: #999999;
  .range-r{float: right;}
  .range-l{float: left;}
}
</style>
