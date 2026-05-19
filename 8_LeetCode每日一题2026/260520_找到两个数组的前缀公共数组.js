/**
 * 难度：🟡
 * 
 * 给你两个下标从0开始长度为n的整数「排列」A和B。
 * A和B的前缀公共数组定义为数组C，其中C[i]是数组A和B到下标为i之前公共元素的数目。
 * 请你返回A和B的前缀公共数组。
 * 如果一个长度为n的数组包含1到n的元素恰好一次，我们称这个数组是一个长度为n的排列。
 */

var findThePrefixCommonArray = function(A, B) {
    const n = A.length;
    const count = new Array(n+1).fill(0);
    const ans = [];

    let common = 0;

    for (let i=0; i<n; i++){ // ⚠️
        count[A[i]]++;
        if(count[A[i]] === 2) common++;
        count[B[i]]++;
        if(count[B[i]] === 2) common++;

        ans.push(common);
    }

    return ans;
};

const A1 = [1,3,2,4], B1 = [3,1,2,4];
console.log(findThePrefixCommonArray(A1, B1));
// 输出：[0,2,3,4]
// 解释：i = 0：没有公共元素，所以 C[0] = 0 。
// i = 1：1 和 3 是两个数组的前缀公共元素，所以 C[1] = 2 。
// i = 2：1，2 和 3 是两个数组的前缀公共元素，所以 C[2] = 3 。
// i = 3：1，2，3 和 4 是两个数组的前缀公共元素，所以 C[3] = 4 。

const A2 = [2,3,1], B2 = [3,1,2];
console.log(findThePrefixCommonArray(A2, B2));
// 输出：[0,1,3]
// 解释：i = 0：没有公共元素，所以 C[0] = 0 。
// i = 1：只有 3 是公共元素，所以 C[1] = 1 。
// i = 2：1，2 和 3 是两个数组的前缀公共元素，所以 C[2] = 3 。