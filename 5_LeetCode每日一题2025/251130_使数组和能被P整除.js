/**
 * 给你一个正整数数组 nums，请你移除最短子数组（可以为空），使得剩余元素的和能被 p 整除。 不允许将整个数组都移除。
 * 请你返回你需要移除的最短子数组的长度，如果无法满足题目要求，返回 -1 。
 * 子数组 定义为原数组中连续的一组元素。
 */

// ⭐️ 移除子数组 (l, r]：让剩余数组 sum % p 为 0
// ⭐️ 等价于：sum(nums) % p = mod  =》 (preSum[r] - preSum[l]) % p = mod
// ⭐️ 等价于：preSum[l] % p = (preSum[r] - mod + p) % p 设置为=》 target

var minSubarray = function(nums, p) {
    let n = nums.length;
    let sum = nums.reduce((a,b) => a+b);
    let mod = sum % p;
    if (mod===0) return 0;

    let mp = new Map(); // 前缀模，最近出现的位置
    mp.set(0,-1);

    let res = n, prefix = 0;
    for (let i=0; i<n; i++){
        prefix = (prefix+nums[i])%p; // preSum[r] % p
        let target = (prefix-mod+p)%p; // (preSum[r] - mod + p) % p
        if (mp.has(target)){
            res = Math.min(res, i-mp.get(target));
        };

        mp.set(prefix,i);
    };

    return res===n ? -1 : res;
};

const nums1 = [3,1,4,2], p1 = 6;
const nums2 = [6,3,5,2], p2 = 9;
const nums3 = [1,2,3], p3 = 3;
const nums4 = [1,2,3], p4 = 7;
console.log(minSubarray(nums1, p1)); // 1
console.log(minSubarray(nums2, p2)); // 2
console.log(minSubarray(nums3, p3)); // 0
console.log(minSubarray(nums4, p4)); // -1

// nums 中元素和为 10，不能被 p 整除。我们可以移除子数组 [4] ，剩余元素的和为 6 。
// 我们无法移除任何一个元素使得和被 9 整除，最优方案是移除子数组 [5,2] ，剩余元素为 [6,3]，和为 9 。
// 和恰好为 6 ，已经能被 3 整除了。所以我们不需要移除任何元素。
// 没有任何方案使得移除子数组后剩余元素的和被 7 整除。
