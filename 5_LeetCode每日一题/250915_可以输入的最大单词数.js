/**
 * 键盘出现了一些故障，有些字母键无法正常工作。而键盘上所有其他键都能够正常工作。
 * 给你一个由若干单词组成的字符串 text ，单词间由单个空格组成（不含前导和尾随空格）；
 * 另有一个字符串 brokenLetters ，由所有已损坏的不同字母键组成，返回你可以使用此键盘完全输入的 text 中单词的数目。
 */

var canBeTypedWords = function(text, brokenLetters) {
    const textArr = text.split(' ');
    let count = 0;
    for (const word of textArr) {
        count++;
        for (const c of word) {
            if (brokenLetters.includes(c)) {
                count--;
                break;
            };
        };
    };
    return count;
};

const text1 = "hello world", brokenLetters1 = "ad";
console.log(canBeTypedWords(text1, brokenLetters1));
// 输出：1 解释：无法输入 "world" ，因为字母键 'd' 已损坏。

const text2 = "leet code", brokenLetters2 = "lt";
console.log(canBeTypedWords(text2, brokenLetters2));
// 输出：1 解释：无法输入 "leet" ，因为字母键 'l' 和 't' 已损坏。

const text3 = "leet code", brokenLetters3 = "e";
console.log(canBeTypedWords(text3, brokenLetters3));
// 输出：0 解释：无法输入任何单词，因为字母键 'e' 已损坏。
