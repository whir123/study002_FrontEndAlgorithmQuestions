/**
 * 给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
 * 你只能选择某一天买入这只股票，并选择在未来的某一个不同的日子卖出该股票。
 * 设计一个算法来计算你所能获取的最大利润。
 * 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 
 */

var maxProfit = function(prices) {
    // ⚠️ 一次遍历 维护一个最小买入价 更新最大利润
    let minPrice = Infinity, maxProfit = 0;
    for (const p of prices) {
        if(p<minPrice) minPrice = p;
        if(p>minPrice) maxProfit = Math.max(maxProfit, p-minPrice);
    };
    return maxProfit;
};

const prices1 = [7,1,5,3,6,4];
const prices2 = [7,6,4,3,1];
console.log(maxProfit(prices1)); // 5
console.log(maxProfit(prices2)); // 0