// 单例模式浅析：它要求我们保证一个类仅有一个实例，并提供一个访问它的全局访问点
// 利用闭包来解决

class SingleDog {
  // show() {
  //   console.log('我是一个单例对象')
  // }
  static getInstance() {
    if (!SingleDog.instance) {
      SingleDog.instance = new SingleDog();
    }
    return SingleDog.instance;
  }
}

let s1 = SingleDog.getInstance();
let s2 = SingleDog.getInstance();
console.log(s1 === s2);    // true;