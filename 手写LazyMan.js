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
    this.tasks = [];  // 关键点，存放任务
    setTimeout(() => {
      this.next();
    })
  }

  next() {
    const task = this.tasks.shift();
    if (task) task();
  }

  eat(food) {
    const task = () => { // 注意：这里是箭头函数，因为this指向问题
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
        this.next();   // 多少秒之后再执行下一个任务   --->  箭头函数的this指向的是task的this(但由于task也是箭头函数，则task的this指向的是sleep的this)
      }, seconds * 1000)  // 用了个闭包
    }
    this.tasks.push(task)
    return this  
  }
}




class LazyMan {
  constructor(name) {
    this.name = name;
    this.tasks = [];
    setTimeout(() => {
      this.next();
    })
  }

  next() {
    this.tasks.shift();
  }
  eat(food) {
    function task() {
      console.log(`${this.name}在吃${food}`)
      this.next();
    }
    this.tasks.push(task);
    return this;  // 链式调用
  }
  sleep(time) {
    function task() {
      setTimeout(() => {   // 要用箭头函数，不然容易出现问题
        console.log(`${this.name}等待了${time}秒`);
        this.next();
      }, time * 1000)
    }
    this.tasks.push(task)
    return this;  // 链式调用
  }
}