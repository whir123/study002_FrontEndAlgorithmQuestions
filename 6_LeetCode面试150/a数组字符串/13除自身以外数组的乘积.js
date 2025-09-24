/**
 * 给你一个整数数组 nums，返回数组 answer ，
 * 其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。
 * 题目数据保证数组 nums 之中任意元素的全部前缀元素和后缀的乘积都在 32 位整数范围内。
 * 请不要使用除法，且在 O(n) 时间复杂度内完成此题。
 */

var productExceptSelf = function(nums) {
    // ⭐️ 左侧积 * 右侧积
    const n = nums.length;
    let answer = new Array(n).fill(1);
    let rightAns = new Array(n).fill(1);

    for (let i=1; i<n; i++) {
        answer[i] = answer[i-1]*nums[i-1];
    };
    for (let i=n-2; i>=0; i--) {
        rightAns[i] = rightAns[i+1]*nums[i+1];
    };
    for (let i=0; i<n; i++) {
        answer[i] *= rightAns[i];
    };

    return answer;
};

const nums1 = [1,2,3,4];
console.log(productExceptSelf(nums1));
// 输出: [24,12,8,6]

const nums2 = [-1,1,0,-3,3];
console.log(productExceptSelf(nums2));
// 输出: [0,0,9,0,0]