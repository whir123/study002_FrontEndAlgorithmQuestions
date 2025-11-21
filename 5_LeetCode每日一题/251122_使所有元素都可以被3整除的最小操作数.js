/**
 * 给你一个整数数组 nums 。一次操作中，你可以将 nums 中的任意一个元素增加或者减少 1 。
 * 请你返回将 nums 中所有元素都可以被 3 整除的最少操作次数。
 */

var minimumOperations = function(nums) {
    let times = 0;
    for (const n of nums){
        if (n%3!==0) times++;
    };
    return times;
};

console.log(minimumOperations([1,2,3,4]));
// 输出：3
// 解释：
// 通过以下 3 个操作，数组中的所有元素都可以被 3 整除：
// 将 1 减少 1 。
// 将 2 增加 1 。
// 将 4 减少 1 。

console.log(minimumOperations([3,6,9]));
// 输出：0