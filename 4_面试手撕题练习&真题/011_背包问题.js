/**
 * 【一个背包 向里面装东西 如何装获得价值最大】
 * 0-1背包问题：每个东西只能装一次 完全背包问题：每个东西无限次
 * 背包容量：bagWeight
 * 物品价值数组：value
 * 物品重量数组：weight
 * 返回能装出的最大价值
 */

// 这里是0-1背包模型（附带完全背包写法）
function package(bagWeight, value, weight){
    //动态规划 dp[i][j]: 只在0～i物品间选 重量上限为j时 能获得的最大价值
    let n = value.length;
    let dp = Array.from({length: n}, ()=>new Array(bagWeight+1).fill(0));
    // ⭐️ Array.from() 静态方法从可迭代或类数组对象创建一个新的浅拷贝的数组实例

    // ⭐️ 初始化第0行 i=0：能放下 就装着
    for(let j=weight[0]; j<bagWeight+1; j++){
        // ⚠️ 0-1背包
        dp[0][j] = value[0];
        // ⬇️ 完全背包
        // dp[0][j] = Math.floor(j/weight[0])*value[0];
    };
    // ⭐️ 下一行开始
    for(let i=1; i<n; i++){
        for(let j=0; j<bagWeight+1; j++){
            if(j<weight[i]){
                dp[i][j] = dp[i-1][j]; // ⚠️ 装不下
            }else{
                // ⚠️ 0-1背包 状态转移方程
                dp[i][j] = Math.max(dp[i-1][j], dp[i-1][j-weight[i]]+value[i]);
                // ⬇️ 完全背包 状态转移方程
                // dp[i][j] = Math.max(dp[i-1][j], dp[i][j-weight[i]]+value[i]);
            };
        };
    };

    return dp[n-1][bagWeight];
};

// 测试：
const bagWeight = 4, value = [15, 20, 30], weight = [1, 3, 4];
console.log(package(bagWeight, value, weight)); // 35