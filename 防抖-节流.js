// 防抖
// fnA 是要被触发的回调函数， delay 是延迟时间
let debounce = function(fnA, delay) {
  let timer = null;

  return function() {
    // 锁定当前this的指向，方便控制fnA的this指向和
    let context = this;
    let args = arguments;
  }
}