class EventEmitter {
  constructor() {
    this.cache = {};
  }

  // 订阅
  on(name, fn) {
    if (this.cache[name]) {
      this.cache[name].push(fn);
    } else {
      // 放置的是一个数组
      this.cache[name] = [fn];    
    }
  }

  // 踢掉某个订阅者
  off(name, fn) {
    const tasks = this.cache[name];
    if (tasks) {
      // f.callback  是一个什么操作哦？
      const index = tasks.findIndex(f => f === fn || f.callback === fn); 
      if (index >= 0) {
        tasks.splice(index, 1);
      }
    }
  }

  // 发布
  emit(name, once = false) {
    if (this.cache[name]) {
      const tasks = this.cache[name].slice();   // 创建了一个副本
      for (let fn of tasks) {
        fn();
      }
      if (once) {
        delete this.cache[name]
      }
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