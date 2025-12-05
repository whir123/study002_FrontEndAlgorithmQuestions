/**
 * 给你一个整数数组 nums 和一个整数 k。你的任务是将 nums 分割成一个或多个非空的连续子段，使得每个子段的 最大值 与 最小值 之间的差值 不超过 k。
 * 返回在此条件下将 nums 分割的总方法数。
 * 由于答案可能非常大，返回结果需要对 10^9 + 7 取余数。
 */

var countPartitions = function(nums, k) {
    // ⚠️ dp[i] => nums[0...i] 的分割方法数
    // ⚠️ 滑动窗口找每个i的合法起点
    const MOD = 1e9 + 7;
    const n = nums.length;

    const dp = new Array(n).fill(0);
    const prefix = new Array(n).fill(0); // 前缀和

    const minQ = [], maxQ = []; // 单调队列：维护窗口min/max

    let l = 0;
    for (let r=0; r<n; r++){
        while (minQ.length && nums[minQ[minQ.length-1]] > nums[r]){
            minQ.pop();
        };
        minQ.push(r);
        while (maxQ.length && nums[maxQ[maxQ.length-1]] < nums[r]){
            maxQ.pop();
        };
        maxQ.push(r);

        while (nums[maxQ[0]]-nums[minQ[0]]>k){ // 缩小窗口 直到满足 max-min<=k
            l++;
            if (minQ[0]<l) minQ.shift();
            if (maxQ[0]<l) maxQ.shift();
        };
        if (l===0) {
            dp[r] = (prefix[r-1]||0) + 1;
        } else {
            dp[r] = (prefix[r-1] - prefix[l-2] + MOD) % MOD;
        };

        prefix[r] = (dp[r] + (prefix[r-1]||0)) % MOD;
    };
    return dp[n-1];
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