## 一.下载和安装vue-cli

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

## 二.创建项目

1.	执行以下命令

```shell
vue create 项目名称
```

+	项目名称不能含有大写，否则会报以下错误：

>Warning: name can no longer contain capital letters

2.	选择默认预设

```shell
Vue CLI v4.3.1
? Please pick a preset: (Use arrow keys)
> default (babel, eslint)
  Manually select features
```

3.	安装成功

```shell
Successfully created project test.
�  Get started with the following commands:

 $ cd test
 $ npm run serve
```

## 三.常用命令

1.	`npm run serve` 运行服务器，修改的内容会动态更新
2.	`npm run build` 将项目编译打包
3.	`npm run lint` 编码风格检查

## 四.项目文件夹解释

+	`node_modules` 安装的依赖
+	`public` 放打包后文件的地方
+	`src` 开发文件夹

