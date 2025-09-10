/**
 * 给定一个大小为 n 的数组 nums ，返回其中的多数元素。
 * 多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。
 * 你可以假设数组是非空的，并且给定的数组[总是存在多数元素]
 */

var majorityElement = function(nums) {
    // ⚠️ 候选人变量 candidate ｜ 计数器 count
    let candidate = null;
    let count = 0;
    for(const num of nums) {
        if(count===0){candidate = num};
        count += candidate===num ? 1 : -1;
    };
    return candidate;
};

const nums1 = [3,2,3];
const nums2 = [2,2,1,1,1,2,2];
console.log(majorityElement(nums1)); // 3
console.log(majorityElement(nums2)); // 2
