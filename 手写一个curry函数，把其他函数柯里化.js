// curry 返回的是一个函数
// 执行fn，中间状态返回函数，如add(1) 或者 add(1)(2)
// 最后返回执行结果，如 add(1)(2)(3)
function curry(fn) {
  const fnArgsLength = fn.length;   // 这样可以算出传入函数的参数长度  -->  这一步很厉害
  let args = [];

  // 别用箭头函数
  function calc(...newArgs) {
    args = [
      ...args,     //闭包
      ...newArgs   //这个放在后面
    ]
    if (args.length < fnArgsLength) {
      // 参数不够，返回函数
      return calc;
    } else {
      // 参数够了，返回执行结果。 下面的这个this就是calc的this
      return fn.apply(this, args.slice(0, fnArgsLength));
    }
  }
  return calc; 
}


function curry(fn) {   // 传的是一个函数
  let fnLen = fn.length;
  let args = [];
  function func(...newArgs) {
    args = [...args, ...newArgs];
    if (args.length < fnLen) {
      return func
    } else {
      return fn.apply(this, args.slice(0, fnLen))
    }
  }
  return func;
}

function add(a, b, c) {
  return a + b + c;
}
add(10, 20, 30);

const curryAdd = curry(add);  
const res = curryAdd(10)(20)(30)   
console.info(res);


function curry(fn) {
  let fnLen = fn.length;
  let args = [];
  function func(...newArgs) {
    args = [...args, ...newArgs];
    if (args.length < fnLen) {
      return func;   // 这里是返回一个函数
    } else {
      return fn.apply(this, args.slice(0, fnLen))  // 这里需要着重注意： fn.apply(this, args.slice(0, fnLen)) // 执行最初传过来的函数
    }
  }
  return func;
}


function curry(fn) {
  let fnLen = fn.length;
  let args = [];
  return function func(...newArgs) {
    args = [...args, ...newArgs];
    if (args.length >= fnLen) {
      return fn.apply(this, args.slice(0, fnLen))
    } else {
      return func;
    }
  }
}