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
  return res instanceof Object ? res : obj;   // 有一个问题： obj是没有绑定this的呀！
}