/**
 * n 个孩子站成一排。给你一个整数数组 ratings 表示每个孩子的评分。
 * 你需要按照以下要求，给这些孩子分发糖果：
 * - 每个孩子至少分配到 1 个糖果。
 * - 相邻两个孩子中，评分更高的那个会获得更多的糖果。
 * 请你给每个孩子分发糖果，计算并返回需要准备的 最少糖果数目 。
 */

var candy = function(ratings) {
    // 🟢 先从左到右遍历，保证每个孩子比左边评分高时糖果多；
    // 🟢 再从右到左遍历，保证每个孩子比右边评分高时糖果多。
    const n = ratings.length;
    let sweets = Array(n).fill(1);

    for (let i=1; i<n; i++) {
        if (ratings[i]>ratings[i-1]) sweets[i] = sweets[i-1]+1;
    };
    for (let j=n-2; j>=0; j--) { // 回头遍历 Math.max❕
        if (ratings[j]>ratings[j+1]) sweets[j] = Math.max(sweets[j], sweets[j+1]+1);
    };
    // console.log(sweets);
    let res = sweets.reduce((a,c)=>a+c, 0);
    return res;
};

const ratings1 = [1,0,2];
console.log(candy(ratings1));
// 输出：5
// 解释：你可以分别给第一个、第二个、第三个孩子分发 2、1、2 颗糖果。

const ratings2 = [1,2,2];
console.log(candy(ratings2));
// 输出：4
// 解释：你可以分别给第一个、第二个、第三个孩子分发 1、2、1 颗糖果。第三个孩子只得到 1 颗糖果，这满足题面中的两个条件。

const ratings3 = [1,3,4,5,2];
console.log(candy(ratings3)); // 11