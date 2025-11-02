/**
 * n道单项选择题 每道题答案只能是ABCD其中之一
 * 初始答题卡上有：长度为4n 全部是0的字符串s
 * 计算出了第i题的答案：需要在s的第 4(i-1)+1 ~ 4i 这四个字符间选择一个变成1
 * 传入s,t 分别表示做完所有题目后的答题卡和标准答案 返回一个整数表示作答正确选择题的个数
 */

function answerSheet( s ,  t ) {
    let res = 0;
    for (let i=0; i<t.length; i++){
        let seg = s.slice(i*4, i*4+4);
        if (seg==='1000' && t[i]==='A') res++;
        if (seg==='0100' && t[i]==='B') res++;
        if (seg==='0010' && t[i]==='C') res++;
        if (seg==='0001' && t[i]==='D') res++;
    };
    return res;
}
console.log(answerSheet('100001000101','ABC')); // 2