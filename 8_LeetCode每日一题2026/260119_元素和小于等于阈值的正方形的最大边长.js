/**
 * 难度：🟡
 * 
 * 给你一个大小为 m x n 的矩阵 mat 和一个整数阈值 threshold。
 * 请你返回元素总和小于或等于阈值的正方形区域的最大边长；如果没有这样的正方形区域，则返回 0 。
 * 
 * m == mat.length
 * n == mat[i].length
 * 1 <= m, n <= 300
 * 0 <= mat[i][j] <= 10^4
 * 0 <= threshold <= 10^5 
 */

var maxSideLength = function(mat, threshold) {
    // ⚠️思路：【二维前缀和】
    const m = mat.length;
    const n = mat[0].length;

    const pre = Array.from({length:m+1}, ()=>Array(n+1).fill(0));
    for (let i=1; i<=m; i++){
        for (let j=1; j<=n; j++){
            pre[i][j] = pre[i-1][j] + pre[i][j-1] - pre[i-1][j-1] + mat[i-1][j-1]; // ⭐️
        };
    };

    // 辅助函数：是否存在边长为k的正方形
    function check(k){
        for (let i=k; i<=m; i++){
            for (let j=k; j<=n; j++){
                const sum = pre[i][j]-pre[i-k][j]-pre[i][j-k]+pre[i-k][j-k];
                if (sum<=threshold) return true;
            };
        };
        return false;
    };

    // 二分查找边长
    let left = 0;
    let right = Math.min(m,n);
    while (left<right) {
        const mid = Math.floor((left+right+1)/2);
        if (check(mid)) left = mid;
        else right = mid-1;
    };
    return left;
};

const mat1=[[1,1,3,2,4,3,2],
            [1,1,3,2,4,3,2],
            [1,1,3,2,4,3,2]], threshold1 = 4
console.log(maxSideLength(mat1, threshold1));
// 输出：2
// 解释：总和小于或等于 4 的正方形的最大边长为 2。

const mat2=[[2,2,2,2,2],
            [2,2,2,2,2],
            [2,2,2,2,2],
            [2,2,2,2,2],
            [2,2,2,2,2]], threshold2 = 1
console.log(maxSideLength(mat2, threshold2));
// 输出：0