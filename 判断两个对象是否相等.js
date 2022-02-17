function diff(obj1, obj2) {
  let o1 = obj1 instanceof Object;
  let o2 = obj2 instanceof Object;
  // 如果二者连对象都不是
  if (!o1 || !o2) { 
    return obj1 === obj2;
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  for (let attr in obj1) {
    let t1 = obj1[attr] instanceof Object
    let t2 = obj2[attr] instanceof Object
    if(t1 && t2) {
      return diff(obj1[attr], obj2[attr])
    } else if (obj1[attr] !== obj2[attr]) {   // 不管值是不是引用类型都可以检查出来
      return false;
    }
  }
  return true;
}