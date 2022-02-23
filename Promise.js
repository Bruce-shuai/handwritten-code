// 手写Promise.all 和 Promise.race
// Promise.all方法用于将多个Promise实例，包装成一个新的Promise实例
// [Promise.all 阮一峰](https://www.bookstack.cn/read/es6-3rd/spilt.6.docs-promise.md)


// Promise.all
Promise._all = function(array) {
  return new Promise(function(resolve, reject) {
    // 存放所有Promise成功的结果
    const result = [];
    let count = 0;   // 计数器
 
    for (let  i = 0; i < array.length; i++) {
      const item = array[i];
      if (Object.prototype.toString.call(item).slice(8, -1) === 'Promise') {
        item.then((data) => {
          result[i] = data;    // 1
          count++;             // 2

          // 异步结束标志
          if (count === array.length) {
            resolve(results)
          }
        }).catch(reject);
      } else {
        result[i] = item;      // 1
        count++;               // 2
      }
    }
  })
}


// Promise.race 
Promise._race = function(array) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < array.length; i++) {
      const item = array[i];
      if (Object.prototype.toString.call(item) === '[object Promise]') {
        item.then(resolve).catch(reject);   // 只会执行一次
      } else {
        resolve(item)
      }
    }
  })
}



// 手写Promise --- 实习版本

function CutePromise(executor) {
  this.value = null;   // 成功结果
  this.reason = null;  // 失败原因
  this.status = 'pending';

  // 缓存两个队列，维护 resolved 和 rejected 各自对应的处理函数
  this.onResolvedQueue = [];
  this.onRejectedQueue = [];

  var self = this;

  // 定义 resolve 函数
  // 定义 reject 函数
  function resolve(value) {
    if (self.status !== 'pending') {
      return;
    }
    self.value = value;
    self.status = 'resolved';
    setTimeout(function(){
      // 批量执行 resolved 队列里的任务
      self.onResolvedQueue.forEach(resolved => resolved(self.value)); 
    });

  }

  function reject(reason) {
    if (self.status !== 'pending') {
      return;
    }
    self.reason = reason;
    self.status = 'rejected';
    setTimeout(function(){
      // 批量执行 rejected 队列里的任务
      self.onRejectedQueue.forEach(rejected => rejected(self.reason));
    });
  }

  executor(resolve, reject)
}

CutePromise.prototype.then = function(onResolved, onRejected) {
  if (typeof onResolved !== 'function') {
    onResolved = function(x){ return x }
  }
  if (typeof onRejected !== 'function') {
    onRejected = function(e){ throw e }
  }

  var self = this;
  if (self.status === 'resolved') {
    onResolved(self.value);
  } else if (self.status === 'rejected') {
    onRejected(self.reason);
  } else if (self.status === 'pending') {
    self.onResolvedQueue.push(onResolved);
    self.onRejectedQueue.push(onRejected);
  }
  return this;
}