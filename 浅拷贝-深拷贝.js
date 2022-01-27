// 浅拷贝 -->  2种方法
let obj = {'a': 1};
let b = {...obj};
let c = Object.assign({}, obj);

console.log(b, b === obj);
console.log(c, c === obj);

let d = JSON.parse(JSON.stringify(obj));
console.log(d, d === obj);


// 深拷贝
// 一般深拷贝就不用去考虑函数
// 这种深度比较就需要递归
function deepCopy(obj) {
  let type = Object.prototype.toString.call(obj).slice(8, -1);
  let dist = null;
  if (type === 'Array') {
    dist = [];
  } else if (type === 'Object') {
    dist = {};
  } else {
    dist = obj;
    return dist;
  }

  for (let key in obj) {
    // 保证key不是原型链上的
    if (obj.hasOwnProperty(key)) {
      dist[key] = deepCopy(obj[key]);
    }
  }

  return dist;
}

let obj2 = {
  age: 20,
  name: 'xxx',
  address: {
    city: 'beijing'
  }, 
  arr: ['a', 'b', 'c']
}
let copy = deepCopy(obj2);
console.log(copy);