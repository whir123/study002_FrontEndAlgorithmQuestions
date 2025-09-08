/**
 * 给你两个整数：num1 和 num2
 * 在一步操作中，你需要从范围 [0, 60] 中选出一个整数 i ，并从 num1 减去 (2^i+num2)
 * 请你计算，要想使 num1 等于 0 需要执行的最少操作数，并以整数形式返回
 * 如果无法使 num1 等于 0 ，返回 -1
 */

var makeTheIntegerZero = function(num1, num2) {
    // ⚠️ 每次操作： num1 -= num2+2^0 到 num2+2^60 的数
    // ⚠️ 假设操作 k 次：
    // ⬜️ num1 - k*num2 要能被拆成 k 个 2 次幂的和
    // ⬜️ num1 - k*num2 的二进制中“1”最多有 k 个
    for (let k=1; k<=60; k++){
        let temNum = num1 - k*num2;
        if(temNum<=0) continue;
        let temNum2 = temNum.toString(2);
        let count = 0;
        for(const char of temNum2){
            if(char==='1') count++;
        };
        if(count<=k && k<=temNum) return k; // ⚠️ k<=temNum 否则凑不了k个正数
    };
    return -1;
};

const num1 = 3, num2 = -2;
console.log(makeTheIntegerZero(num1, num2)); // 3
// 解释：可以执行下述步骤使 3 等于 0 ：
// - 选择 i = 2 ，并从 3 减去 22 + (-2) ，num1 = 3 - (4 + (-2)) = 1 。
// - 选择 i = 2 ，并从 1 减去 22 + (-2) ，num1 = 1 - (4 + (-2)) = -1 。
// - 选择 i = 0 ，并从 -1 减去 20 + (-2) ，num1 = (-1) - (1 + (-2)) = 0 。
// 可以证明 3 是需要执行的最少操作数。

const num3 = 5, num4 = 7
console.log(makeTheIntegerZero(num3, num4)); // -1
// 解释：可以证明，执行操作无法使 5 等于 0 。