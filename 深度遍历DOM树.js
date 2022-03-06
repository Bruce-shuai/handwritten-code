function visitNode(n) {
  if (n instanceof Comment) {
    //  注释
    console.info('Comment node ---', n.textContent)
  }
  if (n instanceof Text) {
    // 文本
    // console.info('Text node ---', n.textContent?.trim()) // ?.trim 用于去掉空格  注意：换行也算一个text node
    // 去掉换行节点
    const t = n.textContent?.trim();     // 这个可以去掉字符串的首尾空格
    if (t) {
      console.info('Text node ---', t);
    }
  }
  if (n instanceof HTMLElement) {
    // element
    console.info('Element node ---', `<${n.tagName.toLowerCase()}>`)
  }
}


function dfs(root) {
  visitNode(root);
  const childNodes = root.childNodes  // .childNodes 和 .children 不一样  .childNodes 获取包含所有的node类型。.children 是只获取元素不获取文本和注释
  if (childNodes.length) {
    childNodes.forEach(child => {
      dfs(child);   // 递归
    })
  }

}



// 广度优先遍历(队列)

function bfs(root) {
  const queue = [];   
  queue.push(root);
  while (queue.length > 0) {
    const curNode = queue.shift();
    if (curNode == null) break;

    visitNode(curNode);
    
    // 子节点入队
    const childNodes = curNode.childNodes;   // .childNodes 这是一个关键点
    if (childNodes.length) {
      childNodes.forEach(child => queue.push(child))
    }
  }
}