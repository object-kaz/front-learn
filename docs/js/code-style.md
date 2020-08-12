?> 规则是建议性的

## 一.语法风格

1. 函数参数之间有一个空格。
2. 函数名与圆括号之间、圆括号与参数之间没有空格。
3. 参数后面的花括号在同一行，前面有一个空格。
4. 函数体行首缩进两个或四个空格。
5. 运算符两边有空格。
6. `for/if/while` 后面有一个空格。
7. 使用分号。
8. 逻辑块之间空一行。
9. 一行不要太长。
10. 嵌套调用两边各一个空格。
11. `} else {` 不空行 。

## 二.避免忍者代码
1.	避免简洁导致的晦涩
2.	避免一个字母的变量、模糊的命名、缩写和过于抽象的变量。
3.	避免同一类功能使用同义词命名，如 `displayName` 和 `showList`。
4.	重用名字。
5.	不要滥用下划线。
6.	避免变量重叠。
7.	避免带副作用的函数。如 `isReady` 做了主要任务外，还有意想不到的行为。
8.	避免返回非标准的函数。如 `isReady` 没有返回 `true` 和 `false`。


## 三.常见的规范工具
### 风格指南

- [Google JavaScript 风格指南](https://google.github.io/styleguide/jsguide.html)
- [Airbnb JavaScript 风格指南](https://github.com/airbnb/javascript)
- [Idiomatic.JS](https://github.com/rwaldron/idiomatic.js)
- [StandardJS](https://standardjs.com/)

### 自动规范工具

- [JSLint](http://www.jslint.com/)
- [JSHint](http://www.jshint.com/) 
- [ESLint](http://eslint.org/) 


## 参考

1. 现代JavaScript教程——编码风格：https://zh.javascript.info/coding-style
2. 现代JavaScript教程——忍者代码：https://zh.javascript.info/ninja-code

