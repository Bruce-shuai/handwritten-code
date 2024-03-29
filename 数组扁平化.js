function flat(arr) {
  // 这种扁平需要递归执行才行...
  const isDeep = arr.some(item => item instanceof Array)  // 检验是否有多层数组 some只要有一个元素满足就可以
  if (!isDeep) {
    return arr;
  }
  // 利用concat来扁平，concat可以扁平一层
  // 有个疑问: 为什么 [].concat(arr) 达不到这样的效果呢？ --> 有待思考
  const res = Array.prototype.concat.apply([], arr)   // ---> 用的是apply方法  注意：[]， arr的顺序
  return flat(res);
}

console.log(flat([1, 2, 3, [4, [5, 6]]])); 





function flat(array) {
  let isDeep = array.some(item => item instanceof Array);
  if(!isDeep) {
    return array;
  }
  let newArr = Array.prototype.concat.apply([], array)
  // 这种一般都会递归
  return flat(newArr)
}



function flat(arr) {
  let isDeep = arr.some(item => item instanceof Array);     // 注意：是some方法
  let newArr;
  if (isDeep) {
    newArr = Array.prototype.concat.apply([], arr);
  } else {
    return arr;
  }
  return flat(newArr);
}