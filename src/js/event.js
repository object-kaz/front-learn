let Event = (function () {
  // 私有事件对象
  class Event {
    /**
     * 构造函数
     * @param {*} namespace 是否开启命名空间
     */
    constructor() {
      this.handlers = {}
    }

    //监听一个事件
    on (name, handler = null) {
      if (!this.handlers[name])
        this.handlers[name] = []
      if(handler instanceof Function)
        this.handlers[name].unshift(handler)
      return this
    }

    // 触发事件
    trigger (name, thisArg, ...args) {
      if (!this.handlers[name]) return
      for (let func of this.handlers[name])
        if (func instanceof Function)
          func.apply(thisArg, args)
      return this
    }

    // 删除事件
    remove (name, handler) {
      if (!this.handlers[name]) return
      this.handlers[name] = this.handlers[name].filter((func) => func != handler)
      return this
    }
  }

  // 存储的事件实例
  let instances = {}

  Event.create = function (name = null) {
    // 注册一个匿名发布者，不受 GlobalEvent 管理
    if (!name) return new Event()
    //避免重复注册
    if (!instances[name])
      instances[name] = new Event()
    return instances[name]
  }

  // 移除发布者
  Event.remove = function(name) {
    instances[name] = null
    return this
  }

  // 获取全局实例
  Event.get = function (name) {
    let instance = instances[name]
    if (!(instance instanceof Event))
      throw new Error('Can not get a invalid instance.')
    return instance
  }

  Event.has = function (name) {
    return  Boolean(instances[name] && instance instanceof Event)
  }

  return Event
})()

// cjs module system
if (module && module.exports)
  module.exports = Event
else if (define) {
  // cmd module system
  if (define.cmd)
    define(function (require, exports, module) {
      module.exports = Event
    });
  // amd module system
  if (define.amd)
    define(function () {
      return Event
    })
}
else {
  // no module system loaded
  globalThis.Event = Event
}

/**
 * 【特色】
 * 支持全局发布者
 * 支持 AMD、CMD、CJS 模块系统
 * 语法简洁，便于使用
 * 【使用方法】
 * 1.定义一个具名发布者:
 * Event.create('hi').on('a',() => console.log(123456)).trigger('a')
 * 可以使用 get 方法来获取发布者
 * Event.get('hi').xxx
 * 2.定义一个匿名发布者：
 * Event.create().on('a', () => console.log(123456)).trigger('a')
 * 也可以直接 new:
 * new Event()
 * 匿名发布者无法使用 get 方法获取
 * 3.继承事件系统
 * class xxx extends Event {}
 * 继承后，该类即可使用诸如 on、trigger、remove 之类的指令
 * 4.mixin（混合)
 * class MyClass {}
 * Event.mixin(MyClass)
 * 默认情况下， mixin 会创建一个新的对象，也可以传入第二个参数来实现已有对象。
 * 混合后，类也可以使用诸如 on、 trigger、 remove 之类的指令
 */