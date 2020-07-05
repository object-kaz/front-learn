## 一.绑定文本
**双括号语法**
```html
<div id="app">
	<p>{{ name }}</p>
</div>
```
```js
new Vue({
	el:'#app',
	data: {
		name:'Hi',
	}
});
```
## 二.绑定属性
1.	**v-bind** 用于绑定属性 简写 **:**
```html
<div id="app">
	<a v-bind:href="link">{{ name }}</a>
</div>
```
```js
new Vue({
	el:'#app',
	data: {
		name:'baidu',
		link:'https://www.baidu.com',
	}
});
```
2.	**v-once** 改变的数据不更新
```html
<div id="app">
	<a v-bind:href="link">{{ get_name() }}</a>
	<a v-once>{{ name }}</a>
</div>
```
```js
new Vue({
	el:'#app',
	data: {
		name:'baidu',
		link:'https://www.baidu.com',
	},
	methods:{
		get_name:function(){
			this.name = "google";
			return this.name;
		}
	}
});
```
1.	`v-bind` 修饰符
	+	`.sync` 表示子组件想要修改父组件的值，此时表达式只能是一个属性名，类似 `v-model` 。
	+	`.prop` 将属性作为DOM属性绑定，而不是作为HTML属性。

## 三.输出html
>尽量不要输出用户输入的html

**v-html**
```html
<div id="app">
	<div v-html="bd"></div>
</div>
```
```js
new Vue({
	el:'#app',
	data: {
		bd:'<a href="https://www.baidu.com">baidu</a>',
	}
});
```

