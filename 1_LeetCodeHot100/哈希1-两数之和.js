//给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出和为目标值 target 的那两个整数，并返回它们的数组下标。
//你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。
//你可以按任意顺序返回答案。

var nums = [1,3,4,5,7];
var target = 9;

function twoSum(nums, target){
    //let result = []; 不需要result存放结果了
    for(let i=0; i<nums.length; i++){
        let complement = target - nums[i];
        for(let j=i+1; j<nums.length; j++){
            if(nums[j]===complement){
                return [i,j];
            }
        }
    }
    return [];
};
console.log(twoSum(nums,target));

//可以使用哈希表（对象）来存储已经遍历过的数字，将时间复杂度从 O(n²) 降到 O(n)
    //对于每个元素，计算它需要的补数（target - nums[i]）
    //检查这个补数是否已经在哈希表中
    //如果在，返回对应的索引
    //如果不在，将当前数字和它的索引存入哈希表
function twoSum2(nums, target){
    const numMap = {}; //numMap 是一个对象，用于存储：
    //处理nums=[2, 7, 11, 15]时，numMap会逐步变成：{ 2: 0, 7: 1, 11: 2, 15: 3 }
    for (let i=0; i<nums.length; i++){
        let complement = target - nums[i];
        if (complement in numMap){
            return [numMap[complement],i];//numMap[complement] → 补数的索引
        }
        numMap[nums[i]] = i;//如果补数不存在，将当前数字存入 numMap，供后续检查
    }
    return [];
}
console.log(twoSum2(nums,target));