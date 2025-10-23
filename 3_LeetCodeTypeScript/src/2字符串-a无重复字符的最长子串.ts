//给定一个字符串 s  请你找出其中不含有重复字符的最长子串的长度

function lengthOfLongestSubstring(s: string): number {
    let result = 0;
    let left = 0; // 滑动窗口左指引
    // 储存字符 及其 最新指引
    let charMap = new Map<string,number>(); // < >中 用逗号分隔范型参数

    for(let i=0; i<s.length; i++){
        let cur = s[i];
        if (charMap.has(cur!)) { // 如果这个字符有了 更新左边界（只能右移）
            left = Math.max(charMap.get(cur!)!+1, left);
        };
        charMap.set(cur!,i); // 不论如何 存字符最新索引位
        result = Math.max(result, i-left+1);
    };
    return result;
};

console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("bbb")); // 1
console.log(lengthOfLongestSubstring("dvdf")); // 3
console.log(lengthOfLongestSubstring("tmmzuxt")); // 5