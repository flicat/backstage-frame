/*!
 * @author liyuelong1020@gmail.com
 * @date 2018/6/11 011
 * @description dish服务
 */

/*加载模块*/
let http = require('http');
let path = require('path');
let os = require('os');

let express = require('express');
let proxy = require('http-proxy-middleware');


/*创建服务*/
let app = express();
app.set('port', 8081);

// 获取本机ip并代理
let IP = '127.0.0.1';
let faces = os.networkInterfaces();

for(let dev in faces) {
    faces[dev].forEach(function (details) {
        if (details.family === 'IPv4' && !details.internal) {
            IP = details.address;
        }
    });
}

app.use(
    express.static(path.join(__dirname, '../dist')),
    proxy({
        target: IP + ':' + app.get('port'),
        changeOrigin: true
    })
);

/*服务启动*/
http.createServer(app).listen(app.get('port'), function () {
    console.log('service start at ' + app.get('port'));
});
