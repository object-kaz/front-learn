## 一.prop

1.	`prop` 是你可以在组件上注册的一些自定义 attribute。当一个值传递给一个 prop attribute 的时候，它就变成了那个组件实例的一个属性。
2.	`prop` 的大小写
	+	定义时可以使用 驼峰命名法 或 短横线分隔命名法命名
	+	使用时只能使用等价的 短横线分隔命名法
3.	`prop`的传递只能从父组件传递到子组件，即传递是 **单向** 的。
	
	>所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。


## 二.prop的定义
1.	使用数组语法
```js
props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
```
2.	使用对象语法：可以指定数据类型、是否必填、默认值、还支持自定义数据验证
```js
props:{
	//进行简单类型检查（含 null 和 undefined）
	id:Number
}
```

```js
props:{
	//支持多个类型
	id:[Number,String]
}
```

```js
props:{
	//必填，且强制类型为string
	title:{
		type:String,
		required:true
	}
}
```

```js
props:{
	//指定默认值的数字
	max:{
		type:Number,
		default:100
	}
}
```

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
>`prop` 会在一个组件实例创建之前进行验证，因此实例的属性 (如 `data` 、 `computed` 等) 在 `default` 或 `validator` 函数中是不可用的。


## 三.prop的传入
1.	**传入静态值** 一般只能传入 **字符串** 。
2.	**传入动态值** 使用 `v-bind` 命令传递，支持 JavaScript 的任意类型，如数字、布尔、数组、对象。
```html
<blog-post v-bind:comment-ids="[234, 266, 273]"></blog-post>
```
3.	**传入所有属性** 使用不带参的 `v-bind`
```html
<blog-post v-bind="post"></blog-post>
```
4.	**非 Prop 的 Attribute** 自动加载到组件的根元素上，并替换掉组件根元素上原有的值。但是 `style` 和 `class` 则不会替换，而是叠加。
	+	在组件的选项中设置 `inheritAttrs: false`来避免组件的根元素继承 `attribute`  。（然而对`style` 和 `class`没什么卵用）。
	+	关掉继承后，可以使用 `$attrs` 指定要将 **Attribute** 传递到什么地方。

```html
<div v-vind="$attrs"></div>
```

## 四.访问其他组件

1. 访问根实例/组件 `this.$root`
2. 访问父级组件 `this.$parent`
3. 引用子组件
	1.	为子组件设置ID引用 `<base-input ref="usernameInput"></base-input>`
	2.	访问子组件 `this.$refs.usernameInput`
		+	当 `ref` 和 `v-for` 一起使用的时候，你得到的引用将会是一个包含了对应数据源的这些子组件的数组。

## 五.依赖注入

1.	**干嘛的** 从某个组件开始，为它旗下的后代组件添加某个数据或方法。
2.	`provide` 选项允许我们指定我们想要提供给后代组件的数据/方法。
3.	`inject` 选项接收指定的我们想要添加在这个实例上的属性。