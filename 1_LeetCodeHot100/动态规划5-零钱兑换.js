/**
 * 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额
 * 计算并返回可以凑成总金额所需的最少的硬币个数 
 * 如果没有任何一种硬币组合能组成总金额，返回 -1 
 * 你可以认为每种硬币的数量是无限的
 */

var coinChange = function(coins, amount) {
    let dp = Array(amount+1).fill(amount+1); // 全用 1 也只需要 amount；初始化占位用 amount+1
    dp[0] = 0; // 目标是 0 需要 0 个

    for(let i=1; i<=amount; i++) {
        for(let j=0; j<coins.length; j++) {
            if(coins[j]<=i) { // 硬币面额不大于当前总值 才考虑
                dp[i] = Math.min(dp[i], dp[i-coins[j]]+1);
            };
        };
    };
    return dp[amount]>amount ? -1 : dp[amount];
};

console.log(coinChange([1,2,5], 11)); // 3 5+5+1=11
console.log(coinChange([2], 3)); // -1