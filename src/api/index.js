/*!
 * @author liyuelong1020@gmail.com
 * @date 2018/7/28 028
 * @description api 接口
 */

import url from './url';
import request from './request';

Object.keys(url).forEach(name => {
  let defaultParam = {
    url: url[name],
    headers: {
      token: sessionStorage.token
    }
  };

  let res = function (params) {
    // 默认 post 请求
    return request({
      url: defaultParam.url,
      method: 'post',
      data: params,
      headers: defaultParam.headers
    });
  };

  url[name] = new Proxy(res, {
    get: function (target, key, receiver) {
      if (key === 'post') {
        // post 请求
        return res;
      } else if (key === 'get') {
        // get 请求
        return function (params) {
          return request({
            url: defaultParam.url,
            method: 'get',
            data: params,
            headers: defaultParam.headers
          });
        };
      } else if (key === 'header') {
        // 设置请求头
        return function (header) {
          Object.assign(defaultParam.headers, header);
          return target;
        };
      } else if (key === 'url') {
        // 设置请求 url
        return function (...args) {
          defaultParam.url = [defaultParam.url, ...args].join('/');
          return target;
        };
      } else {
        return Reflect.get(target, key, receiver);
      }
    },

    set: function (target, key, value, receiver) {
      throw new Error(`can not set ${key}`);
    }
  });
});

// let api = new Proxy({}, {
//   get: function (target, key, receiver) {
//     if (url[key]) {
//       return Reflect.get(url, key, receiver);
//     } else {
//       return Reflect.get(target, key, receiver);
//     }
//   },
//   set: function (target, key, value, receiver) {
//     throw new Error(`can not set ${key}`);
//   }
// });

export default url;
