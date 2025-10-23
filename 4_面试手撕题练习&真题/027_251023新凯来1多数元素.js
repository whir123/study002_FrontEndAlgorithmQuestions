/**
 * 【多数元素】
 * 给定大小为n的数组nums，返回其中的多数元素
 * 数组中出现次数大于n/2的元素 给定数组总是存在多数元素
 */

function most(nums) {
    const n = nums.length;
    let numMap = new Map();
    for (const num of nums){
        if (!numMap.has(num)) numMap.set(num, 0);
        numMap.set(num, numMap.get(num)+1);
        if (numMap.get(num)*2>n) return num;
    };
    return null;
};

// 摩尔投票法将空间复杂度降低至O(1)：【 利用了“多数元素一定存在”的前提 】
function most2(nums) {
    let count = 0;
    let candidate = null;
    for (const num of nums) {
        if (count===0) candidate = num;
        count += (num===candidate) ? 1 : -1;
    };
    return candidate;
};

console.log(most([1,2,3,2,2])) // 2
console.log(most([3,3,4])) // 3
console.log(most([1,1,1,2,3,4,1])) // 1
console.log(most([5,5,5,5,5])) // 5

console.log(most2([1,2,3,2,2])) // 2
console.log(most2([3,3,4])) // 3
console.log(most2([1,1,1,2,3,4,1])) // 1
console.log(most2([5,5,5,5,5])) // 5