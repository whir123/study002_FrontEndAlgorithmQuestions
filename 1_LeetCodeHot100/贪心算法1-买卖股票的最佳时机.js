/**
 * 给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
 * 你只能选择某一天买入这只股票，并选择在未来的某一个不同的日子卖出该股票。
 * 设计一个算法来计算你所能获取的最大利润。
 * 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。
 */

var maxProfit = function(prices) {
    let minPrice = Infinity, maxProfit = 0;
    for (let i = 0; i < prices.length; i++) {
        if(prices[i]<minPrice) {
            minPrice = prices[i]; // 更新最低价格
        };
        if(prices[i]-minPrice > maxProfit) {
            maxProfit = prices[i] - minPrice; // 更新最大利润
        };
    };
    return maxProfit;
};

// 示例 1：
const prices = [7,1,5,3,6,4];
console.log(maxProfit(prices)); // 输出：5 
// 示例 2:
const prices2 = [7,6,4,3,1];
console.log(maxProfit(prices2)); // 输出：0