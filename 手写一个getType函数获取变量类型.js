// 使用Object.prototype.toString.call()      
function getType(x) {
  let type = Object.prototype.toString.call(x).slice(8, -1);
  return type.toLowerCase();   // 将字母从大写改为小写
}


let type = Object.ptototype.toString.call(x).slice(8, -1);