## 一.为什么需要模块化
1.	很早的时候，所有开发者把`Javascript`代码都写在一个文件里面，浏览器执行时，只要加载这一个文件就够了。
2.	到了后来，代码规模增加，一个网页代码往往需要加载多个文件。

```html
<script src="a.js"></script>
<script src="b.js"></script>
...
```

3.	但这样写有很多缺点：
	+	性能差：会让浏览器暂停渲染，增加网页失去响应的时间。
	+	难维护：难以处理各个文件的依赖关系。必须严格确定顺序来保证依赖的正确加载。
	+	体验差：各个模块间容易出现命名冲突。通过对象来约定又使得方法的调用异常复杂`org.cometd.Utils.isArray`。

## 二.简易的模块化写法
#### 最简单：函数写法
缺点：全局环境污染
```js
function m1() {
	console.log('method1')
}

function m2() {
	console.log('method2')
}
```
#### 对象写法
优点：不污染全局变量
缺点：暴露私有成员

```js
let myMod = {
	_id: 10,
	getId() {
			return this.id
	}
}
```

#### IIFE(立即执行函数)写法
> IIFE是目前一种普遍的写法。

优点：不污染全局变量、不暴露私有成员
缺点：没有实现模块继承
```js
let myMod = function(){
	let _id = 10;
	function getId()
	{
		return _id;
	}
	return {
		getId
	}
}()
```
####  放大模式和宽放大模式
1.	放大模式：模块继承
2.	宽放大模式："立即执行函数"的参数支持空对象，避免浏览器加载顺序导致对象不存在的问题。

```js
let mod = function(mod){
	mod._id = 10;
	function getId()
	{
		return mod._id;
	}
	return {
		getId
	}
}(window.mod || {}) //宽放大模式
// }(mod) 放大模式
```
## 三.CommonJS规范和Node.js
### 概述
1.	`CommonJS` 是一种被广泛使用的js模块化规范，核心思想是通过 `require` 方法来**同步加载**依赖的其他模块，通过 `module.exports` 导出需要暴露的接口。
2.	`CommonJS`规范适合服务端，不适用于浏览器环境。
	
	?> `CommonJS`规范中，模块是同步加载，一引入就可以使用，在模块加载速度快的场景下使用。服务器的模块放在硬盘，加载快。但浏览器是从服务器上加载模块，其加载速度受到网络的限制，同步加载的策略不适合浏览器。

3.	`node.js` 的模块系统，就是参照 `CommonJS` 规范实现的。
4.	`CommonJS` 规范中，每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。
5.	所有代码都运行在模块作用域，不会污染全局作用域。
6.	模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
7.	模块加载的顺序，按照其在代码中出现的顺序。

### global
`global`是一个对象，用于在各种模块中分享变量。

```js
global.shared = 233; //数据是共享的
```

### module
1.	在每个模块内部，`module`代表当前模块，其中，`exports`属性是模块对外的接口。加载某个模块，其实是加载该模块的 `module.exports` 属性。

```js
//hello.js
module.exports = function(){
    console.log('hello world')
}

//index.js
let hello = require('./hello')
hello();
```

2.	`module` 的其他属性

|属性|解释|
|----|----|
|`id`|模块的识别符，通常是带有绝对路径的模块文件名|
|`filename`|模块的文件名，带有绝对路径|
|`loaded`|返回一个布尔值，表示模块是否已经完成加载|
|`parent`|返回一个对象，表示调用该模块的模块|
|`children`|返回一个数组，表示该模块要用到的其他模块|
|`exports`|表示模块对外输出的值|

3.	在 `nodejs`中，通过命令行直接调用某个模块，`module.parent`为 `null`。

### exports 变量
为了方便，`nodejs`为每个模块提供一个 `exports` 变量，指向 `module.exports` 。

!> 由于 `exports` 是  `module.exports`的引用，所以直接对 `exports`赋值将切断引用，而不会改变 `module.exports`。

### require 函数
1.	`require` 函数的基本功能是，读入并执行一个 `JavaScript` 文件，然后返回该模块的 `exports` 对象。如果没有发现指定模块，会报错。

2.	模块名规范
	+	`/`开头：从绝对路径中加载
	+	`./`开头：从当前路径中加载
	+	没有上面的开头，非目录：加载核心模块，或者一个位于各级 `node_modules` 目录的已安装模块
	+	没有上面的开头且为目录：先找到第一级文件夹的路径，再以它为参数，找到后续路径。
	+	如果文件没有后缀，则会尝试为文件名添加 `.js`、`.json`、`.node`

3.	使用 `require.resolve()`方法得到命令加载的确切文件名。
4.	`require.cache[module]` 中保存了模块的缓存，使用 `delete` 命令即可删除缓存。
5.	`require.main` 可以用来判断模块是直接执行，还是被调用执行。当直接执行时，其值为 `true`
6.	当出现 `a`加载 `b`，`b`加载`a`的情况时，`b` 会加载 `a` 的不完整版本（`b`得到`a`加载 `b` 之前，`module.exports` 的值）。

```js
//a.js
module.exports = 'a1'
console.log('b:', require('./b'))
module.exports = 'a2'

//b.js
module.exports = 'b1'
console.log('a:', require('./a'))
module.exports = 'b2'

//index.js
console.log(require('./a'))
console.log(require('./b'))

//node index.js
a: a1
b: b2
a2   
b2
```

## 四.AMD规范和RequireJS

> AMD(Asynchronous Module Definition,异步模块定义)

1.	模块调用形式：`require([module], callback)`，`callback` 的参数为加载的模块（多参数）。
2.	模块定义形式：`define(id?: String, dependencies?: String[], factory: Function|Object)`。其中
	+	`id`：模块的名字。若不填写，则模块文件的文件名就是模块标识。
	+	`dependencies`：模块的依赖。如果没有指定 `dependencies` ，那么它的默认值是 `["require", "exports", "module"]`。依赖模块必须根据模块的工厂方法优先级执行。
	+	`factory` 是最后一个参数，它包裹了模块的具体实现，它是一个函数或者对象。如果是函数，那么它的返回值就是模块的输出接口或值。
3.	AMD规范中，模块是异步加载，更适合浏览器环境。
4.	 `requireJS`为`AMD`规范的实现。

### 加载模块
1.	引入`require.js`： `<script src="js/require.js" data-main="js/main"></script>` ，其中 `data-main`用于指定主模块，即加载 `js/main.js`。

```js
//定义模块：hello.js
define(['jquery'], function($) {
    $('body').text('hello world');
});

//使用模块：index.js
require(['hello'], function (hello) {
	hello();
});
```
2.	使用 `require.config` 控制加载行为，为模块名添加路径。

```js
require.config({
	baseUrl: 'js/lib', //修改加载基路径
　　 paths: {
　　　　"jquery": "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min", //支持网络路径
　　　　"underscore": "underscore.min",
　　　　"backbone": "backbone.min"

　　　}
　　});
```
### 定义模块
使用 `define` 定义模块。其形式如下：
+	`define(factory: Function|Object)`
+	`define(deps: Array<String>, factory: Function)`
+	`define(name: String,deps: Array<String>, factory: Function)`

`factory` 的参数为加载完的依赖对象。

```js
define(['jquery'], function($) {
    $('body').text('hello world');
});
```

### 加载非规范的模块
在 `require.config` 中指定 `shim` 属性，用于配置这些库的导出：
```js
require.config({
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
　　　　　　　　deps: ['underscore', 'jquery'],
　　　　　　　　exports: 'Backbone'
　　　　　}
	}
})
```

## 五.CMD模块规范和SeaJS

> CMD(Common Module Definition,通用模块定义)

1.	CMD规范是 SeaJS 在推广过程中对模块定义的规范化产出的。

2.	CMD规范中，一个模块就是一个文件。
3.	SeaJS中的模块加载器，在模块代码执行之前，对模块代码进行静态分析，并动态生成依赖列表。
4.	AMD和CMD规范的异同：

|方案|优势| 劣势|特点|
|----|----|----|----|
|AMD|快|会浪费资源|预先加载所有的依赖，直到使用的时候才执行|
|CMD|资源浪费少|性能较差|只有真正需要才加载依赖|

5.	`seajs` 中启动一个模块：`seajs.use('./main')` 会自动加载 `./main.js`

### define
1.	`define` 是一个全局函数，用来定义模块。它有如下调用格式：
 	+	`define(factory)`
 	+	`define(id?, deps?, factory)`（这个不属于规范）

	其中，`factory` 为工厂函数，也可以是一个对象或模板字符串(模板名使用`{{ name }}`表示)，`deps` 为依赖模块的名称，`id` 为模块名称。
	
	工厂函数默认有三个参数：`require`、`exports` 和 `module`

2.	`define.cmd` 是一个空对象，可用来判定当前页面是否有 CMD 模块加载器。

```js
//定义模块：hello.js
define(function(require,exports,module) {
    $('body').text('hello world');
    exports.say = () => console.log('hi')
});
```

### require参数
1.	`require` 是一个函数，接受模块标识作为唯一参数，用来获取其他模块提供的接口。
2.	模块名规范类似 `CommonJS`规范。除此之外，由于模块内的 `require` 采用静态分析的策略，`require` 有一些其他的规则：
	+	模块 `factory` 构造方法的第一个参数 必须 命名为 `require`
	+	不要重命名 `require` 函数，或在任何作用域中给 `require` 重新赋值
	+	`require` 的参数值 **必须** 是字符串直接量。

```js
define(function(require, exports) {

  // 获取模块 hello 的接口
	let hello = require('./hello');
	hello.say()
});
```

3.	动态加载依赖 `require.async(id,callback)`，其中回调的参数为加载的模块对象。

```js
require.async('./a',(a) => null)
require.async(['./a','./b'], (a, b) => null)
```

4.	`require.resolve(name)` 解析模块路径：该函数不会加载模块，只返回解析后的绝对路径。

### exports

1.	`exports` 是一个对象，用来向外提供模块接口。
2.	和 `commonJS` 一样，`exports` 是 `module.exports` 的一个引用，**因此不可直接修改`exports`**。

### module
`module` 是一个对象，上面存储了与当前模块相关联的一些属性和方法。

|属性|解释|
|----|----|
|`id`|模块的唯一标识|
|`uri`|根据模块系统的路径解析规则得到的模块绝对路径|
|`dependencies`|当前模块的依赖|
|`exports`|当前模块对外提供的接口。（对其的赋值必须同步执行）|

## 六.ESM：ES6模块规范
1.	ES6 模块的设计思想是尽量的静态化，模块在编译时期加载，提高运行效率，便于静态分析。而`CommonJS` 只能在运行时进行加载。
2.	ES6 模块自动开启了严格模式。

### export
1.	一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。若需要外部能够读取模块内部的某个变量，就必须使用 `export` 关键字输出该变量。
2.	`export` 支持输出变量、函数、类

```js
export let name = 'kaz'
export let age = 18

// 等价于
let name = 'kaz'
let age = 18
export {name, age}
```

3.	通常情况下，`export` 输出的变量就是本来的名字，但是可以使用 `as` 关键字重命名。

```js
let name = 'kaz'
let age = 18
export {name as myName, age as myAge}
```

4.	`export` 命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。

```js
export 233 //error

var m = 1
export m //error，还是直接输出1
export {m} //ok

function f() {}
export f; //error
export {f} //ok
```

5.	`export` 语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。
6.	`export` 语句必须出现在顶层作用域，不能写在函数内。

### import
1.	`import` 命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块对外接口的名称相同。
2.	`from` 指定模块文件的位置，可以是相对路径，也可以是绝对路径，`.js`后缀可以省略。
3.	`as` 关键字用于取别名。

```js
import { lastName as name } from './profile'
```

4.	`import` 进来的变量是只读的，不能直接赋值。但改写对象的属性是可以的。
5.	`import` 命令具有提升效果，会提升到整个模块的头部，首先执行。
6.	`import` 命令中，大括号不能使用表达式和变量。（因为 `import` 是静态执行）

```js
import {'f' + 'oo'} from 'foo'
```

7.	不输入值的加载:

```js
import 'lodash';
```

8.	重复的 `import` 语句会被优化成一次。
9.	整体加载：使用 `*`

```js
import * as lodash from 'lodash';
```

!> 由于 `import` 是静态的，所以 `lodash` 下所有属性不可修改

### export default
1.	`export default` 命令为模块指定默认的输出，在 `import` 时可以任意指定名字，且无需大括号。
2.	`export default` 命令只能使用一次。

```js
//hi.js
export default function() {
	console.log('hi')
}

//index.js
import hi from 'hi'
hi()
```
3.	`export default` 命令后面不能跟变量声明语句（但可以跟函数声明语句）。但 `export default` 命令允许输出值。

```js
export default 233
```

4.	`export default` 本质是输出一个叫做 `default`的变量或方法。

```js

export {foo as default};
//等价于
export default foo

//另一个文件
import { default as foo } from 'a'
//等价于
import foo from 'a'
```
### export from
如果在一个模块之中，先输入后输出同一个模块，`import` 语句可以与 `export` 语句写在一起。

```js
//(1)
export {a, b} from 'a'
//相当于
import {a, b} from 'a'
export {a, b}

//(2)更改名字
export {a as c, b} from 'a'

//(3)输出全部接口
export * from 'a'

//(4)输出默认接口
export { default } from 'a'
```

### [ES2020]import()
1.	`import` 用于动态加载一个模块，其返回值为 `Promise` 对象。
```js
import(specifier)
```
2.	`import()`加载模块成功以后，这个模块会作为一个对象，当作 `then` 方法的参数。
3.	如果模块有 `default` 输出接口，可以用参数直接获得。

```js
import('...').then(({default: btn}) =< {
	//code...
})
```
4.	适用场合：按需加载、条件加载、动态模块路径

### Module 的加载
#### 浏览器中加载
1.	加载外部ES6模块：指定 `type="module"`
	
	!> 对于带有 `type="module"` 的脚本，浏览器会自动开启 `defer` 属性，等待页面渲染完成再加载脚本。
	
```html
<script type="module" src="./foo.js"></script>
```

2.	内嵌入网页：
	+	代码在模块作用域中执行，模块内部的顶层变量，外部不可见。
	+	自动开启严格模式。
	+	可以使用 `import` 命令加载其他模块（.js后缀不可省略，需要提供绝对 URL 或相对 URL）

```html
<script type="module">
  import a from "a";

  // other code
</script>
```
### nodejs中加载
1.	`Node.js v13.2` 版本开始，`Node.js` 已经默认打开了 ES6 模块支持。
2.	脚本文件里面使用 `import` 或者 `export` 命令，必须使用 `.mjs` 为后缀。
3.	也可以在 `package.json` 中加入：

```js
{
   "type": "module"
}
```
!> 一旦设置了以后，所有 JS 脚本，就被解释为 ES6 模块。此时，使用 CommonJS 模块必须使用 `.cjs` 后缀。

4.	`.mjs` 文件总是以 ES6 模块加载，`.cjs` 文件总是以 CommonJS 模块加载，`.js` 文件的加载取决于`package.json` 里面 `type` 字段的设置。

## 参考
1.	Javascript模块化编程（一）：模块的写法——阮一峰的网络日志：http://www.ruanyifeng.com/blog/2012/10/javascript_module.html
2.	Javascript模块化编程（二）：AMD规范——阮一峰的网络日志：http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html
3.	Javascript模块化编程（三）：require.js的用法——阮一峰的网络日志：http://www.ruanyifeng.com/blog/2012/11/require_js.html
4.	AMD规范——Webpack 中文指南：http://shouce.jb51.net/webpack/amd.html
5.	CommonJS规范——JavaScript标准参考教程：https://javascript.ruanyifeng.com/nodejs/module.html#toc0
6.	CMD模块定义规定——seajs/seajs：https://github.com/seajs/seajs/issues/242
7.	从 CommonJS 到 Sea.js——seajs/seajs：https://github.com/seajs/seajs/issues/269
8.	前端模块化开发那点历史——seajs/seajs：https://github.com/seajs/seajs/issues/588
9.	前端模块化开发的价值——seajs/seajs：https://github.com/seajs/seajs/issues/547
10.	Module 的语法——阮一峰ES6教程：https://es6.ruanyifeng.com/#docs/module
11.	Module 的加载实现——阮一峰ES6教程：https://es6.ruanyifeng.com/#docs/module-loader