class EventEmitter {
  constructor() {
    // 在全局我们需要设置一个对象，来存储事件和监听函数之间的关系
    // eventMap 用来存储事件和监听函数之间的关系
    this.eventMap= {}
  }

  // 订阅
  on(type, handler) {
    // handler必须是一个函数，如果不是直接报错
    if (!(handler instanceof Function)) {
      throw new Error('哥 你错了 请传一个函数')
    }
    // 判断 type 事件对应的队列是否存在
    if (!this.eventMap[type]) {
      // 如果不存在，新建该队列
      this.eventMap[type] = [];
    }
    // 若存在，直接往队列里推入handler
    this.eventMap[type].push(handler)
  }

  // 踢掉某个订阅者
  off(type, handler) {
    if(this.eventMap[type]) {
      // >>> 效果是
      this.eventMap[type].splice(this.eventMap[type].indexOf(handler)>>>0,1)
    }
  }
  

  // 发布
  emit(type, params) {
    // 假若该事件是有订阅的
    if (this.eventMap[type]) {
      this.eventMap[type].forEach((handler, index) => {
        handler(params)
      })
    }
  }
}

const eventBus = new EventEmitter();
const task1 = () => { console.log('task1') }
const task2 = () => { console.log('task2') }

eventBus.on('task', task1);
eventBus.on('task', task2);
eventBus.off('task', task1);
setTimeout(() => {
  eventBus.emit('task')
}, 1000)