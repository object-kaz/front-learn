## 一.获取画布上下文
使用 `getContext`函数。
```js
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
```

## 二.Canvas坐标系
### 1.概述
1.	大小：画布的总宽度为画布的 `width` 属性，总高度为画布的 `height` 属性。
2.	背景：画布是透明的。
3.	原点：位于画布的左上角，所有的位置均相当于原点定位。
4.	默认颜色（填充以及边框）：黑色。
5.	单位：像素 `px`。

![](https://mdn.mozillademos.org/files/224/Canvas_default_grid.png)
(图片引用自MDN)

### 2.坐标系的变换

> 此处 `ctx` 指 `context` 对象

|名称|原点变换|旋转变换|缩放变换|
|----|----|----|----|
|函数|`void ctx.translate(x, y)`|`void ctx.rotate(angle)`|`void ctx.scale(x, y)`|
|函数说明|移动原点到$(x,y)$|将x轴顺时针旋转一定弧度(angle)|将坐标轴按比例缩放。|
|图例|![](https://developer.mozilla.org/@api/deki/files/85/=Canvas_grid_translate.png)|![](https://developer.mozilla.org/@api/deki/files/84/=Canvas_grid_rotate.png)|空|
|坐标变换|$\pmb{v'}=\pmb{v} + \begin{pmatrix}   x\\ y\end{pmatrix}$|$\pmb{v'}=\begin{pmatrix}   \cos{a} & -\sin{a}\\ \sin{a} &\cos{a}\end{pmatrix}\pmb{v}$|$\pmb{v'}=\begin{pmatrix}   x & 0\\ 0 &y\end{pmatrix}\pmb{v}$|
|变形矩阵|$\begin{pmatrix}   1& 0 & x \\ 0 & 1 & y \\0 & 0 & 1 \end{pmatrix}$|$\begin{pmatrix}   \cos{a}& -\sin{a} & 0 \\ \sin{a} & \cos{a} & 0 \\0 & 0 & 1 \end{pmatrix}$|$\begin{pmatrix}   x& 0 & 0 \\ 0 & y & 0 \\0 & 0 & 1 \end{pmatrix}$|

### 3.变形矩阵
1.	操作变形矩阵的函数

|函数|说明|
|----|----|
|`void context.transform(a, b, c, d, e, f)`|将当前的变形矩阵乘上一个基于自身参数的矩阵|
|`void context.setTransform(a, b, c, d, e, f)`|将当前的变形矩阵重置为单位矩阵，然后用相同的参数调用 `transform` 方法。|
|`void context.resetTransform()`|重置当前变形为单位矩阵。|

其中，基于自身参数的矩阵：
$$
\begin{pmatrix}   
a & c & e \\ 
b & d & f \\
0 & 0 & 1 
\end{pmatrix}
$$
其中：

|名称|a|b|c|d|e|f|
|----|----|----|----|----|----|----|
|含义|水平方向的缩放|水平方向的倾斜偏移|竖直方向的倾斜偏移|竖直方向的缩放|水平方向的移动|竖直方向的移动|
|初始值|1|0|0|1|0|0|

2.	变形矩阵的含义：建立两个坐标之间的映射

$$
\begin{pmatrix}   
x' \\ 
y' \\
1
\end{pmatrix}
=
\begin{pmatrix}   
a & c & e \\ 
b & d & f \\
0 & 0 & 1 
\end{pmatrix}
\begin{pmatrix}   
x \\ 
y \\
1
\end{pmatrix}
$$

变换后，原点为 $\begin{pmatrix} e \\ f\end{pmatrix}$，基为 $\begin{pmatrix} a \\b\end{pmatrix}$ 和 $\begin{pmatrix} c \\d\end{pmatrix}$.

### 4.保存状态

|函数|说明|
|----|----|
|`void context.save()`|保存当前画布的状态，包括变换矩阵和自定义的样式|
|`void context.restore()`|恢复画布的状态，包括变换矩阵和自定义的样式。|

<!-- tabs:start -->
#### **例：利用变形矩阵绘制加载进度条**
<iframe width="100%" height="300" src="//jsrun.net/hGvKp/embedded/all/light" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
<!-- tabs:end -->

## 三.图形绘制
### 1. 绘制矩形
绘制矩形的函数：

|函数|说明|
|----|----|
|`void context.fillRect(x, y, width, height)`|绘制一个填充的矩形|
|`void context.strokeRect(x, y, width, height)`|绘制一个矩形边界|
|`void context.clearRect(x, y, width, height)`|清除指定矩形区域，使其完全透明|

### 2. 绘制路径
1.	绘制路径的步骤：
	+	创建路径起始点。
	+	使用画图命令去画出路径，并把路径封闭。
	+	通过描边或填充路径区域来渲染图形

2.	操作路径的函数

|函数|说明|
|----|----|
|`void context.beginPath()`|新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。|
|`void context.closePath()`|闭合路径之后图形绘制命令又重新指向到上下文中。|
|`void context.stroke([Path2DObj])`|通过线条来绘制图形轮廓，可以添加一个`Path2D`对象作为参数。|
|`void context.fill([Path2DObj])`|通过填充路径的内容区域生成实心的图形，可以添加一个`Path2D`对象作为参数。|
|`void context.clip()`|将当前路径设置为裁切路径。后面的图形只会绘制在该路径内。|

3.	操作画笔的函数

|函数|说明|画笔结束位置|
|----|----|----|
|`void context.moveTo(x, y)`|移动画笔到$(x,y)$位置。|指定位置$(x,y)$|
|`void context.lineTo(x, y)`|用画笔绘制一条直线。|结束点$(x,y)$|
|`void context.arc(x, y, radius, startAngle, endAngle, acw)`|用画笔绘制一条弧线。$(x,y)$为圆心，$radius$为半径，$startAngle$为起始弧度，$endAngle$为终止弧度，$acw$ 为方向，`true`代表逆时针。|绘制前位置|
|`void context.arcTo(x1, y1, x2, y2, radius)`|根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点。|绘制前位置|
|`void context.quadraticCurveTo(cp1x, cp1y, x, y)`|绘制二次贝塞尔曲线。$(cp_{1x},cp_{1y})$为一个控制点，$(x,y)$为结束点。|结束点$(x,y)$|
|`void context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`|绘制三次贝塞尔曲线，$(cp_{1x},cp_{1y})$为控制点一，$(cp_{2x},cp_{2y})$为控制点二，$(x,y)$为结束点。|结束点$(x,y)$|
|`void context.rect(x, y, width, height)`|绘制一个左上角坐标为$(x,y)$，宽高为width以及height的矩形。|原点$(0,0)$|


>**二次和三次贝塞尔曲线**
>
>![](https://mdn.mozillademos.org/files/223/Canvas_curves.png)
>
>(图片引用自MDN)

<!-- tabs:start -->
#### **例：三次贝塞尔曲线绘制心形**
<iframe width="100%" height="300" src="https://jsrun.net/xdvKp/embedded/all/light" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
<!-- tabs:end -->

### 3. Path2D 绘制路径
!> 试验性功能，浏览器可能不支持

1.	`Path2D` 可以将已有的路径和SVG图形保存到对象中，方便复制。
```js
new Path2D();     // 空的Path对象
new Path2D(path); // 克隆Path对象
new Path2D(d);    // 从SVG建立Path对象
```
2.	`Path2D` 可以使用上面的全部画笔函数。
3.	`Path2D` 可以使用 `addPath` 函数将一个`Path2D`对象添加到令一个 `Path2D`对象中。其语法格式如下：
```js
//path:另一个对象
//transform:可选的变换矩阵，用于对图形进行变换
void Path2DObj.addPath(path [, transform]);
```
4.	使用`context.stroke` 和 `context.fill` 函数将路径添加到画布上。

## 四.文本绘制
### 1.绘制文本
|语法|说明|
|----|----|
|`void context.fillText(text, x, y [, maxWidth])`|在指定的$(x,y)$位置填充指定的文本，绘制的最大宽度是可选的。|
|`void context.strokeText(text, x, y [, maxWidth])`|在指定的$(x,y)$位置绘制文本边框，绘制的最大宽度是可选的.|

### 2.设置文本样式

|语法|可选值|默认值|说明|
|----|----|----|----|
|`context.font = value`|无|"10px sans-serif"|设置字体。|
|`context.textAlign = value`|`start`, `end`, `left`, `right`,`center`|`start`|设置对齐。|
|`context.textBaseline = value`|`top`, `hanging`, `middle`, `alphabetic`, `ideographic`, `bottom`|`alphabetic`|设置文字基线对齐。|
|`context.direction = value`|`ltr`, `rtl`, `inherit`|`inherit`|设置文字方向。|

文字基线对齐参考：
![](http://www.whatwg.org/specs/web-apps/current-work/images/baselines.png)

### 3.获取文字细节
|语法|说明|
|----|----|
|`TextMetrics context.measureText(text)`|衡量文本信息。|
|`TextMetricsObj.width`|（只读）文本宽度。|

## 五.插入图片
### 1.可用的图片源
|源|说明|
|----|----|
|`HTMLImageElement`|HTML `img` 元素，或创建的 `Image`对象。|
|`HTMLVideoElement`|HTML `video` 元素，可抓取帧作为图片。|
|`HTMLCanvasElement`|HTML `canvas`元素。|
|`ImageBitmap`|高性能的位图对象。|

### 2.获取页面内的图片
|方法|说明|
|----|----|
|`document.images`|（只读）所有`img` 元素。|
|`document.getElementsByTagName()`等|获取指定元素。|
|`var img = new Image();img.src="somepic.png"`|手动加载图片。图片加载完之前不能绘制。（在 `onload`事件里加载）|

### 3.绘制图片

|方法|说明|
|----|----|
|`void context.drawImage(image, x, y)`|绘制图片，其中 image 是 image 或者 canvas 对象，x 和 y 是其在目标 canvas 里的起始坐标。|
|`void context.drawImage(image, x, y, width, height)`|绘制图片，其中$(width, height)$定义了图片的大小。|
|`void context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)`|绘制图片，其中$(sx, sy)$定义了图片切割起点位置，$(sw, sh)$定义了图片切割的大小；$(dx, dy)$定义了画布内图片的起始位置，$(dw, dh)$定义了目标图片的大小。|
![](https://mdn.mozillademos.org/files/225/Canvas_drawimage.jpg)

## 六.设置样式
### 1.调整颜色

|语法|说明|
|----|----|
|`context.fillStyle = color`|修改填充颜色。|
|`context.strokeStyle = color`|修改轮廓颜色。|

1.	`color` 可以是一个字符串，可以输入`CSS`支持的颜色值，如 `"orange"` `rgba(0,0,0,.3)` ，默认为黑色；`color`也可以是一个渐变对象。
2.	这些属性只影响后面生成的所有图形。

### 2.设置透明度
|语法|说明|
|----|----|
|`context.globalAlpha = transparencyValue`|修改透明度。|

1.	`transparencyValue` 是一个浮点数，范围为`0-1`之间，默认为 `1`。
2.	这些属性只影响后面生成的所有图形。
3.	除了 `globalAlpha`，也可以通过 `rgba` 来修改透明度。

<!-- tabs:start -->
#### **例：色阶的实现**
<iframe width="100%" height="300" src="//jsrun.net/HdvKp/embedded/all/light" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
<!-- tabs:end -->

### 3.设置线条样式
|语法|可选值|默认值|说明|
|----|----|----|----|
|`context.lineWidth = value`|浮点数|1.0|修改线条宽度。线宽是指给定路径的中心到两边的粗细。|
|`context.lineCap = type`|`butt`,`round`,`square` |`butt`|修改线条末端样式。|
|`context.lineJoin = type`|`round`,`bevel`,`miter`|`miter`|设置线条连接处的样式。|
|`context.miterLimit = value`|浮点数|1.0|限制当两条线相交时交接处最大长度。交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度。|

1.	`lineCap`属性 
	1.	`butt` ：端点处不变。 
	2.	`round` ：端点处加上了半径为一半线宽的半圆。
	3.	`square` 端点处加上了等宽且高度为一半线宽的方块。

2.	`lineJoin` 属性
	1.	`round`：线条连接处用弧连接，半径为线的宽度。
	2.	`bevel`：线条连接处无连接，中间是三角形。
	3.	`miter`：线条两侧分别延长相交一点，中间是正方形。

<!-- tabs:start -->
#### **例：修改线条末端样式**
<iframe width="100%" height="300" src="//jsrun.net/ndvKp/embedded/all/light" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

#### **例：修改线条连接处的样式**

<iframe width="100%" height="300" src="//jsrun.net/CdvKp/embedded/all/light" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

<!-- tabs:end -->

### 4.设置虚线
|函数|说明|
|----|----|
|`Array context.getLineDash()`|返回一个包含当前虚线样式，长度为非负偶数的数组。|
|`void context.setLineDash(segments)`|设置当前虚线样式。参数是一个长度为2的数组，指定线段和间隙的长度。|
|`context.lineDashOffset = value`|设置虚线样式的起始偏移量。|

### 5.添加渐变
1.	添加渐变的步骤
	1.	创建渐变	
	2.	添加色标
	3.	将渐变添加到`context.fillStyle`或`context.strokeStyle`

2.	添加渐变的函数

|函数|说明|
|----|----|
|`Gradient context.createLinearGradient(x0, y0, x1, y1)`|创建一个线性渐变。起点为$(x_0,y_0)$，终点为$(x_1,y_1)$。|
|`Gradient context.createRadialGradient(x1, y1, r1, x2, y2, r2)`|创建一个径向渐变。起点为$(x_0,y_0)$，半径为$r_1$；终点为$(x_1,y_1)$，半径为$r_2$。|
|`GradientObj.addColorStop(position, color)`|添加一个色标。`position` 参数必须是一个 0 与 1 之间的数值，表示渐变中颜色所在的相对位置。|


<!-- tabs:start -->
#### **例：调色板背景**
<iframe width="100%" height="300" src="//jsrun.net/mdvKp/embedded/all/light" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

<!-- tabs:end -->

### 6.添加图案
1.	创建图案的函数

|函数|说明|
|----|----|
|`CanvasPattern context.createPattern(image, repetition)`|创建一个图案对象，`image`是可用的图片对象;`repetition`为重复方式，有`repeat`，`repeat-x`，`repeat-y` 和 `no-repeat`四个值。图片加载完后才能调用此函数。|

2.	步骤：
	1.	创建图案
	2.	将图案对象用于 `context.fillStyle`或`context.strokeStyle`


### 7.添加阴影
1.	创建阴影的语法（影响后面创建的任何对象，包括文字和图片）

|语法|默认|说明|
|----|----|----|
|`context.shadowOffsetX = float`|0|阴影在X轴的偏移。|
|`context.shadowOffsetY = float`|0|阴影在Y轴的偏移。|
|`context.shadowBlur = float`|0|阴影模糊程度。|
|`context.shadowColor = color`|`"black"`|阴影颜色。|

## 七.图形组合（只作了解）
|语法|默认|说明|
|----|----|----|
|`context.globalCompositeOperation = val`|`source-over`|设置遮盖策略。|

遮盖策略一共有26种：

|策略|说明|
|----|----|
|`source-over`|（默认）在原画布上绘制图形。原图形在下面。|
|`source-in`|在两个画布重叠的地方绘制。不绘制原图形。|
|`source-out`|在两个画布不重叠的地方绘制。不绘制原图形。|
|`source-atop`|在两个画布重叠的地方绘制。绘制原图形，但原图形在下面。|
|`destination-over`|在原画布上绘制图形。原图形在上面。|
|`destination-in`|在两个画布重叠的地方绘制。不绘制新图形。|
|`destination-out`|在两个画布不重叠的地方绘制。不绘制新图形。|
|`destination-atop`|在两个画布重叠的地方绘制。绘制新图形，但原图形在上面。|
|`lighter`|直接颜色值相加。|
|`copy`|只显示新图形。|
|`xor`|重叠部分透明。|
|`multiply`|将顶层像素与底层相应像素相乘，结果是一幅更黑暗的图片。|
|`screen`|像素被倒转，相乘，再倒转，结果是一幅更明亮的图片。|
|`overlay`|multiply和screen的结合，原本暗的地方更暗，原本亮的地方更亮。|
|`darken`|保留两个图层中最暗的像素。|
|`lighten`|保留两个图层中最亮的像素。|
|`color-dodge`|将底层除以顶层的反置。|
|`color-burn`|将底层除以顶层的反置，然后将结果反过来。|
|`hard-light`|类似于叠加，但上下图层互换了。|
|`soft-light`|用顶层减去底层或者相反来得到一个正值。|
|`difference`|一个柔和版本的强光（hard-light）。纯黑或纯白不会导致纯黑或纯白。|
|`exclusion`|和difference相似，但对比度较低。|
|`hue`|保留了底层的亮度（luma）和色度（chroma），同时采用了顶层的色调（hue）。|
|`saturation`|保留底层的亮度（luma）和色调（hue），同时采用顶层的色度（chroma）。|
|`color`|保留了底层的亮度（luma），同时采用了顶层的色调(hue)和色度(chroma)。|
|`luminosity`|保持底层的色调（hue）和色度（chroma），同时采用顶层的亮度（luma）。|


