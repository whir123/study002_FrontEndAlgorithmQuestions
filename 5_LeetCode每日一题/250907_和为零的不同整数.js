/**
 * 给你一个整数 n，请你返回任意一个由 n 个 各不相同的整数组成的数组
 * 并且这 n 个数相加和为 0
 */

var sumZero = function(n) {
    let sum = 0, result = [];
    for(let i=1; i<n; i++){
        result.push(i);
        sum -= i;
    };
    result.push(sum);
    return result;
};

console.log(sumZero(7))
console.log(sumZero(2))
console.log(sumZero(1))