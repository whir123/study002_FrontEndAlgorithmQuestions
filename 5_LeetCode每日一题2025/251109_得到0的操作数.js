/**
 * 给你两个非负整数 num1 和 num2 。
 * 每一步操作中，如果 num1 >= num2 ，你必须用 num1 减 num2 ；否则，你必须用 num2 减 num1 。
 * 例如，num1 = 5 且 num2 = 4 ，应该用 num1 减 num2 ，因此，得到 num1 = 1 和 num2 = 4 。
 * 然而，如果 num1 = 4且 num2 = 5 ，一步操作后，得到 num1 = 4 和 num2 = 1 。
 * 返回使 num1 = 0 或 num2 = 0 的 操作数 。
 */

var countOperations = function(num1, num2) {
    let sum = 0;
    while (num1!==0 && num2!==0){
        num1>=num2 ? num1 = num1-num2 : num2 = num2-num1;
        sum++;
    };
    return sum;
}; // 优化⬇️
var countOperations2 = function(num1, num2) {
    let sum = 0;
    while (num1!==0 && num2!==0){
        if (num1 >= num2) {
            sum += Math.floor(num1/num2);
            num1 = num1%num2;
        } else {
            sum += Math.floor(num2/num1);
            num2 = num2%num1;
        };
    };
    return sum;
};

console.log(countOperations(2,3));
console.log(countOperations2(2,3));
// 输出：3
// 解释：
// - 操作 1 ：num1 = 2 ，num2 = 3 。由于 num1 < num2 ，num2 减 num1 得到 num1 = 2 ，num2 = 3 - 2 = 1 。
// - 操作 2 ：num1 = 2 ，num2 = 1 。由于 num1 > num2 ，num1 减 num2 。
// - 操作 3 ：num1 = 1 ，num2 = 1 。由于 num1 == num2 ，num1 减 num2 。
// 此时 num1 = 0 ，num2 = 1 。由于 num1 == 0 ，不需要再执行任何操作。
// 所以总操作数是 3 。