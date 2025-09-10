/**
 * 给你一个非负整数数组 nums ，你最初位于数组的第一个下标 。
 * 数组中的每个元素代表你在该位置可以跳跃的最大长度。
 * 判断你是否能够到达最后一个下标，如果可以，返回 true ；否则，返回 false 。
 */

var canJump = function(nums) {
    let maxDis = 0; // ⚠️ 维护一个目前能到达的最远距离
    const n = nums.length;
    for(let i=0; i<n; i++){
        if(maxDis<i) return false;
        maxDis = Math.max(maxDis, i+nums[i]);
        if(maxDis >= n-1) return true;
    };
    return true;
};

const nums1 = [2,3,1,1,4];
console.log(canJump(nums1)); // true
const nums2 = [3,2,1,0,4];
console.log(canJump(nums2)); // false