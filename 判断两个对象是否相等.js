function isObject(param) {
  return typeof param !== 'object' && param !== null;
}

function isEqual(param1, param2) {
  // 二者是否是对象
  if (isObject(param1) && isObject(param2)) {
    return param1 === param2;
  }
  // 二者是否是同一引用
  if (param1 === param2) {
    return true;
  }
  // 二者开始比较
  let keys1 = Object.keys(param1);
  let keys2 = Object.keys(param2);

  // 二者的属性长度进行比较
  if (keys1.length !== keys2.length) {
    return false;
  }

  // 二者进行进一步的比较
  for (let key in param1) {
    // 如果内部返回的是false，则外部同样是false  --> 这里其实就暗示了，只要有一处是false，则全处都是false
    if (!isEqual(param1[key], param2[key])) {
      return false;
    }
  }
  return true;
}