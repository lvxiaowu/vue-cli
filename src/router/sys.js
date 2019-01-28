import router from '.';

export default [
  {
    path: '',
    redirect: '/index'
  },
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '*',
    component: resolve => require(['@/views/NotFound/index.vue'], resolve)
  },
  {
    path: '/404',
    component: resolve => require(['@/views/NotFound/index.vue'], resolve)
  },
];
