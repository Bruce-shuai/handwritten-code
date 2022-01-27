function flat(arr) {
  // 这种扁平需要递归执行才行...
  const isDeep = arr.some(item => item instanceof Array)  // 检验是否有多层数组
  if (!isDeep) {
    return arr;
  }
  // 利用concat来扁平，concat可以扁平一层
  // 有个疑问: 为什么 [].concat(arr) 达不到这样的效果呢？ --> 有待思考
  const res = Array.prototype.concat.apply([], arr)
  return flat(res);
}

console.log(flat([1, 2, 3, [4, [5, 6]]]));