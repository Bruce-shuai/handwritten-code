// 支持sleep 和 eat 两个方法
// 支持链式调用

// const me = new LazyMan('双越');
// me.eat('苹果').eat('香蕉').sleep('5').eat('葡萄')
// 打印结果：
// '双越 eat 苹果'
// '双越 eat 苹果'
// (等待5s)
// '双越 eat 苹果'

// 由于有sleep功能，函数不能直接在调用时触发
// 初始化一个列表，把函数注册进去
// 由每个item触发next执行(遇到sleep则异步触发)

class LazyMan {
  constructor(name) {
    this.name = name;
    this.tasks = [];
    setTimeout(() => {
      this.next();
    })
  }

  next() {
    const task = this.tasks.shift();
    if (task) task();
  }

  eat(food) {
    const task = () => {
      console.info(`${this.name} eat ${food}`)
      // 立刻执行下一个任务
      this.next();
    }
    this.tasks.push(task)
    return this;   // 链式调用必备
  }

  sleep(seconds) {
    const task = () => {
      console.log(`${this.name}开始睡觉`);
      setTimeout(() => {
        console.info(`${this.name} 已经睡完了 ${seconds}s，开始执行下一个任务`)
        this.next();   // 多少秒之后再执行下一个任务
      }, seconds * 1000)
    }
    this.tasks.push(task)
    return this  
  }
}