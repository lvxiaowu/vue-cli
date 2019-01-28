import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/index';
import sys from './sys';
import Routes from './routes';

// 增强原方法，好处是旧的业务模块不需要任何变动
// Router.prototype.go = function(){
//   this.isBack = true
//   window.history.go(-1)
// }

Vue.use(Router);

function getCookie(name) {
  let reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  let res = document.cookie.match(reg);
  return (res && res[2]) || null;
}

const router = new Router({
  mode: 'history',
  // base: `/app`,
  routes: [...Routes, ...sys],
  scrollBehavior(to, from, savedPosition) {
    //页面mounted时候，监听 scroll类的scroll 事件,保存position位置信息到当前路由的meta里面
    // let oScroll = document.querySelector('.scroll')
    //  oScroll.addEventListener('scroll',e => {
    //    this.$router.meta.position = {
    //      x : e.target.scrollLeft,
    //      y: e.target.scrollTop
    //    }
    //  })
    if (to.meta.position) {
      let oScroll = document.querySelector('.scroll');
      oScroll.scrollTop = to.meta.position.y;
    }
  }
});

//过场动画
//主要思想就是给路由增加一个索引存到sessionStorage里面，以点击过的索引值不变，新增加的路由，索引增加1，
//同时count + 1，这样在页面切换时通过比较索引值的大小，大的向右小的向左，做到左右有规律的过渡。
const history = window.sessionStorage;
history.clear();
let historyCount = history.getItem('count') * 1 || 0;
history.setItem('/', 0);

router.beforeEach((to, from, next) => {
  
  //切换页面过场动画
  const toIndex = history.getItem(to.path);
  const fromIndex = history.getItem(from.path);
  if (toIndex) {
    if (
      !fromIndex ||
      parseInt(toIndex, 10) > parseInt(fromIndex, 10) ||
      (toIndex === '0' && fromIndex === '0')
    ) {
      store.commit('$setDirection', {
        direction: 'forward'
      });
    } else {
      store.commit('$setDirection', {
        direction: 'back'
      });
    }
  } else {
    ++historyCount;
    history.setItem('count', historyCount);
    to.path !== '/' && history.setItem(to.path, historyCount);
    store.commit('$setDirection', {
      direction: 'forward'
    });
  }

  //如果设置标题，拦截后设置标题
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  //登录权限判断
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const loginCookie = getCookie('login_cookies');
    if (loginCookie) {
      // 如果已经登录，并且要去登录页，就不让TA去登录页，重定向到首页
      if (to.path === '/login') {
        next('/');
      } else {
        next();
      }
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    }
  } else {
    next();
  }
});


export default router;
