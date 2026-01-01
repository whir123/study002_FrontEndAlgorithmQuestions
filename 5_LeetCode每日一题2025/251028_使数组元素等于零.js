/**
 * 给你一个整数数组 nums 。
 * 开始时，选择一个满足 nums[curr] == 0 的起始位置 curr ，并选择一个移动方向: 向左或者向右。
 * 此后，你需要重复下面的过程：
 * 如果 curr 超过范围 [0, n - 1] ，过程结束。
 * 如果 nums[curr] == 0 ，沿当前方向继续移动：如果向右移，则递增 curr ；如果向左移，则递减 curr 。
 * 如果 nums[curr] > 0: 将 nums[curr] 减 1 。反转移动方向（向左变向右，反之亦然）。
 * 沿新方向移动一步。
 * 如果在结束整个过程后，nums 中的所有元素都变为 0 ，则认为选出的初始位置和移动方向有效 。
 * 返回可能的有效选择方案数目。
 */

// ⬇️ 暴力解法 
var countValidSelections = function(nums) {
    let res = 0;
    for (let i=0; i<nums.length; i++){
        if (nums[i]===0) res += isValid(nums,i,-1)+isValid(nums,i,1);
    };
    return res;
};
var isValid = function(nums,idx,direction) {
    let arr = nums.slice(); // 深拷贝 避免直接修改原数组
    let i = idx;
    let d = direction;
    const n = arr.length;
    while(i>=0 && i<n){
        if (arr[i]===0) {
            i += d;
        } else {
            arr[i] = arr[i]-1;
            d = -d;
            i += d;
        };
    };
    let flag = 1;
    for (const a of arr){
        if (a!==0) {
            flag = 0;
            break;
        };
    };
    return flag;
};

// ⭐️ 更优思路：
// 本题可以视作一个「小球打砖块」游戏
// 每打掉一个砖块，小球的移动方向就要反向，所以要想打掉所有砖块，起始位置左右的砖块个数之差不能超过 1。
// 设整个数组的元素和为 total。遍历数组的同时，维护前缀和 pre。
// 如果 nums[i]=0，那么这个位置可以是起始位置吗？分类讨论：
// 1 如果前缀和 pre 等于后缀和 total−pre，那么小球初始方向可以向左，也可以向右，答案加 2。
// 2 如果前缀和比后缀和多 1，那么小球初始方向必须向左，才能打掉所有砖块，答案加 1。
// 3 如果前缀和比后缀和少 1，那么小球初始方向必须向右，才能打掉所有砖块，答案加 1。
// 4 其余情况，不能是起始位置。
var countValidSelections2 = function(nums) {
    let res = 0;
    let total = nums.reduce((a,b) => a+b, 0);
    let pre = 0;
    for (const num of nums){
        pre += num;
        if (num===0){
            let cur = total - pre;
            if (pre===cur) {
                res += 2;
            } else if (Math.abs(pre-cur)===1) {
                res += 1;
            };
        };
    };
    return res;
};

console.log(countValidSelections([1,0,2,0,3])); // 输出：2
console.log(countValidSelections2([1,0,2,0,3])); // 输出：2
// 可能的有效选择方案如下：
// 选择 curr = 3 并向左移动。
// [1,0,2,0,3] -> [1,0,2,0,3] -> [1,0,1,0,3] -> [1,0,1,0,3] -> [1,0,1,0,2] -> [1,0,1,0,2] -> [1,0,0,0,2] -> [1,0,0,0,2] -> [1,0,0,0,1] -> [1,0,0,0,1] -> [1,0,0,0,1] -> [1,0,0,0,1] -> [0,0,0,0,1] -> [0,0,0,0,1] -> [0,0,0,0,1] -> [0,0,0,0,1] -> [0,0,0,0,0].
// 选择 curr = 3 并向右移动。
// [1,0,2,0,3] -> [1,0,2,0,3] -> [1,0,2,0,2] -> [1,0,2,0,2] -> [1,0,1,0,2] -> [1,0,1,0,2] -> [1,0,1,0,1] -> [1,0,1,0,1] -> [1,0,0,0,1] -> [1,0,0,0,1] -> [1,0,0,0,0] -> [1,0,0,0,0] -> [1,0,0,0,0] -> [1,0,0,0,0] -> [0,0,0,0,0].

console.log(countValidSelections([2,3,4,0,4,1,0])); // 输出：0
console.log(countValidSelections2([2,3,4,0,4,1,0])); // 输出：0
// 不存在有效的选择方案。