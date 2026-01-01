/**
 * 给你一个由 正整数 组成的数组 nums 。
 * 返回数组 nums 中所有具有 最大 频率的元素的 总频率 。
 * 元素的 频率 是指该元素在数组中出现的次数。
 */

var maxFrequencyElements = function(nums) {
    let max = 0, res = 0;
    let numMap = new Map();
    for (const num of nums) {
        if (!numMap.has(num)) numMap.set(num, 0);
        let cur = numMap.get(num);
        numMap.set(num, ++cur);
        max = Math.max(max, cur);
    };
    for (const [k,v] of numMap) {
        if (v===max) res += max;
    };
    return res;
};

const nums1 = [1,2,2,3,1,4];
console.log(maxFrequencyElements(nums1));
// 输出：4
// ❗️元素 1 和 2 的频率为 2 ，是数组中的最大频率。因此具有最大频率的元素在数组中的数量是 4 。

const nums2 = [1,2,3,4,5];
console.log(maxFrequencyElements(nums2));
// 输出：5
// ❗️数组中的所有元素的频率都为 1 ，是最大频率。因此具有最大频率的元素在数组中的数量是 5 。