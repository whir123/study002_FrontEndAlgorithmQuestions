/**
 * 定义两个字符串是等价的，当且仅当其中一个串可以通过重新排列这些字符得到另一个串。
 * 例如，abccb 和 cbcba 等价，abba 和 baab 等价。
 * 而 abc 和 aac 不等价，a 和 b 不等价。
 * 现在输入 n 个仅由小写字母组成的字符串 s1,s2,s3... 
 * 需要找到一个长度最长的字符串 t，使得每个串都能找到一个子序列，且该子序列形成的字符串与 t 等价。
 * 如果有多个答案，请输出字典序最小的串。
 * 如果找不到，则输出 −1。
 */

// ⚠️ t 的字符组成，其实就是：所有字符串的公共字符多重集
function findStr(arr){
    let n = arr.length;
    if (n===0) return "-1";
    let arrT = new Array(26).fill(Infinity);

    for(let i=0; i<n; i++){
        let subStr = arr[i];
        let subArrT = new Array(26).fill(0);
        for (const char of subStr){
            subArrT[char.charCodeAt(0)-97]++;
            // ⚠️ String 的 charCodeAt() 方法返回一个整数，表示给定索引处的 UTF-16 码元，其值介于 0 和 65535 之间
        };
        for (let j=0; j<26; j++){
            arrT[j] = Math.min(subArrT[j], arrT[j]);
        };
    };

    let res = "";
    for (let i=0; i<26; i++) {
        if (arrT[i]!==Infinity && arrT[i]>0) {
            res += (String.fromCharCode(97+i).repeat(arrT[i]));
        };
    };

    return res.length===0 ? '-1' : res;
};

const arr = ['aaac', 'ababc', 'accc'];
console.log(findStr(arr));