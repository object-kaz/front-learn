## 一.插槽
1.	**slot** 标签添加单个插槽
	+	**语法** `<slot [name="自定义插槽名称"] [:attribute="数据"]>[默认值]</slot>`
	+	若不指定名称，则其名为 `default`

+	组件使用
```html
<navigation-link url="/profile">
  Your Profile
</navigation-link>
```
+	组件定义
```html
<a
  v-bind:href="url"
  class="nav-link"
>
  <slot></slot>
</a>
```

>如果 `<navigation-link>` 没有包含一个 `<slot>` 元素，则该组件起始标签和结束标签之间的任何内容都会被抛弃。

2.	向具名插槽提供内容
	+	使用处 `v-slot[:插槽名][="表达式"]`
	+	具名插槽的缩写 `#插槽名[="表达式"]`
	+	**表达式填写办法** 
		+	可以填写变量名，如 `v-slot="info"`
		+	可以填写解构对象名，如 `v-slot="{ user }"`
		+	可以为解构对象名定义别名，如 `v-slot="{ user:person }"`
		+	指定默认值，如  `v-slot="{ user = { firstName: 'Guest' } }"`
	+	 `v-slot` 只能添加在 `<template>` 上。如果只有默认插槽，可以插在使用处。
```html
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```


3.	**作用域** 父级模板里的所有内容都是在父级作用域中编译的，子模板里的所有内容都是在子作用域中编译的。因此，一般情况下，父级模板无法访问子模板内的数据。
	+	但是，子模板内的数据可以通过 `slot` 标签的 `attribute` 绑定到父级的插槽。而父级的插槽可通过 `v-slot`的值 调用子模板传递给父模板的数据。

+	定义处
```html
<span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>
```
+	使用处
```html
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>
```
