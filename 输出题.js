// function Foo(){
//   Foo.a = function(){
//       console.log(1);
//   }
//   this.a = function(){
//       console.log(2)
//   }
// }

// Foo.prototype.a = function(){
//   console.log(3);
// }

// Foo.a = function(){
//   console.log(4);
// }

// Foo.a();
// let obj = new Foo();
// obj.a();
// Foo.a();
/**
 * 结果为： 4   2  1
 */





const obj = {
	fn1: () => console.log(this),
	fn2: function() {console.log(this)}
}

obj.fn1();
obj.fn2();

const x = new obj.fn1();
const y = new obj.fn2();
/**
 * 结果：global obj    报错    y     
 */




 var a=3;
 function c(){
    alert(a);
 }
 (function(){
  var a=4;
  c();
 })();
/**
 * 输出结果：3
 */