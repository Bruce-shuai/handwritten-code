function formatNum(number) {
  let str = '';
  // toString() 将数字变为字符串
  // split()这个函数是只有字符串才能使用
  let arr = number.toString().split('')
  let length = arr.length
  while( length > 3 ) {
    // arr.splice(-3) 表示从数组倒数第三个开始生成一个新的数组。原数组也会被去掉那一部分
    str = `,${arr.splice(-3).join('')}${str}`;
    length = arr.length
  } 
  return arr.join('') + str;
}
let number = 23456789;
console.log(formatNum(number))


