## 径向渐变

要创建径向渐变，必须定义至少两个颜色的中止点。

径向梯度由其中心定义。

径向渐变的CSS语法如下所示：

```
background: radial-gradient(shape size at position, start-color, ..., last-color);
```

| 值                             | 描述                                                         |
| :----------------------------- | :----------------------------------------------------------- |
| *shape*                        | 确定圆的类型:ellipse (默认): 指定椭圆形的径向渐变。circle ：指定圆形的径向渐变 |
| *size*                         | 定义渐变的大小，可能值：farthest-corner (默认) : 指定径向渐变的半径长度为从圆心到离圆心最远的角closest-side ：指定径向渐变的半径长度为从圆心到离圆心最近的边closest-corner ： 指定径向渐变的半径长度为从圆心到离圆心最近的角farthest-side ：指定径向渐变的半径长度为从圆心到离圆心最远的边 |
| *position*                     | 定义渐变的位置。可能值： center（默认）： 设置中间为径向渐变圆心的纵坐标值。 top： 设置顶部为径向渐变圆心的纵坐标值。 bottom： 设置底部为径向渐变圆心的纵坐标值。 |
| *start-color, ..., last-color* | 用于指定渐变的起止颜色。                                     |

## 线性渐变
```
background-image: linear-gradient(direction, color-stop1, color-stop2, ...);
```

| 值                             | 描述                               |
| :----------------------------- | :--------------------------------- |
| *direction*                    | 用角度值指定渐变的方向（或角度）。 |
| *color-stop1, color-stop2,...* | 用于指定渐变的起止颜色。           |

