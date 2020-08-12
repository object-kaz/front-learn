## 一.JS概述
js是一种能够运行在浏览器、服务端等搭载JavaScript引擎的脚本语言。

浏览器中嵌入了 JavaScript 引擎，有时也称作 JavaScript 虚拟机。

### JavaScript 引擎

- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) —— Chrome 和 Opera 中的 JavaScript 引擎。
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) —— Firefox 中的 JavaScript 引擎。
- Trident、Chakra：用于不同版本的 IE
- ChakraCore：用于 Microsoft Edge
- Nitro、SquirrelFish：用于 Safari

### 编译到 JavaScript 的语言

- [CoffeeScript](http://coffeescript.org/) ： JavaScript 的语法糖，语法简短，明确简洁。
- [TypeScript](http://www.typescriptlang.org/) ：增加严格的数据类型。简化开发，用于开发复杂的系统。由微软开发。
- [Flow](http://flow.org/) 以一种不同的方式添加了数据类型。由 Facebook 开发。
- [Dart](https://www.dartlang.org/) ：它拥有自己的引擎用于在非浏览器环境中运行。由 Google 开发。

### 兼容性问题
+	http://caniuse.com —— 每个功能都列有一个支持信息表格
+	https://kangax.github.io/compat-table —— 一份列有语言功能以及引擎是否支持这些功能的表格

### 严格模式
1.	`"use strict";` 命令用于开启严格模式。
2.	严格模式是现代的，对以往错误特性的修改。
3.	`"use strict";` 命令只能放在函数或文件开头处。前面不能有 任何可执行语句。
4.	`"use strict";` 命令是不可撤销的。

## 二.运行和编写JS代码
### 面向浏览器
1.	行内式：在HTML事件中插入单行或少量JS代码
2.	内嵌式 ：将多行JS代码写到 `script` 标签中
3.	从HTML引入外部JS文件 ：`<script>src="my.js"></script>`     适合于JS 代码量比较大的情况 

### 面向Node.js
需要安装 Node.js。
```
node 文件名
```

## 三.简易的输入输出
### 通用环境
> 浏览器环境下，按 `F12` 打开控制台。

| **方法**         | **说明**                       |
| ---------------- | ------------------------------ |
| `console.log(msg)`     | 向控制台记录信息               |
| `console.error(msg)`   | 向控制台记录错误信息 |
| `console.warn(msg)` | 向控制台记录警告信息       |

### 浏览器环境

| **方法**           | **说明**                       |
| ------------------ | ------------------------------ |
| `alert(msg)`       | 浏览器弹出警示框               |
| `prompt(info)`     | 浏览器弹出输入框，用户可以输入 |

## 四.变量与常量
js是一种弱类型语言，不用提前声明变量的类型，在程序运行过程中，类型会被自动确定。

### 变量
使用 `var` 关键字声明一个变量。

变量名规则：
+	英文、数字、$和\_的组合
+	不能用数字开头
+	不能是JavaScript的关键字
+	区分大小写

<!-- tabs:start -->
#### **代码**
```js
 //声明一个名为age的变量 
 var age;
// 给 age 变量赋值为 20   
 age = 20; 
// 声明一个变量并赋值，称之为变量的初始化
 var age = 88;  
```
<!-- tabs:end -->

### [ES6] `const` 关键字

使用 `const` 关键字声明一个常量。

<!-- tabs:start -->
#### **代码**
```js
const age = 88;  
```
<!-- tabs:end -->

### [ES6] `let` 关键字
使用 `let` 关键字声明一个变量

<!-- tabs:start -->
#### **代码**
```js
let age = 18;
```
<!-- tabs:end -->

### 变量的作用域
1.	用 `var` 声明的变量，只有局部作用域（函数内部）和全局作用域，但没有块作用域：

<!-- tabs:start -->
#### **代码**
```js
function f() {
    for (var i=0; i<100; i++) {
        //code here
    }
    i += 100; // 仍然可以引用变量i
}
```
<!-- tabs:end -->

2.	用 `let` 和 `const` 声明的变(常)量，具有块作用域、局部作用域（函数内部）和全局作用域：

	> 实际上，`let` 关键字的出现就是为了解决块作用域的问题。
	

<!-- tabs:start -->
#### **代码**
```js
function f() {
    for (let i=0; i<100; i++) {
        //code here
    }
    i += 100; // 这里会报错
}
```
<!-- tabs:end -->

3.	在非严格模式下，不使用 `var` `let` `const` 声明的变量默认为全局变量。

## 五.语句
语句是执行行为的语法结构和命令。
### 分号

1.	每个语句以`;`结束，语句块用`{...}`。
2.	`JavaScript`并不强制要求在每个语句的结尾加`;`，`JavaScript`  引擎会自动识别并在每个语句的结尾补上`;`。但存在识别出现问题的地方。


<!-- tabs:start -->
#### **错误案例**
```js
alert("There will be an error")

[3, 4].forEach(alert)
```
引擎会自动识别成：
```js
alert("There will be an error")[3, 4].forEach(alert)
```
就会报错。
<!-- tabs:end -->

### 注释
1.	尾注释 `//123456`
2.	多行注释 `/*123456*/`
3.	不支持注释嵌套。

### `if-else` 语句
其语法和`C`语言是一样的。

### `switch` 语句
其语法和`C`语言是基本一样的。

但`js`可以将任意类型的变量和常量作为条件， `case`后面也可以接变量。

!> 注意不加 `break;`会导致代码继续向下执行。

?> 通常情况下， `switch` 可以使用对象数组或`Map`进行代替。

### `while`、`do-while`、`for` 语句
其语法和 `C` 语言也是一样的。

### 标号、`break`、`continue`

1.	标号通常用来标记一个循环或语句块。

2.	在循环中，可以在`break`、`continue`语句后面可以添加标号。
3.	在语句块中，可以在`break`语句后面可以添加标号。（不能使用`continue`）
4.	不能在严格模式下，标记函数和生成器函数。

<!-- tabs:start -->
#### **break跳出外层循环**
```js
loop1:
for(let i = 0; i < 3; i++)
{
	for(let j = 0; j < 3; j++)
	{
		if(i==1) break loop1
		console.log(i,j)
	}
}
```
运行结果：
```js
0 0
0 1
0 2
```
#### **continue跳过外层的本次循环**
```js
loop1:
for(let i = 0; i < 3; i++)
{
	for(let j = 0; j < 3; j++)
	{
		if(i==1) continue loop1
		console.log(i,j)
	}
}
```
运行结果：
```js
0 0
0 1
0 2
2 0
2 1
2 2
```

#### **语句块中使用 break**

> 通常使用异常处理代替这样的语句

```js
a: {
	console.log('a')
	break a
	console.log('b')
}
console.log('c')
```
运行结果：
```js
a
c
```
<!-- tabs:end -->

### `for-in`语句
1.	用途:
	+	遍历对象的属性名称
	+	**遍历数组的下标**

2.	格式 `for(let i in 数组/对象) 语句`

<!-- tabs:start -->

#### **代码**
```js
for(var i in [1,2,3]) console.log(i)
```
#### **运行结果**
```js
0
1
2
```
<!-- tabs:end -->

> 一个数组实际上也是一个对象，它的每个元素的索引被视为一个属性。用户在数组对象加上的属性会被遍历出来，但内置的 `length` 属性不会遍历出来。

### [ES6]`for-of`语句
1.	用途
   +	**遍历可迭代对象（数组、`Map`、`Set`等）的值**

2.	格式 `for(var i of 对象) 语句`

<!-- tabs:start -->
#### **代码**
```js
for(var i of [1,2,3]) console.log(i)
```
#### **运行结果**
```js
1
2
3
```
<!-- tabs:end -->



## 参考资料

1.	现代JavaScript教程——JavaScript简介——https://zh.javascript.info/intro
2.	现代JavaScript教程——代码结构——https://zh.javascript.info/structure