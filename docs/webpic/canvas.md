## 一.Canvas栅格

1.	大小：画布的总宽度为画布的 `width` 属性，总高度为画布的 `height` 属性。
2.	背景：画布是透明的。
3.	原点：位于画布的左上角，所有的位置均相当于原点定位。
4.	默认颜色（填充以及边框）：黑色。
5.	单位：像素 `px`。

![](https://mdn.mozillademos.org/files/224/Canvas_default_grid.png)
(图片引用自MDN)

## 二.获取画布上下文
使用 `getContext`函数。
```js
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
```

## 三.图形绘制
### 1. 绘制矩形
绘制矩形的函数：

|函数|说明|
|----|----|
|`void context.fillRect(x, y, width, height)`|绘制一个填充的矩形|
|`void context.strokeRect(x, y, width, height)`|绘制一个矩形边界|
|`void context.clearRect(x, y, width, height)`|清楚指定矩形区域，使其完全透明|

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

## 四.图形样式
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
|`void context.setLineDash(segments)`|设置当前虚线样式。参数是一个二维数组，指定线段和间隙的长度。|
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
