/**
 * 给你一个整数数组 nums 和一个整数 k。你可以执行以下操作任意次：
 * 选择一个下标 i，并将 nums[i] 替换为 nums[i] - 1。
 * 返回使数组元素之和能被 k 整除所需的最小操作次数。
 */

var minOperations = function(nums, k) {
    let sum = nums.reduce((a,b)=>a+b);
    return sum % k;
};

const nums1 = [3,9,7], k1 = 5;
console.log(minOperations(nums1, k1));
// 输出： 4
// 对 nums[1] = 9 执行 4 次操作。现在 nums = [3, 5, 7]。数组之和为 15，可以被 5 整除。

const nums2 = [4,1,3], k2 = 4;
console.log(minOperations(nums2, k2));
// 输出： 0
// 数组之和为 8，已经可以被 4 整除。因此不需要操作。

const nums3 = [3,2], k3 = 6;
console.log(minOperations(nums3, k3));
// 输出： 5
// 对 nums[0] = 3 执行 3 次操作，对 nums[1] = 2 执行 2 次操作。现在 nums = [0, 0]。数组之和为 0，可以被 6 整除。