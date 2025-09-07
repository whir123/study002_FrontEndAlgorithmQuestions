/**
 * 给定一个数组 arr 和一个块大小 size ，返回一个分块的数组
 * 分块的数组包含了 arr 中的原始元素，但是每个子数组的长度都是 size 
 * 如果 arr.length 不能被 size 整除，那么最后一个子数组的长度可能小于 size 
 * 你可以假设该数组是 JSON.parse 的输出结果。换句话说，它是有效的JSON。
 * 请你在不使用 lodash 的函数 _.chunk 的情况下解决这个问题。
 */

var chunk = function(arr, size) {
    if(!arr || arr.length === 0) return [];
    let result = [];
    for(let i=0; i<arr.length; i++){
        let cur = Math.floor(i/size);
        let index = i%size;
        if(index===0){result.push([]);}
        result[cur].push(arr[i]);
    };
    return result;
};

console.log(chunk([1,2,3,4,5], 1));
console.log(chunk([1,9,6,3,2], 3));