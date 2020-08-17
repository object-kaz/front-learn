## 一.概述
### 介绍
`Express` 是一个基于 `Node.js` 平台，快速、开放、极简的 `Web` 开发框架。

`Express` 通常用于：
+	前端开发服务器（如开发时的预览）
+	数据Mock服务器
+	服务端渲染
+	...

### 安装
1.	使用 `npm` 进行安装：

```shell
npm install express --save
```
2.	引入 `express`

```js
const express = require('express')
const app = express()
app.get('/',(req,res) => res.send('hi!'))
app.listen(3000)
```

## 二.路由
### 注册路由的方法
#### 使用 `app.METHOD` 注册路由
注册一个路由的函数是：
```
app.METHOD(PATH, HANDLER)
```

+	`METHOD` 是http请求方法的小写，如 `get`、`post`、`put`、`delete`。
+	`PATH` 是路径，如 `/`。
+	`HANDLER` 是处理响应的函数。

#### 使用 `app.route` 注册路由
这个函数通常用来给同一路径注册多个请求方法。

`app.route(PATH).METHOD1(HANDLER).METHOD2(HANDLER)...`

+	`METHOD` 是http请求方法的小写，如 `get`、`post`、`put`、`delete`。
+	`PATH` 是路径，如 `/`。
+	`HANDLER` 是处理响应的函数。

```js
app.route('/test')
.get(function(req,res) => res.send('get'))
.post(function(req,res) => res.send('post'))
.put(function(req,res) => res.send('put'))
.delete(function(req,res) => res.send('delete'))
```

#### 通过路由对象`app.Router`注册路由
```js
var express = require('express')
var app = express()
//创建一个路由对象
var router = express.Router()

router.get('/', function (req, res) {
  res.send('home page')
})

router.get('/about', function (req, res) {
  res.send('about')
})

// 注册路由
app.use('/birds', router)
```

### 路径

1.	路径一般以 `/` 开头，其中 `/`代表根路径。
2.	请求某一类资源： `/name`：如 `/users` 获取通常用来获取用户信息。
3.	路由参数：使用 `:`前缀：如 `/users/:id` 中，`id` 是路由参数，可以匹配 `/users/1` `/users/666`

	路由参数之间可以使用 `-`、`/`、`.`分隔： `:from-:to`
4.	正则表达式匹配路由：
	
	如 `/a/` 匹配所有包含 `a` 的路由。

### 响应函数
#### 定义一个响应函数
响应函数中有两个参数 `req`（请求） 和 `res`（响应）。

```js
app.get('/hi', function (req, res) {
  res.send('hi')
})
```

#### 定义多个响应函数
1.	可以使用数组和函数参数来定义多个响应函数。
2.	除了最后一个函数，其余函数需要使用 `next()` 进行回调。

```js
function handler(req, res,next) {
console.log(123456)
  next()
}

function output(req, res) {
res.send('output')
}
//下面的写法都可以
app.get('/hi1', [handler,handler,handler],output)
app.get('/hi2', [handler,handler,output])
app.get('/hi2', handler,output)
```

## 三.请求和响应处理
### 获取请求数据
`req` 中的常用操作：

|操作|说明|
|----|----|
|`req.app`|获取 `express` 实例|
|`req.baseUrl`|路由的基路径。（通过 `Router`对象注册的路由可以获取其挂载的路径）|
|`req.body`|请求数据。|
|`req.cookies`|请求的 `cookies`。|
|`req.hostname`|请求的域名。|
|`req.ip`|请求的IP。|
|`req.method`|请求的方法。|
|`req.originUrl`|请求的原始url,会带上query。如`/a?q=1`|
|`req.params`|路由参数。|
|`req.path`|请求路由，不带query。|
|`req.protocol`|请求协议，如 `http` 和 `https`。|
|`req.query`|请求的查询参数构成的对象。|
|`req.secure`|该请求是否使用 `https` 协议。|
|`req.xhr`|该请求是否使用 `XMLHttpRequest`。|

注意：`body` 默认是字符串。
+	如需将JSON解析成对象，需要引入 `express.json()` 中间件
+	如需将表单数据解析成对象，需要引入 `express.urlencoded({ extended: true })` 中间件

### 响应数据
这些函数均支持链式调用的。

#### 设置状态码
1.	使用`res.status(code)`，其中 `code` 为状态码。发送状态码之后还可以发送数据。
2.	使用`res.sendStatus(code)`，其中 `code` 为状态码。发送状态码之后不可以发送数据。

#### 设置返回类型
```js
res.type('.html')
// => 'text/html'
res.type('html')
// => 'text/html'
res.type('json')
// => 'application/json'
res.type('application/json')
// => 'application/json'
res.type('png')
// => 'image/png'
```
#### 进行跳转
函数：`res.redirect([status = 302,] path)`

####  Cookies
设置cookie：`res.cookie(name, value [, options])`
清除cookie：`res.clearCookie(name, value)`

常用的选项：

| 属性   | 类型              | 描述                                                  |
| ---------- | ----------------- | ------------------------------------------------------------ |
| `domain`   | String            | Cookie的域名。 默认是请求的域名。 |
| `encode`   | Function          | 用于cookie值编码的同步函数。默认为`encodeURIComponent` |
| `expires`  | Date              | 过期时间。如果未指定或为0，则创建`session` `cookie` |
| `httpOnly` | Boolean           | 将cookie标记为只能由web服务器访问。    |
| `maxAge`   | Number            | 设置有效期，单位为毫秒。 |
| `path`     | String            | cookie路径. 默认为“/”.                        |
| `secure`   | Boolean           | 将cookie标记为只能由https服务器访问.                 |
| `signed`   | Boolean           | 是否应对cookie进行签名                    |

#### 下载和发送文件

1.	`res.download(path [, filename] [, options] [, fn(err)])` ：将路径处的文件作为附件传输。通常浏览器会提示用户下载。
2.	`res.sendFile(path [, options] [, fn(err)])`：在指定路径传输文件。框架自动根据文件扩展名设置内容类型响应HTTP头字段。除非在`options`对象中设置了`root`选项，否则`path`必须是指向文件的绝对路径。（浏览器不一定会提示用户下载）
	
	?> 这个函数可以发送 `HTML` 文件。
	
3.	传输完成时，会执行 `fn` 函数。
4.	`options`的常用属性：

| 属性       | 描述                                                  | 默认值  |
| -------------- | ------------------------------------------------------------ | -------- |
| `maxAge`       | 以毫秒为单位设置“Cache-Control”标头的“最长使用时间”属性。 | 0        |
| `root`         | 文件根目录。                       |          |
| `lastModified` | 设置上次修改的时间。使用`false`来禁用. | Enabled  |
| `headers`      | 请求头.       |          |
| `acceptRanges` | Enable or disable accepting ranged requests.                 | `true`   |
| `cacheControl` | 启用 `Cache-Control` 响应头.   | `true`   |


#### 返回数据
1.	返回 `json`：`res.json(obj)`
2.	返回 `jsonp`： `res.jsonp(obj)`
	
	默认的回调函数为 `callback`。可以在请求query中设置 `callback`指定回调函数。

3.	万能返回：`res.send(ret)` 可以返回 `String`(解析成HTML)、`Buffer`、`Array`(解析成JSON)、`Object`(解析成JSON)