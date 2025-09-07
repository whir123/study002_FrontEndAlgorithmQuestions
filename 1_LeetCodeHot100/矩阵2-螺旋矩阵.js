//给你一个 m 行 n 列的矩阵 matrix，请按照【顺时针螺旋顺序】，返回矩阵中的所有元素
//输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
//输出：[1,2,3,4,8,12,11,10,9,5,6,7]
var spiralOrder = function(matrix) {
    if(!matrix.length) return [];
    let result = [];
    let top = 0, bottom = matrix.length-1;
    let left = 0, right = matrix[0].length-1;
    while(top<=bottom && left<=right){
        //从左到右遍历最上层
        for(i=left;i<=right;i++){
            result.push(matrix[top][i]);
        };
        top++;
        //从上到下遍历最右层
        if(top<=bottom && left<=right){//判断
            for(i=top;i<=bottom;i++){
                result.push(matrix[i][right]);
            };
            right--;
        };
        //从右到左遍历最下层
        if(top<=bottom && left<=right){//判断
            for(i=right;i>=left;i--){
                result.push(matrix[bottom][i]);
            };
            bottom--;
        };
        //从下到上遍历最左层
        if(top<=bottom && left<=right){
            for(i=bottom;i>=top;i--){
                result.push(matrix[i][left]);
            };
            left++;
        };
    }
    return result;
};
const matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]];
console.log(spiralOrder(matrix));