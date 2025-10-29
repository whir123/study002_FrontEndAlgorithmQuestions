/**
 * 给你一个正整数 n。
 * 返回大于等于n 且 二进制表示仅包含 置位 位的最小整数 x 。
 * 置位 位指的是二进制表示中值为 1 的位。
 * 【⚠️ 二进制表示中所有位都是1的数： 1，3，7，15，31……】
 */

var smallestNumber = function(n) {
    for (k=0; k<=10; k++){
        let res = 2**k-1;
        if (res>=n) return res;
    };
};
var smallestNumber2 = function(n) {
    let k = n.toString(2).length;
    return (1<<k)-1;
};

console.log(smallestNumber(5)); // 7
console.log(smallestNumber2(5)); // 7
// 7 的二进制表示是 "111"。

console.log(smallestNumber(10)); // 15
console.log(smallestNumber2(10)); // 15
// 15 的二进制表示是 "1111"。

console.log(smallestNumber(3)); // 3
console.log(smallestNumber2(3)); // 3
// 3 的二进制表示是 "11"。