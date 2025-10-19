/**
 * 给你一个下标从 0 开始的整数数组 nums 和一个整数 value 。
 * 在一步操作中，你可以对 nums 中的任一元素加上或减去 value 。
 * // 例如，如果 nums = [1,2,3] 且 value = 2 ，你可以选择 nums[0] 减去 value ，得到 nums = [-1,2,3] 。
 * 数组的 MEX (minimum excluded) 是指其中数组中缺失的最小非负整数。
 * 例如，[-1,2,3] 的 MEX 是 0 ，而 [1,0,3] 的 MEX 是 2 。
 * 返回在执行上述操作 任意次 后，nums 的最大 MEX 。
 */

var findSmallestInteger = function(nums, value) {
    const n = nums.length;
    const map = new Map();
    for (const num of nums) {
        let mod = ((num%value)+value)%value; // ⚠️ 保证余数是正数
        map.set(mod, (map.get(mod)||0)+1);
    }; // 统计每个余数出现的次数
    let mex = 0;
    while(mex<n){
        let mod = mex%value;
        if (map.get(mod) && map.get(mod)>0) {
            map.set(mod, map.get(mod)-1);
        } else {
            return mex;
        };
        mex++;
    };
    return mex;
};

const nums1 = [1,-10,7,13,6,8], value1 = 5;
console.log(findSmallestInteger(nums1, value1));
// 输出：4
// 解释：执行下述操作可以得到这一结果：
// - nums[1] 加上 value 两次，nums = [1,0,7,13,6,8]
// - nums[2] 减去 value 一次，nums = [1,0,2,13,6,8]
// - nums[3] 减去 value 两次，nums = [1,0,2,3,6,8]
// nums 的 MEX 是 4 。可以证明 4 是可以取到的最大 MEX 。
// ⚠️ 如果再给0123加上value 会产生0不见了 MEX=0的情况

const nums2 = [1,-10,7,13,6,8], value2 = 7;
console.log(findSmallestInteger(nums2, value2));
// 输出：2
// 解释：执行下述操作可以得到这一结果：
// - nums[2] 减去 value 一次，nums = [1,-10,0,13,6,8]
// nums 的 MEX 是 2 。可以证明 2 是可以取到的最大 MEX 。