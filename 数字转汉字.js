/**
 * 题目：写出一个函数trans，将数字转换成汉语的输出，输入为不超过10000亿的数字。
 * trans(123456) —— 十二万三千四百五十六
 * trans（100010001）—— 一亿零一万零一
 * 
 * 思路：
 * 进制问题：十 百 千 万 亿   十万 百万 千万 亿 十亿 百亿 千亿 万亿
 * 10   100   1000   10000 100000  1000
 * 数字问题：零 一 二 三 四 五 六 七 八 九 十
 */
function trans(num) {
  // 先转化为字符串，然后对它的长度进行判断 
  const str = String(num);
  const decChinese = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  const unit = ['十', '百', '千', '万', '亿']
  const len = str.length;
  let res = ''
  for (let i = 0; i < len; i++) {
    
  }

  return res;
}







/**
 * 'script start'
 * 'async1 start'
 * 'promise1'
 * 'promise2'
 * 'script end'
 * 'async2'
 * 'async1 end'
 * 'promise3'
 * 'setTimeout'
 */