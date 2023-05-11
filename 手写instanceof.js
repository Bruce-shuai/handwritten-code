// instanceof 其作用是判断  一个实例是否属于某个类型
// instanceof 也可以判断一个实例是否是其父类型或者祖先类型的实例


function instanceOf(left, right) {
  let proto = left.__proto__  // Object.getPrototypeOf(left) 也可以
  while (true) {
    if (proto === null) return false;  // Object.prototype.__proto__ === null
    if (proto === right.prototype) return true;
    proto = proto.__proto__   // Object.getPrototypeOf(proto) 也可以
  }
}



function instanceOf(left, right) {
  while (left) {
    if (left.__proto__ === right.prototype) return true;
    if (left.__proto__ === null) return false;
    proto = proto.__proto__ 
  }
}