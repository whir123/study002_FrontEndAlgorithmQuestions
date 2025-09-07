// 给你一个满足下述两条属性的 mxn 整数矩阵：
// 每行中的整数从左到右按非严格递增顺序排列。
// 每行的第一个整数大于前一行的最后一个整数。
// 给你一个整数 target ，如果 target 在矩阵中，返回true ；否则，返回false

var searchMatrix = function (matrix, target) {
    let m = matrix.length;//高
    let n = matrix[0].length;//宽
    let left = 0;
    let right = m*n-1;//总元素量
    while(left<=right){
        let mid = Math.floor((left+right)/2);
        let midVal = matrix[Math.floor(mid/n)][mid%n];//第几行第几列
        if (midVal===target){return true;}
        else if (midVal<target){left = mid+1;}
        else{right = mid-1};
    }
    return false;
};

const matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]];
const target = 3;
const matrix1 = [[1,3]];
const target1 = 3;
console.log(searchMatrix(matrix, target));
console.log(searchMatrix(matrix1, target1));