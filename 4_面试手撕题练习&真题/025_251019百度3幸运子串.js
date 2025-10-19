// 给定一个长度为n的字符串 又给定一个偶数k 2<=k<=n
// 称字符串s中所有长度为k的子串 在满足以下条件时为幸运子串：
// 当且仅当该子串的前k/2个字符对应数字之和等于后k/2个
// [输入]：第一行输入一个整数t 表示测试用例数 
// 每组测试用例：一行输入2个整数n,k 一行输入长度n仅有0～9构成的字符串s
// [输出]：幸运子串总数

function luckySum(s, k) {
    const n = s.length;
    const half = k / 2;
    let ans = 0;

    // 初始化窗口
    let leftSum = 0, rightSum = 0;
    for (let i = 0; i < half; i++) leftSum += +s[i];
    for (let i = half; i < k; i++) rightSum += +s[i];
    if (leftSum === rightSum) ans++;

    // 滑动窗口：每次窗口右移一位
    for (let i = 1; i + k <= n; i++) {
        // 左半去掉旧的第一个，加上新的中间值
        leftSum = leftSum - (+s[i - 1]) + (+s[i + half - 1]);
        // 右半去掉旧的中间第一个，加上新加入的最右
        rightSum = rightSum - (+s[i + half - 1]) + (+s[i + k - 1]);
        if (leftSum === rightSum) ans++;
    }
    return ans;
};

console.log(luckySum("123321", 4)); // 1
console.log(luckySum("11223344", 4)); // 0
console.log(luckySum("000000", 2)); // 5
console.log(luckySum("1234567890", 6)); // 0
console.log(luckySum("111222333444", 6)); // 0