## 一.单例模式
1.	背景：有一些对象我们往往只需要一个，比如线程池、全局缓存、浏览器中的 `window` 对象等。
2.	概念：保证一个类仅有一个实例，并提供一个访问它的全局访问点。
3.	核心：保证只有一个实例，并通过全局访问。
4.	惰性单例：在需要的时候才创建对象实例。
5.	常见应用：遮罩、登录弹窗

### 基于'类' 的单例模式
#### 基本实现
方法：用一个变量或标志来判断是否创建过对象。

缺点：仍然可以通过 `new Http` 来创建多个对象

<!-- tabs: start -->
#### **标志在属性**
```js
let Http = function(baseUrl) {
	this.base = baseUrl
	this.instance = null
}
Http.request = function(args) {
	//some code
}

Http.getInstance = function(baseUrl) {
	if(!this.instance)
		this.instance = new Http(baseUrl)
	return this.instance
}

let http1 = Http.getInstance('https://www.baidu.com')
let http2 = Http.getInstance('https://www.baidu.com')
console.log(http1 === http2) //true
```
#### **标志在函数**
```js
let Http = function(baseUrl) {
	this.base = baseUrl
	this.instance = null
}
Http.request = function(url) {
	//some code
}

Http.getInstance = (function(baseUrl) {
	var instance = null;
	return function(name) {
		if(!instance)
			instance = new Http(baseUrl)
		return instance
	}
})()

let http1 = Http.getInstance('https://www.baidu.com')
let http2 = Http.getInstance('https://www.baidu.com')
console.log(http1 === http2) //true
```
<!-- tabs: end -->

#### 透明单例
使用 *IIFE*（立即执行函数），让用户从这个类中创建对象的时候，可以像使用其他任何普通类一样。

缺点：当需求发生变化，需要让类支持多实例，需要修改原类的代码。

```js
let Http = (function(){
	let instance
	let Http = function(baseUrl){
		if(instance) 
			return instance
		this.baseUrl = baseUrl
		instance = this
	};
	
	Http.request = function(args) {
		//some code
	}
	
	return Http
	
})()

let http1 = new Http('https://www.baidu.com')
let http2 = new Http('https://www.baidu.com')
console.log(http1 === http2) //true
```

#### 代理
将判断实例的方法放到类外，写成代理。

```js
let Http = function(baseUrl){
	this.baseUrl = baseUrl
	instance = this
};
	
Http.request = function(args) {
	//some code
}

let ProxyHttp = (function() {
	let instance;
	return function( baseUrl ){ 
		if ( !instance ){ 
 			instance = new Http( baseUrl ); 
 		} 
 		return instance; 
 	}
})()

let http1 = new ProxyHttp('https://www.baidu.com')
let http2 = new ProxyHttp('https://www.baidu.com')
console.log(http1 === http2) //true
```

### 不基于'类'的单例模式

1.	`JavaScript`的特色是，对象可以直接创建，而无需通过原型（类）来创建。

	> `JavaScript` 没有类的概念，生搬以类为中心的语言并不合适。

2.	在 `JavScript` 开发中，经常会把全局变量当成单例来使用。（尽管全局变量不是单例模式）
3.	使用全局变量容易带来全局污染，解决的方法：
	+	使用命名空间
	+	使用闭包封装私有变量

4.	除了对象，网页上的某一模块也可以使用单例模式。
	
	> 如登录窗口，在第一次打开时创建相应DOM，当点击关闭按钮时，DOM会缓存，而不会消除。下次打开时，直接使用缓存即可。

	> NodeJS的模块系统中，也有单例模式的影子。模块在第一次使用时被加载，之后则直接使用缓存的结果，而不必重新加载模块。

5.	通用的惰性单例：该函数会通过闭包将函数`fn`的返回值缓存，下次调用`fn`函数，则直接从缓存中读取，而不必重新运行。

```js
var getSingle = function( fn ){ 
	var result; 
    return function(){ 
         return result || ( result = fn .apply(this, arguments ) ); 
     } 
};
```
## 二.策略模式
1.	背景：一个功能有多种方案选择。但使用嵌套的 `if...else` 会让程序复杂且难以维护。
2.	定义：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换（这是多态性的表现，在 `JavaScript`中表现为它们具有相同的目标和意图，在静态语言中表现为相同的接口）。
3.	在策略模式中，创建表示各种策略的对象和一个行为随着策略对象改变而改变的 `context` 对象。策略对象改变 `context` 对象的执行算法。
4.	典型案例：高阶函数
5.	常见应用：表单验证、动画、根据配置选择不同的功能

<!-- tabs: start -->
#### **不使用策略模式**
```js
function calculate(sign,num1,num2)
{
	if(sign == '+') return num1 + num2
	else if(sign == '-') return num1 - num2
	else if(sign == '*') return num1 * num2
	else if(sign == '/') return num1 / num2
	else console.error('未定义的运算符')
}
```
这样，如果希望再定义一个运算符，则需要再加上一层 `else if`，其拓展性是很差的。
#### **使用策略模式**
```js
let signs = {
	'+': (num1,num2) => num1 + num2,
	'-': (num1,num2) => num1 - num2,
	'*': (num1,num2) => num1 * num2,
	'/': (num1,num2) => num1 / num2,
}
function calculate(sign,num1,num2)
{
	return signs[sign] ? signs[sign](num1,num2) : console.error('未定义的运算符')
}
```
<!-- tabs: end -->

### 优缺点
优点：
1.	策略模式利用组合、委托和多态等技术和思想，可以有效地避免多重条件选择语句。
2.	策略模式提供了对开放—封闭原则的完美支持，将算法封装在独立的 strategy 中，使得它们易于切换，易于理解，易于扩展。
3.	策略模式中的算法也可以复用在系统的其他地方，从而避免许多重复的复制粘贴工作。
4.	在策略模式中利用组合和委托来让 `Context` 拥有执行算法的能力，这也是继承的一种更轻
便的替代方案。

缺点：
1.	增加许多策略类或者策略对象
2.	需要了解所有策略之间的不同点

## 三.代理模式

## 四.迭代器模式

## 五.发布-订阅模式

## 六.命令模式

## 七.组合模式

## 八.模板方法模式

## 九.享元模式

## 十.职责链模式

## 十一.中介者模式

## 十二.装饰者模式

## 十三.状态模式

## 十四.适配器模式

## 参考

1. JavaScript设计模式与开发实践——曾探