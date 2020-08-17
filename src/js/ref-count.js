var memory = {
  data: [],
  create (...values) {
    for(let value of values)
      if(isObject(value))
        this.data.push(value)
  },
  remove (...values) {
    this.data = this.data.filter(data => values.indexOf(data) == -1)
    for(let value of values)
      console.log('模拟内存删除:', opValue(value))
  },
  clear () {
    this.data = []
  },
  empty () {
    return this.data.length == 0
  }
}

/**
 * 模拟函数调用
 */
function vm(func)
{
  //用来存放变量的地方
  var vars = createProxy({})
  changeCount(vars, 1)
  func(vars)
  
  //函数调用完毕
  for (let name in vars) delete vars[name]
  changeCount(vars, -1)

  //内存泄漏检测
  if (!memory.empty())
    console.error('模拟出内存泄漏:', memory.data)
  else
    console.log('未模拟出内存泄漏')
  memory.clear()
}

/**
 * 修改计数，只针对 Object 其作用
 * @param {*} value 值
 * @param {Number} delta 变化量
 */
function changeCount (value, delta = 1)
{
  
  if (!isObject(value)) return value
  else if ('_count' in value) {
    value._count += delta
  }
  else {
    Object.defineProperty(value, '_count', {
      enumerable: false,
      configurable: false,
      writable: true,
      value: 1
    })
    memory.create(value)
  }
  if (value._count == 0)
    memory.remove(value)
  return value  
}

/**
 * 设置变量的值
 * @param {Object} vars 变量列表
 * @param {String} name 变量名称
 * @param {*} value 变量的值
 */
function setValue (vars, name, value) {
  if (vars[name] == value) return vars[name];

  if (isObject(value) && !('_name' in value))
    Object.defineProperty(value, '_name', {
      enumerable: false,
      configurable: false,
      writable: true,
      value: name
    })
  console.log('修改', opValue(name), ':', opValue(vars[name], name), '->', opValue(value, name))
  changeCount(vars[name], -1) //调整原来值的计数
  vars[name] = createProxy(value)
  changeCount(vars[name], 1) //调整新值的计数
}



//打印变量
function opValue (value,name = null) {
  if (!isObject(value) || !('_name' in value) || name == value._name) return value;
  else return `Ref(${value._name},${value._count})`    
}

/**
 * 使用 delete 删除值
 * @param {Object} vars 
 * @param {String} name 
 */
function deleteValue (vars, name) {
  //先清理属性中的所有引用
  if (isObject(vars[name]) && isProxyed(vars[name])) {
    for (let i in vars[name]) {
      if (isObject(vars[name][i]) && '_count' in vars[name][i]) {
        changeCount(vars[name][i], -1)
      }
    }
  }

  //清理它本身
  console.log('删除:', name, ',值为:', opValue(vars[name],name))
  changeCount(vars[name], -1) //调整原来值的计数
  delete vars[name]
  return true
}

/**
 * 函数调用
 * @param {Object} target
 * @param {String} name 
 */
function apply (target, ctx, args) {
  for (let i in args) {
    args[i] = createProxy(args[i])
    changeCount(args[i],1)
  }
  console.log('模拟函数调用:', ...args.map(value => opValue(value)))

  //作用域参数
  let scopeArg = createProxy({})
  changeCount(scopeArg, 1)

  let ret = target.call(ctx, scopeArg, ...args)
  changeCount(scopeArg, -1)
  for (let i in args) 
    changeCount(args[i],-1)
  return ret
}

/**
 * 创建代理，用于监听get/set/delete 操作
 * @param {Object} obj 
 */
function createProxy (obj)
{
  if (!isObject(obj) || isProxyed(obj)) return obj;
  Object.defineProperty(obj, '_proxyed', {
    enumerable: false,
    configurable: false,
    value: true
  })
  return new Proxy(obj, {
    set: setValue,
    deleteProperty: deleteValue,
    apply
  })
}

/*是否被代理（Proxy.prototype = undefined）*/
function isProxyed (obj)
{
  return Boolean(obj._proxyed)
}

function isObject (val)
{
  //前面过滤 null 后面过滤非对象类型
  return ['object', 'function'].indexOf(val == null || typeof val) != -1
}

/* 
 * 测试函数
 * 为保证模拟正常，需要做以下调整：
 * 1.不要用 var 、let、const 声明变量，用 vars.xxx 声明变量和函数，不要用 Symbol 声明变量
 * 2.函数的第一个参数为 scope，其余的参数会加到后面
 * 3.不要使用闭包
 */
function test (vars) {
  vars.a = { a: 1, b: 2 }
  vars.b = vars.a
  vars.a = { c: 1, d: 2 }
  vars.b = null
}

vm(test) //幸福从这里开始