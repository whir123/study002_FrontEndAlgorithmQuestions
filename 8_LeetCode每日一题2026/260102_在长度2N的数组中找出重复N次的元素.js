/**
 * 难度：🟢
 * 
 * 给你一个整数数组 nums ，该数组具有以下属性：
 * - nums.length == 2 * n.
 * - nums 包含 n + 1 个不同的元素
 * - nums 中恰有一个元素重复 n 次
 * 找出并返回重复了 n 次的那个元素。
 */

var repeatedNTimes = function(nums) {
    const n = nums.length/2;
    const m = new Map();
    for (let k of nums){
        if (!m.has(k)) m.set(k,0);
        m.set(k,m.get(k)+1);

        if (m.get(k)>=n) return k;
    };
    return nums[0];
};

// ⚠️ 技巧解
// [ X, X, X, X, ... (n 次), a, b, c, d ... (n 个不同的单次元素) ]
// 必然存在两个相同元素，它们的下标差 ≤ 2
var repeatedNTimes2 = function(nums) {
    for (let i=1; i<nums.length; i++){
        if (nums[i]===nums[i-1]) return nums[i];
        if (i>1 && nums[i]===nums[i-2]) return nums[i];
    };
    return nums[0];
};

const nums1 = [1,2,3,3];
console.log(repeatedNTimes(nums1));
console.log(repeatedNTimes2(nums1));
// 输出：3

const nums2 = [2,1,2,5,3,2];
console.log(repeatedNTimes(nums2));
console.log(repeatedNTimes2(nums2));
// 输出：2

const nums3 = [5,1,5,2,5,3,5,4];
console.log(repeatedNTimes(nums3));
console.log(repeatedNTimes2(nums3));
// 输出：5