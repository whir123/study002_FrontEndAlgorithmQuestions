/**
 * 长度为n字符串s，仅由小写字母组成 ，下标从1开始，可以对字符串执行以下操作任意次：
 * - 选择一个下标i，将si修改成任意小写字母
 * 至少需要多少次操作，才能让字符串出现子串：
 * "abcdefghijklmnopqrstuvwxyz"
 */

function minChange(s){
    const target = "abcdefghijklmnopqrstuvwxyz";
    const n = s.length;
    if (n < 26) return -1;

    let minOps = Infinity;
    for (let i=0; i+26<=n; i++) {
        let diff = 0;
        for (let j=0; j<26; j++) {
            if (s[i+j] !== target[j]) diff++;
        };
        minOps = Math.min(minOps, diff);
    }
    return minOps;
};

console.log(minChange('abcxyzabcdefghijklmnopqrstuvw'));
console.log(minChange('abcdefghijklmnopqrstuvwxyza'));