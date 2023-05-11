let arr = [1, 2, 3, 4, 5, 5, 5, 2];

// 使用Set
function unique(arr) {
  const set = new Set(arr);
  return [...set];        // 这里有点意思
}

console.log(unique(arr));

function unique2(arr) {
  let newArr = [];
  arr.forEach(item => {
    if (newArr.indexOf(item) < 0) {
      newArr.push(item);
    }
  })
  return newArr;
}

console.log(unique2(arr));


