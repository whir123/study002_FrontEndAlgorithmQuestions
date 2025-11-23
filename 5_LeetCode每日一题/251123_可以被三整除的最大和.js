/**
 * 给你一个整数数组 nums，请你找出并返回能被三整除的元素最大和
 */

// ⭐️ 思路：total = 3的倍数 -> 直接输出
// total/3 余1 -> 删除 一个余1的元素/两个余2的元素 
// total/3 余2 -> 删除 一个余2的元素/两个余1的元素 
var maxSumDivThree = function(nums) {
    let total = 0;
    let min1 = Infinity, secondMin1 = Infinity;
    let min2 = Infinity, secondMin2 = Infinity;

    for (let cur of nums) {
        total += cur;
        if (cur%3===1){
            if (cur<=min1){
                secondMin1 = min1;
                min1 = cur;
            } else if (cur<secondMin1){
                secondMin1 = cur;
            };
        } else if (cur%3===2){
            if (cur<=min2){
                secondMin2 = min2;
                min2 = cur;
            } else if (cur<secondMin2){
                secondMin2 = cur;
            };
        };
    };

    if (total%3===0) return total;
    if (total%3===1){
        let remove = Math.min(min1, min2+secondMin2);
        return remove===Infinity ? 0 : total-remove;
    } else if (total%3===2){
        let remove = Math.min(min2, min1+secondMin1);
        return remove===Infinity ? 0 : total-remove;
    };
};

const nums1 = [3,6,5,1,8];
console.log(maxSumDivThree(nums1));
// 输出：18
// 解释：选出数字 3, 6, 1 和 8，它们的和是 18（可被 3 整除的最大和）。

const nums2 = [4];
console.log(maxSumDivThree(nums2));
// 输出：0
// 解释：4 不能被 3 整除，所以无法选出数字，返回 0。

const nums3 = [1,2,3,4,4];
console.log(maxSumDivThree(nums3));
// 输出：12
// 解释：选出数字 1, 3, 4 以及 4，它们的和是 12（可被 3 整除的最大和）。