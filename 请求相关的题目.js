/**
 * 好多请求, 耗时不同, 按照顺序输出, 尽可能保证快, 写一个函数.
 * const promiseList = [
 *	new Promise((resolve) => {
 *		setTimeout(resolve, 1000)
 *	}),
 *	new Promise((resolve) => {
 *		setTimeout(resolve, 1000)
 *	}),
 *	new Promise((resolve) => {
 *		setTimeout(resolve, 1000)
 *	})
 *]

fn(promiseList);

 */

const serialRequests = (arr) => {
  const len = arr.length;

  arr.forEach(item => {
    
  })
}



/**
 * 实现一个批量请求函数，并能设置并发量
 */


async function asyncPool(poolLimit, array, iteratorFn) {
  const ret = []; // 存储所有的异步任务
  const executing = []; // 存储正在执行的异步任务
  for (const item of array) {
    // 调用iteratorFn函数创建异步任务
    const p = Promise.resolve().then(() => iteratorFn(item, array));
    ret.push(p); // 保存新的异步任务

    // 当poolLimit值小于或等于总任务个数时，进行并发控制
    if (poolLimit <= array.length) {
      // 当任务完成后，从正在执行的任务数组中移除已完成的任务
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e); // 保存正在执行的异步任务
      if (executing.length >= poolLimit) {
        await Promise.race(executing); // 等待较快的任务执行完成,   注意，这里不执行完是无法执行下一步的
      }
    }
  }
  return Promise.all(ret);
}

async function asyncPool(poolLimit, array, iteratorFn) {
  const ret = [];
  const executing =[];
  for (const item of array) {
    const p = Promise.resolve().then(() => iteratorFn(item, array));
    console.log('p', p);
    ret.push(p);

    if (poolLimit <= array.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e); // 保存正在执行的异步任务
      if (executing.length >= poolLimit) {
        await Promise.race(executing); // 等待较快的任务执行完成,   注意，这里不执行完是无法执行下一步的
      }
    }
  }
  return Promise.all(ret);
}


