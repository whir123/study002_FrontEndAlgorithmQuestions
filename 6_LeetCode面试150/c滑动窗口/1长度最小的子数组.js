/**
 * 给定一个含有 n 个正整数的数组和一个正整数 target 。
 * 找出该数组中满足其总和大于等于 target 的长度最小的
 * 子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。
 * 如果不存在符合条件的子数组，返回 0 。
 */

var minSubArrayLen = function(target, nums) {
    const n = nums.length;
    let left = 0, sum = 0, minL = Infinity;

    for(let right=0; right<n; right++) {
        sum += nums[right];
        while (sum>=target) {
            minL = Math.min(minL, right-left+1);
            sum -= nums[left++];
        };
    };

    return minL === Infinity ? 0 : minL;
};

const target1 = 7, nums1 = [2,3,1,2,4,3];
console.log(minSubArrayLen(target1, nums1));
// 输出：2

const target2 = 4, nums2 = [1,4,4];
console.log(minSubArrayLen(target2, nums2));
// 输出：1

const target3 = 11, nums3 = [1,1,1,1,1,1,1,1];
console.log(minSubArrayLen(target3, nums3));
// 输出：0