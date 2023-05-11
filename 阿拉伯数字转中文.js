// 数字转中文   --->  此题明天看看
let arr = entrance(987654321);

console.log(arr); // 答案

function entrance(num) {
  let arr = num.toString().split('').reverse().join('');    // 第一步： 将数字转为字符串数组 逆序
  let curr = 0;
  let x = [,'万','亿'];   // 因为到万之后，又会说 几十几百几千万   // 第二步： 万  亿 单独区分
  let y = 0;
  let res = [];          // 第三步：每四位进行一个转换
  let answer = [];       // 第四步：多个零 只读一个零     第五步： 解决非个位数 但结尾是零的情况    第六步： 10~19  --> 例如 一十一  -->  十一
  while(curr < arr.length) {
    res.push(NumToChina(arr.slice(curr,curr+4)));
    curr+=4;
  }
  // 这一步是为了加上 万亿单位  res的一个元素 都是含有4位数的内容
  for(let i = res.length - 1;i >=0;i--) {
    if(res[i] === '零' && res.length > 1) continue;
    answer.push(i !== 0 ? res[i]+x[i] : res[i]);  // 去掉末尾是0的情况
  }
  return answer.join('');
}

function NumToChina(n) {
  let unit = [,'十','百','千'];
  let number = ['零','一','二','三','四','五','六','七','八','九']
  let arr = n.toString().split('');
  let res = [];
  res.unshift(number[arr[0]]);
  for(let i =1;i<arr.length;i++) {  // i 不会超过4  因为 十 百 千
    if(arr[i] === '0' && arr[i-1] === '0') continue;   // 多个零在一起，只需要打印一个零
    if(arr[i] === '0') {
      res.unshift(number[arr[i]]);
    } else {
      res.unshift(unit[i]);
      res.unshift(number[arr[i]]);
    }
  }
  let len = res.length;
  if(res[len-1] === '零' && len !== 1) res.pop();  // 解决非个位数，但结尾是零的情况
  if(arr.length === 2 && res[0] === '一') res.shift();  // 解决 11 显示  一十一  -->  十一
  return res.join('');
}
