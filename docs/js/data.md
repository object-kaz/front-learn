JavaScript的语言类型分为 `undefined`、`null`、`Boolean`、`BigInt`、`String`、`Number`、`Symbol`、`Object`。

其中， `undefined`、`null`、`Symbol`、`Boolean`、`String`、`Number`、`BigInt`称为原始类型(*primitive type*)。

## 一.null和undefined
`null` 和 `undefined` 是非常相似的两个值。

### 本身的区别和联系
区别：
1.	`undefined`是`Undefined`类型的唯一值。转换成`Number`后为`NaN`。`typeof undefined` 为 `undefined`
2.	`null` 是  `Null` 类型的唯一值。转换成`Number`后为`0`。`typeof null` 为 `Object`

联系：
值 `undefined` 实际上是从值 `null` 派生来的，因此 `ECMAScript` 把它们定义为相等的。

### 功能上的区别
#### `null`
表示没有值。它可以作为函数的参数，也可以作为对象原型链的终点。

#### `undefined`
表示缺少值。（这里应该有个值，但没有定义）

1.	变量声明了，但没有赋值，变量值就是 `undefined`
2.	调用函数时，没有传递值的参数就是 `undefined`
3.	对象没有赋值的属性，属性值就是 `undefined`
4.	函数没有返回值时，默认返回 `undefined`

>参考：http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html

## 二.Number

JavaScript不区分整数和浮点数，统一使用 `Number` 表示。

### 合法的`Number`表示
1.	整数 `123`
2.	负数 `-123`
3.	进制整数 `0x123` `0123`
4.	浮点数 `0.123`
5.	浮点数(科学计数法表示) `1.23e4.5`
6.	不可计算的数字 `NaN`
7.	无穷 `Infinity`
8.	`Number`对象 `new Number(num:Number)`

### `Number`常用操作
1.	四舍五入，结果为字符串  `num.toFixed(小数位数 = 0)`
2.	转字符串  `num.toString()`
2.	绝对值， `Math.abs(num: Number)`
3.	常量`Math.PI` `Math.E`
4.	向上取整 `Math.ceil(num: Number)`
5.	向下取整 `Math.floor(num: Number)`
6.	开方 `Math.sqrt(num: Number)`
7.	乘幂 `Math.powt(x: Number,y: Number)`
7.	三角函数，弧度表示 `Math.sin(num: Number)` `Math.cos(num: Number)` `Math.tan(num: Number)`
8.	取随机数，返回值在 `0-1` 之间 `Math.random()`
9.	判断 `NaN` `isNaN(x)`

### 其他数据到Number的转换
|类型|转换方法|
|----|----|
|`String`|忽略首尾空格，其余部分若不能转换（比如有其他字符和空格），则为 `NaN`。其中 `''`转换成 `0`。|
|`Boolean`|`true`转换成 `1` ，`false`转换成 `0`。|
|`Array`|空数组：转换成 `0`。1个元素的数组：将唯一的元素转换成 `Number`。 超过1个元素的数组：`NaN`|
|`Object`|转换成 `NaN`|
|`null`|转换成 `0`|
|`undefined`|转换成 `NaN`|

## 三.BigInt

!> 这是一个新特性，引擎可能不支持。

`BigInt` 是一种特殊的数字类型，它提供了对任意长度整数的支持。

### 合法的BigInt表示
1.	整数后面加 `n`: `12345n`
2.	调用 `BigInt` 函数：`BigInt(123456)`

### BigInt 运算和比较
1.	`BigInt` 不支持一元加法：`+1n` 是错误的。
2.	`BigInt` 之间的除法返回 `BigInt`，**小数位将被舍去**： `5n/2n = 2`
3.	`BigInt`不能和 `Number` 一起参与运算，除非进行显式转换：`5n+2` 是错误的。
4.	`BigInt`转换成 `Number`时 ，如果 `BigInt` 太大而`Number`类型无法容纳，则会截断多余的位。
5.	`BigInt`可以和 `Number` 进行比较。

## 四.Boolean

### 合法的`Boolean`表示
1.	`true` 真
2.	`false` 假
3.	`Boolean`对象 `new Boolean()`。


### 其他数据到 `Boolean`的转换

当其他数据转换成 `Boolean`时，下面的值会转换成 `false`，其余会转换成 `true`:

|值|说明|
|----|----|
|`undefined`|未定义|
|`null`|空|
|`0`|0|
|`NaN`|不可计算的数字|
|`''`|空字符串|

!> `'0'` 和`' '`会转换成 `true`

需要注意的是，任何数组和对象都会转换成 `true`，例如：

<!-- tabs:start -->

#### **代码**
```js
if(new Boolean(false)) console.log('new Boolean(false) 是 true')
if(new Number(0)) console.log('new Number(0) 是 true')
```
#### **运行结果**
```js
new Boolean(false) 是 true
new Number(0) 是 true
```

<!-- tabs:end -->

## 五.String
1.	JavaScript的字符串就是用`''`或`""`括起来的字符表示。
2.	在 JavaScript 中，文本数据被以字符串形式存储，单个字符没有单独的类型。
3.	字符串是不可变的。

### 字符表示
+	ASCII码十六进制表示 ：`'\x41'` 等同 'A'
+	Unicode十六进制表示：'\u####'
+	转义

### [ES6]模板字符串
#### 特性
1.	支持多行表示

```js
var str = `hello
world`
```

2.	内部的`${name}` 会自动替换成 `name` 变量。

```js
var name = "Li Mei";
var str = `Dear \\${ name }`;/*Dear \Li Mei*/
```


#### 带标签的模板字符串
1.	标签使得我们可以用函数解析模板字符串。
2.	标签函数的第一个参数`strings`包含一个字符串值的数组。其余的参数与表达式相关。
3.	`strings`存在一个特殊的属性 `raw` ，可以通过它来访问模板字符串的原始字符串，而不经过特殊字符的替换。
4.	标签函数不一定需要返回字符串。

```js
function myTag(strings,id)
{
	let ids = ["baidu","tencent","bytedance","huawei","alibaba"]
	return strings[0] + ids[id] + strings[1]
}
let id = 1;
console.log(myTag`ID:\\${ id }`);
```


### 字符串常用操作

!> 这些方法不会修改现有的字符串，而是返回新的字符串。

#### 访问字符
使用下标运算符：`str[0]`，返回值为新的字符串。

!> 这是一个只读操作，如果尝试通过此方法修改字符串将不会有任何效果。（也不会报错）

#### 获取长度
`str.length` 返回字符串的长度。

#### 大小写转换

|函数|说明|
|----|----|
|`str.toUpperCase()`|转大写|
|`str.toLowerCase()`|转大写|

#### 搜索

|函数|说明|
|----|----|
|`str.indexOf(str,start)`|返回`str`第一次出现的索引。第二个参数为起始位置。|
|`str.lastIndexOf(str,start)`|返回`str`最后一次出现的索引。第二个参数为起始位置。|
|`str.search(str)`|返回`str`第一次出现的索引。|

当搜索失败时，这三个函数会返回 `-1`。

<!-- tabs:start -->

#### **代码**
```js
"hello world".indexOf('hello')
```
#### **运行结果**
```js
0
```

<!-- tabs:end -->

#### 获取子串

|函数|支持负索引|说明|
|----|----|----|
|`str.slice(start, end)`|支持|取子串。第一个参数为起始位置（默认为字符串起始位置），第二个参数为终止位置（不包含，默认为字符串结尾）。|
|`str.substring(start, end)`|不支持|取子串。第一个参数为起始位置（默认为字符串起始位置），第二个参数为终止位置（不包含，默认为字符串结尾）。|
|`str.substr(start, length)`|支持|取子串。第一个参数为起始位置（默认为字符串起始位置），第二个参数为长度（默认为到字符串结尾的长度）。|


<!-- tabs:start -->

#### **代码**
```js
"hello world".substring(0,5)
"hello world".substring(6)
"hello world".substring()

"hello world".slice(0,5)
"hello world".slice(-5)
"hello world".slice()

"hello world".substr(0,5)
"hello world".substr(-5)
"hello world".substr()
```
#### **运行结果**
```js
"hello"
"world"
"hello world"
"hello"
"world"
"hello world"
"hello"
"world"
"hello world"
```

<!-- tabs:end -->

#### 替换
`str.replace(原部分，新部分)` 用于将字符串中的原部分子串转换成新部分的子串。

#### 连接
1.	使用 `+` 将多个不同的字符串连接起来。 
	
	

<!-- tabs:start -->

#### **代码**
```js
"2+3="+2+3
2+3+"=2+3"
```
#### **运行结果**
```js
"2+3=23"
"5=2+3"
```

<!-- tabs:end -->

2.	使用 `str.concat` 连接一个或多个字符串。

<!-- tabs:start -->

#### **代码**
```js
"".concat("hello"," ","world")
```
#### **运行结果**
```js
"hello world"
```

<!-- tabs:end -->

#### 清理首尾空白
`str.trim`用于清理字符串首尾的空白。

#### 分割
`str.split(sep)`用于将字符串按照 `sep` 分割成数组。若 `sep` 为空，则按字符分割。

<!-- tabs:start -->

#### **代码**
```js
"hello world".split("")
"hello world".split(" ")
```
#### **运行结果**
```js
(11) ["h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d"]
(2) ["hello", "world"]
```

<!-- tabs:end -->

## [ES6]六.Symbol

`Symbol`用于表示一个独一无二的值，可以作为对象的属性。

### 创建Symbol
使用 `Symbol`函数创建一个 `Symbol`：
```js
let s1=Symbol()
let s2=Symbol('abc') //使用字符串标识

//两个参数不同的Symbol是不同的
Symbol('abc') == Symbol('abc') //false
```

!> 不能使用 `new` 来创建 `Symbol`

### Symbol的操作
#### 转换成其他值
1.	`Symbol` 值不能与其他类型的值进行运算，也不能隐式转换成其他值。
2.	`Symbol` 值可以显式转换成 `boolean` 和 `string`，但不能转换成数值：

```js
Symbol('hi').toString() //"Symbol(hi)"
Boolean(Symbol('hello')) //true
```

#### Symbol.for
它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 `Symbol` 值。如果有，就返回这个 `Symbol` 值，否则就新建一个以该字符串为名称的 `Symbol` 值，并将其注册到全局。

```js
let s1 = Symbol.for('kaz');
let s2 = Symbol.for('kaz');

s1 === s2 // true
```

`Symbol.for` 和 `Symbol` 的区别：
1.	`Symbol.for` 会对参数进行登记，来实现搜索。`Symbol` 不会对参数进行登记，所以尽管参数相同，其值也不同。
2.	 对于相同的参数名，`Symbol.for`只会生成一个 `Symbol`。而`Symbol` 每次都会生成一个新的`Symbol`。

#### Symbol.keyFor
返回一个已登记的 `Symbol` 类型值的 `key`。只支持 `Symbol.for` 创建的 `Symbol`。

```js
let s1 = Symbol.for('kaz');
let s2 = Symbol.for('kaz');
Symbol.keyFor(s2) //'kaz'
```

### Symbol的应用
#### 作为对象属性的标识符
由于每一个 `Symbol` 值都是不相等的，这意味着 `Symbol` 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。

```js
let name = Symbol();

let o = {};
o[name] = 'kaz'; //中括号赋值

let o1 = {
	[name]: 'kaz' //对象构造时赋值
}
```

#### 定义一组常量
```js
let type = {
	info: Symbol(),
	warning: Symbol(),
	danger: Symbol(),
}
```

#### 避免常规遍历
以 `Symbol` 值作为键名，不会被`for-in`、`Object.getOwnPropertyNames()`得到，而需要使用 `Object.getOwnPropertySymbols()`得到。

## 七.运算

### 算术运算和位运算

大多数数学计算的行为与其他语言基本一致。

+	算术运算： `+`、`-`、`*`、`/`、`%`、`**`(ES6,幂运算)
+	自增自减运算：`++`、`--`
+	位运算：`&`(或)、`|`(与)、`^`(异或)、`~`(非)、`<<`(左移位)、`>>`(右移位)、`>>>`(无符号右移位)
+	复合赋值：如`+=`
+	逗号：`,`

一些特性：

1.	0相除为非数字 `0/0=NaN`
2.	数字除以0为无穷大 `2/0=Infinity`
3.	浮点数可以取余 `10.5%3=1.5`
4.	整数除法可以得到浮点数 `5/2=2.5`
5.	使用 `+` 可以把其他类型的数据转换成 `Number`
6.	`++` 和 `--` 只能用于变量，且有前后置的区别。
7.	`++` 和 `--` 比大多数算术运算优先级高。
8.	位运算符把运算元当做 32 位整数，并在它们的二进制表现形式上操作。
9.	字符串和数字相加，数字在左边时，进行数学运算；数字在字符串右边时，进行字符串连接运算。

### `==`和 `===`

|运算符|说明|
|----|----|
|`==`|先转换数据类型，再比较。这容易出现 **奇葩事件**。|
|[ES6]`===`|如果数据类型不一致，返回 `false`，如果一致，再比较。|

### `String` 和 `Number`的比较

1.	转换成同一类型，比较其值。
2.	字符串按照 `Unicode` 编码，逐个字符比较。

```js
'' == 0 //true
'0' == 0 //true
/*
 * 上面是一个奇葩，因为 0 代表 false，'0'代表 false
 */
'123' == 123 //true
'123a' == 123 //false
```

### 数组、对象和函数的比较
指向同一实例时相等，否则不相等,且没有大于小于的区别。

?> 这种情况下，`==`和`===`的行为是一致的

```js
[] == [] //false
[] == {} //false
{} == {} //false
var o = {},p = o
o == p //true

o >= p //true
```

### 数组、对象和字符串、数字的比较
数组、对象和字符串：数组、对象先转字符串，再比较。
	
数组、对象和数字：数组、对象先转字符串，再转 `Number` ，最后比较。

```js
({}).toString() //"[object Object]"
{} == "[object Object]" //true

Number(({}).toString()) //NaN
{} == 0 //false

[].toString() //""
[] == "" //true

Number([].toString()) //0
[] == 0 //true
```

### `null`、`undefined`、`NaN`
+	`null` 仅等同于`null`和`undefined`
+	`undefined` 仅等同于`null`和`undefined`。 `undefined` 和任何数字比较均为 `false`
+	`NaN` 和任何值都不相等，包括自己
+	使用 `==` 比较时，`null`和`undefined`不会转换成任何类型。但使用类似 `>` 的符号时，会转换成数字或字符串。


```js
null == null //true
undefined == undefined //true 因为undefined 是从 null 中派生出来的，所以把它们定义为相等的
undefined == null //true
undefined === null //false

NaN == NaN //false

null >= 0 //true 因为转换成了 0>=0
null == 0 //false 
```

### 逻辑运算符
在`JavaScript`中，逻辑运算符不一定返回 `Boolean`:

|运算符|说明|
|----|----|
|`a && b`(与操作寻找第一个假值)|当 `a` 为真时，返回 `b`,否则返回 `false`|
|`a \|\| b`(或运算寻找第一个真值)|当 `a` 为真时，返回 `a`；若 `a`为假，`b` 为真，返回 `b`;否则返回 `false`|
|`a ?? b`(空值合并)|当 `a` 为非 `null` 和 `undefined` 时，返回 `a`,否则返回 `b`|

?> 与运算 `&&` 的优先级比或运算 `||` 要高。

!> 空值合并运算符是一个新的特性，浏览器可能不支持


空值合并运算符：
1.	`??` 运算符被用于为变量分配默认值
2.	不能 将`??` 运算符与 `&&` 和 `||` 运算符一起使用
2.	空值合并的判断条件为变量是否不为`null` 和 `undefined`;或运算符的判断条件为为变量是否为真

<!-- tabs:start -->

#### **代码**
```js
var obj = {}
console.log(true && obj)
console.log(obj && true)
console.log(true || obj)
console.log(obj || true)
console.log(false || obj)
```
#### **运行结果**
```js
{}
true
true
{}
{}
```

#### **空值合并运算符与 || 的区别**
```js
let height = 0

height || 100 // 100
height ?? 100 // 0
```
<!-- tabs:end -->

## 八.数据类型判断
`typeof` 运算符返回参数的类型（字符串小写表示）。

其返回值有：`undefined`、`number`、`bigint`、`boolean`、`string`、`symbol`、`object`、`function`

1.	`function`隶属于 `object`，但在 `typeof` 运算符被单独区分。
2.	`null` 的返回是 `object`。（这实际上是早期的错误，因兼容性而保留下来）

```js
typeof undefined // "undefined"
typeof 0 // "number"
typeof 10n // "bigint"
typeof true // "boolean"
typeof "foo" // "string"
typeof Symbol("id") // "symbol"
typeof Math // "object"
typeof null // "object"
typeof alert // "function"
```

## 参考
1.	现代JavaScript教程——数据类型：https://zh.javascript.info/types