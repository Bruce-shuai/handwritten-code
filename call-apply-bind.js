// call、apply 和 bind的区别在于，前者改变this的指向，并且立即执行该函数而后者是返回一个函数，改变this的指向(永久性的)，

/**
 * call
 * 做两件事
 * 1. 改变this的指向，将this绑定到第一个入参对象上
 * 2. 根据输入的参数来执行该函数 
 */

// 简单版本
// Function.prototype.call = function(obj, ...args) {
//   // 改变this指向
//   obj.func = this;    // 这里的this即调用call的方法，把这个方法赋值给obj新创建的属性 func
//   obj.func(...args);  // 执行该函数
//   delete obj.func;    // 删掉新添加的属性
// }

// 复杂一点的
Function.prototype.myCall = function(obj, ...args) {
  // 先判断是否传入了值
  obj = obj || window
  let fn = Symbol();    // 创建一个独一无二的属性
  obj[fn] = this;       
  let result = obj[fn](...args);
  delete obj[fn];
  return result;
}


// apply ---> 代码逻辑和call非常相似(只不过这里借助的是arguments)
Function.prototype.myApply = function(obj) {
  obj = obj || window;
  let fn = Symbol();
  obj[fn] = this;
  let result; 
  if (arguments[1]) {  // 如果传入了参数,参数是数组
    result = obj[fn](...arguments[1]);
  } else {
    result = obj[fn]();
  }
  delete obj[fn];
  return result;
}

// bind  最后返回的是一个函数
Function.prototype.myBind = function(obj) {
  let that = this;
  let args = [...arguments].slice(1);  // 将类数组转化为数组
  // 返回一个函数
  return function func() {
    // 因为返回了一个函数，我们可以new F(), 所以需要判断
    if(this instanceof func) {  // 这里没搞懂
      return new that(...args, ...arguments);
    }
    return that.apply(obj, [...args, ...arguments]);
  }
}