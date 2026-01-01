/**
 * 给定正整数 k ，你需要找出可以被 k 整除的、仅包含数字 1 的最小正整数 n 的长度。
 * 返回 n 的长度。如果不存在这样的 n ，就返回-1。
 * 注意： n 可能不符合 64 位带符号整数。
 */

var smallestRepunitDivByK = function(k) {
    if(k%2===0 || k%5===0) return -1;
    let rem = 0;
    for (let length=1; length<=k; length++){
        rem = (rem*10+1) % k;
        if (rem===0) return length;
    };
    return -1;
};

console.log(smallestRepunitDivByK(1));
// 1
// 解释：最小的答案是 n = 1，其长度为 1。

console.log(smallestRepunitDivByK(2));
// -1
// 解释：不存在可被 2 整除的正整数 n 。

console.log(smallestRepunitDivByK(3));
// 3
// 解释：最小的答案是 n = 111，其长度为 3。