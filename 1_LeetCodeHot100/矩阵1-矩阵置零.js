//给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0 。请使用【原地】算法。
//输入：matrix = [[1,1,1],[1,0,1],[1,1,1]]
//输出：[[1,0,1],[0,0,0],[1,0,1]]

//原地算法（In-place Algorithm）
//是指在【不使用额外的数据结构或空间】【或仅使用常数量的额外空间】的情况下，直接修改输入数据结构的算法。
//换句话说，原地算法通常通过交换、覆盖或直接在输入数据上进行操作来完成其任务，而不需要分配新的空间来存储中间结果
var setZeroes = function(matrix) {
    let firstRowZero = false;
    let firstColZero = false;
    const m = matrix.length; // m行
    const n = matrix[0].length; // n列
    //1 检查第一行是否有 0
    for(j=0;j<n;j++){
        if(matrix[0][j]===0){
            firstRowZero = true;
            break;
        }
    };
    //2 检查第一列是否有 0
    for(i=0;i<m;i++){
        if(matrix[i][0]===0){
            firstColZero = true;
            break;
        }
    };
    //3 用第一行和第一列做标记
    for(i=0;i<m;i++){//遍历整个矩阵
        for(j=0;j<n;j++){
            if(matrix[i][j]===0){
                matrix[0][j] = 0;
                matrix[i][0] = 0;
            }
        }
    };
    //4 按照标记赋值 0
    for(i=0;i<m;i++){//遍历整个矩阵
        for(j=0;j<n;j++){
            if(matrix[i][0]===0 || matrix[0][j]===0){//遍历 按照第一行/列的标记赋值
                matrix[i][j] = 0;
            }
        }
    };
    //5 检查是否需要把第一行/列变成 0
    if(firstRowZero){
        for(j=0;j<n;j++){
            matrix[0][j] = 0;
        }
    };
    if(firstColZero){
        for(i=0;i<m;i++){
            matrix[i][0] = 0;
        }
    };
    return matrix;
}
const matrix = [[1,1,1],[1,0,1],[1,1,1]];
console.log(setZeroes(matrix));