/*!
 * @author liyuelong1020@gmail.com
 * @date 2018/7/28 028
 * @description Description
 */

// import axios from 'axios';
import router from '@/router';
import SITE_CONFIG from '@/config';

/*
* @params {String} url
* @params {String} method
* @params {Object} data
* @params {Object} headers
* @params {String} type
* */
export default function ({url, method = 'post', data, headers, type = 'json'}) {
  // 请求地址
  let requestUrl = [SITE_CONFIG.baseUrl.replace(/\/$/, ''), url.replace(/^\//, '')].join('/');

  // fetch配置信息
  let param = {
    method: method,
    headers: Object.assign({
      'Content-Type': 'application/json; charset=utf-8',
      'token': sessionStorage.token || ''
    }, headers)
  };

  if (method === 'get') {
    if (Object.prototype.toString.call(data) === '[object Object]') {

      // get 请求参数转换
      let searchParam = Object.keys(data).map(name => [name, encodeURIComponent(data[name])].join('=')).join('&');
      requestUrl = [requestUrl, searchParam].join(/\?/.test(requestUrl) ? '&' : '?');

    } else if (Array.isArray(data)) {

      // 数组拼接
      requestUrl = [requestUrl, data.join('/')].join(/\/$/.test(requestUrl) ? '' : '/');

    } else {

      // 字符串拼接
      requestUrl = [requestUrl.replace(/\/$/, ''), data.replace(/^\//, '')].join('/');
    }
  } else if (Object.prototype.toString.call(data)) {

    if (/Array|Object/.test(Object.prototype.toString.call(data))) {
      param.body = JSON.stringify(data);
    } else {
      param.body = data;
    }
  }

  return fetch(requestUrl, param).then(res => {
    // 根据请求类型返回数据
    if (typeof res[type] === 'function') {
      return res[type]();
    } else {
      // 默认返回json
      return res.json();
    }
  }).then(data => {
    // 如果接口状态为 401 则退出登录
    if (data && data.code === 401) {
      sessionStorage.removeItem('token');
      router.push({
        name: 'login'
      });
    }
    return data;
  }).catch(e => {
    // 网络错误
    // Vue.prototype.$message.error('网络错误')
    return Promise.reject(e);
  });
};
