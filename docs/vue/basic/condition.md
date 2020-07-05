## 一.v-if 语句块
1.	基本语法
	+	支持 `template` 标签(渲染后不加载到DOM树)
	+	条件为 `false` 时，该元素不加载到DOM树
	+	这些标签需要紧密挨在一起
	+	切换开销稍大
```html
<div v-if="condition"></div>
<div v-else-if="condition"></div>
<div v-else></div>
```

## 二.v-show 指令
1.	基本语法
	+	没有 `v-else` 这些玩意
	+	条件为 `false` 时该元素只隐藏 `display:none`
	+	切换开销小
	+	不支持 `template`
```html
<div v-show="condition"></div>
```

## 三.管理可复用的元素
+	Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。
+	若需要从头开始渲染，需要为元素绑定一个 `key` 属性。
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

