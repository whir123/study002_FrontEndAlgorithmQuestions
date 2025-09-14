/**
 * 给你一个下标从 1 开始的整数数组 numbers ，该数组已按 非递减顺序排列
 * 请你从数组中找出满足相加之和等于目标数 target 的两个数。
 * 如果设这两个数分别是 numbers[index1] 和 numbers[index2] ，则 1 <= index1 < index2 <= numbers.length 。
 * 以长度为 2 的整数数组 [index1, index2] 的形式返回这两个整数的下标 index1 和 index2。
 * 你可以假设每个输入 只对应唯一的答案 ，而且你 不可以 重复使用相同的元素。
 * 你所设计的解决方案必须只使用常量级的额外空间。
 */

var twoSum = function(numbers, target) {
    const n = numbers.length;
    let left = 0 , right = n-1;
    while (left<right) {
        let sum = numbers[left]+numbers[right];
        if (sum===target) {
            return [left+1, right+1];
        } else if (sum>target) {
            right--;
        } else {
            left++;
        };
    };
};

const numbers1 = [2,7,11,15], target1 = 9;
const numbers2 = [2,3,4], target2 = 6;
const numbers3 = [-1,0], target3 = -1;
console.log(twoSum(numbers1, target1)); // [1,2]
console.log(twoSum(numbers2, target2)); // [1,3]
console.log(twoSum(numbers3, target3)); // [1,2]