/**
 * 给你一个整数数组 prices，其中 prices[i] 是第 i 天股票的价格（美元），以及一个整数 k。
 * 你最多可以进行 k 笔交易，每笔交易可以是以下任一类型：
 * 普通交易：在第 i 天买入，然后在之后的第 j 天卖出，其中 i < j。你的利润是 prices[j] - prices[i]。
 * 做空交易：在第 i 天卖出，然后在之后的第 j 天买回，其中 i < j。你的利润是 prices[i] - prices[j]。
 * 注意：你必须在开始下一笔交易之前完成当前交易。此外，你不能在已经进行买入或卖出操作的同一天再次进行买入或卖出操作。
 * 通过进行 最多 k 笔交易，返回你可以获得的最大总利润。
 */

var maximumProfit = function(prices, k) {
    // ⚠️ dp[i][t][h] 表示第 i 天、已完成 t 笔交易、当前持有股票状态（0不持有 1持有多头｜之前买入 2持有空头｜之前卖出）
    const n = prices.length;
    if (n===0 || k===0) return 0;

    const NEG = -1e18;
    let dp = Array.from({length: n}, ()=> 
        Array.from({length: k+1}, ()=>[NEG, NEG, NEG])
    );
    dp[0][0][0] = 0;
    dp[0][0][1] = -prices[0]; // 🌟 买入
    dp[0][0][2] = prices[0]; // 🌟 做空卖出

    for (let i=1; i<n; i++){
        for (let t=0; t<=k; t++){
            // 0️⃣ 空仓 => 什么都不做
            dp[i][t][0] = dp[i-1][t][0]
            // => 今天完成一笔交易
            if (t>0) {
                // 多头平仓
                dp[i][t][0] = Math.max(dp[i][t][0], dp[i-1][t-1][1]+prices[i]);
                // 空头平仓
                dp[i][t][0] = Math.max(dp[i][t][0], dp[i-1][t-1][2]-prices[i]);
            };

            // 1️⃣ 多头（买入 / 继续持有）
            dp[i][t][1] = Math.max(dp[i-1][t][0]-prices[i], dp[i-1][t][1]);

            // 2️⃣ 空头（卖出 / 继续持有）
            dp[i][t][2] = Math.max(dp[i-1][t][0]+prices[i], dp[i-1][t][2]);
        };
    };

    // 答案：最后一天+空仓
    let ans = 0;
    for (let t=0; t<=k; t++){
        ans = Math.max(ans, dp[n-1][t][0]);
    };
    return ans;
};

const prices1 = [1,7,9,8,2], k1 = 2;
console.log(maximumProfit(prices1, k1));
// 输出: 14
// 我们可以通过 2 笔交易获得 14 美元的利润：
// 一笔普通交易：第 0 天以 1 美元买入，第 2 天以 9 美元卖出。
// 一笔做空交易：第 3 天以 8 美元卖出，第 4 天以 2 美元买回。

const prices2 = [12,16,19,19,8,1,19,13,9], k2 = 3;
console.log(maximumProfit(prices2, k2));
// 输出: 36
// 我们可以通过 3 笔交易获得 36 美元的利润：
// 一笔普通交易：第 0 天以 12 美元买入，第 2 天以 19 美元卖出。
// 一笔做空交易：第 3 天以 19 美元卖出，第 4 天以 8 美元买回。
// 一笔普通交易：第 5 天以 1 美元买入，第 6 天以 19 美元卖出。