### 1. `rel` 属性

用于 `a` 、 `link` 、 `area` ，说明一个链接与当前网站的关系。

常用值：

`stylesheet` 定义一个样式表。

`nofollow` 作者不宣传这个链接下的文档。

### 2. `meta` 的 `name=viewport` 属性

`viewport`, 它提供有关视口初始大小的提示，仅供移动设备使用。

- | Value           | 可能值                               | 描述                                                         |
  | :-------------- | :----------------------------------- | :----------------------------------------------------------- |
  | `width`         | 一个正整数或者字符串 `device-width`  | 以pixels（像素）为单位， 定义viewport（视口）的宽度。        |
  | `height`        | 一个正整数或者字符串 `device-height` | 以pixels（像素）为单位， 定义viewport（视口）的高度。        |
  | `initial-scale` | `一个0.0` 到`10.0之间的正数`         | 定义设备宽度（纵向模式下的设备宽度或横向模式下的设备高度）与视口大小之间的缩放比率。 |
  | `maximum-scale` | `一个0.0` 到`10.0之间的正数`         | 定义缩放的最大值；它必须大于或等于`minimum-scale`的值，不然会导致不确定的行为发生。 |
  | `minimum-scale` | 一个`0.0` 到`10.0`之间的正数         | 定义缩放的最小值；它必须小于或等于`maximum-scale`的值，不然会导致不确定的行为发生。 |
  | `user-scalable` | 一个布尔值（`yes` 或者`no`）         | 如果设置为` no`，用户将不能放大或缩小网页。默认值为` yes`。  |

