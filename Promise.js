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
          result[i] = data;
          count++;

          // 异步结束标志
          if (count === array.length) {
            resolve(results)
          }
        }).catch(reject);
      } else {
        result[i] = item;
        count++;
      }
    }
  })
}