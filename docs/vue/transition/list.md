## 一.列表过渡
1.	`<transition-group>` 组件
	- 不同于 `<transition>`，它会以一个真实元素呈现：默认为一个 `<span>`。你也可以通过 `tag` attribute 更换为其他元素。
	- **过渡模式** 不可用，因为我们不再相互切换特有的元素。
	- 内部元素 **总是需要** 提供唯一的 `key` 属性值。
	- CSS 过渡的类将会应用在内部的元素中，而不是这个组/容器本身。
	- 支持改变位置的过渡

## 二.改变位置的过渡
1.	动画  `filp`
	
	>需要注意的是使用 FLIP 过渡的元素不能设置为 `display: inline` 。作为替代方案，可以设置为 `display: inline-block` 或者放置于 `flex` 中。
2.	默认类名
   -	`v-move`
   -	`v-move-to`
   -	`v-move-active`
3.	自定义类名
   -	`move-class`
   -	`move-to-class`
   -	`move-active-class`

4.	自定义钩子
   +	`before-appear`
   +	`appear`
   +	`after-appear`
   +	`appear-cancelled`
