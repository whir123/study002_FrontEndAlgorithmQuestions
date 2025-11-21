/**
 * 给你一个字符串 s ，返回 s 中 长度为 3 的【不同】回文子序列的个数。
 * 即便存在多种方法来构建相同的子序列，但相同的子序列只计数一次。
 * 回文 是正着读和反着读一样的字符串。
 * 子序列 是由原字符串删除其中部分字符（也可以不删除）且不改变剩余字符之间相对顺序形成的一个新字符串。
 * 例如，"ace" 是 "abcde" 的一个子序列。
 */

var countPalindromicSubsequence = function(s) {
    let n = s.length;
    if (n<3) return 0;

    let count = 0;
    for (let ch=0; ch<26; ch++){
        const c = String.fromCharCode(ch+97);
        // String.fromCharCode() 静态方法返回由指定的 ⭐️ UTF-16 码元序列创建的字符串。
        // console.log(String.fromCharCode(189, 43, 190, 61)); ⭐️ // Expected output: "½+¾="
        let L = s.indexOf(c);
        let R = s.lastIndexOf(c);
        if (L>=0 && R>=0 && L<R){
            const mid = new Set();
            for (let i=L+1; i<=R-1; i++){
                mid.add(s[i]);
            };
            count+=mid.size;
        };
    };

    return count;
};

const s1 = "aabca";
console.log(countPalindromicSubsequence(s1));
// 输出：3
// 解释：长度为 3 的 3 个回文子序列分别是：
// - "aba" ("aabca" 的子序列)
// - "aaa" ("aabca" 的子序列)
// - "aca" ("aabca" 的子序列)

const s2 = "adc";
console.log(countPalindromicSubsequence(s2));
// 输出：0
// 解释："adc" 不存在长度为 3 的回文子序列。

const s3 = "bbcbaba";
console.log(countPalindromicSubsequence(s3));
// 输出：4
// 解释：长度为 3 的 4 个回文子序列分别是：
// - "bbb" ("bbcbaba" 的子序列)
// - "bcb" ("bbcbaba" 的子序列)
// - "bab" ("bbcbaba" 的子序列)
// - "aba" ("bbcbaba" 的子序列)

console.log(String.fromCharCode(189, 43, 190, 61)); // ½+¾=