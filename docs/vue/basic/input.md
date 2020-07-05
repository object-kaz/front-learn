## 一.表单输入绑定

1. 	**v-model** 会用Vue对象的数据替代 表单元素的初始值
2.	默认绑定

|  表单类型|绑定属性|绑定事件|属性类型|
|  ----|----|----|----|
|  text|value|input|string|
|  textarea|value|input|string|
|  checkbox(单个)|checked|change|bool|
|  checkbox(多个)|value|change|string array|
|  radio|value|change|string|
|  select(单选)|value|change|string|
|  select(多选)|value|change|string array|


2. **修饰符**
   +	`.lazy` 将输入时触发改为 内容改变时触发。
   +	`.number` 输入结果转换为数据
   +	`.trim` 忽略首尾的空白字符

