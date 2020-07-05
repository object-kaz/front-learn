## 一.自定义事件
1.	**命名匹配** 完全匹配，即驼峰法命名的事件不能用等价的 短横线分隔命名法名称来触发。

2.	使用 `$emit(事件名称[,事件对象$event的值])`触发自定义的事件
```html
<blog-post
  ...
  v-on:enlarge-text="postFontSize += $event"
></blog-post>
```
```html
<button v-on:click="$emit('enlarge-text',0.1)">
  Enlarge text
</button>
```

## 二.自定义组件的 v-model
1.	**默认情况** 利用 `value` 的属性值和名为 `input` 的事件

2.	使用 **model** 属性改变默认值
```js
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
```

## 三.将所有事件转移到子节点
1.	**默认情况** 原生事件绑定到根节点
2.	`$listeners` 属性是一个对象，里面包含了作用在这个组件上的所有监听器。
	+	`v-on="$listeners"` 将所有事件监听器指向某个元素

