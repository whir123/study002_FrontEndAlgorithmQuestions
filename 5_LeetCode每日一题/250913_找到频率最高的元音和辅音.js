/**
 * 给你一个由小写英文字母（'a' 到 'z'）组成的字符串 s。
 * 你的任务是找出出现频率最高的元音（'a'、'e'、'i'、'o'、'u' 中的一个）
 * 和出现频率最高的辅音（除元音以外的所有字母），并返回这两个频率之和。
 * 注意：如果有多个元音或辅音具有相同的最高频率，可以任选其中一个。如果字符串中没有元音或没有辅音，则其频率视为 0。
 * 一个字母 x 的 频率 是它在字符串中出现的次数
 */

var maxFreqSum = function(s) {
    let count1 = 0, count2 = 0;
    let m1 = new Map();
    let m2 = new Map();

    for (const c of s) {
        if ('aeiou'.includes(c)) {
            if (!m1.has(c)) m1.set(c, 0);
            m1.set(c, m1.get(c)+1);
            count1 = Math.max(count1, m1.get(c));
        } else {
            if (!m2.has(c)) m2.set(c, 0);
            m2.set(c, m2.get(c)+1);
            count2 = Math.max(count2, m2.get(c));
        };
    };

    return count1+count2;
};

const s1 = "successes";
console.log(maxFreqSum(s1)); // 6
const s2 = "aeiaeia";
console.log(maxFreqSum(s2)); // 3