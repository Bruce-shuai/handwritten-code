// 广度优先遍历  --->  套路其实都差不多   树转数组，用bfs
function test(obj) {
  let queue = [];
  queue.push(obj);

  while (queue.length > 0) {
    let curObj = queue.shift();
    let keys = Object.keys(curObj);  // Object.keys
    let len = keys.length;
    for (let i = 0; i < len; i++) {
      let newKey = keys[i].replace('_', '');
      curObj[newKey] = curObj[keys[i]];
      delete curObj[keys[i]];

      if (typeof curObj[newKey] === 'object') {
        queue.push(curObj[newKey])
      }
    }
  }
}

const a = {
  'a_y': {
    'a_z': {
      'y_x': 6
    },
    'b_c': 1
  }
}

test(a)

function changeName(root) {
  let queue = [];     
  queue.push(root);   
  
  while (queue.length) {
    let curNode = queue.shift();

    // 获取当层的key
    let keys = Object.keys(curNode);
    let len = keys.length;
    for (let i = 0; i < len; i++) {  // 做一个len缓存，毕竟在这里面keys是会改变的
      let newKey = keys[i].replace('_', '');
      curNode[newKey] = curNode[keys[i]];
      delete curNode[keys[i]];

      if (typeof curNode.newKey === 'object') {
        queue.push(curNode.newKey);
      }
    }
  }
} 