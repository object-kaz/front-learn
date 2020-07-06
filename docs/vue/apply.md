## 一.v-if 语句块

1.	基本语法
   +	支持 `template` 标签(渲染后不加载到DOM树)
   +	条件为 `false` 时，该元素不加载到DOM树
   +	这些标签需要紧密挨在一起
   +	切换开销稍大

<!-- tabs:start -->
#### **html**
```html
<div v-if="condition"></div>
<div v-else-if="condition"></div>
<div v-else></div>
```
<!-- tabs:end -->

## 二.v-show 指令

1.	基本语法
   +	没有 `v-else` 这些玩意
   +	条件为 `false` 时该元素只隐藏 `display:none`
   +	切换开销小
   +	不支持 `template`

<!-- tabs:start -->
#### **html**
```html
<div v-show="condition"></div>
```
<!-- tabs:end -->

## 三.管理可复用的元素

+	Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。
+	若需要从头开始渲染，需要为元素绑定一个 `key` 属性。

<!-- tabs:start -->
#### **html**
```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```
<!-- tabs:end -->


## 四.列表渲染

### 1.遍历一个数组

1.	`v-for` 渲染一个列表
2.	**语法格式** 
   +	`v-for="单个元素 in 数组"`
   +	`v-for="(单个元素,索引) in 数组"`
   +	可以用 `of` 代替 `in`

### 2.遍历一个对象

1.	**语法格式** 
   +	`v-for="值 in 对象"`
   +	`v-for="(值,名) in 对象"`
   +	`v-for="(值,名，索引) in 对象"`
   +	可以用 `of` 代替 `in`

