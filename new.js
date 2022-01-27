function newOperator(ctor, ...args) {
  // 此时的 args 是一个数组
  if (typeof ctor !== 'function') {
    throw new TypeError('Type Error')
  }
  // 以ctor.prototype为原型创建一个对象
  const obj = Object.create(ctor.prototype);
  // 执行构造函数并将this绑定到新创建的对象上
  const res = ctor.apply(obj, args);

  // 判断构造函数执行返回的结果是否是引用数据类型，若是则返回构造函数执行的结果，否则返回创建的对象
  const isObject = typeof res === 'object' && res !== null;
  const isFunction = typeof res === 'function';
  return isObject || isFunction ? res : obj;
}