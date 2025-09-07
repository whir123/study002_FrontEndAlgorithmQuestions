//给定一个整数数组 nums、一个 reducer 函数 fn 和一个初始值 init，返回通过依次对数组的每个元素执行 fn 函数得到的最终结果。
//通过以下操作实现这个结果：val = fn(init, nums[0])，val = fn(val, nums[1])，val = fn(val, nums[2])，... 直到处理数组中的每个元素。
//然后返回 val 的最终值。
//如果数组的长度为 0，则函数应返回 init。
//请你在不使用内置数组方法的 Array.reduce 前提下解决这个问题。
var reduce = function(nums, fn, init) {
    if(nums.length===0)return init;
    let val = init;
    for(let i=0;i<nums.length;i++){
        val = fn(val, nums[i]);
    };
    return val;
};

const nums = [1,2,3,4], fn = function sum(accum, curr) { return accum + curr; }, init = 0;
console.log(reduce(nums, fn, init));