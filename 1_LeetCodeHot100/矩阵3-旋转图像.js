//给定一个 n × n 的二维矩阵matrix表示一个图像。请你将图像顺时针旋转90度
//你必须在【原地】旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像
//原始矩阵：            顺时针旋转 90 度后的矩阵：
// [                       [
//   [1, 2, 3],              [7, 4, 1],
//   [4, 5, 6],              [8, 5, 2],
//   [7, 8, 9]               [9, 6, 3]
// ]                       ]

var rotate = function(matrix) {
    let n = matrix.length;
    //矩阵转置
    for(i=0;i<n;i++){
        for(j=i+1;j<n;j++){
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    };
    //列从左到右排列
    for(k=0;k<Math.floor(n/2);k++){
        for(p=0;p<n;p++){
            [matrix[p][k], matrix[p][n-k-1]] = [matrix[p][n-k-1], matrix[p][k]];
        }
    };
    return matrix;
};
const matrix = [[1,2,3],[4,5,6],[7,8,9]];
console.log(rotate(matrix));