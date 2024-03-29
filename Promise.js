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

          // 异步结束标志  --->  且是放在then里面的
          if (count === array.length) {   // 这里是array.length
            resolve(result)
          }
        }).catch(reject);
      } else {
        result[i] = item;      // 1
        count++;               // 2
      }
    }
  })
}

// Promise.all 讲究的是传入数组，返回一个promise实例，且resove传入的是数据做货返回的结果
Promise._all2 = function(array) {
  return new Promise((resolve, reject) => {
    let count = 0;    // 计数器  
    let res = [];   

    for (let i = 0; i < array.length; i++) {
      let item = array[i];   

      if (Object.prototype.toString.call(item).slice(8, -1) === 'Promise') {
        item.then(data => {
          res[i] = data;
          count++;

          if (count === array.length) {
            resolve(res)
          }
        }).catch(reject)
      } else {
        res[i] = item;   
        count++;
      }
    }
  })
}

Promise._all = function (array) {
  let count = 0; // 计数器
  let len = array.length;
  let res = [];
  return new Promise((resolve, reject) => {
    for (let i = 0; i < array.length; i++) {
      let item = array[i];
      if (Object.prototype.toString.call(item) === '[object Promise]') {
        item.then((data) => {
          res[i] = data;
          count++;

          if (count === array.length) {
            resolve(res);
          }
        }).catch(reject)
      } else {
        count++;
        res[i] = item;
      }
    }
  })
}


// Promise.race 
Promise._race = function(array) {    // 不需要count
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

Promise._race2 = function(array) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < array.length; i++) {
      const item = array[i]
      if (Object.prototype.toString.call(item) === '[object Promise]') {
        item.then(data => {
          resolve(data);
        }).catch(reject)
      } else {
        resolve(item)
      }
    }
  })
}


// https://www.bilibili.com/video/BV1RR4y1p7my?from=search&seid=2255547556596525016&spm_id_from=333.337.0.0
class MyPromise {
  static PENDING = '待定';
  static FULFILLED = '成功';
  static REJECTED = '失败';

  constructor(func) {
    this.status = MyPromise.PENDING;
    this.result = null;  
    this.resolveCallbacks = [];
    this.rejectCallbacks = [];
    // 异常情况就执行reject
    try {
      // this绑定是为了让resolve 和 reject 的this指向某个实例
      func(this.resolve.bind(this), this.reject.bind(this));     // this.resolve.bind(this)
    } catch (e) {
      this.reject(e)
    }
  }

  resolve(result) {
    // resolve, reject 是要在当前作用域下最后执行的，所以用setTimeout来实现  有4个setTimeout...
    setTimeout(() => {
      if (this.status === MyPromise.PENDING) {
        this.status = MyPromise.FULFILLED;
        this.result = result;
        this.resolveCallbacks.forEach(cb => cb(result))
      }
    })
  }
  reject(result) {
    setTimeout(() => {
      if (this.status === MyPromise.PENDING) {
        this.status = MyPromise.REJECTED;
        this.result = result;
        this.rejectCallbacks.forEach(cb => cb(result))
      }
    })
  }

  then(onFULFILLED, onREJECTED) {
    // 返回一个新的promise实例
    return new MyPromise((resolve, reject) => {
      // 把不是函数的参数改为参数(promise规范)
      onFULFILLED = typeof onFULFILLED === 'function' ? onFULFILLED : () => {}
      onREJECTED = typeof onREJECTED === 'function' ? onREJECTED : () => {}
      // 只能执行两个参数中的其中一个
      if (this.status === MyPromise.PENDING) {
        // 让then里的回调稍后执行，让resolve执行后再执行then里面的内容
        this.resolveCallbacks.push(onFULFILLED)
        this.rejectCallbacks.push(onREJECTED)
      }
      if (this.status === MyPromise.FULFILLED) {
        // 设置异步执行
        setTimeout(() => {
          onFULFILLED(this.result)
        })
      } 
      if (this.status === MyPromise.REJECTED) {
        setTimeout(() => {
          onREJECTED(this.result)
        })
      }
    })
  }
}


class Promise {
  static PENDING = '待定';
  static FULFILLED = '成功';
  static REJECTED = '失败';

  constructor(func) {
    this.result = null;    
    this.status = Promise.PENDING;
    this.onRejectedCallbacks = [];   
    this.onResolvedCallbacks = [];
    try {
      func(this.resolve.bind(this), this.reject.bind(this));
    } catch (e) {
      this.reject(e);
    }
  }

  resolve(data) {
    setTimeout(() => {
      if (this.status === Promise.PENDING) {
        this.result = data;
        this.status = Promise.FULFILLED;
        this.onResolvedCallbacks.forEach(cb => cb(data))
      }
    })
  }

  reject(data) {
    setTimeout(() => {
      if (this.status === Promise.PENDING) {
        this.result = data;
        this.status = Promise.REJECTED;
        this.onRejectedCallbacks.forEach(cb => cb(data))
      }
    })
  }

  then(onFULFILLED, onREJECTED) {
    return new Promise((resolve, reject) => {
      onFULFILLED = typeof onFULFILLED === 'function' ? onFULFILLED : () => {}
      onREJECTED = typeof onREJECTED === 'function' ? onREJECTED : () => {}
      if (this.status === Promise.PENDING) {
        this.onRejectedCallbacks.push(onREJECTED);
        this.onResolvedCallbacks.push(onFULFILLED);
      }
      if (this.status === Promise.FULFILLED) {
        setTimeout(() => {
          onFULFILLED(this.result)
        })
      }
      if (this.status === Promise.REJECTED) {
        setTimeout(() => {
          onREJECTED(this.result)
        })
      }
    })   
  }
}

let promise = new MyPromise((resolve, reject) => {
  // resolve('这次一定')
  throw new Error('白嫖不成功');   // 如果是抛出错误，则执行reject
})
promise.then(
  result => {console.log(result)},
  result => {console.log(result.message)},
)




class MyPromise {
  static PENDING = '加载';
  static FULFILLED = '成功';
  static REJECTED = '失败';

  constructor(func) {
    this.result = null; 
    this.status =  MyPromise.PENDING
    this.resolveCallbacks = [];    
    this.rejectCallbacks = [];
    try {
      func(this.reject.bind(this), this.resolve.bind(this));    
    } catch (e) {
      this.reject(e);
    }
  }

  resolve(result) {
    setTimeout(() => {   // 1
      if (this.status === MyPromise.PENDING) {
        this.result = result;
        this.status = MyPromise.FULFILLED;
        this.resolveCallbacks.forEach(cb => cb(result));
      }
    })
  }

  reject(result) {
    setTimeout(() => {  // 2
      if (this.status === MyPromise.PENDING) {
        this.result = result;
        this.status = MyPromise.REJECTED;
        this.rejectCallbacks.forEach(cb => cb(result));
      }
    })
  }

  then(onFULFILLED, onREJECTED) {
    // 这里用的箭头函数 
    return new Promise((resolve, reject) => {
      onFULFILLED = typeof onFULFILLED === 'function' ? onFULFILLED : () => {}
      onREJECTED = typeof onREJECTED === 'function' ? onREJECTED : () => {}
  
      if (this.status === MyPromise.PENDING) {
        this.resolveCallbacks.push(onFULFILLED);
        this.rejectCallbacks.push(onREJECTED);
      }
      if (this.status === MyPromise.FULFILLED) {
        setTimeout(() => { // 3
          onFULFILLED(this.result)
        })
      }
      if (this.status === MyPromise.REJECTED) {
        setTimeout(() => { // 4
          onREJECTED(this.result) 
        })
      }
    })
  }
}