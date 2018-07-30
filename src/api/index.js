/*!
 * @author liyuelong1020@gmail.com
 * @date 2018/7/28 028
 * @description api 接口
 */

import url from './url';
import request from './request';

let api = {};

Object.keys(url).forEach(name => {

  let res = function (data, params = {}) {
    params.url = url[name];
    // 默认 post 请求
    params.method = 'post';
    params.data = data;
    return request(params);
  };

  api[name] = new Proxy(res, {
    get: function (target, key, receiver) {
      if (key === 'post') {
        // post 请求
        return res;
      } else if (key === 'get') {
        // get 请求
        return function (data, params = {}) {
          params.url = url[name];
          params.method = 'get';
          params.data = data;
          return request(params);
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

export default api;
