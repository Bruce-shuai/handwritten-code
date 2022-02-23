// 这要用dfs 

function test(nums) {
  // let stack = [];
  let res = [];
  let cur = [];
  let visited = {};
  let len = nums.length;

  // 递归，dfs
  function dfs(nth) {
    if (nth === len) {
      res.push(cur.slice());
      return;
    }

    for (let i = 0; i < len; i++) {
      if (visited[nums[i]] === 1) {
        continue;
      } else {
        cur.push(nums[i]);
        visited[nums[i]] = 1
        dfs(nth + 1);
        cur.pop();
        delete visited[nums[i]];
      }
    }
  }
  dfs(0);
  return res;
}