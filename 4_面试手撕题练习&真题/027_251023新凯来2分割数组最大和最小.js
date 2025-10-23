/**
 * 【分割数组使子数组和最大值最小】
 * 给定非负整数数组nums和一个整数k 需要将这个数组份成k个非空的连续子数组
 * 使得这k个子数组各自和的最大值最小 返回这个值
 */
// ⭐️ leetcode 410
function canSplit(nums, k, mid){
    let count = 1;
    let sum = 0;
    for (const num of nums) {
        if (sum+num>mid) {
            count++;
            sum = num;
        } else {
            sum += num;
        };
    };
    return count<=k;
};
function minMaxSum(nums, k){
    let left = Math.max(...nums); // 返回值 肯定大于等于这个
    let right = nums.reduce((a,b) => a+b, 0); // 返回值 肯定比小于等于这个
    // 返回值以 left/right 为上下界 二分查找：
    while (left<right) {
        let mid = Math.floor((left+right)/2);
        if (canSplit(nums, k, mid)){
            right = mid;
        } else {
            left = mid+1;
        };
    };
    return left;
};

// 测试用例
console.log(minMaxSum([7,2,5,10,8], 2)); // 18
// 解释：[7,2,5] 和 [10,8]，最大和为18
console.log(minMaxSum([1,2,3,4,5], 2)); // 9
// 解释：[1,2,3,4] 和 [5]，最大和为9
console.log(minMaxSum([1,4,4], 3)); // 4
// 解释：每个子数组一个元素，最大和为4
console.log(minMaxSum([1,2,3,4,5], 1)); // 15
// 解释：只能分一组，最大和为15
console.log(minMaxSum([1,2,3,4,5], 5)); // 5
// 解释：每个元素一组，最大和为5
