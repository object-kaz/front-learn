
1.	Basic 认证
2.	基于 Cookie / Session 的认证
3.	基于 Token 的认证
4.	基于 Oauth2.0 的认证

## 一.Basic 认证
### 基本流程
1.	客户端请求数据

```
Get /index.html HTTP/1.0
Host:www.test.com
```

2. 服务端返回 401，此时浏览器会弹出一个认证窗口，要求输入用户名和密码进行登录。

```
HTTP/1.1 401 Unauthorised
...
WWW-Authenticate: Basic realm=”xxxx”
...
```

3.	用户输入用户名和密码后，浏览器会将用户名和密码用 `:` 隔开，并使用 `base64` 编码加密。

4.	认证后，浏览器的请求会自动加上认证信息。

```
Get /index.html HTTP/1.0
Host:www.test.com
Authorization: Basic xxxxxxxxxxxxxxxxxxxx
```
### 优点
1.	简单，成本低

### 缺点
1.	BASE64 加密强度过低，账号和密码容易被窃取。为保证信息安全，需要使用 HTTPS 来传输数据。
2.	假冒服务器很容易骗过认证，诱导用户输入用户名和密码。

## 二. 基于 Cookie/ Session 的认证
### 数据存储
1.	`SessionId` 保存在客户端的 `Cookie` 中。
2.	`Session` 的数据存储在服务器中，其ID通过请求传递的 `Cookie` 货物。

### 基本流程
1.	用户通过浏览器向服务端发送带有用户名和密码的请求。
2.	服务端验证用户信息，将用户的 `id` 等信息存入 `Session`。
3.	后面的请求中， `SessionID` 会被自动发送。

### 缺点

1.	 `Session` 数据需要占用服务端的资源。
2.	 `Session` 数据若保存在服务端的内存中，则下次用户请求必须访问存储有`Session` 信息的服务器，影响服务器集群的负载均衡。
3.	 `SessionId` 保存在客户端的 `Cookie` 中。若 `Cookie` 被截获，则有发生 `CSRF` 攻击的风险
4.	依赖 `Cookie`，在微信小程序等不使用 `Cookie` 存储数据的平台是不方便的。

## 三.基于Token的认证
### 基本流程
1.	用户输入账号密码
2.	服务器对用户信息进行校验。校验成功后，返回一个签名的`token`。
3.	客户端将这个`token`保存下来。
4.	后续的`HTTP`请求中，客户端带上这个`token`。一般这个`token`以`Bearer`的形式放在请求认证头，但是也可以放在`POST`请求的`body`。
5.	服务器对`token`进行解码，如果`token`是有效的，继续处理请求。

### AccessToken 和 refreshToken
1.	`Acesss Token`是访问资源接口（API）时所需要的资源凭证。
2.	`Refresh Token`是用来刷新 `Acesss Token` 的 `token`。
3.	`Access Token` 的有效期比较短，当 `Acesss Token` 由于过期而失效时，使用 `Refresh Token` 就可以获取到新的 `Token`，如果 `Refresh Token` 也失效了，用户就只能重新登录了。
4.	`Refresh Token` 及过期时间是存储在服务器的数据库中，只有在申请新的 `Acesss Token` 时才会验证，不会对业务接口响应时间造成影响，也不需要向 `Session` 一样一直保持在内存中以应对大量的请求。

## 四.JWT
1.	`JSON Web Token (or JWT)`只是一个包含某种意义数据的JSON串。它最重要的特性就是，为了确认它是否有效，我们只需要看JWT本身的内容，而不需要借助于第三方服务或者在多个请求之间将其保存在内存中-这是因为它本身携带了信息验证码。

2.	`JWT` 认证分为三部分：`Header`、`Payload`、`Signature`

### 组成
#### Header
用来描述基本信息，如类型和签名所用的加密算法。
```
{  "typ": "JWT",  "alg": "HS256"}
```

#### Payload
可以用来存放一些非敏感的信息，如：
+	iss: 该JWT的签发者
+	sub: 该JWT所面向的用户
+	aud: 接收该JWT的一方
+	exp(expires): 什么时候过期，这里是一个Unix时间戳
+	iat(issued at): 在什么时候签发的

#### Signature
1.	将前面两个部分用 `base64` 编码后用 `.` 连接，再用加密算法（如 `sha256`）加密，得到的密文。
2.	`Signature`用于效验前面的两个部分是否被他人篡改。


#### 完整的 `JWT` 字符串
一个完整的 `JWT` 字符串看起来像这样：
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

+	每个部分之间用 `.` 隔开
+	前两个部分都用 `base64` 进行编码
+	第三个部分为密文

### JWT 的优点
1.	服务器无状态，数据保存在客户端，服务端几乎不需要保存任何数据。对于分布式服务器是友好的。
2.	可以保存任意类型的元数据。
3.	不依赖 `Cookie`，对于移动平台是十分方便的。

### JWT 的缺点
1.	无法存储敏感数据。
2.	令牌过长。
3.	`JWT` 一次性的，若需要修改数据，则需要重新签发。
4.	认证用的 `Token`存储在客户端，服务端难以干涉 `Token` 的生命周期（如强制下线、管理用户的登录设备）。

## 五.基于 Oauth 2.0 的认证

## 参考
1.	传统的session认证以及其缺点——a坤：https://blog.csdn.net/oqqaKun1/article/details/80667688
2.	还分不清 Cookie、Session、Token、JWT？——芋道源码：https://zhuanlan.zhihu.com/p/152224669
3.	想全面理解JWT？一文足矣！——技术人成长：https://zhuanlan.zhihu.com/p/70275218