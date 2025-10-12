/** 
 * 长度为n的01串：s="s1s2s3..."
 * 对于每个位置i：ai为在下标<i的字符中 与si不同的元素个数
 * 输出{a1,a2,a3...}
*/

function outputA(s) {
    if (s.length===0) return [];
    let a = [0];
    let zeroSum = 0, oneSum = 0;
    for (let i=1; i<s.length; i++){
        s[i-1]==='0' ? zeroSum++ : oneSum++;
        s[i]==='0' ? a.push(oneSum) : a.push(zeroSum);
    };
    return a;
};

const s1 = '1101';
console.log(outputA(s1));
const s2 = '01010';
console.log(outputA(s2));
