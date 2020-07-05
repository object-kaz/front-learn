## 一.真实开发需求

+	开发服务器
+	**Babel** ES6语法转为低版本
+	**esLint** 代码规范检查
+	**postcss** **less** **sass** CSS优化
+	**webpack** **gulp** 前端自动化构建工具

## 二.下载和安装vue-cli
1.	条件
	+	node.js
2.	安装命令
```shell
npm install -g @vue/cli
```
3.	检测安装成功
```shell
vue -V
```

## 三.vue 中 template属性

1.	设置DOM节点的模板，会覆盖设置的节点

```html
<div id="app">
	2333
</div>
```

```js
new Vue({
	el:'#app',
	template:'<div>123456</div>'
});
```

>注意 `template` 中只能有一个根节点


## 四.模板编译流程

模板->编译-> ast ->数据-> render函数->虚拟dom ->真实html