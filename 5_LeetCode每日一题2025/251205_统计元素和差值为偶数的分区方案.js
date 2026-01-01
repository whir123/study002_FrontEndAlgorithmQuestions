/**
 * 给你一个长度为 n 的整数数组 nums 。
 * 分区是指将数组按照下标 i （0 <= i < n - 1）划分成两个非空子数组，其中：
 * 左子数组包含区间 [0, i] 内的所有下标。
 * 右子数组包含区间 [i + 1, n - 1] 内的所有下标。
 * 对左子数组和右子数组先求元素和再做差 ，统计并返回差值为偶数的分区方案数
 */

var countPartitions = function(nums) {
    let sum = nums.reduce((a,b)=>a+b);
    if (sum%2===1) return 0;
    return nums.length-1;
};

const nums1 = [10,10,3,7,6];
console.log(countPartitions(nums1));
// 输出：4

const nums2 = [1,2,2];
console.log(countPartitions(nums2));
// 输出：0