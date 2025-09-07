/**
 * 给定一个大小为 n 的数组 nums ，返回其中的多数元素。
 * 多数元素是指在数组中出现次数大于 ⌊ n/2 ⌋ 的元素。
 * 你可以假设数组是非空的，并且给定的数组总是存在多数元素。
 */

/**
 * 投票算法（Boyer-Moore Voting Algorithm）：
 * 可以高效地找到多数元素，且只需 O(n) 时间和 O(1) 空间。
 * 核心思想是“对抗抵消”：多数元素最终会“胜出”
 */

var majorityElement = function(nums) {
    let candidate = null;
    let count = 0;
    for(const num of nums){
        if(count===0){candidate = num;}
        count += candidate===num ? 1 : -1;
    };
    return candidate;
};

console.log(majorityElement([3,3,1,3,2,2,1,3,3,2,3]));//3
console.log(majorityElement([7,7,1,2,2,7,7]));//7
//必须保证输入“总是存在多数元素”