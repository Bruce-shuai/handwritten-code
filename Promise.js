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

// function CutePromise(executor) {
//   this.value = null;   // 成功结果
//   this.reason = null;  // 失败原因
//   this.status = 'pending';

//   // 缓存两个队列，维护 resolved 和 rejected 各自对应的处理函数
//   this.onResolvedQueue = [];
//   this.onRejectedQueue = [];

//   var self = this;

//   // 定义 resolve 函数
//   // 定义 reject 函数
//   function resolve(value) {
//     if (self.status !== 'pending') {
//       return;
//     }
//     self.value = value;
//     self.status = 'resolved';
//     setTimeout(function(){
//       // 批量执行 resolved 队列里的任务
//       self.onResolvedQueue.forEach(resolved => resolved(self.value)); 
//     });

//   }

//   function reject(reason) {
//     if (self.status !== 'pending') {
//       return;
//     }
//     self.reason = reason;
//     self.status = 'rejected';
//     setTimeout(function(){
//       // 批量执行 rejected 队列里的任务
//       self.onRejectedQueue.forEach(rejected => rejected(self.reason));
//     });
//   }

//   executor(resolve, reject)
// }

// CutePromise.prototype.then = function(onResolved, onRejected) {
//   if (typeof onResolved !== 'function') {
//     onResolved = function(x){ return x }
//   }
//   if (typeof onRejected !== 'function') {
//     onRejected = function(e){ throw e }
//   }

//   var self = this;
//   if (self.status === 'resolved') {
//     onResolved(self.value);
//   } else if (self.status === 'rejected') {
//     onRejected(self.reason);
//   } else if (self.status === 'pending') {
//     self.onResolvedQueue.push(onResolved);
//     self.onRejectedQueue.push(onRejected);
//   }
//   return this;
// }


// 这个实习版本的Promise能够执行到第四步就可以了

const PENDING = 'pending';
const REJECTED = 'rejected';
const FULFILLED = 'fulfilled';

class MyPromise {
  constructor(executor) {
    executor(this.resolve, this.reject);
  }

  // 这个是类的实例属性，效果和放在constructor里面的 this.status 效果一样
  status = PENDING;  
  value = null;   
  reason = null;

  onFulfilledCallbacks = [];
  onRejectedCallbacks = [];

  resolve = (value) => {
    // 这里对status用this是因为，这里使用的是箭头函数
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      while (this.onFulfilledCallbacks.length) {
        // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
        this.onFulfilledCallbacks.shift()(value)
      }
    }
  }

  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason)
      }
    }
  }

  then(onFulfilled, onRejected) {
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        const x = onFulfilled(this.value);  // onFulfilled 会返回在then里面的回调中的返回值
        resolvePromise(promise2, x, resolve, reject);
      } else if (this.status === REJECTED) {
        onRejected(this.reason)
      } else if (this.status === PENDING) {
        this.onFulfilledCallback.push(onFulfilled);
        this.onRejectedCallback.push(onRejected);
      }
    })
    return promise2;
  }
}

// 发挥了什么作用？将then里面回调的返回内容进行promise消化
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new Error('xxx'))
  }
  if (x instanceof MyPromise) {
    // 目的是将x的状态转变为fulfilled 或者 rejected
    x.then(resolve, reject);  // 这是一个新的Promise的状态
  } else {
    // 普通值
    resolve(x)
  }
}
const promise = new MyPromise((resolve, reject) => {
  // 目前这里只处理同步的问题
  resolve('success')
})

function other () {
  return new MyPromise((resolve, reject) =>{
    resolve('other')
  })
}
promise.then(value => {
  console.log(1)
  console.log('resolve', value)
  return other()
}).then(value => {
  console.log(2)
  console.log('resolve', value)
})