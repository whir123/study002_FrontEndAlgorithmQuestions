/**
 * 银行内部的防盗安全装置已经激活。给你一个下标从 0 开始的二进制字符串数组 bank ，表示银行的平面图，这是一个大小为 m x n 的二维矩阵。 
 * bank[i] 表示第 i 行的设备分布，由若干 '0' 和若干 '1' 组成。'0' 表示单元格是空的，而 '1' 表示单元格有一个安全设备。
 * 对任意两个安全设备而言，如果同时 满足下面两个条件，则二者之间存在 一个 激光束：
 * - 两个设备位于两个不同行 ：r1 和 r2 ，其中 r1 < r2 。
 * - 满足 r1 < i < r2 的所有行 i ，都没有安全设备 。
 * 激光束是独立的，也就是说，一个激光束既不会干扰另一个激光束，也不会与另一个激光束合并成一束。
 * 返回银行中激光束的总数量。
 */

var numberOfBeams = function(bank) {
    let resArr = [];
    for (const bk of bank) {
        let cur = 0;
        for (const char of bk){
            if (char==='1') cur++;
        };
        if (cur!==0) resArr.push(cur);
    };

    if (resArr.length===0||resArr.length===1) return 0;
    let res = 0;
    for (let i=1; i<resArr.length; i++){
        res += resArr[i]*resArr[i-1];
    };
    return res;
};

var numberOfBeams2 = function(bank) {
    let prev = 0, res = 0;
    for (const row of bank) {
        const cnt = row.split('1').length-1; // ⚠️ 统计'1'的数量
        if (cnt===0) continue;
        res += prev*cnt;
        prev = cnt;
    };
    return res;
};

const bank1 = ["011001","000000","010100","001000"];
console.log(numberOfBeams(bank1)); // 8
console.log(numberOfBeams2(bank1)); // 8

const bank2 = ["000","111","000"];
console.log(numberOfBeams(bank2)); // 0
console.log(numberOfBeams2(bank2)); // 0
// 解释：不存在两个位于不同行的设备