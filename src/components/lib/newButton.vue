<template>
<div style='margin:0.45rem 0.24rem' class='g-btn' @click='btn_submit'>
  <template v-if='lock'><transition name="fade"><div class="text" >返回</div></transition></template>
  <template v-else>
    <div class="btn-button" :class="status">
      <transition name="fade"><div class="text" style="color:#fff" v-if='!status'><slot></slot>{{text}}</div></transition>
      <transition name="fade"><div v-if='status' class="btn-mark"><div class="btn-icon"></div></div></transition>
    </div>
  </template>
</div>
</template>

<script>
export default
{
  name: 'Button',
  data() {
    return {
      status:"",
      lock:false
    }
  },
  props: {
    text: {
      type: String,
      default:"确定",
    },
    css:{
      type: Object,
      default:function(){
        return {}
      }
    },
    limit:{
      type: Boolean,
      default:true
    }
  },
  mounted(){
    var vm=this;
    console.log("button load")
    if (this.limit) {
      this.$route.meta.police = function(r) {
        if (vm.pageLock) {
          vm.TipMsg("正在请求，请稍等...");
        } else r.continue() //继续
      }
    }
  },
  deactivated(){
    this.pageLock=false;
    console.log("button 移除")
  },
  methods: {
    btn_submit(){
      if(this.lock){
        this.pageBack(1)
      }else{
        this.$emit('change')
      }
    },
    start(p){
      let option=$.extend(true,{
        before(){return 1},//前置 校验
        do(){}
      }, p);

      if(this.lock){
        this.pageBack(1)
        return ;
      }
      if(!option.before()){
        return ;
      }
      if(!this.status){
        this.status="loading";
        this.pageLock=true;
        option.do()
      }else {
        console.log("正在请求中")
      }
    },
    success(c,t){
      var vm=this;
      vm.changeStatus("success",0.5,function(){
        window.setTimeout(function(){if(c) c();vm.pageLock=false;},500)
        vm.changeStatus("",t||2)
      })
    },
    btnLock(t){
      var vm=this;
      window.setTimeout(function(){vm.lock=true;vm.pageLock=false;},(t||0)*1000);
    },
    over(){
      var vm=this;
      vm.changeStatus("",0,function(){
        vm.pageLock=false;
      })
    },
    fail(c,t){
      var vm=this;
      vm.changeStatus("",0.3,function(){
        if(c) c();
        vm.pageLock=false;
        // vm.changeStatus("",t||2);
      })
    },
    changeStatus(s,t,c){
      var vm=this;
      window.setTimeout(function(){
        vm.status=s;
        if(c) c()
      },(t||0.2)*1000)
    },
  }
}
</script>
<style lang="less">
@import "~@/assets/ui/common/js.less";
.btn-button{
  position: relative;height: 100%;width: 100%;
  .btn-mark{
    position: absolute;top: 50%;left: 50%;
    .transform(translate(-50%,-50%));width: 0.48rem;height: 0.48rem;
  }
  .btn-loading,.btn-success,.btn-icon{
    background-repeat: no-repeat;background-size: 100%;display: block;content: " ";
    width: 100%;height: 100%;
    display: none;

  }
  &.loading:before,&.success:before{
    position: absolute;
    content: '';
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color:rgba(255,255,255,0.2);

  }
  &.loading,&.success,&.fail{
    .text{display: none;}
    .btn-icon{display: block;}
  }
  &.loading{
    .btn-icon{
      animation: btnLoading 700ms linear infinite;
      background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAABqCAMAAABj/zSlAAAAXVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9RKvvlAAAAHnRSTlMAjmI4bQhSIbte0vajms6I66ru3tZ3S/qWgDLlw7JeErEdAAACg0lEQVRo3u2aWY7bMAxAqYXxmsTZl8nw/sfsFEWhARKKVCgXU8DvO/HTQtGULPi5hK37Q4TZaHb0gvZcW9NShjbU8mBLIscG7HSkxBlFjgp44Ms4ot+sBFGkQlrORJQN2BW9wZp9CPA86D1WTHPPhi5xbF4/xTOmkSyEZBJVe7LhkimvasjMJq3InCpQBS7YkajqaB68YdlaVR3NhTfMk02FJDFd/67683WyqChLH56jtX9TlfvfELhiY3hDtc10CIEHe61KDokPlGqPqUx14V8LMrFEdWXTmQqcJJUY5yfQMmpVG2HwzIPohZgIUEDQqQ6VTLIq1DLJqiO9INY0kc+E31jVRD4TpxYTr7JOVCAZzy6IXWUTeTYoTCZeZetUIL3K0zOoV+2VKib9HUEPFai0WdauQiEozKo0JZ0xJbWk4cA0C4r4UHbqi2YQEoW9sHCwsLCwsLDwH9FsXR4PpUT3nRumvalIV2ZidgC99jxWhj9secAXd1Kxt9Vru9QCGdCzYmpbV191ZP7tqg8g0hNTiSqYyt1bgSrainhkVEbTjh19V9HELZ4bo7KZ4MJHr6trGjMf65zVJH/3ujMqk6lhdnGMymDC/JJ0c5sOoFOhdfSIglJFK1tEpPCTVbRWmtbyuDgSGBBkcFAcnjsSWWu7xMdErXQb5bBKKkvP1kITBZW6QDtfKMNouFLRe0j4Xvo1KFV24J+p0KCymXiV3SSq4qmSSVTFKh/XBwBRFatcuGhBVsV0RmrgBLIq5RHLhDWKbVeEBBoGj+POpe9o6BJDn0xC+Wivgzf8xvqTShhVhwm+5G1kP0u3XKgYgsmhj5BuzlujCYcwB3j7/H4jx8NP5Rf3uV3baBKRVwAAAABJRU5ErkJggg==');
    }
  }
  &.success{
    .btn-icon{
      animation: successScale 0.5s linear;
      background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAABqCAMAAABj/zSlAAAAQlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////8IX9KGAAAAFXRSTlMALlpiG9QG+djPrMDNuHVDP+CSiE+BhLYqAAABMElEQVRo3u3Ty2rDQAxAUY/tTBy7efQx//+rhRR6lzOgXihBdyvEQQtNWZZlWfbPehzbtpfJ795+2uokN7ff1skJybeQCMuWsGwJy5awZAnLl7B8CcuW6FxtiU66RLMt0dWW6KJLULZEV1uiRZbo3ZaopPTX0uN2+xIl+mjPjqpLb0xl6dSo6BIVXaKiS7T6EpYvYfkSli9hKZ/bt+LSzrhjRaV7Z2eNSxzVs4ISXVrXikpQfSsk0dG6nWtEos82YgUkqm3ICkg0j1kBiZYhaxmV4lZQwvIlLF/C8iUsX8LyJSxfwvIlLF/C8iUsX8LyJSxfwvIlLF/C8iUsX8LyJSxfwvIlLF/C8iUsX8LyJSxfwvIlLF/C8iUsX8LyJSxfwvIlLCS7dXtCe52yLMteqm8qFRJiwmId2AAAAABJRU5ErkJggg==');
    }
  }
  &.fail{
    .btn-icon{
    }
  }
}


@keyframes btnLoading {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes successScale {
  0% {
    transform: scale(3);
  }
  50% {
    transform: scale(0.2);
  }
  70% {
    transform: scale(1.2);
  }
  90% {
    transform: scale(0.7);
  }
  100% {
    transform: scale(1);
  }
}
</style>
