// 广度优先遍历  --->  套路其实都差不多
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

