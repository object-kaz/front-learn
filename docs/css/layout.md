## 一.可见性
1.	`visibility` 属性用于指定元素是可见的还是隐藏的。 
	最常见的值是 `visible` 和 `hidden` 。
	+	与 `display:none` 的区别： `display:none` 不占任何空间，而  `visibility:hidden`  仍占用空间。

## 二.浮动
1.	`float` 属性
	使用CSS中float，可以将元素向左或向右推，以允许其他元素环绕它。
	`float` 通常与图像一起使用，但在处理布局时也很有用。
	`float` 属性的值是 `left` ，`right` ，和 `none` 。
	`left` ， `right` 会使元素向左或者向右浮动。
	`none` 能确保元素不会进行浮动。

2.	`clear`属性 
	元素设置了float属性后会使后面的元素都受其影响，将环绕在其周围。为了避免这种情况，请使用clear属性。
	clear属性指定某个元素不受其他设置了float属性的元素的影响。

## 三.内容溢出
1.	overflow属性有四个值：visible（默认值），scroll，hidden和auto。
2.	`scroll` 值能阻止内容溢出，但会增加出滚动条，通过拉动滚动条可以浏览所有内容。
3.	`auto` 如果内容溢出被限制，则会添加一个滚动条，使超出的内容可以通过滚动展示出来。
4.	`hidden` 隐藏掉内容溢出的部分，溢出的内容将不可见。


## 四.flex布局
![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071004.png)
（图片引用自阮一峰博客）
### 1.容器属性

| 属性            | 可选值                                                       | 默认值     | 说明                                 |
| --------------- | ------------------------------------------------------------ | ---------- | ------------------------------------ |
| flex-direction  | row , row-reverse , column , column-reverse                  | row        | 主轴的方向                           |
| flex-wrap       | nowrap , wrap , wrap-reverse                                 | nowrap     | 是否允许换行                         |
| flex-flow       |                                                              | row wrap   | 前两个属性的缩写                     |
| justify-content | flex-start , flex-end , center , space-between(两端对齐) , space-around(项目两侧间隔相等) | flex-start | 项目在主轴的对齐方式                 |
| align-items     | flex-start , flex-end , center , baseline(项目的第一行文字的基线对齐) , stretch | stretch    | 项目在交叉轴的对齐方式(一条主轴线)   |
| align-content   | flex-start , flex-end , center , baseline(项目的第一行文字的基线对齐) , stretch | stretch    | 项目在交叉轴的对齐方式（多条主轴线） |

### 2.内容属性

| 属性        | 可选值 | 默认值   | 说明                                                         |
| ----------- | ------ | -------- | ------------------------------------------------------------ |
| order       | 无     | 0        | 显示顺序（大的在后面）                                       |
| flex-grow   | 无     | 0        | 项目放大的比例，0表示有剩余空间时不放大。                    |
| flex-shrink | 无     | 1        | 项目放大的比例，1表示空间不足时会缩小。                      |
| flex-basis  | 无     | auto     | 分配多余空间之前，它需要占用的空间。                         |
| flex        | 无     | 0 1 auto | flex-grow,flex-shrink,flex-basis的合写。(auto=1 1 auto,none= 0 0 auto) |
| align-self  | 无     | auto     | 用于覆盖align-items属性。                                    |