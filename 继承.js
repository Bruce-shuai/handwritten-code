// // 五种继承方式
// // 原型链继承   构造函数继承   组合继承    组合寄生继承    class实现继承

// // 原型链继承
// function Animal() {
//   this.colors = ['black', 'white'];
// }

// Animal.prototype.getColor = function() {
//   return this.colors;
// }

// function Dog() {}
// Dog.prototype = new Animal();  // 为Animal的实例  ---> 这里是原型链的关键

// // 注意：构造函数的实例可以有多个，原型只有一个
// let dog11 = new Dog();
// dog1.colors.push('yellow');  
// let dog21 = new Dog();
// console.log(dog2.colors);   // ['black', 'white', 'yellow']  // 共享一个实例, 这实际上是不好的。以及给Dog传的参数无法传入到Animals



// // 构造函数继承 (优势在哪？) 上诉原型链的问题都可以解决
// function Animal(name) {
//   this.name = name;
//   this.getName = function() { return this.name }
//   this.colors = ['black', 'white'];
// }

// function Dog(name) {   // 在构造函数上传入的参数可以复用原型的方法
//   Animal.call(this, name)   // 这个阶段就复制了一份 ['black', 'white']   ---> 这里是构造函数形成的关键
// }

// Dog.prototype = new Animal();

// let dog1 = new Dog();
// dog1.colors.push('yellow');  
// let dog2 = new Dog();
// console.log(dog2.colors); // ['black', 'white']  


// // 组合继承 （原型链继承+构造函数继承）

// function Animal(name) {
//   this.name = name;
//   this.colors = ['black', 'white']
// }

// Animal.prototype.getName = function () {
//   return this.name;
// }

// function Dog(name, age) {
//   Animal.call(this, name);  // 注意：这里是this
//   this.age = age;
// }

// Dog.prototype = new Animal();
// Dog.prototype.constructor = Dog;   // 这一步也很重要

// let dog1 = new Dog('奶昔', 2)
// dog1.colors.push('brown')
// let dog2 = new Dog('哈赤', 1)
// console.log(dog2) 
// // { name: "哈赤", colors: ["black", "white"], age: 1 }

// // function Animal(name) {
// //   this.name = name
// //   this.colors = ['black', 'white']
// // }
// // let obj = {}
// // Animal.call(obj, '测试')
// // obj
// // // {name: '测试', colors: Array(2)}


// // class 实现继承
// class Animal {
//   constructor(name) {
//     this.name = name;
//   }
//   getName() { return this.name; }
// }

// class Dog extends Animal {
//   constructor(name, age) {
//     super(name)
//     this.age = age;
//   }
// }