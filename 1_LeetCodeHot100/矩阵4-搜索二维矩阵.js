//编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值target
//该矩阵具有以下特性：
//每行的元素从左到右升序排列。
//每列的元素从上到下升序排列。
var searchMatrix = function(matrix, target) {
    //初始条件 严谨判断 
    if(!matrix || matrix.length === 0 || matrix[0].length === 0) {return false};
    const m = matrix.length;//行的数量
    const n = matrix[0].length;//列的数量
    let i = 0;
    while(i<m && matrix[i][0]<=target){//先检查是否越界 再比大小！！！
        if(matrix[i][0]===target){return true}
        else{
            for(let j=0;j<n;j++){
                if(matrix[i][j]===target){
                    return true;
                }else if(matrix[i][j]>target){break;}
            };
        };
        i++;
    };
    return false;
};
const matrix1 = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]];
const target1 = 5, target2 = 20;
console.log(searchMatrix(matrix1, target1));
console.log(searchMatrix(matrix1, target2));
//【以上算法不够高效】
//【优化到 O(log m + log n) 的时间复杂度】【二分查找】
var searchMatrix2 = function(matrix, target){
    if(!matrix || matrix.length===0 || matrix[0].length===0){return false;}
    const m = matrix.length;
    const n = matrix[0].length;
    let i = 0;
    while(i<m && matrix[i][0]<=target){
        if(matrix[i][0]===target){return true}
        else{
            let left = 0, right = n-1;
            while(left<=right){
                let mid = Math.floor((left+right)/2);
                if(matrix[i][mid]===target){return true}
                else if(matrix[i][mid]>target){right = mid-1;}
                else{left = mid+1;}
            }
        }
        i++;
    };
    return false;
};
console.log(searchMatrix2(matrix1, target1));
console.log(searchMatrix2(matrix1, target2));
