/**
 * 给定一个长度为 n 的 0 索引整数数组 nums。初始位置在下标 0。
 * 每个元素 nums[i] 表示从索引 i 向后跳转的最大长度。
 * 换句话说，如果你在索引 i 处，你可以跳转到任意 (i + j) 处：
 * 0 <= j <= nums[i] 且 i + j < n
 * 返回到达 n - 1 的最小跳跃次数。测试用例保证可以到达 n - 1。
 */

var jump = function(nums) {
    const n = nums.length;
    let dp = new Array(n).fill(Infinity);
    dp[0] = 0;
    for(let i=0; i<n; i++){
        let cur = nums[i];
        for(let d=i+1; d<=i+cur; d++){
            dp[d] = Math.min(dp[d], dp[i]+1);
        };
    };
    return dp[n-1];
};

// ⭐️ 贪心算法：
// 用变量保存当前能覆盖到的最远距离 end，每次到新跳跃覆盖的最远点就步数+1
// 每遍历一个位置，如果刚好等于 end，则必须再跳一次。保证遍历一遍即可完成最优分段
// ⚠️ 不能每次一更新 farthest 就 jump++
var jump2 = function(nums) {
    let end = 0, farthest = 0, jumps = 0;
    for(let i = 0; i < nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);
        if(i === end) {
            jumps++;
            end = farthest;
        }
    }
    return jumps;
};


const nums1 = [2,3,1,1,4];
console.log(jump(nums1)); // 2
console.log(jump2(nums1)); // 2
const nums2 = [2,3,0,1,4];
console.log(jump(nums2)); // 2
console.log(jump2(nums2)); // 2