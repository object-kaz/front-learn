## 一.函数定义和调用

### 普通函数声明
1.	函数声明

```js
function a(text)
{
	console.log(text)
}
```

2.	函数表达式

```js
var a = function(text){
	console.log(text)
}
```

3.	区别：
	+	函数表达式是在代码执行到达时被创建，并且仅从那一刻起可用。
	+	在函数声明被定义之前，它就可以被调用。

```js
f1() //ok
f() //error
var f = function() {
	console.log(12345)
}

function f1() {
	console.log(123456)
}
```

!> 函数参数不需要加上变量声明的修饰符。

### [ES6]箭头函数
1.	声明一个箭头函数的格式
	+	`(参数表) => 返回值`
	+	`(参数表) => { 函数体 }`

```js
var f = (arg) => arg 
```

2.	箭头函数注意事项：
	1.	不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误。
		
		> 因为箭头函数没有自己的 `this`
		
	2.	不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用 `rest` 参数代替。
	3.	不可以使用 `yield`命令，因此箭头函数不能用作 `Generator` 函数。



### 函数的参数
1.	一般情况下，调用函数时，按顺序传入参数即可。
2.	`JavaScript`不限制函数传入的参数，因此它可以传入任意数量的参数。当相应参数未被输入时，其值为 `undefined`。

```js
a(1)
a(1,2)
a(1,2,3)
```

3.	函数体内有一个额外的关键字 `arguments` 它类似数组（但不是数组），表示当前函数传递的所有参数。
	+	可以用 `arguments.length` 来判断传入参数的数目

```js
function func()
{
	for(arg of arguments) console.log(arg)
}
```

4.	`JavaScript` 不支持函数重载，当使用同一个名字声明另外一个函数时，函数将会被覆盖。

```js
function f(a)
{
	console.log(a)
}

function f(a,b)
{
	console.log(a,b)
}
```

5.	[ES6]  函数参数可以指定默认值。
	+	任意一个参数都可以指定默认值，没有顺序要求。但通常只会把带默认值的参数放到函数参数的右边。

```js
function f(a = 1)
{
	console.log(a)
}
```

6.	[ES6] 可以使用 `...名称` 表示余下的参数 `rest参数`。它只能有一个，且需要放在函数参数表的最后面。
	当函数调用时，`rest参数`会将传入的参数转换成数组。若没有传递参数则为空数组。

```js
function f(a,...args)
{
	console.log(a,args)
}
```

7.	[ES6] 函数的参数也支持解构赋值。


## 二. 闭包
### 概念
闭包就是**能够读取其他函数内部变量的函数**。

在 `javascript` 中，只有函数内部的子函数才能读取局部变量，所以闭包可以理解成“定义在一个函数内部的函数“。

### 应用

1.	实现信息隐蔽
2.	实现生成器
3.	避免全局变量污染
4.	缓存变量

#### 实现信息隐蔽、实现生成器

```js
function createCounter()
{
	let x = 0
	return {
		next: function() {
			x += 1;
			return x;
		}
	}
}
let c = createCounter()
c.next() //1
c.next() //2
c.next() //3
```

这样，就相当于在对象内部封装一个私有变量，对象外部就无法访问 `x` 了。
此外，`x` 可作为迭代变量，`c` 可作为生成器使用。

#### 避免全局变量污染

```js
var init = (function(){
    var a = 1;
    var b = 2;
    return function(){
        console.log(a,b)
    }
})()
init()
```

这样，全局变量里就没有 `a` `b` 。

### 缺点和解决方法
#### 循环中的闭包
```js
function count() {
    var arr = [];
    for (var i=1; i<=3; i++) {
        arr.push(function () {
            return i * i;
        });
    }
    return arr;
}
var results = count()
results[0]() //16
results[1]() //16
results[2]() //16
```
返回的函数引用了变量`i`，但没有立刻执行。等到`3`个函数都返回时，它们所引用的变量`i`已经变成了`4`，因此结果均为`16`。

解决此问题，可以：
1.	改用 `let` 。使用 `let` 语句声明一个变量，该变量的范围限于声明它的块中。在 `for` 循环中，`var` 声明的 `i` 是所在函数的作用域，而 `let`则是 `for` 循环及循环体内的作用域，所以里面的语句可以访问到对应的 `i`。

```js
function count() {
    var arr = [];
    for (let i=1; i<=3; i++) {
        arr.push(function () {
            return i * i;
        });
    }
    return arr;
}
var results = count()
results[0]() //1
results[1]() //4
results[2]() //9
```

2.	增加一个立即调用的闭包。这样在每个立即调用的闭包中，每次调用数组中函数所访问的 `i` 是不一样的。

```js
function count() {
    var arr = [];
    for (let i=1; i<=3; i++) {
    	(function(i){
        	arr.push(function () {
            	return i * i;
        	});    	
    	})(i)
    }
    return arr;
}
var results = count()
results[0]() //1
results[1]() //4
results[2]() //9
```

#### 释放内存
闭包导致原来函数内的被引用变量不会被垃圾回收机制回收，增大内存使用量，容易造成内存泄漏。

解决方法是将不使用的闭包置空：

```js
    function Test1() {
      this.a = 1
    }

    function Test2() {
      this.a = 1
    }

    function closure() {
      var a = new Test1;
      var b = new Test2;
      return function () {
        console.log(a, b)
      }
    }
    var init, result
    init = closure()
    result = init()
    init = null //清理垃圾
```

附：测试涉及闭包的内存管理

在谷歌浏览器开发者工具的 `Memory` 中，可以对 `JavaScript` 的内存状况进行快照。

点击 "调用闭包"按钮时，内存中出现了 `Test1` 和 `Test2` 对象。
点击 "清理垃圾"按钮时，内存中的 `Test1` 和 `Test2` 对象消失。

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=., initial-scale=1.0">
  <title>闭包</title>
</head>

<body>
  <button onclick="init = closure()">调用闭包</button>
  <button onclick="init = null">清理垃圾</button>
  <script>
    function Test1() {
      this.a = 1
    }

    function Test2() {
      this.a = 1
    }

    function closure() {
      var a = new Test1;
      var b = new Test2;
      return function () {
        console.log(a, b)
      }
    }
    var init, result
  </script>
</body>

</html>
```

## [ES6]三.生成器

生成器类似函数，只不过在定义时，`function` 后面加了个 `*` 。

生成器除了`return`语句，还可以用`yield`返回多次。

当成生成器遇到 `yield` 时，会暂停执行，进行一次返回。

### 定义生成器

生成一个斐波那契数列：

```js
function* fib(max = 1000){
    var a=0,b=1
    while(b <= max){
        [a,b]  = [b,a+b]
        yield b
    }
    return
}
```

如果一个对象的属性是 `Generator` 函数，可以简写成下面的形式。
```js
let a = {
  * myGeneratorMethod() {
    //code here
  }
};
```
### 使用生成器

1.	执行`let n = fib(2000)` 创建一个 `Iterator` 对象。
2.	执行 `n.next()` 获取下一个数字，返回格式为：

```js
{
	value: 1,   //当前值
	done: false //是否完成
}
```
3.	最后一次生成时，得到 `value` 为`return`的返回值，`done` 为 `true` 的对象。

```js
function* t(){
	return 0
}
t().next() //{value: 0, done: true}
```

4.	可以用 `for-of` 循环进行迭代，但 `for-of` 语句会忽略 `return`的返回。

```js
for(let v of fib()) console.log(v)
```

5.	`next`方法可以带一个参数，该参数就会被当作上一个`yield`表达式的返回值。
	!> 因此，第一次调用 `next` 时，传入的参数是无效的。

```js
function* f() {
  for(var i = 0; true; i++) {
    var reset = yield i;
    if(reset) { i = -1; }
  }
}

var g = f();

g.next() // { value: 0, done: false }
g.next() // { value: 1, done: false }
g.next(true) // { value: 0, done: false }
```

6.	`Generator` 对象的`throw`方法：可以将函数体外抛出的错误转移到 `Generator`函数体内捕获。
	+	`throw` 方法抛出的错误要被内部捕获，前提是必须至少执行过一次 `next` 方法。
	+	`throw`方法被捕获以后，会附带执行下一条 `yield` 表达式。
	+	一旦 `Generator` 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用`next`方法，将返回一个`value`属性等于`undefined`、`done`属性等于`true`的对象。

7.	`Generator` 对象的`return`方法：返回给定的值，并且终结遍历 `Generator` 函数。
	
	> 如果`Generator` 函数内部有`try...finally`代码块，且正在执行`try`代码块，那么`return`方法会导致立刻进入`finally`代码块，执行完以后，整个函数才会结束。

```js
function* gen() {
	let i = 0
	while(true)
	{
		yield ++i
	}
}
var g = gen();
g.next()        // { value: 1, done: false }
g.return(2333) // { value: 23333, done: true }
g.next()        // { value: undefined, done: true }
```

8.	`yield*` 表达式可以在一个 `Generator` 函数里面执行另一个 `Generator` 函数，或者遍历有 `Iterator` 接口的数据结构。

```js
function* gen(){
  yield* ["a", "b", "c"];
}

gen().next() // { value:"a", done:false }
```

### 生成器函数与面向对象
1.	`Generator` 函数返回的遍历器继承了 `Generator` 函数的 `prototype` 对象上的属性和方法。
2.	`Generator` 函数调用时不会构造对象，里面的 `this` 指向函数调用所在对象。
3.	`Generator` 函数不能跟`new`命令一起用。

### 生成器的应用
#### 异步操作的同步化表达

优点：执行过程清晰

```js
function* load() {
  showLoading(); //显示加载中的 UI
  yield loadData(); //加载数据
  hideLoading(); //隐藏加载中的 UI
}
var loader = load();
// 加载加载中的UI
loader.next()

function loadData()
{
	ajax("https://xxx.xxx/",(res) => {
		//数据处理...
		// 卸载加载中的UI
		loader.next()		
	})
}

```

#### 控制流管理
将多个操作写进生成器，再使用一个生成器进行管理。


```js
//将回调函数改成直线执行
function* longRunningTask(value1) {
  try {
    var value2 = yield step1(value1);
    var value3 = yield step2(value2);
    var value4 = yield step3(value3);
    var value5 = yield step4(value4);
    // Do something with value4
  } catch (e) {
    // Handle any error from step1 through step4
  }
}

//使用一个函数，按照次序执行步骤
scheduler(longRunningTask(initialValue));

function scheduler(task) {
  var taskObj = task.next(task.value);
  // 如果Generator函数未结束，就继续调用
  if (!taskObj.done) {
    task.value = taskObj.value
    scheduler(task);
  }
}
```
#### 部署 Iterator接口
```js
let a = {
    *[Symbol.iterator]() {
        let i = 0
        while(i <= 100) yield ++i
        return
    }
}

for(v of a) console.log(v) //输出前100个值
```

#### 作为数据结构使用
`Generator` 可以看作是一个类似数组的结构，用于 `for` 循环。

## 四.函数中的 `this`

### this的指向
1.	普通函数：
	+	在浏览器环境下， `this` 会指向 `window`；
	+	在 `Nodejs`环境下，`this` 会指向 `global`;
	+	在严格模式下，`this` 会指向 `undefined`

<!-- tabs:start -->
#### **普通模式**
```js
var a = function(){
	console.log(this)
}
a()
```

#### **严格模式**
```js
'use strict';
function b(){
	console.log(this)
}
b()
```
<!-- tabs:end -->

2.	使用 `function`声明的方法：`this`指向其调用时所在对象

```js
'use strict';
let obj = {
	func(){
		console.log(this)
	}	
}

obj.func() //{func: ƒ}

let func = obj.func
func() //undefined

let obj1 = {a:1,b:2,c:func}
obj1.c() //{a: 1, b: 2, c: ƒ}
```
3.	构造函数中的`this`：指向新构造的对象

```js
let A = function (){
	console.log(this) //A {}
}
new A()
```

4.	使用箭头函数声明的方法：箭头函数没有自己的 `this`，其`this`为箭头函数外的 `this`。

```js
'use strict';
let obj = {
	func: () => {
		console.log(this)
	}	
}

obj.func() //Window对象

let func = obj.func
func() //Window对象

let obj1 = {a:1,b:2,c:func}
obj1.c() //Window对象

let A = function (){
	this.a = () => {console.log(this)}
}
let a = (new A()).a
a() //A {a: ƒ}
```

5.	`Generator` 函数调用时不会构造对象，里面的 `this` 指向函数调用所在对象。

### 修改 `this` 的指向

!> 对于箭头函数，这些函数的第一个的参数是不起作用的

!>若`number`和`string`作为第一个参数，则会转换成对象

#### 函数名的`apply`和 `call` 方法
`apply`和 `call` 用来修改 `this` 指向，并调用函数。

+	`apply`的第一个参数为 `this` 的指向，第二个参数为函数参数构成的数组。
+	`call` 的第一个参数为 `this` 的指向，其余的参数为函数参数。

```js
function a(x,y)
{
	console.log(this,x,y)
}

a.apply(0,[1,2])
a.call(0,1,2)
```

#### 函数名的`bind` 方法
`apply`和 `call` 用来修改 `this` 指向，并生成一个新函数，其参数为 `bind` 函数未传递的参数。

`bind` 的第一个参数为 `this` 的指向，其余的参数为函数参数。

```js
function a(x,y)
{
	console.log(this,x,y)
}

a.bind(0,1)(2)
```


参考：

廖雪峰的官方网站——https://www.liaoxuefeng.com/wiki/1022910821149312/1023021250770016

知乎——https://www.zhihu.com/question/19554716

JiaXinYi 在segmentfault——https://segmentfault.com/a/1190000013827309

阮一峰ES6教程——https://es6.ruanyifeng.com/#docs/generator