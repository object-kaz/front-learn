## 一.vue 中 template属性

1.	设置DOM节点的模板，会覆盖设置的节点

<!-- tabs:start -->
#### **html**
```html
<div id="app">
	2333
</div>
```
#### **js**
```js
new Vue({
	el:'#app',
	template:'<div>123456</div>'
});
```
<!-- tabs:end -->

>注意 `template` 中只能有一个根节点


## 二.模板编译流程

模板->编译-> ast ->数据-> render函数->虚拟dom ->真实html

## 三.定义组件
### 1.定义方法
1.	`Vue.component` 定义全局组件。

<!-- tabs:start -->
#### **html**
```html
<div id="components-demo">
  <button-counter></button-counter>
</div>
```
#### **js**
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
<!-- tabs:end -->

2.	`component属性` 定义局部组件。

<!-- tabs:start -->
#### **html**
```html
<div id="components-demo">
  <button-counter></button-counter>
</div>
```
#### **js**
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
<!-- tabs:end -->

### 2.组件的大小写
1.	**短横线分隔命名** 定义组件
	+	短横线分隔命名使用组件
1.	**首字母大写命名** 定义组件
	+	短横线分隔命名法或首字母大写命名法使用组件，但直接在 DOM (即非字符串的模板) 中使用时只有 短横线分隔命名法 是有效的。

### 3.递归组件
通过 `name` 选项为自身设置别名(全局组件已将ID设置为名称)，再在组件调用这个别名即可。

### 4.内联模板
1.	当 `inline-template` 这个特殊的 `attribute` 出现在一个子组件上时，这个组件将会使用其里面的内容作为模板，而不是将其作为被分发的内容。这使得模板的撰写工作更加灵活。
2.	这可能会使模板的作用域难以理解。

### 5.X-Template
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


## 四.自定义属性
### 1.prop概念
1.	`prop` 是你可以在组件上注册的一些自定义 attribute。当一个值传递给一个 prop attribute 的时候，它就变成了那个组件实例的一个属性。
2.	`prop` 的大小写
	+	定义时可以使用 驼峰命名法 或 短横线分隔命名法命名
	+	使用时只能使用等价的 短横线分隔命名法
3.	`prop`的传递只能从父组件传递到子组件，即传递是 **单向** 的。

### 2.prop定义

<!-- tabs:start -->
#### **多类型属性**
```js
props:{
	//支持多个类型
	id:[Number,String]
}
```

#### **必填属性**
```js
props:{
	//必填，且强制类型为string
	title:{
		type:String,
		required:true
	}
}
```

#### **默认值**
```js
props:{
	//指定默认值的数字
	max:{
		type:Number,
		default:100
	}
}
```

#### **对象类型**
```js
props:{
	//传入一个对象，必须以函数返回值的形式出现
	max:{
		type:Number,
		default:function(){
			return {}
		}
	}
}
```

#### **自定义验证**
!>`prop` 会在一个组件实例创建之前进行验证，因此实例的属性 (如 `data` 、 `computed` 等) 在 `default` 或 `validator` 函数中是不可用的。
```js
props:{
	//自定义验证
	id:{
		validator:function(value) {
			return value >= 0 && value <= 100;
		}
	}
}
```
<!-- tabs:end -->

### 3.prop传入数据
<!-- tabs:start -->
#### **传入静态值**
静态值只能是 **字符串** 。

#### **传入动态值**
使用 `v-bind` 命令传递，支持 JavaScript 的任意类型，如数字、布尔、数组、对象。
```html
<blog-post v-bind:comment-ids="[234, 266, 273]"></blog-post>
```

#### **传入所有属性**
使用不带参的 `v-bind` 传入所有属性。
```html
<blog-post v-bind="post"></blog-post>
```
#### **非 Prop 的属性**
自动加载到组件的根元素上，并替换掉组件根元素上原有的值。但是 `style` 和 `class` 则不会替换，而是叠加。
+	在组件的选项中设置 `inheritAttrs: false`来避免组件的根元素继承 `attribute`  。（然而对`style` 和 `class`没什么卵用）。
+	关掉继承后，可以使用 `$attrs` 指定要将 **Attribute** 传递到什么地方。
```html
<div v-vind="$attrs"></div>
```
<!-- tabs:end -->

## 五.自定义事件
### 1.自定义事件
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

### 2.自定义组件的 v-model
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

### 3.将所有事件转移到子节点
1.	**默认情况** 原生事件绑定到根节点
2.	`$listeners` 属性是一个对象，里面包含了作用在这个组件上的所有监听器。
	+	`v-on="$listeners"` 将所有事件监听器指向某个元素

## 六.组件内访问其他组件

1. 访问根实例/组件 `this.$root`
2. 访问父级组件 `this.$parent`
3. 引用子组件
	1.	为子组件设置ID引用 `<base-input ref="usernameInput"></base-input>`
	2.	访问子组件 `this.$refs.usernameInput`
		+	当 `ref` 和 `v-for` 一起使用的时候，你得到的引用将会是一个包含了对应数据源的这些子组件的数组。

## 七.依赖注入

1.	**干嘛的** 从某个组件开始，为它旗下的后代组件添加某个数据或方法。
2.	`provide` 选项允许我们指定我们想要提供给后代组件的数据/方法。
3.	`inject` 选项接收指定的我们想要添加在这个实例上的属性。

## 八.动态组件和异步组件
### 1.动态组件
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

### 2.异步组件
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
## 九.插槽

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
   +	`v-slot` 只能添加在 `<template>` 上。如果只有默认插槽，可以插在使用处。

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

