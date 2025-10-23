/**
 * 仓库内有不同规格无限数量机油
 * 计算出正好可以凑成一次保养所需的最少的机油桶数（不能剩余） 返回桶数
 * 整数数组oils表示不同升数的机油 整数box表示一辆车总共需要的机油数
 * 如果没有任何方式能组合成要求的油箱大小 返回-1
 */

function change(oils, box) {
    let dp = Array(box+1).fill(Infinity);
    dp[0] = 0;

    for (let i=1; i<=box; i++){
        for (const o of oils){
            if (i-o>=0 && dp[i-o]!==Infinity){
                dp[i] = Math.min(dp[i], dp[i-o]+1);
            };
        };
    };
    return dp[box]===Infinity ? -1 : dp[box];
};

console.log(change([1,2,5], 11)); // 3  (5+5+1)
console.log(change([2], 3));      // -1 (无法凑成3)
console.log(change([1], 0));      // 0  (无需桶)
console.log(change([1,3,4], 6));  // 2  (3+3 或 4+2)
console.log(change([2,5,10], 20));// 2  (10+10)
console.log(change([2,3,7], 12)); // 3  (7+3+2)
console.log(change([], 5));       // -1 (无桶规格)
console.log(change([5], 5));      // 1  (只需一个5升桶)