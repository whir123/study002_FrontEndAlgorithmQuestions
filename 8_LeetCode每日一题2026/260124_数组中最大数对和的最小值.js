/**
 * 难度：🟡
 * 
 * 一个数对 (a,b) 的数对和等于 a + b 。最大数对和是一个数对数组中最大的数对和。
 * 比方说，如果我们有数对 (1,5) ，(2,3) 和 (4,4)，最大数对和 为 max(1+5, 2+3, 4+4) = max(6, 5, 8) = 8 。
 * 给你一个长度为偶数 n 的数组 nums ，请你将 nums 中的元素分成 n / 2 个数对，使得：
 * nums 中每个元素恰好在一个数对中，且最大数对和的值最小。
 * 请你在最优数对划分的方案下，返回最小的最大数对和。
 * 
 * n == nums.length
 * 2 <= n <= 105
 * n 是 偶数
 * 1 <= nums[i] <= 10^5
 */

var minPairSum = function(nums) {
    // nums.sort((a,b) => a-b);
    const arr = [...nums].sort((a,b) => a-b);

    let l = 0, r = arr.length-1;
    let ans = -Infinity;
    while(l<r){
        const cur = arr[l]+arr[r];
        ans = Math.max(ans, cur);
        l++;
        r--;
    };

    return ans;
};

const nums1 = [3,5,2,3];
console.log(minPairSum(nums1));
// 输出：7
// 解释：数组中的元素可以分为数对 (3,3) 和 (5,2) 。最大数对和为 max(3+3, 5+2) = max(6, 7) = 7 。

const nums2 = [3,5,4,2,4,6];
console.log(minPairSum(nums2));
// 输出：8
// 解释：数组中的元素可以分为数对 (3,5)，(4,4) 和 (6,2) 。
// 最大数对和为 max(3+5, 4+4, 6+2) = max(8, 8, 8) = 8 。
