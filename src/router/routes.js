import Index from '@/views/Index';
import Hello from '@/views/Hello';
import Filter from '@/views/Filter';
import Login from '@/views/Login';

// meta 配置说明
// title 表示页面标题
// requiresAuth： 表示访问该页面是否需要登录权限
// animate： ''表示不需要页面切换动画（如底部tab页面）或自定义 xx动画
export default [
  {
    path: '/index',
    name: 'Index',
    component: Index,
    meta: {
      title: '首页',
      requiresAuth: false,
      animate: ''
    },
    children: [
      {
        path: 'bar',
        name: 'Bar',
        component: Index,
        meta: { requiresAuth: false }
      }
    ]
  },
  {
    path: '/hello',
    name: 'Hello',
    component: Hello,
    meta: {
      title: 'hello',
      requiresAuth: false
      // animate: 'xx'
    }
  },
  {
    path: '/filter',
    name: 'Filter',
    component: Filter,
    meta: {
      title: 'Filter',
      requiresAuth: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      requiresAuth: false
    }
  }
];
