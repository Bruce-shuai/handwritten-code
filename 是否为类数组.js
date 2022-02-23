// 类数组与数组的区别
// 所谓 类数组对象，即格式与数组结构类似，拥有 length 属性，可以通过索引来访问或设置里面的元素，但是不能使用数组的方法，就可以归类为类数组对象



function test() {
  console.log(Object.prototype.toString.call(arguments))
}