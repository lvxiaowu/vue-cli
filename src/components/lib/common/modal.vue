<template>
<div>
    <transition name="fade">
        <div class="dialog-pop-msk" v-if="mk"></div>
    </transition>
    <transition-group name="DgScale" tag="div"  v-on:after-enter='dialogReady'>
        <div class="dialog-pop" v-for="(item,k) in mg" :key="item.time" v-callEl='item' :class="item.boxClass" v-show="item.show">
            <div class="msk-click" v-touch:tap.prevent="{fn:dialogClose,arg:item}" ></div>
            <div class="pop-info" ref="DialogInfo" :style='setCss()'>
                <dl class="info" :style="item.css"><dt :class="item.class" v-text="item.title" v-if="item.title"></dt>
                    <dd v-if="item.info" v-html="item.info"></dd>
                    <dd class="line" v-for="item in item.row" v-html="item"></dd>
                    <dd class="btn-box" v-if="item.btn&&item.btn.length" :class="'b-'+item.btn.length">
                        <div class="btn" v-for="(_btn,n) in  item.btn" v-text="_btn.text" :class="_btn.class" v-touch:tap.zepto="_btn.fun" v-timeDown='_btn' ></div><span class="bd"></span>
                    </dd>
                </dl>
            </div>
        </div>
    </transition-group>
</div>
</template>

<script>
export default
{
  name: 'modal',
  data() {
    return {
      mg: [],
      mk: false,
    }
  },
  props: ['message'],
  watch: {
    'message': {
      handler: function(val, oldVal) {
        var _this = this;
        var data = _this.message;
        if (data) {
          _this.mk = true;
          for (var i = 0; i < _this.mg.length; i++) {
            _this.mg[i]["show"] = false;
          }
          data.show = true;
          var _d = $.extend({}, {
            time:(new Date()).getTime(),
            "class": "",
            "title": "",
            "info": "",
            "row": [],
            "css": {},
            "btn": null,
            "event": function(o) {},
            ready: function(o) {},
            readySow: function(o) {},
            maskClick: true,
            "destroyed": function(o) {}
          }, data);
          _this.mg=[_d]
          // _this.mg.push(_d);
        } else {
          _this.mk = false;
          _this.mg = [];
        }
      },
      deep: true
    }
  },
  directives: {
    'timeDown': {
      bind: function(el, b, v) {
        var _d = b.value;
        if(_d.time){
          let text=_d.text,time=_d.time,_text;
          $(el).data("elStatus",true)
          function run(){
            _text=text.replace("{s}",time);
            time--;
            if(time<0){
              if(_d.fun&&$(el).data("elStatus")) _d.fun();
              return ;
            }
            $(el).html(_text)
            window.setTimeout(function(){
              run();
            },1000)
          }
          run();
        }
      },
      unbind: function(el, b, v) {
        $(el).data("elStatus",false);
      },
    },
    'callEl': {
      bind: function(el, b, v) {
        var _d = b.value;
        _d.event(el);
        _d.ready(el);
      }
    }
  },
  methods: {
    dialogReady(){
      if(this.mg[0]){
        this.mg[0].readySow()
      }
    },
    setCss:()=>{
      return {
          "max-height":window.screen.height+ "px",
          "overflow-y": "auto"
        }
    },
    dialogClose: function(el, arg) {
      if (arg.maskClick) {
        if (arg.destroyed) arg.destroyed();
        this.$store.commit('$dialogData',null)
        // this.$parent.dialogData = null;
      }
    },
  }
}
</script>
