// 节流
// 在某段时间内，不管你触发了多少次回调，我都只认第一次，并在计时结束时给予响应
function throttle(fn, interval) {
  // 闭包的变量估计会覆盖原来的名字相同变量
  let last = 0;

  return function() {
    let context = this;      // 额外加的点
    let args = arguments;
    let now = +new Date();   // 当前的时间戳

    if (now - last >= interval) {
      last = now;
      fn.apply(context, args)// 额外加的点
    }
  }
}


// 防抖
// 最后一次说了算
// fnA 是要被触发的回调函数， delay 是延迟时间
let debounce = function(fn, delay) {
  let timer = null;    // 因为闭包问题，所以第二次执行该函数的时候是会忽略这个let timer = null这种情况的

  return function() {
    // 锁定当前this的指向，方便控制fn的this指向
    let context = this;           // 额外加的点
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      fn.apply(context, args);    // 额外加的点  -->  fn是调用者, context 也是内部存放的
    }, delay);
  }
}


