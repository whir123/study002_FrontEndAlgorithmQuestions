//给定一个字符串 s ，请你找出其中不含有重复字符的最长子串的长度

//使用 Set 和双指针实现滑动窗口
var lengthOfLongestSubstring = function(s) {
    let set = new Set();
    let left = 0, right = 0, maxLen = 0;
    while(right<s.length){
        if(!set.has(s[right])){//没有出现过 就放进来
            set.add(s[right]);
            maxLen = Math.max(maxLen, right-left+1);
            right++;
        } else {//有出现过 就删左边的 直到没有了
            set.delete(s[left]);
            left++;
        }
    }
    return maxLen;
};
let s = "abcabcbb";
console.log(lengthOfLongestSubstring(s));//3