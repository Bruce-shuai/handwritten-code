/**
 * 【代码题】 数组转树, 写完后问如果要在树中新增节点或者删除节点, 函数应该怎么扩展
 */

/**
 * const arr = [{
        id: 2,
        name: '部门B',
        parentId: 0
    },
    {
        id: 3,
        name: '部门C',
        parentId: 1
    },
    {
        id: 1,
        name: '部门A',
        parentId: 2
    },
    {
        id: 4,
        name: '部门D',
        parentId: 1
    },
    {
        id: 5,
        name: '部门E',
        parentId: 2
    },
    {
        id: 6,
        name: '部门F',
        parentId: 3
    },
    {
        id: 7,
        name: '部门G',
        parentId: 2
    },
    {
        id: 8,
        name: '部门H',
        parentId: 4
    }
]
 */


function ArrayToTree(arr) {
  const map = new Map();
  // 第一次循环，缓存所有结点
  arr.forEach(item => {
    const {id, name} = item;
    const parentNode = {id, name};
    map.set(id, parentNode);
  })
  let root = null;
  // 第二次循环，利用缓存建立树节点
  arr.forEach(item => {
    const parentNode = map.get(item.parentId);
    if (!parentNode) {
      root = map.get(item.id);
    } else {
      if (parentNode.children) {
        parentNode.children.push(map.get(item.id));
      } else {
        parentNode.children = [map.get(item.id)]
      }
    }
  })
  return root;
}