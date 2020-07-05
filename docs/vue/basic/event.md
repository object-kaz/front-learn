## 一.绑定事件

1.	**v-on** 简写 **@**

```html
<div id="app">
	<button v-on:click="increase">点我</button>
	<p>{{ count }}</p>
</div>
```

```js
new Vue({
	el:'#app',
	data: {
		count:0,
	},
	methods:{
		increase:function(){
			this.count++;
		}
	}
});
```

2.	参数传递
   +	无参调用：函数内第一个参数为事件对象
   +	有参调用： **$event** 参数 传入事件对象
3.	常用事件修饰符
   +	`prevent` 阻止浏览器的默认行为
   +	`stop` 停止事件向下传递
   +	`capture` 内部元素触发的事件优先处理
   +	`self` 事件不会从内部元素触发
   +	`once` 事件只触发一次
   +	`passive` 告诉浏览器你不想阻止事件的默认行为
   +	`native` 监听组件根节点的原生事件


4.	常用按键修饰符
	+	`.enter`
	+	`.tab`
	+	`.delete` (捕获“删除”和“退格”键)
	+	`.esc`
	+	`.space`
	+	`.up`
	+	`.down`
	+	`.left`
	+	`.right`

5.	常用系统修饰键
	+	`.ctrl`
	+	`.alt`
	+	`.shift`
	+	`.meta` (Windows徽标键⊞ 或command 键 ⌘)

6.	精确匹配修饰符 `.exact`
7.	鼠标按键修饰符
	+	`.left`
	+	`.right`
	+	`.middle`

## 二.程序化的事件监听器
1.	通过 `$on(eventName, eventHandler)` 侦听一个事件
2.	通过 `$once(eventName, eventHandler)` 一次性侦听一个事件
3.	通过 `$off(eventName, eventHandler)` 停止侦听一个事件