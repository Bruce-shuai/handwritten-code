// 判断是否是空对象
function isEmptyObj(obj) {

  // for……in 会遍历原型上可枚举的类型
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {   // hasOwnProperty 这个属性是要注意的
      return false;
    }
  }
  return true;
}

console.log(isEmptyObj({}))
console.log(isEmptyObj({'a': 123}))


// 是否是普通对象  --->  这个没搞懂 所谓的普通对象是什么？
function isPlainObj(obj) {
  // !obj 可以排除null类型
  if (!obj || typeof obj !== 'object') return true;
  let proto = obj;
  while (proto) {
    // Object.getPrototypeOf() 方法用于获取指定对象的原型对象（也就是__protp__的指向）
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) == proto;
}