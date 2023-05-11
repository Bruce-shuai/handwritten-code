/**
 * 题目：去除字符串中出现次数最少的字符，不改变原字符串的顺序
 * "ababac" —— "ababa"
 * "aaabbbcceeff" —— "aaabbb"
 * 
 * 
 * 解题思路： 利用缓存来解决
 */

const removeLessChar = (str) => {
  const map = new Map();

  for (let i = 0; i < str.length; i++) {
    if (map.has(str[i])) {
      map.set(str[i], map.get([str[i]]) + 1);
    } else {
      map.set(str[i], 1);
    }
  }
  // 返回二维数组，第二个元素的最小值
  // 找到最小的字符
  let minLenCharArr = ['', Infinity];
  Array.from(map).forEach(item => {
    if (item[1] < minLenCharArr[1]) {
      minLenCharArr = item;
    }
  });
  
  return str.split(`${minLenCharArr[0]}`).join('');
}