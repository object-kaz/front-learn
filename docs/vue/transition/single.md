## 一.过渡
1.	将需要加过渡的内容放入 `transition` 标签中。
2.	`name` 属性：定义过渡的名称
3.	`type` 属性：设置Vue要监听的类型，可设置为 `animation` 或 `transition` 。若同时定义了 `animation` 或 `transition` 两种过渡特效，则可能需要设置该属性。
4.	`duration` 属性：自定义过渡时间
2.	发生时机
	+	条件渲染 (使用 v-if)
	+	条件展示 (使用 v-show)
	+	动态组件
	+	组件根节点
3.	默认过渡类名
	>不设置过渡名称时为 `v` 若有名字，则将 `v` 用过渡名字代替
	>
>+	`v-enter` 定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。

+	`v-enter-active` 定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
	
+	`v-enter-to` 2.1.8 版及以上定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。
	
+	`v-leave` 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。
	
+	`v-leave-active` 定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
			
	+	`v-leave-to` 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。
4.	自定义类名：修改相应的 `attribute`
	- `enter-class`
	- `enter-active-class`
	- `enter-to-class` 
	- `leave-class`
	- `leave-active-class`
	- `leave-to-class` 

![](https://cn.vuejs.org/images/transition.png)

5.	添加动画事件
	> 当只用 JavaScript 过渡的时候，在 `enter` 和 `leave` 中必须使用 `done` 进行回调。否则，它们将被同步调用，过渡会立即完成。
	> 推荐对于仅使用 JavaScript 过渡的元素添加 `v-bind:css="false"`，Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响。
	- `before-enter`
	- `enter`
	- `after-enter`
	- `enter-cancelled`
	- `before-leave`
	- `leave`
	- `after-leave` 
	- `leave-cancelled`

## 二.动画

1.	CSS 动画用法同 CSS 过渡，区别是在动画中 `v-enter` 类名在节点插入 DOM 后不会立即删除，而是在 `animationend` 事件触发时删除。

## 三.初始渲染的过渡

1.	可以通过 `appear` attribute 设置节点在初始渲染的过渡
2.	默认类名
	-	`v-appear`
	-	`v-appear-to`
	-	`v-appear-active`

3.	自定义类名
	-	`appear-class`
	-	`appear-to-class`
	-	`appear-active-class`

4.	自定义钩子
	+	`before-appear`
	+	`appear`
	+	`after-appear`
	+	`appear-cancelled`