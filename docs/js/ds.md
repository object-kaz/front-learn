

## [ES6]一.可迭代对象

`Array`、`Map`和`Set`属于`iterable`（可迭代对象）类型。

可迭代对象可以使用 `for-of` 循环进行遍历。

!> `Object` 不是可迭代对象，不能使用 `for-of` 循环。

## 二.Array

`Array`可以包含任意数据类型，并通过索引来访问每个元素。

### 数组是一种对象
1.	数组实际上也是对象：
```js
[] instanceof Object //true
typeof [] //'object'
```

2.	数组的原型继承链：

```mermaid
graph LR
arr(Array)-->aprototype(Array.prototype)-->oprototype(Object.prototype)-->null(null)
```

### 创建数组的方法
1.	使用`[]`语法：`var arr = [1,2,3,4,"hi"]`
2.	使用 `new`语法： `var arr = new Array(1,2,3,4)`

!> 对于`Number`、`Boolean` 和 `string`， 直接使用字面量和 `new` 得到的数据类型是不一样的。其中前者为原始类型，后者为对象。但对于数组，这两种方法得到的都是对象。

!> 当使用 `new` 语法时，只传入一个参数，会被函数当做数组的大小。

### 常用数组操作
#### 获取长度
通过 `arr.length` 属性获取。

!> 修改 `arr.length` 的值会导致数组长度的变化。

#### 访问元素
通过 `arr[index]` 来访问元素。

当访问不存在的元素时，会得到 `undefined`。

#### 添加元素

|方法|说明|
|----|----|
|`arr[i] = val`|在任意位置添加元素。|
|`arr.push(val1,val2,...)`|向数组末尾追加多个元素。|
|`arr.unshift(val1,val2,...)`|向数组开头追加多个元素。|

#### 删除元素

|方法|说明|
|----|----|
|`delete a[i]`|删除任意位置的元素。**这不会导致其他元素位置的改变，也不影响数组长度。**|
|`arr.pop()`|删除并返回最后一个元素。|
|`arr.shift()`|删除并返回第一个元素。|

#### 替换元素

|方法|说明|
|----|----|
|`arr.splice(index,num,val1,val2,val3,...)`|将 `index` 开始，`num`个数目的值替换成 `val1,val2,...`。返回被删除的值构成的数组。|

#### 查找元素
|方法|说明|
|----|----|
|`arr.indexOf(val)`|查找一个值第一次出现的位置。|

#### 切片

|方法|说明|
|----|----|
|`arr.slice(start,end)`|返回由`start`开始，`end`结束（不包含）元素构成的数组。支持负索引。|

#### 转换成字符串

|方法|说明|
|----|----|
|`arr.toString()`|将数组转换成字符串，中间用 `,`间隔。|
|`arr.join(divider)`|将数组转换成字符串，中间用 `divider` 间隔。|

#### 颠倒顺序
|方法|说明|
|----|----|
|`arr.reverse()`|将数组反转。|

#### 连接
|方法|说明|
|----|----|
|`arr.concat(arr1,arr2,...)`|将几个数组连接到原数组后面，**并返回新的 `array`**。|

#### 排序
方法：`arr.sort(func)`

默认会将数组转换成字符串，再按字符编码进行升序排序。对于 `Number` 数组往往会出现问题：
```js
[19,17,15,13,11,9,7,5,3,1].sort()//返回(10) [1, 11, 13, 15, 17, 19, 3, 5, 7, 9]
```


其中 `func` 传入 `a` 和 `b`。若：
+	返回负数： `a` 在 `b` 前
+	返回正数： `b` 在 `a` 前
+	返回0： `a` 和 `b` 不作交换

### 数组遍历
#### for-in 循环

`for-in` 循环会遍历数组的下标。

<!-- tabs:start -->

#### **代码**

```js
for (let i in [1,2,3,4,5]) console.log(i)
```

#### **运行结果**

```js
0
1
2
3
4
```
<!-- tabs:end -->


#### for-of 循环
`for-of` 循环会遍历数组的值。

<!-- tabs:start -->

#### **代码**

```js
for (let val of [1,2,3,4,5]) console.log(val)
```

#### **运行结果**

```js
1
2
3
4
5
```
<!-- tabs:end -->

#### map 方法
`map` 方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。

传入函数的参数为 `currentValue`(当前值)、`index`(索引)、`array`(整个数组)。

<!-- tabs:start -->

#### **代码**
对所有数进行平方：
```js
[1,2,3,4,5,6].map(x => x * x)
```

#### **运行结果**

```js
(6) [1, 4, 9, 16, 25, 36]
```
<!-- tabs:end -->

#### reduce 方法
1.	`reduce`和 `reduceRight` 方法对数组中的每个元素执行一个函数，将结果汇总为单个返回值。
2.	其中`reduce`从左边开始累计，`reduceRight`从右边开始累计。
3.	`reduce`和 `reduceRight` 方法有两个参数，`reducer`(执行的函数)和 `initVal`(初始值，可选)。当第二个参数未指定时，`reducer`第一次执行的前两个参数为数组的前两个值（函数执行 `n-1`次）。

`reducer`函数有四个参数：
+	Accumulator (acc) (累计器)
+	Current Value (cur) (当前值)
+	Current Index (idx) (当前索引)
+	Source Array (src) (源数组)


<!-- tabs:start -->

#### **代码**
对所有数进行累加：
```js
[1,2,3,4,5].reduce((x,y) => x+y)
```

#### **运行结果**

```js
15
```
<!-- tabs:end -->

#### filter 方法
`filter`方法传入一个函数，返回函数值为 `true` 时的元素构成的数组。传入函数的参数为 `currentValue`(当前值)、`index`(索引)、`array`(整个数组)。

<!-- tabs:start -->

#### **代码**
筛选出 `x > 2` 的元素：
```js
[1,2,3,4,5].filter((x) => x > 2)
```

#### **运行结果**

```js
(3) [3, 4, 5]
```
<!-- tabs:end -->


#### find 方法
`find`方法传入一个函数，返回函数值为 `true` 时的第一个元素（且不会继续执行函数）。传入函数的参数为 `currentValue`(当前值)、`index`(索引)、`array`(整个数组)。找不到元素时返回 `undefined`。

<!-- tabs:start -->

#### **代码**
找到满足 `x > 2` 的第一个元素：
```js
[1,2,3,4,5].find((x) => x > 2)
```

#### **运行结果**

```js
3
```
<!-- tabs:end -->

#### every 方法
`every`方法检验一个数组的所有元素是否满足条件。若满足则返回 `true`，否则返回 `false`。它传入一个函数，参数为 `currentValue`(当前值)、`index`(索引)、`array`(整个数组)。找不到元素时返回 `undefined`。

<!-- tabs:start -->

#### **代码**
```js
[1,2,3,4,5].every((x) => x > 2)
```

#### **运行结果**

```js
false
```
<!-- tabs:end -->


### [ES6]数组迭代
#### keys方法
返回所有下标构成的迭代器，且包括值为 `undefined`的中间下标。

```js
var iterator = [1,2,3,4,5].keys()
iterator.next(); /*{ value: "0", done: false }*/
iterator.next(); /*{ value: "1", done: false }*/
iterator.next(); /*{ value: "2", done: false }*/
iterator.next(); /*{ value: "3", done: false }*/
iterator.next(); /*{ value: "4", done: false }*/
iterator.next(); /*{ value: undefined, done: true }*/
```
`iterator` 可以使用 `for-of` 循环，也可以使用 `iterator.next()`方法进行迭代。

#### values方法
返回所有值构成的迭代器。
```js
var iterator = [1,2,3,4,5].values()
iterator.next(); /*{ value: "1", done: false }*/
iterator.next(); /*{ value: "2", done: false }*/
iterator.next(); /*{ value: "3", done: false }*/
iterator.next(); /*{ value: "4", done: false }*/
iterator.next(); /*{ value: "5", done: false }*/
iterator.next(); /*{ value: undefined, done: true }*/
```
`iterator` 可以使用 `for-of` 循环，也可以使用 `iterator.next()`方法进行迭代。

## 三.Object
JavaScript的对象是一种 **无序的集合数据类型**，它由若干 **键值对** 组成。其中，值可以是任意类型，但键只能是**字符串**。

### 定义一个对象
1.	使用`{}`语法：`var obj = {a:1,b:2}`
2.	使用 `new`语法： `var obj = new Object({a:1,b:2})`

注意事项：
定义对象时，若键 *key* 有特殊字符，则需要用 `''` 括起来：

```js
var obj = {'a-b':1}
```

### 常用对象操作
#### 操作数据
通过 `.` 或 `['']` 的方式来访问或修改对象（当属性不存在时，会自动创建）：
```js
a.b
a['b']
```

!> 如果键 *key* 有特殊字符，则只能通过`['']` 的方式来访问对象。

#### 判断对象是否具有某些属性
使用 `in` 操作符。
```js
'b' in a //true
```

### 对象遍历与迭代
#### for-in循环
for-in循环会遍历对象的所有属性。
#### Object.keys方法
一个表示给定对象的所有可枚举键的数组。

```js
Object.keys([1,2,3,4,5]) //['0', '1', '2']
Object.keys({a:1,b:2}) //["a", "b"]
```

#### Object.values方法
返回一个表示给定对象的所有值的数组。

```js
Object.values([1,2,3,4,5]) //[1,2,3,4,5]
Object.values({a:1,b:2}) //[1, 2]
```

## [ES6]四.Map
`Map`是一组键值对的结构，具有极快的查找速度。

### `Map`和 `Object` 的主要区别
|比较|`Map`|`Object`|
|----|----|----|
|键的类型|任意值|字符串|
|顺序|有序|无序|
|大小|可直接获取|手动计算|

### 定义 `Map`
`Map` 的定义只能使用`new`：

```js
var m1 = new Map() //无定义
var m2 = new Map([['a',0],['b',1]]) //使用二维数组定义
```
### Map的长度
使用 `map.size` 属性获取。

### 常用操作

|方法|说明|
|----|----|
|`map.get(key)`|获取数据。|
|`map.set(key,value)`|新增或修改数据。|
|`map.clear()`|清空数据。|
|`map.has(key)`|是否包含相应键对应的值。|

### Map遍历与迭代
#### for-of 循环
会以 `[key,value]` 的形式进行迭代。

<!-- tabs:start -->

#### **代码**

```js
var map = new Map([['a',1],['b',2]])
for(let val of map) console.log(val)
```

#### **运行结果**

```js
(2) ["a", 1]
(2) ["b", 2]
```
<!-- tabs:end -->

#### keys 方法
返回包含所有键的迭代器。

<!-- tabs:start -->

#### **代码**

```js
var map = new Map([['a',1],['b',2]])
for(let val of map.keys()) console.log(val)
```

#### **运行结果**

```js
a
b
```
<!-- tabs:end -->

#### values 方法
返回包含所有值的迭代器。

<!-- tabs:start -->

#### **代码**

```js
var map = new Map([['a',1],['b',2]])
for(let val of map.values()) console.log(val)
```

#### **运行结果**

```js
1
2
```
<!-- tabs:end -->


## [ES6]五.Set
`Set`是一组键的集合，但相邻两个键不能重复。

> Set 通常用于过滤重复元素

### 定义 `Set`
`Map` 的定义只能使用`new`：

```js
var m1 = new Set() //无定义
var m2 = new Set([1,2,3]) //使用一维数组定义，重复的元素会被过滤
```
### Set的长度
使用 `set.size` 属性获取。

### 常用方法

|方法|说明|
|----|----|
|`set.add(key)`|添加`key`。|
|`set.delete(key)`|删除`key`。|
|`set.clear()`|删除所有`key`。|
|`set.has(key)`|判断是否有`key`。|

### Set遍历与迭代
#### for-of 循环
会以值的形式进行迭代。

<!-- tabs:start -->

#### **代码**

```js
var set = new Set([1,2,3,4])
for(let val of set) console.log(val)
```

#### **运行结果**

```js
1
2
3
4
```
<!-- tabs:end -->

#### values 方法
返回包含所有值的迭代器。

<!-- tabs:start -->

#### **代码**

```js
var set = new Set([1,2,3,4])
for(let val of set.values()) console.log(val)
```

#### **运行结果**

```js
1
2
3
4
```
<!-- tabs:end -->

