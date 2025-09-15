/**
 * 给定一个字符串 s ，请你找出其中不含有重复字符的最长子串的长度。
 */

var lengthOfLongestSubstring = function(s) {
    const n = s.length;
    let l = 0, maxL = 0, str='';

    for(let r = 0; r<n; r++) {
        while (str.includes(s[r])) {
            l++;
            str = str.slice(1);
            maxL = Math.max(str.length, maxL);
        };

        str += s[r];
        maxL = Math.max(str.length, maxL);
    };

    return maxL;
};

const s1 = "abcabcbb";
console.log(lengthOfLongestSubstring(s1));
// 输出: 3 

const s2 = "bbbbb";
console.log(lengthOfLongestSubstring(s2));
// 输出: 1