/**
 * 给你一个字符串 s 、一个字符串 t 。
 * 返回 s 中涵盖 t 所有字符的最小子串。
 * 如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。
 */

var minWindow = function(s, t) {
    let tMap = new Map();
    for (const c of t) {
        tMap.set(c, (tMap.get(c)||0)+1);
    };
    let minL = Infinity; // 最小长度
    let res = ""; // 结果
    let req = tMap.size; // 需要的验证的字符种类数
    let sat = 0; // 窗口中已满足的种类

    let left = 0, right = 0, winMap = new Map();
    while (right<s.length) {
        let char = s[right];

        if (tMap.has(char)) {
            winMap.set(char, (winMap.get(char)||0)+1);
            if (winMap.get(char)===tMap.get(char)) sat++;
        };

        while (left<=right && sat===req) {
            const curL = right-left+1;
            if (curL < minL) {
                minL = curL;
                res = s.slice(left,right+1);
            };

            const char = s[left];
            if (tMap.has(char)) {
                winMap.set(char, winMap.get(char)-1);
                if (winMap.get(char)<tMap.get(char)) sat--;
            };
            left++;
        };

        right++;
    };

    return res;
};

const s1 = "ADOBECODEBANC", t1 = "ABC";
console.log(minWindow(s1, t1));
// 输出："BANC"
// 解释：最小覆盖子串 "BANC" 包含来自字符串 t 的 'A'、'B' 和 'C'。

const s2 = "a", t2 = "a";
console.log(minWindow(s2, t2));
// 输出："a"
// 解释：整个字符串 s 是最小覆盖子串。