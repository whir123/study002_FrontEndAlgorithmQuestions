//给你一个整数数组 nums，返回数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。
//题目数据保证数组 nums之中任意元素的全部前缀元素和后缀的乘积都在 32 位整数范围内。
//请不要使用除法，且在 O(n) 时间复杂度内完成此题。
//输入: nums = [1,2,3,4]
//输出: [24,12,8,6]
var productExceptSelf = function(nums) {
    //前缀乘积 * 后缀乘积
    let prefix = [1], suffix = [1], answer = [];
    let left = 1;
    while(left<=nums.length){
        prefix.push(prefix[left-1]*nums[left-1]);
        suffix.push(suffix[left-1]*nums[nums.length-left]);
        left++;
    };
    for(i=0;i<nums.length;i++){
        answer[i] = prefix[i]*suffix[nums.length-1-i];
    };
    return answer;
};
const nums = [1,2,3,4];
console.log(productExceptSelf(nums));