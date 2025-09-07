/**
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
 * 机器人每次只能「向下或者向右」移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。
 * 问总共有多少条不同的路径？
 */

//C(m+n−2,m−1)= (m+n−2)! / (m−1)!⋅(n−1)!
var uniquePaths = function(m, n) {
    const a = m+n-2; //总步数
    const b = Math.min(m-1, n-1); //向右向下步数最小值
    // a! / (a-b)!⋅b! => a…(a-b+1)/b! (分子有 b 个)
    let result = 1;
    for(let i=1; i<=b; i++){
        result = result * (a-b+i) / i;
    };
    return result;
};
//动态规划方法：
//dp[i][j]：表示从起点 (0, 0) 到位置 (i, j) 的不同路径数。
//第一行 dp[0][j] = 1（只能一直向右走）。
//第一列 dp[i][0] = 1（只能一直向下走）。
var uniquePaths2 = function(m, n){
    const dp = Array(m).fill().map(()=>Array(n).fill(1));
    for(let i=1; i<m; i++){ // 从1开始 第一行第一列不用管
        for(let j=1; j<n; j++){
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
        };
    };
    return dp[m-1][n-1];
};

const m = 3, n = 7
console.log(uniquePaths(m,n)); // 28
console.log(uniquePaths2(m,n)); // 28