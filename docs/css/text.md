## 一.字体属性
|属性名|内容格式|可用值|解释|案例|
|----|-----|-----|-----|-----|
|font-family| 字体1,字体2,..| 一般serif,sans-serif| 设置字体| font-family:serif;|
|font-size| 大小| small,medium,large,x-large,大小 | 设置字体的大小| font-size:16px;|
|font-style| 字体风格| normal(默认),italic| 设置斜体| font-style:italic;|
|font-weight| 字体粗细| normal(默认,400)，bold(700)，bolder(900)，lighter(100),100-900的值| 设置粗细| font-weight:900;|
|font-variant| 字体变形| normal(默认)，small-caps（小型大写字母），和 inherit| 设置粗细| font-variant:normal;|
|text-transform| 文本属性| none(默认),uppercase,lowercase,capitalize| 文本大小写的转换 |无|

## 二.对齐属性
|属性名|内容格式|可用值|解释|
|----|-----|-----|-----|
|text-aligh| 对齐| left（默认），right，center，justify(拉伸)| 设置字体水平对齐|
|vertical-align| 对齐| top，middle，bottom，baseline(默认)，sub(下标)，super(上标)，%和大小（小于0往下，大于0往上）| 设置字体的垂直对齐， **前三种属性一般用于表格** |

## 三.空白处理
|属性名|内容格式|可用值|解释|
|----|-----|-----|-----|
|text-indent| 大小| 大小| 首行缩进|
|letter-spacing| 长度| normal(默认)，大小| 字符间距|
|word-spacing| 长度| normal(默认)，大小| 单词间距|
|white-space| 空白处理| normal(默认)，pre(保留空格),nowrap(禁止换行),pre-wrap(保留换行)，pre-line(保留，禁止换行)| 空白处理|
|word-wrap| 换行| normal,break-word(换行)| 是否对长单词进行换行处理|

## 四.文本修饰
|属性名|内容格式|可用值|解释|
|----|-----|-----|-----|
|text-shadow| 水平距离 垂直距离 模糊 颜色| 无| 文本阴影|
|text-decoration| 装饰1，装饰2，...| none（默认）,overline（上划线）,underline（链接默认，下划线）,lie-through（删除线）| 文本修饰|
|text-overflow| ...| clip修剪文本(默认) ellipsis	显示省略符号来代表被修剪的文本。 string使用给定的字符串来代表被修剪的文本| 文本溢出如何显示|

## 五.font-face
可以为不同的字体名称、粗细设置字体文件
```CSS
@font-face { 
  font-family: Delicious; 
  font-weight: bold; 
  src: url('Delicious-Bold.otf'); 
}
```