## 一.数组常用的高阶函数
1.	`map` 建立映射： fn(value[,index,array]) fn返回结果
2.	`reduce` 从左到右减少： fn(total,value[,index,array])[,initValue]
3.	`filter` 过滤：fn(value[,index,array]) fn返回一个bool
4.	`sort` fn(a,b) fn 返回数字
5.	`every` 判断每个元素是否满足测试条件
6.	`find` 找符合条件的第一个元素（返回值）
7.	`findIndex` 找符合条件的第一个元素（返回索引）
8.	`forEach` 跟for循环差不多

## 二.this指向问题
1.	一般的函数 `this` 指向它调用时所在的对象。
2.	构造函数 `this` 指向为新创建的对象。
3.	箭头函数 `this` 指向函数外的 `this`。
4.	用函数对象的方法强行修改 `this` 的指向
	+	直接调用 `apply(参数打包成数组)` `call(参数按顺序传入)` 
	+	创建一个新的函数 `bind(参数按顺序传入)`

## 三.数组深拷贝
1.	用 `map` 方法 `arr.map(val => val);`
2.	用 `slice` 方法 `arr.slice()`
3.	用 `concat` 方法连接一个空数组 `arr.concat([]);`
4.	传统的`for` 循环 `for in` 和 `for of` 均可。
5.	`lodash` 的 `_.cloneDeep(value)`

## 四.对象深拷贝
1.	`JSON.parse(JSON.stringify(obj))` 这个不支持函数。
2.	`Object.assign({},obj)` 这个不够深度，只能完全复制浅层的。
3.	`lodash` 的 `_.cloneDeep(value)`

## 五.实例方法与类方法
1.	实例方法：在构造函数里用 `this.xxx` 写的。每个方法都不一样
2.	类方法：在原型链中添加的方法，所有实例共用。

## 六.原型链继承
1.	创建一个中间的构造函数 `F`。
2.	把 `F` 的原型设置为 原对象的原型。
3.	把 派生对象的原型设置为 new F()。
4.	把 派生对象的原型构造函数修复为自身。

```js
// PrimaryStudent构造函数:
function PrimaryStudent(props) {
    Student.call(this, props);
    this.grade = props.grade || 1;
}

// 空函数F:
function F() {
}

// 把F的原型指向Student.prototype:
F.prototype = Student.prototype;

// 把PrimaryStudent的原型指向一个新的F对象，F对象的原型正好指向Student.prototype:
PrimaryStudent.prototype = new F();

// 把PrimaryStudent原型的构造函数修复为PrimaryStudent:
PrimaryStudent.prototype.constructor = PrimaryStudent;

// 继续在PrimaryStudent原型（就是new F()对象）上定义方法：
PrimaryStudent.prototype.getGrade = function () {
    return this.grade;
};

// 创建xiaoming:
var xiaoming = new PrimaryStudent({
    name: '小明',
    grade: 2
});
xiaoming.name; // '小明'
xiaoming.grade; // 2

// 验证原型:
xiaoming.__proto__ === PrimaryStudent.prototype; // true
xiaoming.__proto__.__proto__ === Student.prototype; // true

// 验证继承关系:
xiaoming instanceof PrimaryStudent; // true
xiaoming instanceof Student; // true
```

## 七.浏览器对象
1.	`Window` 对象：全局作用域
2.	`navigator` 对象：浏览器的信息

- navigator.appName：浏览器名称；
- navigator.appVersion：浏览器版本；
- navigator.language：浏览器设置的语言；
- navigator.platform：操作系统类型；
- navigator.userAgent：浏览器设定的`User-Agent`字符串。

3.	`screen` 对象：屏幕信息
   - screen.width：屏幕宽度，以像素为单位；
   - screen.height：屏幕高度，以像素为单位；
   - screen.colorDepth：返回颜色位数，如8、16、24。
4.	`location` 对象：网页地址

```js
location.protocol; // 'http'
location.host; // 'www.example.com'
location.port; // '8080'
location.pathname; // '/path/index.html'
location.search; // '?a=1&b=2'
location.hash; // 'TOP'
location.assign();//加载新页
location.reload();//刷新网页
```

## 八.内置DOM的操作
```js
document.getElementById()
document.getElementsByTagName()
document.getElementsByClassName()
document.querySelector()
document.querySelectorAll()
el.appendChild(el);
el.insertBefore(el);
el.removeChild(el);
```

## 九.网页的宽和高
1.	`clientHeight` 内容区和填充的高度。
2.	`offsetHeight` 内容区、填充和边框的高度。
3.	`scrollHeight` 内容区的实际高度，包括没有显示出来的内容。
4.	`offsetTop` 相对于 `document` 顶部的偏移.
5.	`clientTop` 相对于容器本身的偏移，即边框的宽度.
6.	`scrollTop` 没有滚动条或最上面时为0，滚到最下面时为 `scrollHeight-clientHeight`。

