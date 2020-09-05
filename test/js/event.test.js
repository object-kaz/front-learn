let Event = require('../../src/js/event')

test('创建一个发布者并监听事件', () => {
  let a = Event.create('a')
  let pass = false
  a.on('event',() => pass = true).trigger('event')
  expect(pass).toBe(true)
})

test('删除一个发布者', () => {
  let b = Event.create('b')
  Event.remove('b')
  expect(Event.has('b')).toBe(false)
})

test('创建一个匿名发布者', () => {
  let c = Event.create()
  expect(Event.has('c')).toBe(false)
})