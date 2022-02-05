// https://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html
// 继承
// 原型链继承
// 注意：实例.__proto__ === 构造函数.prototype
// function Animal() {
//   this.colors = ['black', 'white'];
// }
// Animal.prototype.getColor = function () {
//   return this.colors;
// }
// function Dog() {}
// Dog.prototype = new Animal();

// let dog1 = new Dog();   // dog1.__proto__ === Dog.prototype
// dog1.colors.push('brown');

// let dog2 = new Dog();   // dog2.__proto__ === Dog.prototype
// console.log(dog2.colors);
// // dog1 和 dog2 共享同一个Dog.prototype



// 构造函数绑定：
function Animal(){
  this.species = "动物";
}

function Cat(name, color) {
  Animal.apply(this, arguments);
  this.name = name;
  this.color = color;
}

var cat1 = new Cat('大毛', '黄色')
console.log(cat1.species);

// prototype模式
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
var cat1 = new Cat('大毛', '黄色');
alert(cat1.species);   // 动物

// 直接继承 prototype
// 让Cat()跳过 Animal()，直接继承Animal.prototype
// 这样做的优点是效率比较高（不用执行和建立Animal的实例了），
// 比较省内存。缺点是 Cat.prototype和Animal.prototype现在指向了同一个对象，
// 那么任何对Cat.prototype的修改，都会反映到Animal.prototype
Cat.prototype = Animal.prototype;
Cat.prototype.constructor = Cat;
var cat1 = new Cat('大毛', '黄色')
alert(cat1.species); // 动物

// 利用空对象作为中介
// 这时候修改Cat的prototype就不会影响到Animal的prototype对象
var F = function() {};
F.prototype = Animal.prototype;
Cat.prototype = new F();
Cat.prototype.constructor = Cat;