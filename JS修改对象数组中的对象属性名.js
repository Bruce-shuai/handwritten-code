// 题目 将 数组 中所有id变为code，所有title变为name
const list = [    // 注意：这是一个数组，所以不能用bfs，而是用map来解决
  {
    id: 'a',
    title: 'A'
  }, 
  {
    id: 'b',
    title: 'B',
    children: [{
      id: 'c',
      title: 'C'
    }, {
      id: 'd',
      title: 'D'
    }]
  }
]

// 使用map方法来解决问题, 通用性不是太强

const changeArr = function (arr) {
  let newArr = arr.map((item) => {
    let res = {};
    res.code = item.id; 
    res.name = item.title;
    if (item.children) {
      res.children = item.children.map(data =>{return {code: data.id, name: data.title}})
    }
    return res;  // 有返回值
  })
  return newArr;
}

const arr = changeArr(list);
console.log(arr);

const changeName = (array) => {
  return array.map(item => {
    let obj = {};
    obj['code'] = item.id;  
    obj['name'] = item.title; 

    if (item?.children) {
      obj.children = changeName(item.children)
    }
    return obj
  })
}