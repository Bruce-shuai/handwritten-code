function diff(obj1, obj2) {
  let o1 = obj1 instanceof Object;
  let o2 = obj2 instanceof Object;
  // 如果二者连对象都不是
  if (!o1 || !o2) { 
    return obj1 === obj2;   // 或许用Object.is 也是非常不错的选择
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {  // 引用类型先比较长度
    return false;
  }

  for (let attr in obj1) {
    let t1 = obj1[attr] instanceof Object
    let t2 = obj2[attr] instanceof Object
    if(t1 && t2) {
      return diff(obj1[attr], obj2[attr])     // 如果是引用类型就继续比较
    } else if (obj1[attr] !== obj2[attr]) {   // 不管值是不是引用类型都可以检查出来
      return false;
    }
  }
  return true;
}


function diff(obj1, obj2) {
  let o1 = obj1 instanceof Object;
  let o2 = obj2 instanceof Object;

  if (!o1 || !o2) {
    return obj1 === obj2
  }

  if (Object.keys(o1) !== Object.keys(o2)) {
    return false;
  }
  let flag = true;

  for (let attr in obj1) {
    let o1 = obj1[attr];
    let o2 = obj2[attr];

    if (o1 && o2) {
      flag = diff(obj1[attr], obj2[attr])
    } else {
      return false; 
    }
  }
  return flag;
}