## 一.同一端口下，开启http和https双重服务

实现目标：对于非 `80` 和 `443` 端口，将 `http ` 的访问重定向到 `https`。

问题：通常情况下，一个端口只能开一个服务。如果一个端口开启多个服务，则会出现端口冲突，导致第2+个端口开启失败。

解决：但 `http` 和 `https` 是应用层协议，我们可以跳槽到传输层，用 `TCP `协议开启一个反向代理服务器，将收到的数据包转发到 `http` 和 `https` 两个服务器，并将收到的响应转发回 `TCP`协议的服务器。

参考代码：

```js
/* 开启HTTPS服务 */
const fs = require('fs');
const https = require('https');
/* SSL证书配置 */
const options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt'),
};
const port = 8443;
/*app是 koa 实例*/
https.createServer(options, app.callback()).listen(port - 1)


/* 创建一个http，用于重点向内容到https */
const http = require('http')

http.createServer((req, res) => {
  res.writeHead(301, {
    'Location': ['https://', req.headers.host, req.url].join('')
  });
  res.end();
}).listen(port - 2);


/* 创建TCP连接，用于反向代理 */
var net = require('net');
net.createServer(function (socket) {
  socket.once('data', function (buf) {
    console.log(buf[0]);
    // https数据流的第一位是十六进制“16”，转换成十进制就是22
    var address = buf[0] === 22 ? port - 1 : port - 2;
    //创建一个指向https或http服务器的链接
    var proxy = net.createConnection(address, function () {
      proxy.write(buf);
      //反向代理的过程，tcp接受的数据交给代理链接，代理链接服务器端返回数据交由socket返回给客户端
      socket.pipe(proxy).pipe(socket);
    });

    proxy.on('error', function (err) {
      console.log(err);
    });
  });

  socket.on('error', function (err) {
    console.log(err);
  });
}).listen(port);
```

参考：

https://blog.csdn.net/weixin_33697898/article/details/90627657