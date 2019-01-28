import axios from 'axios';

import { toCamel, toUnderline } from './util';

/**
 * 和后端接口约定说明
 * code 约定的状态码  403表示没有权限  10000 表示响应成功
 * ret 响应主体 可以为任意类型，前端拦截器统一处理
 * {
 *  code:10000, //表响应成功
 *  ret:{
 *    userid:122,
 *    name: xiaowu
 *  }
 * }
 * 
 */
const createError = msg => {
  return new Error(msg);
};

const OK = 10000;

// const baseURL = '/zhiren';
const baseURL = '';

const axiosInstance = axios.create({
  baseURL
});

//统一处理：request 参数转为 下划线，response 结果转化为 驼峰
axiosInstance.interceptors.request.use(
  config => {
    try {
      if (!config.noModifyData) {
        config.data = JSON.parse(
          toUnderline(JSON.stringify(config.data || {}))
        );
      }
      return config;
    } catch (error) {
      throw error;
    }
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => {
    try {
      let data = response.data;
      if (response.status >= 500) {
        return Promise.reject(createError('『5XX, 服务器内部错误』'));
      }
      if (!data) {
        return Promise.reject(createError('『服务器无任何返回』'));
      }
      // 403未登录单独处理下
      if (data.code === 403) {
        return Promise.reject(createError(`『还未登录，请先登录』`));
      }
      if (data.code !== OK) {
        return Promise.reject(
          createError(
            data.msg || `${response.config.url}接口调用成功，但处理逻辑失败`
          )
        );
      }
      //对响应结果data.ret作出统一处理
      const type = Object.prototype.toString.call(data.ret);
      if (type === '[object Object]' || type === '[object Array]') {
        data.ret = JSON.parse(toCamel(JSON.stringify(data.ret)));
      } else if (
        Object.prototype.toString.call(data.ret) === '[boolean Object]'
      ) {
        return data.ret;
      } else if (data.ret === undefined || data.ret === null) {
        data.ret = {};
      }
      return data.ret;
    } catch (error) {
      throw error;
    }
  },
  error => Promise.reject(error)
);

export default axiosInstance;


// Vue.prototype.$axios = axios
// axios.defaults.baseURL = 'api/v1/'

// // http request 拦截器
// axios.interceptors.request.use(
//     config => {
//         // 如果本地存储中有token字段， 就为所有请求加上Authorization请求头
//         if (localStorage.token) {
//             config.headers["Authorization"] = `Bearer ${localStorage.token}`
//         }
//         return config;
//     },
//     error => {
//         console.log(error) // for debug
//         Promise.reject(error)
//     }
// )

// // http response 拦截器
// axios.interceptors.response.use(
//     response => {
//         return response
//     },
//     error => {
//         if (error.response) {
//             switch (error.response.status) {
//                 // 如果后端返回没有权限
//                 case 401:
//                     // 清除token信息并跳转到登录页面
//                     localStorage.clear()
//                     router.replace("/signin");
//             }
//         }
//         return Promise.reject(error.response.data) // 返回接口返回的错误信息
//     }
// )