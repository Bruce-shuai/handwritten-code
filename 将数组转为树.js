// 遍历数组
// 每个元素，生成 tree node
// 找到 parentNode，并加入它的children
// 如何找到parentNode
// 遍历数组去查找，太慢
// 可用一个Map来维护关系，便于查找

const arr = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 2, name: '部门B', parentId: 1 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 2 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 },
]



function convert(arr) {   // 数组转树
  const idToTreeNode = new Map();   // 父id 转 父节点
  let root = null; 
  arr.forEach((item) => {
    const {id, name, parentId} = item;
    const node = {id, name};  
    idToTreeNode.set(id, node); 

    // 通过父id找父节点
    let parentNode = idToTreeNode.get(parentId);

    if (!parentNode) {  // 如果节点没有找到
      root = node;
    } else {
      if (!parentNode.children) {
        parentNode.children = [];
      }
      parentNode.children.push(node);
    }
  })
  return root;
}

function convert(arr) {
  // 用于 id 和 treeNode 的映射
  const idToTreeNode = new Map();  // id, 父节点 

  let root = null;  
  arr.forEach(item => {
    const {id, name, parentId} = item;

    // 定义 tree node 并加入 map
    const treeNode = { id, name };   // 创建树节点
    idToTreeNode.set(id, treeNode);  // 先就设

    // 找到 parentNode 并加入到它的children
    const parentNode = idToTreeNode.get(parentId);   // 这种写法是需要依赖数组的顺序是从小到大放置的   这里赋值的也是节点的地址
    if (parentNode) {
      if (parentNode.children == null) parentNode.children = [];
      parentNode.children.push(treeNode);
    }

    // 找到根节点
    if (parentId === 0) root = treeNode  // 这里的root 很有意思
  })
  return root;
}





// 树转数组
// 广度优先
// 将树节点转为Array Item, push到数组
// 根据父子关系，找到Array Item的parentId
// 如何找到parentId
// 遍历树查找 太慢O(n)
// 可用一个 Map 来维护关系，便于查找O(1)
const obj = {
  id: 1, 
  name: '部门A', 
  children: [
    {
      id: 2,     
      name: '部门B', 
      children: [
        { id: 4, name: '部门D' },
        { id: 5, name: '部门E' }
      ]
    },
    {
      id: 3,    
      name: '部门C', 
      children: [{ id: 6, name: '部门F'}]
    }
  ]
}


function convert(root) {
  const nodeToParent = new Map();  // 子节点对照父节点
  const queue = [];
  const arr = [];   // 创一个数组来作为最后的结果
  // bfs
  queue.push(root);   

  while (queue.length) {
    const node = queue.shift();
    
    node.children?.forEach((item) => {
      nodeToParent.set(item, node);
      queue.push(item);
    })
    let parentId;
    const parentNode = nodeToParent.get(node);
    if (!parentNode) {
      parentId = 0;
    } else {
      parentId = parentNode.id;
    }
    const {id, name} = node;
    arr.push({id, name, parentId});
  }

  return arr;
}



// map + bfs
function convert(root) {
  // Map
  const nodeToParent = new Map();  // 子节点 父节点
  const arr = [];

  // 广度优先遍历 队列
  const queue = [];   
  queue.push(root);   // 根节点 入队... unshift才是注入

  while (queue.length > 0) {
    const curNode = queue.shift();
    if (curNode == null) break;

    // children = []是默认值的意思
    const {id, name, children = []} = curNode;

    // 创建数组item 并 push
    const parentNode = nodeToParent.get(curNode);  // 查找是否有父节点
    const parentId = parentNode?.id || 0;   // 如果是0就是根结点 --> 这里也是为了方便获取parentId
    const item = { id, name, parentId };    // 创建新的对象
    arr.push(item)

    // 子节点入队
    children.forEach(child => {
      // 映射 parent
      nodeToParent.set(child, curNode);

      // 入队
      queue.push(child)
    })
  }
  return arr;
}

