/**
 * 在给定[单词列表 wordlist]的情况下，我们希望实现一个拼写检查器，将查询单词转换为正确的单词。
 * 对于给定的[查询单词 query]，拼写检查器将会处理两类拼写错误：
 * 1️⃣ 大小写：如果查询匹配单词列表中的某个单词（不区分大小写），则返回的正确单词与单词列表中的大小写相同。
 * 例如：wordlist = ["yellow"], query = "YellOw": correct = "yellow"
 * 例如：wordlist = ["Yellow"], query = "yellow": correct = "Yellow"
 * 例如：wordlist = ["yellow"], query = "yellow": correct = "yellow"
 * 2️⃣ 元音错误：如果在将查询单词中的元音 ('a', 'e', 'i', 'o', 'u')  分别替换为任何元音后，
 * 能与单词列表中的单词匹配（不区分大小写），则返回的正确单词与单词列表中的匹配项大小写相同。
 * 例如：wordlist = ["YellOw"], query = "yollow": correct = "YellOw"
 * 例如：wordlist = ["YellOw"], query = "yeellow": correct = "" （无匹配项）
 * 例如：wordlist = ["YellOw"], query = "yllw": correct = "" （无匹配项）
 * 此外，拼写检查器还按照以下优先级规则操作：
 * 当查询完全匹配单词列表中的某个单词（区分大小写）时，应返回相同的单词。
 * 当查询匹配到大小写问题的单词时，您应该返回单词列表中的第一个这样的匹配项。
 * 当查询匹配到元音错误的单词时，您应该返回单词列表中的第一个这样的匹配项。
 * 如果该查询在单词列表中没有匹配项，则应返回空字符串。
 * 给出一些查询 queries，返回一个单词列表 answer，其中 answer[i] 是由查询 query = queries[i] 得到的正确单词。
 */

var spellchecker = function(wordlist, queries) {
    let rawWordlist = new Set(wordlist);
    let caseWordlist = new Map();
    let vowelWordlist = new Map();

    function changeVowel(word) { // 工具函数 替换元音
        return word.toLowerCase().replace(/[aeiou]/g, '*'); // ⚠️
    };

    for (const word of wordlist) {
        // ⚠️ 对于小写形式相同的单词 只把遇到的第一个存了进去
        let caseWord = word.toLowerCase();
        if(!caseWordlist.has(caseWord)) {
            caseWordlist.set(caseWord, word);
        };
        let vowelWord = changeVowel(word);
        if(!vowelWordlist.has(vowelWord)) {
            vowelWordlist.set(vowelWord, word);
        };
    };

    let answer = [];
    for (const word of queries) {
        if (rawWordlist.has(word)) {
            answer.push(word);
        } else if (caseWordlist.has(word.toLowerCase())) {
            answer.push(caseWordlist.get(word.toLowerCase()));
        } else if (vowelWordlist.has(changeVowel(word))) {
            answer.push(vowelWordlist.get(changeVowel(word)));
        } else {
            answer.push("");
        };
    };
    return answer;
};

const wordlist1 = ["KiTe","kite","hare","Hare"];
const queries1 = ["kite","Kite","KiTe","Hare","HARE","Hear","hear","keti","keet","keto"];
console.log(spellchecker(wordlist1, queries1));
// 输出：["kite","KiTe","KiTe","Hare","hare","","","KiTe","","KiTe"]

const wordlist2 = ["yellow"];
const queries2 = ["YellOw"];
console.log(spellchecker(wordlist2, queries2));
// 输出：["yellow"]