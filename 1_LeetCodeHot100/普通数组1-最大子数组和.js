//给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
//子数组是数组中的一个连续部分。

//思路：
//可以定义 dp[i]为【以nums[i]结尾的】最大子数组和
//情况1：将 nums[i] 加入到前面的子数组中，即 dp[i] = dp[i-1] + nums[i]
//情况2：从 nums[i] 开始一个新的子数组，即 dp[i] = nums[i]
var maxSubArray = function(nums) {
    let curMax = nums[0];
    let Max = nums[0];
    for(i=1;i<nums.length;i++){
        curMax = Math.max(curMax+nums[i],nums[i]);
        Max = Math.max(curMax,Max);
    };
    return Max;
};

const nums = [-2,1,-3,4,-1,2,1,-5,4];
console.log(maxSubArray(nums));