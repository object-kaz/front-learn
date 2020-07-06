## 一.position
1.	**功能** 指定元素定位的方式
2.	**常用值**
	+	absolute（绝对定位）生成绝对定位的元素，相对于static定位（默认定位值，即没有定位）以外的第一个父元素进行定位。
	+	fixed（固定定位）能使具有固定位置的元素相对于浏览器窗口被定位，并且即使窗口被滚动也不会移动。
	+	relative（相对定位）元素的定位是相对其正常位置。
	+	static（默认值，静态定位）HTML元素默认为静态。 静态定位元素总是按照页面的正常流动进行定位。

3.	非静态定位元素 可用 `left` `right` `top` `bottom` 进行定位。

## 二.z-index
1.	**功能** 对于非静态定位元素，指定其显示的优先级
