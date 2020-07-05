## 一.动态组件
1.	通过 Vue 的 `<component>` 元素加一个特殊的 `is` attribute 来实现
2.	这个 attribute 可以用于常规 HTML 元素，但这些元素将被视为组件。
3.	若在其他元素使用 `is` 属性，则其所有属性作为标签属性而不是DOM属性来绑定。这对于`value` 等属性来说，若DOM属性发生改变，则标签属性不会改变，因此需要使用 `.prop`修饰器。
```html
<!-- 组件会在 `currentTabComponent` 改变时改变 --> 
<component v-bind:is="currentTabComponent"></component>
```
4.	保持动态组件的状态,避免重复渲染： 将 `component`标签 用 `keep-alive` 标签括起来
```html
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```

## 二.异步组件
**组件在需要的时候动态加载**
1.	设置创建promise对象的函数
```js
//第二个参数为用来创建promise对象的函数
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    // 向 `resolve` 回调传递组件定义
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})
```
2.	直接用 `import` 函数
```js
Vue.component(
  'async-webpack-example',
  // 这个 `import` 函数会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)
```
3.	带加载状态的异步组件
```js
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
```

