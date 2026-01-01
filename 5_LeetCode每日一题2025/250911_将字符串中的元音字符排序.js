/**
 * 给你一个下标从 0 开始的字符串 s ，将 s 中的元素重新排列得到新的字符串 t ，它满足：
 * 所有辅音字母都在原来的位置上。
 * 更正式的，如果满足 0 <= i < s.length 的下标 i 处的 s[i] 是个辅音字母，那么 t[i] = s[i] 。
 * 元音字母都必须以他们的 ASCII 值按非递减顺序排列。
 * 更正式的，对于满足 0 <= i < j < s.length 的下标 i 和 j  ，
 * 如果 s[i] 和 s[j] 都是元音字母，那么 t[i] 的 ASCII 值不能大于 t[j] 的 ASCII 值。
 * 请你返回结果字母串。
 * 元音字母为 'a' ，'e' ，'i' ，'o' 和 'u' ，它们可能是小写字母也可能是大写字母，辅音字母是除了这 5 个字母以外的所有字母。
 */

var sortVowels = function(s) {
    const n = s.length;
    sArr = s.split('');
    const isVowel = char => 'aeiouAEIOU'.includes(char);
    const idx = [], cont = [];

    for (let i=0; i<n; i++) {
        if(isVowel(s[i])){
            idx.push(i);
            cont.push(s[i]);
        };
    };

    //⚠️ String 的 charCodeAt(index) 方法返回一个整数，表示给定索引处的 UTF-16 码元
    cont.sort((a,b) => a.charCodeAt(0)-b.charCodeAt(0));
    for (let k=0; k<idx.length; k++) {
        sArr[idx[k]] = cont[k];
    };
    return sArr.join('');
};

const s1 = "lEetcOde";
console.log(sortVowels(s1));
// "lEOtcede"

const s2 = "lYmpH"
console.log(sortVowels(s2));
// "lYmpH"