const _ = require('underscore');
const arr = [3, 6, 9, 12];
//underscore가 js의 배열 기능에 없는 다양한 기능을 제공함
console.log(arr[0]);
console.log(_.first(arr)); 

console.log(arr[arr.length - 1])
console.log(_.last(arr));

