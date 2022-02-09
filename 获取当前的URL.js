function query(name) {
  const search = location.search;
  const p = new URLSearchParams(search);
  return p.get(name)
}

// 方法一：将获取的参数转为对象键值对
function query() {
  // 创建一个URLSearchParams实例
  const urlSearchParams = new URLSearchParams(window.location.search);
  // 把键值对列表转换为一个对象  ---> xxx.entries()用法？entries() 方法返回一个数组的迭代对象，该对象包含数组的键值对 (key/value)
  const params = Object.fromEntries(urlSearchParams.entries())  // 牛啊牛
  return params
}

// 方法二：split大法
function getParams(url) {
  const res = {};
  if (url.includes('?')) {
    const str = url.split('?')[1];

    const arr = str.split('&');
    arr.forEach(item => {
      const key = item.split('=')[0];
      const val = item.split('=')[1];
      res[key] = decodeURIComponent(val);
    })
  }
  return res;
}
const user = getParams('http://www.baidu.com?user=%E9%98%BF%E9%A3%9E&age=22')
console.log(user) // { user: '阿飞', age: '22' }