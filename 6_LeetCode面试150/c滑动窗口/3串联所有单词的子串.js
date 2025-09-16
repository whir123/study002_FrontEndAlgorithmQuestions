/**
 * 给定一个字符串 s 和一个字符串数组 words。 words 中所有字符串 长度相同。
 * s 中的串联子串是指一个包含 words 中所有字符串以任意顺序排列连接起来的子串。
 * 例如，如果 words = ["ab","cd","ef"]， 那么 "abcdef"， "abefcd"，"cdabef"， "cdefab"，"efabcd"， 和 "efcdab" 都是串联子串
 * "acdbef" 不是串联子串，因为他不是任何 words 排列的连接。
 * 返回所有串联子串在 s 中的开始索引。你可以以任意顺序返回答案
 */

var findSubstring = function(s, words) {
    const sL = s.length;
    const wordL = words[0].length;
    const wordNum = words.length;
    const res = [];

    let wordMap = new Map(); // 存储words中的单词及数量
    for (const word of words) {
        if (!wordMap.has(word)) wordMap.set(word, 0);
        wordMap.set(word, wordMap.get(word)+1);
    };

    for (let i=0; i<wordL; i++) { // ⚠️ 循环数：单个单词的长度
        let left = i, right = i, count = 0;
        let subMap = new Map();

        while (right<sL) {
            let word = s.slice(right, right+wordL);
            right += wordL;
            
            if (wordMap.has(word)) {
                subMap.set(word, (subMap.get(word)||0)+1);
                count++;

                while (subMap.get(word)>wordMap.get(word)) {
                    let leftWord = s.slice(left, left+wordL);
                    left += wordL;
                    subMap.set(leftWord, subMap.get(leftWord)-1);
                    count--;
                };
                
                if (count===wordNum) {
                    res.push(left);
                    let leftWord = s.slice(left, left+wordL);
                    left += wordL;
                    subMap.set(leftWord, subMap.get(leftWord)-1);
                    count--;
                };
            } else {
                subMap.clear();
                left = right;
                count = 0;
            }
        };
    };
    return res;
};

const s1 = "barfoothefoobarman", words1 = ["foo","bar"];
console.log(findSubstring(s1, words1));
// 输出：[0,9]
// 解释：因为 words.length == 2 同时 words[i].length == 3，连接的子字符串的长度必须为 6。
// 子串 "barfoo" 开始位置是 0。它是 words 中以 ["bar","foo"] 顺序排列的连接。
// 子串 "foobar" 开始位置是 9。它是 words 中以 ["foo","bar"] 顺序排列的连接。
// 输出顺序无关紧要。返回 [9,0] 也是可以的。

const s2 = "wordgoodgoodgoodbestword", words2 = ["word","good","best","word"];
console.log(findSubstring(s2, words2));
// 输出：[]
// 解释：因为 words.length == 4 并且 words[i].length == 4，所以串联子串的长度必须为 16。
// s 中没有子串长度为 16 并且等于 words 的任何顺序排列的连接。
// 所以我们返回一个空数组。