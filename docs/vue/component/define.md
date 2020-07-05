## 一.定义组件
1.	`Vue.component` 定义全局组件
```html
<div id="components-demo">
  <button-counter></button-counter>
</div>
```
```js
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
//一个组件的 data 选项必须是一个函数，这样每个实例可以维护一份被返回对象的独立的拷贝，防止一个组件状态的改变影响到其他组件。
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
new Vue({ el: '#components-demo' })
```
2.	`component属性` 定义局部组件
```html
<div id="components-demo">
  <button-counter></button-counter>
</div>
```
```js

new Vue({ 
	el: '#components-demo' ,
	components: {
		'button-counter':{
  			data: function () {
    			return {
      				count: 0
    			}
  			},
  			template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
		}
	}
});
```

## 二.组件的大小写
1.	**短横线分隔命名** 定义组件
	+	短横线分隔命名使用组件
1.	**首字母大写命名** 定义组件
	+	短横线分隔命名法或首字母大写命名法使用组件，但直接在 DOM (即非字符串的模板) 中使用时只有 短横线分隔命名法 是有效的。

## 三.递归组件
1.	通过 `name` 选项为自身设置别名(全局组件已将ID设置为名称)，再在组件调用这个别名即可

## 四.内联模板
1.	当 `inline-template` 这个特殊的 `attribute` 出现在一个子组件上时，这个组件将会使用其里面的内容作为模板，而不是将其作为被分发的内容。这使得模板的撰写工作更加灵活。
2.	这可能会使模板的作用域难以理解。

## 五.X-Template
1.	在一个 `<script>` 元素中，并为其带上 `text/x-template` 的类型，然后通过一个 `id` 将模板引用过去。
2.	x-template 需要定义在 Vue 所属的 DOM 元素外。
```html
<script type="text/x-template" id="hello-world-template">
  <p>Hello hello hello</p>
</script>
```
```js
Vue.component('hello-world', {
  template: '#hello-world-template'
})
```

