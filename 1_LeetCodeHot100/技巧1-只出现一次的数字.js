/**
 * 给你一个 非空 整数数组 nums ，除了某个元素只出现一次以外，其余每个元素均出现两次。
 * 找出那个只出现了一次的元素。
 * 你必须设计并实现「线性时间复杂度」的算法来解决此问题，且该算法只使用「常量额外空间」。
 * 线性时间复杂度（即 O(n)）。 ｜ 常量额外空间（即 O(1)） 
 */

/**
 * 位运算的性质：异或运算（XOR，符号 ^）具有以下重要性质：
 * a ^ a = 0（任何数和自身异或结果为 0）
 * a ^ 0 = a（任何数和 0 异或结果为其本身）
 * 异或运算满足交换律和结合律，即 a ^ b ^ a = (a ^ a) ^ b = 0 ^ b = b
 */
var singleNumber = function(nums) {
    let result = 0;
    for(const num of nums){
        result = result ^ num;
    };
    return result;
};
console.log(singleNumber([4,1,2,1,2]));