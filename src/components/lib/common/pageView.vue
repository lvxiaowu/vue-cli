<template>
    <transition name="fade">
      <div class=Page_reload v-touch:tap.prevent=pageReload v-if='d'>
        <div class=cont>
          <div class=fail-icon></div>
          <h3>{{d.reloadTitle}}</p>
        </h3>
        <p class=gred>{{d.reloadText}}</p>
        <div class="g-button btn-blue" style="margin-top:24px">点击刷新</div>
      </div>
      ,
      <div class="reload-bottom">{{d.pageNoneTips}}</div>
    </div>
    </transition>
</template>

<script>
export default
{
  name: 'PageViewTips',
  data() {
    return {
      d:null
    }
  },
  props: ['m'],
  watch: {
    'm':function(v){
      if(v) this.d = $.extend(true, {
        reloadTitle: '一定是哪里出错了，才让我们错过',
        reloadText: '点击屏幕刷新',
        // upgradeTitle: '51公积金升级中，让业务申请更高效',
        // upgradeText: '升级不影响业务审核，请耐心等候',
        // upgradeTime: '',
        pageNoneTips: '关注“51公积金管家”公众号或拨打客服电话400-863-5151咨询',
      }, v);
        else this.d=null;
      
    }
  },
  methods: {
    pageReload: function(el, arg) {
      if(this.d&&this.d.reload) this.d.reload()
      else window.location.reload();
      this.d=null
    },
  }
}
</script>
<style scoped lang="less">
.Page_reload{
  position: absolute;
  left: 0;width: 100%;
  top: 0;bottom: 0;
  text-align: center;
  background: #fff;
  z-index: 9999;
  text-align:center;
  font-size:0;
  &:after{
    content:'';
    width:0;
    height:100%;
    display:inline-block;
    vertical-align:middle;
  }
  .cont{
    vertical-align:middle;
    display:inline-block;
    color: #333333;top: -1.4rem;position: relative;
    .fail-icon{
      width: 2.4rem;height:2.4rem;
      margin: 0 auto;margin-bottom: 0.36rem;
      background-repeat: no-repeat;
      background-image: url(//r.51gjj.com/image/static/icon-licai-page-kongsjsb.png);
      background-size: 100% 100%;
    }
    h3{
      color: #999999;font-size: 0.28rem;padding-bottom: 0.12rem;
      span{
        display: none;
      }
    }
    p{
      color: #999999;font-size: 0.24rem;
      span{
        display: none;
      }
    }
    
  }
  .reload-bottom{
    position: absolute;bottom: 0;left: 0;right: 0;
    color: #b9b9b9;font-size: 0.22rem;
    line-height: 0.36rem;padding-bottom: 0.24rem;
  }
  
}
</style>