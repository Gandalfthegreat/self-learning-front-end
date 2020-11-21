//3.
var arr = [12, 34, 32, 89, 4];
console.log(
  arr.reduce((acc, cur) => {
    return Math.min(acc, cur);
  })
);
