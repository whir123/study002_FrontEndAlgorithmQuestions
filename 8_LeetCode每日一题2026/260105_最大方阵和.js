/**
 * 难度：🟡
 * 
 * 给你一个 n x n 的整数方阵 matrix 。你可以执行以下操作任意次 ：
 * 选择 matrix 中相邻两个元素，并将它们都乘以 -1 。
 * 如果两个元素有公共边，那么它们就是相邻的。
 * 你的目的是最大化方阵元素的和。请你在执行以上操作之后，返回方阵的最大和。
 * 
 * n == matrix.length == matrix[i].length
 * 2 <= n <= 250
 * -10^5 <= matrix[i][j] <= 10^5
 */

var maxMatrixSum = function(matrix) {
    // ⚠️ 负数个数：偶数：一定能翻成全正
    // ⚠️ 负数个数：奇数：留一个

    let negCount = 0;
    let absSum = 0;
    let absMin = Infinity;

    for (const row of matrix){
        for (const n of row){
            if (n<0){
                negCount++;
                absSum += -n;
            } else {
                absSum += n;
            };
            absMin = Math.min(absMin, Math.abs(n));
        };
    };

    return negCount%2===0 ? absSum : absSum-2*absMin;
};

const matrix1 = [[1,-1],[-1,1]];
console.log(maxMatrixSum(matrix1));
// 输出：4
// 解释：我们可以执行以下操作使和等于 4 ：
// - 将第一行的 2 个元素乘以 -1 。
// - 将第一列的 2 个元素乘以 -1 。

const matrix2 = [[1,2,3],[-1,-2,-3],[1,2,3]];
console.log(maxMatrixSum(matrix2));
// 输出：16
// 解释：我们可以执行以下操作使和等于 16 ：
// - 将第二行的最后 2 个元素乘以 -1 。