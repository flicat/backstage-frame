/*!
 * @author liyuelong1020@gmail.com
 * @date 2018/7/17 017
 * @description 全局配置
 */

let SITE_CONFIG;

if (process.env.NODE_ENV === 'production') {
  /*
  * 正式环境
  * */
  SITE_CONFIG = {
    // api接口请求地址
    baseUrl: '//n.polyapt.com/npl-web-api/',
    // 嵌套iframe地址
    nestIframeUrl: '//n.polyapt.com/npl-web-api/',
    // 嵌套iframe路由名称列表
    nestIframeRouteNameList: ['sql'],
    // 静态资源文件夹名称
    staticFileName: '',
    // cdn地址
    cdnUrl: ''
  };
} else if (process.env.NODE_ENV === 'testing') {
  /*
  * test 环境
  * */
  SITE_CONFIG = {
    // api接口请求地址
    baseUrl: '//test.polyapt.com/npl-web-api/',
    // 嵌套iframe地址
    nestIframeUrl: '//test.polyapt.com/npl-web-api/',
    // 嵌套iframe路由名称列表
    nestIframeRouteNameList: ['sql'],
    // 静态资源文件夹名称
    staticFileName: '',
    // cdn地址
    cdnUrl: ''
  };
} else {
  /*
  * local 环境
  * */
  SITE_CONFIG = {
    // api接口请求地址
    baseUrl: '//192.168.167.94:6060/npl-web-api/',
    // 嵌套iframe地址
    nestIframeUrl: '//192.168.167.94:6060/npl-web-api/',
    // 嵌套iframe路由名称列表
    nestIframeRouteNameList: ['sql'],
    // 静态资源文件夹名称
    staticFileName: '',
    // cdn地址
    cdnUrl: ''
  };
}

export default SITE_CONFIG;
