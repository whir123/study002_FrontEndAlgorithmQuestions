/**
 * 给定一个三角形 triangle ，找出自顶向下的最小路径和。
 * 每一步只能移动到下一行中相邻的结点上。相邻的结点 在这里指的是下标与上一层结点下标相同或者等于上一层结点下标+1的两个结点。
 * 也就是说，如果正位于当前行的下标 i ，那么下一步可以移动到下一行的下标 i 或 i + 1 。
 */

var minimumTotal = function(triangle) {
    const n = triangle.length;
    if (n===1) return triangle[0][0];

    let dp = Array.from({length:n}, ()=>Array());
    dp[0][0] = triangle[0][0];

    for (let i=1; i<n; i++) {
        for (let j=0; j<=i; j++) {
            if (j===0) {
                dp[i][j] = dp[i-1][j]+triangle[i][j];
            } else if (j===i) {
                dp[i][j] = dp[i-1][j-1]+triangle[i][j];
            } else {
                dp[i][j] = Math.min(dp[i-1][j], dp[i-1][j-1])+triangle[i][j];
            };
        };
    };

    return Math.min(...dp[n-1]);
};

const triangle1 = [[2],[3,4],[6,5,7],[4,1,8,3]];
console.log(minimumTotal(triangle1));
// 输出：11
// 如下面简图所示：
//    2
//   3 4
//  6 5 7
// 4 1 8 3
// 自顶向下的最小路径和为 11（即 2 + 3 + 5 + 1 = 11）

const triangle2 = [[-10]]
console.log(minimumTotal(triangle2));
// 输出：-10