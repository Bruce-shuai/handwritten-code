// 输入一个字符串，切换其中字母的大小写
// 如：输入12aBc34 输出12AbC34

// 常见思路： 
// 正则表达式   性能低
// ascii

function switchLetterCase(s) {
  const res = '';
  const length = s.length;
  if (length === 0) return res;

  const reg1 = /[a-z]/
  const reg2 = /[A-Z]/

  for (let i = 0; i < length; i++) {
    const c = s[i];
    if (reg1.test(c)) {
      // 如果是小写
      res += c.toUpperCase();
    } else if (reg2.test(c)) {
      res += c.toLowerCase();
    } else {
      res += c;
    }
  }
  return res;
}

function switchLetterCase2(s) {
  let res = '';
  const length = s.length;
  if (length === 0) return res;
  for (let i = 0; i < length; i++) {
    const c = s[i];
    const code = c.charCodeAt(0);  // 返回第一个字符的ascii码
    if (code >= 65 && code <= 90) {  // 大写
      res += c.toLowerCase();      // 变成小写
    } else if (code >= 97 && code <= 122) {
      res += c.toUpperCase();
    } else {
      res += c;
    }
  }
  return res;
}