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
1.	概念：代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问
2.	核心：当客户不方便直接访问一个对象或者不满足需要的时候，提供一个替身对象来控制对这个对象的访问，客户实际上访问的是替身对象。替身对象对请求做出一些处理之后，再把请求转交给本体对象。
3.	类型：
	+	保护代理：控制不同权限的对象对目标对象的访问。
	+	虚拟代理：控制访问创建开销大的资源。
	+	缓存代理：为一些开销大的运算结果提供暂时的存储，在下次运算时，如果传递进来的参数跟之前一致，则可以直接返回前面存储的运算结果。
4.	优点：基本上不需要改变被代理的对象，通过代理行为，为系统添加了新的行为。
5.	要求：代理对象和被代理对象在接口上一致。其优点：
	+	用户可以放心地请求代理，他只关心是否能得到想要的结果
	+	在任何使用本体的地方都可以替换成使用代理
6.	典型实现： `Proxy`
7.	应用：
	+	用访问器属性代理数据属性实现数据响应式
	+	延迟加载开销大的数据（如大图、很大的的 `js` 文件）
	+	缓存开销大的算法结果

#### 实例：图片懒加载
<!-- tabs: start -->
#### **不使用代理**
```js
var MyImage = (function(){ 
 var imgNode = document.createElement( 'img' ); 
 document.body.appendChild( imgNode ); 
 var img = new Image; 
 img.onload = function(){ 
 	imgNode.src = img.src; 
 }; 
 return { 
 setSrc: function( src ){ 
 		imgNode.src = 'loading.gif'; 
 		img.src = src; 
 	} 
 } 
})(); 
MyImage.setSrc( 'https://wwww.xxx.com/img.gif' );
```
缺点：`MyImage` 对象不仅负责设置属性，还要负责加载图片，不利于单一职责原则。

#### **使用代理**
```js
var myImage = (function(){ 
 var imgNode = document.createElement( 'img' ); 
 document.body.appendChild( imgNode ); 
 return { 
 	setSrc: function( src ){ 
 		imgNode.src = src; 
 	} 
 } 
})(); 
var proxyImage = (function(){ 
 var img = new Image; 
 img.onload = function(){ 
 	myImage.setSrc( this.src ); 
 } 
 return { 
 	setSrc: function( src ){ 
 		myImage.setSrc( 'loading.gif' ); 
 		img.src = src; 
 	} 
 } 
})(); 
proxyImage.setSrc( 'https://wwww.xxx.com/img.gif' );
```
优点：设置属性和负责加载图片分布在两个对象中，当不再需要预加载时，可以直接把工作移交给本体。

<!-- tabs: end -->

#### 实例：缓存代理

```js
//计算阶乘
function fact(n)
{
	return n > 1 ? n * fact(n-1) : 1
}

//带缓存的代理函数
let cachedFact = (function(){
	let cache = new Map()
	return function(n){
		if(!cache.has(n))
			cache.set(n,fact(n))
		return cache.get(n)
	}
})()

```


## 四.迭代器模式
1.	概念：迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。
2.	顺序：正序、倒序

### 内部迭代器
1.	概念：函数内部已经定义好了迭代规则，它完全接手整个迭代过程。外部只需要一次初始调用。

2.	优点：调用方便、无需关注内部实现

3.	缺点：外部无法干涉内部的迭代规则，如迭代到某一对象时终止。
4.	典型实现：迭代器接口 `Symbol.iterator`、数组操作 `map` `reduce` `filter`

#### 示例：迭代一个数组
```js
let each = function(array,callback) {
	for(let i in array)
		callback(array[i], i, array)
}
each([1,3,5,7,9],(val, i, array) => console.log(val,i,array))
```

#### 示例：迭代一个链表
```js
function Node(data,next = null){
	this.next = next
	this.data = data
}

function LinkedList(array = []){
	let lastNode = null
	this.head = null
	this.length = array.length
	for(let data of array) {
		if(!this.head) lastNode = this.head = new Node(data)
		else {
			lastNode.next = new Node(data)
			lastNode = lastNode.next
		}
	}
}

LinkedList.prototype.each = function(callback) {
	let current = this.head
	let i = 0
	while(current != null){
		callback(current.data, i, this)
		i++
		current = current.next
	}
}
new LinkedList([1,3,5,7,9]).each((val, i, list) => console.log(val,i,list))
```
### 外部迭代器
1.	外部迭代器必须显式地请求迭代下一个元素。
2.	优点：增强了迭代器的灵活性，可以手工控制迭代过程
3.	缺点：增加了一些调用的复杂度
4.	典型实现： `Generator`

#### 示例：迭代一个链表
```js
function Node(data,next = null){
	this.next = next
	this.data = data
}

function LinkedList(array = []){
	let lastNode = null
	this.head = null
	this.length = array.length
	for(let data of array) {
		if(!this.head) lastNode = this.head = new Node(data)
		else {
			lastNode.next = new Node(data)
			lastNode = lastNode.next
		}
	}
}

LinkedList.prototype.values = function*() {
	let current = this.head
	let i = 0
	while(current != null){
		yield current.data
		i++
		current = current.next
	}
}
new LinkedList([1,3,5,7,9]).values().next()
```
### 终止迭代器
1.	提供一种跳出迭代器循环的方法。
2.	典型实现： `Generator`对象的 `return` 方法，`break`

## 五.发布-订阅模式(观察者模式)
1.	概念：定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。
2.	在`JavaScript`中，通常用事件模型代替发布-订阅模式。
3.	优点：
	+	时间解耦合：不必一直监听对象状态改变。当对象状态改变时，相关函数会自动执行。
	+	对于异步调用，可以选择用户需要的事件进行订阅，而不必传入很多的回调。
	+	可以添加无限的订阅者，而无需修改原对象的代码。
	+	只要事件名不改变，发布者内部代码的修改不影响订阅者。
	+	对象解耦合：多个对象可以自由地联系到一起。
	+	可以实现对象之间的通信。
4.	缺点：对象与对象之间的联系较弱，不容易跟踪 `bug`。
5.	全局发布、订阅模式：事件对象作为中介，联系订阅者和发布者。
	+	缺点：对象与对象之间的联系不清晰。
6.	先发布，后订阅：建立一个存放离线事件的堆栈，当事件发布的时候，如果此时还没有订阅者来订阅这个事件，我们暂时把发布事件的动作包裹在一个函数里，这些包装函数将被存入堆栈中，等到终于有对象来订阅此事件的时候，我们将遍历堆栈并且依次执行这些包装函数，也就是重新发布里面的事件。
7.	推模型和拉模型：
	+	推模型：在事件发生时，发布者一次性把所有更改的状态和数据都推送给订阅者
	+	拉模型：发布者仅仅通知订阅者事件已经发生了，此外发布者要提供一些公开的接口供订阅者来主动拉取数据。
8.	典型实现： `Promise`、浏览器的事件系统

#### 案例：事件系统
事件系统的一个实现：[event.js](https://gitee.com/pikoyo/front-learn/tree/master/src/js/event.js)

## 六.命令模式

### 应用场景
有时候需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是什么，此时希望用一种松耦合的方式来设计软件，使得**请求发送者和请求接收者能够消除彼此之间的耦合关系**。

### 组成部分
1.	命令对象（command）：需要执行的命令都在此声明
2.	委托者（client）：创建命令对象，并且设置命令对象的接收者
3.	调用者（invoker）：使用命令对象并调用它上面的方法
4.	接受者（receiver）：实际干活的角色，命令传递到这里被实际执行

简单的命令模式一般只区分开调用者、接受者和命令对象。

### 

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