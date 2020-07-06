## 一.过渡

1. 将需要加过渡的内容放入 `transition` 标签中。

2. `name` 属性：定义过渡的名称

3. `type` 属性：设置Vue要监听的类型，可设置为 `animation` 或 `transition` 。若同时定义了 `animation` 或 `transition` 两种过渡特效，则可能需要设置该属性。

4. `duration` 属性：自定义过渡时间

5. 发生时机

   +	条件渲染 (使用 v-if)
   +	条件展示 (使用 v-show)
   +	动态组件
   +	组件根节点

6. 默认过渡类名

   >不设置过渡名称时为 `v` 若有名字，则将 `v` 用过渡名字代替

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

5. 添加动画事件

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

## 四.多元素过渡

1.	当有**相同标签名**的元素切换时，需要通过 `key` attribute 设置唯一的值来标记以让 Vue 区分它们，否则 Vue 为了效率只会替换相同标签内部的内容。即使在技术上没有必要，**给在 `transition` 组件中的多个元素设置 key 是一个更好的实践。**

2.	在一些场景中，也可以通过给同一个元素的 `key` 属性设置不同的状态来代替 `v-if` 和 `v-else`

```
<transition>
  <button v-bind:key="isEditing">
    {{ isEditing ? 'Save' : 'Edit' }}
  </button>
</transition>
```

3.	多组件的过渡只需要用动态组件即可。
4.	过渡模式
	- `in-out`：新元素先进行过渡，完成之后当前元素过渡离开。
	- `out-in`：当前元素先进行过渡，完成之后新元素过渡进入。

## 五.列表过渡

1.	`<transition-group>` 组件
   - 不同于 `<transition>`，它会以一个真实元素呈现：默认为一个 `<span>`。你也可以通过 `tag` attribute 更换为其他元素。
   - **过渡模式** 不可用，因为我们不再相互切换特有的元素。
   - 内部元素 **总是需要** 提供唯一的 `key` 属性值。
   - CSS 过渡的类将会应用在内部的元素中，而不是这个组/容器本身。
   - 支持改变位置的过渡

## 六.改变位置的过渡

1. 动画  `filp`

   > 需要注意的是使用 FLIP 过渡的元素不能设置为 `display: inline` 。作为替代方案，可以设置为 `display: inline-block` 或者放置于 `flex` 中。

2. 默认类名

   - `v-move`
   - `v-move-to`
   - `v-move-active`

3. 自定义类名

   - `move-class`
   - `move-to-class`
   - `move-active-class`

4. 自定义钩子

   - `before-appear`
   - `appear`
   - `after-appear`
   - `appear-cancelled`