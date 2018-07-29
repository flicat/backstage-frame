/*!
 * @author liyuelong1020@gmail.com
 * @date 2018/7/28 028
 * @description Description
 */

import axios from 'axios';
import router from '@/router';
import SITE_CONFIG from '@/config';

// 创建axios实例
const service = axios.create({
  baseURL: SITE_CONFIG.baseUrl,
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8' // 'application/x-www-form-urlencoded'
  }
});

// request拦截器
service.interceptors.request.use(config => {
  config.headers['token'] = sessionStorage.token;
  return config;
}, error => {
  return Promise.reject(error);
});

// response拦截器
service.interceptors.response.use(response => {
  if (response.data && response.data.code === 401) { // 401, token失效
    sessionStorage.removeItem('token');
    router.push({
      name: 'login'
    });
  }
  return response;
}, error => {
  // Vue.prototype.$message.error('网络错误')
  return Promise.reject(error);
});

export default service;
