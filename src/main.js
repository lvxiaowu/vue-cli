// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router/index';
import store from './store/index';

import VConsole from 'vconsole';
import FastClick from 'fastclick';

//自定义axios
import axios from '@/api/axios';

//公用方法
import '@/basic/global.js';

//指令、过滤器、混合
import directive from '@/extend/directive.js';
import filter from '@/extend/filter.js';
import mixin from '@/extend/mixin.js';

Vue.mixin(filter);
Vue.mixin(directive);
Vue.mixin(mixin);

//默认值：true ，设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = process.env.NODE_ENV === 'production';

Vue.prototype.$http = axios;

//移动端调试
let h = window.location.host;

//非正式服环境
if (h != 'x.xxx.com') {
  // var vc = new VConsole();
  // 在入口处引入模拟的假数据;
  require('@/mock');
}

if ('addEventListener' in document) {
  document.addEventListener(
    'DOMContentLoaded',
    function() {
      FastClick.attach(document.body);
    },
    false
  );
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    routeHistory: [],
    getData: Global.getUrlData()
  },
  router,
  store,
  components: { App },
  template: '<App/>'
});
