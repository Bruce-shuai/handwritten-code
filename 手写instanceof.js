function instanceOf(left, right) {
  let proto = left.__proto__  // Object.getPrototypeOf(left) 也可以
  while (true) {
    if (proto === null) return false;  // null好像是Object的原型
    if (proto === right.prototype) return true;
    proto = proto.__proto__   // Object.getPrototypeOf(proto) 也可以
  }
}
