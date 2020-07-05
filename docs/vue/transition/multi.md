## 一.多元素过渡
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
## 二.过渡模式

- `in-out`：新元素先进行过渡，完成之后当前元素过渡离开。
- `out-in`：当前元素先进行过渡，完成之后新元素过渡进入。

