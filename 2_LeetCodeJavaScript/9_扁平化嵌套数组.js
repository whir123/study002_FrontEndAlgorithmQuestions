//请你编写一个函数，它接收一个[多维数组 arr]和[它的深度 n] ，并返回该数组的[扁平化]后的结果。
//多维数组是一种包含整数或其他多维数组的递归数据结构。
//数组[扁平化]是对数组的一种操作，定义是将原数组部分或全部子数组删除，并替换为该子数组中的实际元素。
//只有当嵌套的数组深度大于 n 时，才应该执行扁平化操作。第一层数组中元素的深度被认为是 0。
//请在没有使用内置方法 Array.flat 的前提下解决这个问题
var flat = function (arr, n) {
    if(n<=0 || !Array.isArray(arr)){return arr}
    let result = [];
    for(const ele of arr){
        if(Array.isArray(ele)){result.push(...flat(ele, n-1))}
        else{result.push(ele)};
    };
    return result;
};

const arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]];
console.log(flat(arr,0));//[ 1, 2, 3, [ 4, 5, 6 ], [ 7, 8, [ 9, 10, 11 ], 12 ], [ 13, 14, 15 ] ]
console.log(flat(arr,1));//[ 1, 2, 3, 4, 5, 6, 7, 8, [ 9, 10, 11 ], 12, 13, 14, 15 ]
console.log(flat(arr,2));//[1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12,  13, 14, 15]
