// 节流
// 在某段时间内，不管你触发了多少次回调，我都只认第一次，并在计时结束时给予响应
function throttle(fn, interval) {
  let last = 0;

  return function() {
    let context = this;
    let args = arguments;
    let now = +new Date();   // 当前的时间戳

    if (now - last >= interval) {
      last = now;
      fn.apply(context, args)
    }
  }
}


// 防抖
// 最后一次说了算
// fnA 是要被触发的回调函数， delay 是延迟时间
let debounce = function(fn, delay) {
  let timer = null;    // 因为闭包问题，所以第二次执行该函数的时候是会忽略这个let timer = null这种情况的

  return function() {
    // 锁定当前this的指向，方便控制fnA的this指向和
    let context = this;
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  }
}