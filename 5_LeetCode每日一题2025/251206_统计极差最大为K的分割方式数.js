/**
 * 给你一个整数数组 nums 和一个整数 k。你的任务是将 nums 分割成一个或多个非空的连续子段，使得每个子段的 最大值 与 最小值 之间的差值 不超过 k。
 * 返回在此条件下将 nums 分割的总方法数。
 * 由于答案可能非常大，返回结果需要对 10^9 + 7 取余数。
 */

var countPartitions = function(nums, k) {
    const mod = 1e9 + 7;
    const n = nums.length;

    const dp = Array(n + 1).fill(0);
    const pre = Array(n + 1).fill(0);

    dp[0] = 1;
    pre[0] = 1;

    const maxQ = [];
    const minQ = [];

    let left = 0;

    for (let i = 0; i < n; i++) {
        // 加入 maxQ（递减）
        while (maxQ.length && maxQ[maxQ.length - 1] < nums[i]) maxQ.pop();
        maxQ.push(nums[i]);
        // 加入 minQ（递增）
        while (minQ.length && minQ[minQ.length - 1] > nums[i]) minQ.pop();
        minQ.push(nums[i]);

        // 移动 left 直到满足 max-min ≤ k
        while (maxQ[0] - minQ[0] > k) {
            // 如果要移走 nums[left]
            if (maxQ[0] === nums[left]) maxQ.shift();
            if (minQ[0] === nums[left]) minQ.shift();
            left++;
        }

        // dp[i+1]: 以 nums[0..i] 的前 i+1 个为结尾
        // 有效的 j 的范围是 [left..i]
        const total = (pre[i] - (left === 0 ? 0 : pre[left - 1]) + mod) % mod;

        dp[i + 1] = total;
        pre[i + 1] = (pre[i] + dp[i + 1]) % mod;
    }

    return dp[n];
};

const nums1 = [9,4,1,3,7], k1 = 4;
console.log(countPartitions(nums1, k1));
// 输出： 6
// 共有 6 种有效的分割方式，使得每个子段中的最大值与最小值之差不超过 k = 4：
// [[9], [4], [1], [3], [7]]
// [[9], [4], [1], [3, 7]]
// [[9], [4], [1, 3], [7]]
// [[9], [4, 1], [3], [7]]
// [[9], [4, 1], [3, 7]]
// [[9], [4, 1, 3], [7]]

const nums2 = [3,3,4], k2 = 0;
console.log(countPartitions(nums2, k2));
// 输出： 2
// 共有 2 种有效的分割方式，满足给定条件：
// [[3], [3], [4]]
// [[3, 3], [4]]