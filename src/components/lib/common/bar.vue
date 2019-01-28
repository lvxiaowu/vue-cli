<template>
  <div class="page-title" :class='bar.class' :style='bar.style' >
    <div class="bar-icon">
      <template v-if='bar.quickOnly&&bar.quick'>
        <div class="text" @click='openQuick(bar.quick)'>{{bar.quick.text}}</div>
      </template>
      <template v-else>
        <template v-if='bar.quick2' >
          <div class="text" v-if="bar.quick2.text" :style="'color:'+bar.quick2.color" @click='openQuick(bar.quick2)'>{{bar.quick2.text}}</div>
          <div class="icon" @click='openQuick(bar.quick2)' v-else>
            <img :src="bar.quick2.thumb">
          </div>
        </template>
        <template v-if='bar.quick' >
          <div class="text" v-if="bar.quick.text" :style="'color:'+bar.quick.color" @click='openQuick(bar.quick)'>{{bar.quick.text}}</div>
          <div class="icon" @click='openQuick(bar.quick)' v-else>
            <img :src="bar.quick.thumb">
          </div>
        </template>

      </template>
    </div>
    <div class="bar-back" @click='page_back(1)' v-if='!bar.hideBack'></div>
    <ul class="bar-title-tab" v-if='WebTab.list' :style="bar.tabStyle">
      <li v-for='(item,index) in WebTab.list' :class="{cur:WebTab.tab==index}" @click='item.fn'>{{item.title}}</li>
    </ul>
    <div class="bar-title" v-else>{{$store.state.title}}</div>
  </div>
</template>

<script>
export default
{
  data() {
    return {
      bar:{
        quick:null,
        quick2:null,
        class:"",
        style:"",
        title:""
      },
      WebTab:{
        tab:0,
        list:null
      },
    }
  },
  props:{
    d:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods: {
    openQuick(item) {
      item.onclick()
    },
    tabChange: function(d) {
      if (!d) return []
      var vm = this,
        _t = d["title"].split(","),
        _f = d["tabFun"].split(","),
        _c = Number(d["tab"]) || 0,
        r = [];
      for (let i = 0; i < _t.length; i++) {
        r.push({
          title: _t[i],
          fn() {
            vm.WebTab.tab = i;
            if (_f[i] && window[_f[i]]) window[_f[i]]()
          }
        })
      };
      return r;
    },
    change(a) {

      var vm = this;
      
      vm.setNamorlApp();
      vm.WebTab = {
          tab: 0,
          list: null
        }
      function setBarClass(p) {
        var d = {};
        if ((p && !p.hideBorder) || !p) {
          d.border = true;
        }
        if (p && p.bar && p.bar.iconType) {
          d[("type-" + p.bar.iconType)] = true;
        }
        
        return d;
      }

      function setBarStyle(p) {
        var d = {}
        if (p) {
          if (p.backgroundColor) {
            d["background-color"] = p.backgroundColor;
          }
          if (p.textColor) {
            d["color"] = p.textColor;
          }
        }
        if(!APP.isGjj){d=Object.assign(d,p)}
        return d;
      }
      if (a && a.setWebTab) {
        vm.WebTab = {
          tab: 0,
          list: vm.tabChange(a.setWebTab)
        }
        this.setTitle("");
        APP.action("setWebTab", a.setWebTab);
      }else if(a.title)this.setTitle(a.title);
      if (a && a.bar) {
        APP.action("setNavigationColor", a.bar);
      }
      
      var m = {
        quick: (a.quick && typeof a.quick == "function" && a.quick.call(vm)) || null,
        quick2: (a.quick2 && typeof a.quick2 == "function" && a.quick2.call(vm)) || null,
        style: setBarStyle(a.bar),
        "class": setBarClass(a),
        tabStyle:a.tabStyle,
        hideBack:a.hideBack
      }
      // alert(m.quick)
      if(m.quick)APP.action('quickIcon',m.quick);
      if(m.quick2)APP.action('quickIcon1', m.quick2);
      this.bar = m;
    }
  },
  watch: {
    'd': {
      handler: function(v) {
        this.change(v)
      },
      deep: true
    }
  },
}
</script>
<style lang="less">
    .page-title{
    height: 0.88rem;width: 100%;background-color: #fff;
    z-index: 2;position: relative;
    position: absolute;left: 0;right: 0;top: 0;
    .bar-back{
      width: 0.8rem;
      float: left;
      height: 100%;
      &:after{
        content:"";
        width: 0.22rem;
        height: 0.36rem;
        position: relative;
        top: 0.26rem;
        left: 0.24rem;
        background-image: url(//r.51gjj.com/image/static/tab_icon_back_black.png);
        background-position: center;
        background-size: 100%;
        background-repeat: no-repeat;
        display: block
      }

    }
    &.type-1 .bar-back:after{
      background-image: url(//r.51gjj.com/image/static/tab_icon_back_white.png);
    }
    .bar-title,.bar-title-tab{
      margin: 0 1.64rem;
      text-align: center;
      line-height: 0.88rem;height: 0.88rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 0.36rem;
      text-align: center;

    }
    .bar-title-tab{
      margin: 0 1rem;display: flex;
      li{
        flex:1;position: relative;
        &.cur{
          color: #4678e7;
          &:before{
            display: block;content: " ";
            position: absolute;bottom: 0;width: 0.26rem;height: 0.06rem;
            left: 50%;margin-left: -0.13rem;background: #4678e7;
          }
        }
      }
    }
    .bar-icon{
      float: right;padding-left: 0.12rem;
      padding-top: 0.12rem;
      .icon{
        width: 0.64rem;height: 0.64rem;
        margin-left: 0.12rem;
        display: inline-block;
        img{width: 100%;}
      }
      .text{
        display: inline-block;
        font-size: 0.28rem;height: 0.64rem;line-height: 0.64rem;
        padding-right: 0.24rem;
      }
    }
    &.border{
      box-shadow: 0 1px 15px 0 rgba(41, 41, 41, 0.1);
    }
  }
</style>