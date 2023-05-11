// function newOperator(ctor, ...args) {
//   // 此时的 args 是一个数组
//   if (typeof ctor !== 'function') {
//     throw new TypeError('Type Error')
//   }
//   // 以ctor.prototype为原型创建一个对象
//   const obj = Object.create(ctor.prototype);
//   // 执行构造函数并将this绑定到新创建的对象上
//   const res = ctor.apply(obj, args);

//   // 判断构造函数执行返回的结果是否是引用数据类型，若是则返回构造函数执行的结果，否则返回创建的对象
//   const isObject = typeof res === 'object' && res !== null;
//   const isFunction = typeof res === 'function';
//   return isObject || isFunction ? res : obj;
// }


/**
 * new的作用
 * 生成一个对象
 * 对象链接到构造函数的原型
 * this的绑定
 * 返回该对象
 */
// 一篇比较好的文章：https://juejin.cn/post/6844903789070123021
// Con 是构造函数， ...arg是传入的参数
function create(Con, ...args) {
  // 创建一个空对象，并链接到原型
  let obj = Object.create(Con.prototype);
  // 绑定this，执行构造函数
  let res = Con.apply(obj, args);   // 执行一次构造函数，看是否有返回值，且返回值是否是对象 (有待研究)
  return res instanceof Object ? res : obj;   // 这里是为了忽略构造函数返回原始值的情况...
}

// function func() {   
// }
// func.prototype = {
//     name: 'apple',
//     getName() {
//         console.log(this.name)
//     }
// }
// let apple = new func()
// apple.getName() // apple
apple.getName();
apple.name // 回去寻找它的原型链上的name，然后把name赋值过来吗？ 此题可以去看看 现代JavaScript教程是怎么讲的

function create(Con, ...args) {
  let obj = Object.create(Con.prototype);
  let res = Con.apply(obj, args);   

  return res instanceof Object ? res : obj;
}