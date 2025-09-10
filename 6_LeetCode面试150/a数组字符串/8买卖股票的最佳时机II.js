/**
 * 给你一个整数数组 prices ，其中 prices[i] 表示某支股票第 i 天的价格。
 * 在每一天，你可以决定是否购买和/或出售股票。
 * 你在任何时候最多只能持有一股股票。你也可以先购买，然后在同一天出售。
 * 返回你能获得的最大利润。
 */

var maxProfit = function(prices) {
    // ⚠️ 因为能多次购入抛出
    // ⚠️ 只要今天比前一天有涨幅 就买入前一天的今天卖出
    const n = prices.length;
    let maxP = 0;
    for(let i=1; i<n; i++) {
        if(prices[i-1]<prices[i]){
            maxP += prices[i]-prices[i-1];
        };
    };
    return maxP;
};

const prices1 = [7,1,5,3,6,4];
const prices2 = [1,2,3,4,5];
console.log(maxProfit(prices1)); // 7
console.log(maxProfit(prices2)); // 4