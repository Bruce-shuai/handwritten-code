function indexOf2(str, searchVal, fromIndex = 0) {   // fromIndex 表示是从第几个元素下标开始计算
  let strLen = str.length;
  let searchValLen = (searchVal + '').length;
  if (fromIndex < 0) fromIndex = 0;
  if (fromIndex >= strLen) return -1;

  for (let i = fromIndex; i < strLen - searchValLen; i++) {
    if (searchVal === str.slice(i, searchValLen + i)) return i    // 没有想到 slice 也可以用在字符串上面, 但是splice不可以这么用
  }
  return -1;
}
