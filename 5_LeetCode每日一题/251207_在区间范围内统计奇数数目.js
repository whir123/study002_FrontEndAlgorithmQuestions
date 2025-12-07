/**
 * 给你两个非负整数 low 和 high 。请你返回 low 和 high 之间（包括二者）奇数的数目。
 */

var countOdds1 = function(low, high) {
    let flag1 = low % 2;
    let flag2 = high % 2;
    let flag = (flag1===0 && flag2===0) ? 0 : 1;
    return Math.floor((high - low)/2) + flag; 
};
// ⚠️ 前缀和思想
var countOdds = function(low, high) {
    return Math.floor((high+1)/2) - Math.floor(low/2);
};

const low1 = 3, high1 = 7;
console.log(countOdds(low1, high1));
// 输出：3

const low2 = 8, high2 = 10;
console.log(countOdds(low2, high2));
// 输出：1