// 给你一个字符串 找出其中最长回文子序列 并返回该序列长度、
// ⚠️ 最长回文子序列允许字符不连续，比如 "bbbab" 的最长回文子序列是 "bbbb"，这里 b 可能不连续
// ⚠️ 滑动窗口通常用于连续子串，比如找最长回文子串（substring）。

function longestPalindromeSubseq(s) {
    const n = s.length;
    const dp = Array.from({ length: n }, () => Array(n).fill(0));

    // 遍历顺序：i 从 n-1 到 0，j 从 i+1 到 n-1，保证每次用到的子问题都已计算
    for (let i = n - 1; i >= 0; i--) {
        dp[i][i] = 1; // 单个字符是回文
        for (let j = i + 1; j < n; j++) {
            if (s[i] === s[j]) {
                dp[i][j] = dp[i + 1][j - 1] + 2;
            } else {
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[0][n - 1];
}

// 测试
console.log(longestPalindromeSubseq("bbbab")); // 输出 4 ("bbbb")
console.log(longestPalindromeSubseq("cbbd"));  // 输出 2 ("bb")