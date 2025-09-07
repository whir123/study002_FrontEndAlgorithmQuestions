/**
 * 给你一个非负整数数组 nums ，你最初位于数组的 第一个下标 。
 * 数组中的每个元素代表你在该位置可以跳跃的最大长度。
 * 判断你是否能够到达最后一个下标，如果可以，返回 true ；否则，返回 false 。
 */

var canJump = function(nums) {
    const n = nums.length; // 数组总长度（最终要到达的位置下标+1）
    let maxReach = 0; // 当前能到达的最远位置
    for(let i=0; i<n; i++) {
        if(i>maxReach)return false; // 如果当前下标 i 超过了能到达的最远位置，说明卡住了
        maxReach = Math.max(maxReach, i + nums[i]); // 更新能到达的最远位置
        if(maxReach >= n-1) return true; // 如果能到达或超过 n-1 true
    };
    return false; // [实际执行不到这里] 遍历完所有位置仍未到达最后一个下标，返回 false
};

//示例 1：
const nums = [2,3,1,1,4];
console.log(canJump(nums)); // 输出：true
//解释：可以先跳 1 步，从下标 0 到达下标 1 ，然后再跳 3 步到达下标 4，即最后一个下标。

//示例 2：
const nums2 = [3,2,1,0,4];
console.log(canJump(nums2)); // 输出：false
//解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ，所以永远不可能到达最后一个