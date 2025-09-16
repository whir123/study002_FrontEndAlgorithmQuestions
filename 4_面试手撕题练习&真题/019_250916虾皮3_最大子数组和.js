/**
 * 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 子数组是数组中的一个连续部分
 */

var maxSubArray = function(nums) {
    let curMax = nums[0];
    let max = nums[0];
    for (let i=1; i<nums.length; i++) {
        curMax = Math.max(nums[i], curMax+nums[i]);
        max = Math.max(max, curMax);
    };
    return max;
};

const nums1 = [-2,1,-3,4,-1,2,1,-5,4];
console.log(maxSubArray(nums1));
// 输出：6

const nums2 = [1];
console.log(maxSubArray(nums2));
// 输出：1

const nums3 = [5,4,-1,7,8];
console.log(maxSubArray(nums3));
// 输出：23