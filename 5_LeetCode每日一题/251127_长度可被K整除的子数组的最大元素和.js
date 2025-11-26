/**
 * 给你一个整数数组 nums 和一个整数 k 。
 * 返回 nums 中一个非空子数组的最大和，要求该子数组的长度可以被 k 整除。
 */

// ⚠️
// 子数组 (Subarray)：必须是连续的元素序列
// 子串 (Substring)：必须是连续的字符序列（在字符串中）
// 子序列 (Subsequence)：可以是不连续的元素序列，但保持原顺序

// ⭐️ (right - left + 1) % k === 0
// ⭐️ 等价于: right % k === (left-1) % k
var maxSubarraySum = function(nums, k) {
    const n = nums.length;
    const pre = new Array(n+1).fill(0); // 前缀和 pre[0]=0
    for (let i=0; i<n; i++) pre[i+1] = pre[i]+nums[i];

    // 对每个mod类别存最小前缀和
    const preMin = new Array(k).fill(Infinity); // mod不会超过k
    let ans = -Infinity;
    for (let r=0; r<=n; r++){
        let mod = r%k;
        if (preMin[mod]!==Infinity){
            ans = Math.max(ans, pre[r]-preMin[mod]);
        };
        preMin[mod] = Math.min(preMin[mod], pre[r]); // 更新该桶最小前缀和
    };

    return ans;
};

const nums1 = [1,2], k1 = 1;
console.log(maxSubarraySum(nums1,k1));
// 输出： 3
// 子数组 [1, 2] 的和为 3，其长度为 2，可以被 1 整除。

const nums2 = [-1,-2,-3,-4,-5], k2 = 4;
console.log(maxSubarraySum(nums2,k2));
// 输出： -10
// 满足题意且和最大的子数组是 [-1, -2, -3, -4]，其长度为 4，可以被 4 整除。