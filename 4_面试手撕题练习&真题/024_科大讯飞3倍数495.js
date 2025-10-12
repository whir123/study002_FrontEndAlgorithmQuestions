/**
 * 拿到正整数n 选择n的某几位 依次将每一位数变成0～9中的一个（不允许出现前导0）
 * 要将该数字变成495的倍数 计算最少需要改变的位数 并给出改变后的数
 * 输出：第一行输出需要改变的位数 第二行输出改变后的数
 */

// ⚠️ 性能开销太大
function niceNumber(n) {
    if (n % 495 === 0) return [0, n];
    
    let nStr = String(n);
    let nLen = nStr.length;
    let min = Math.pow(10, nLen - 1);
    let max = Math.pow(10, nLen) - 1;
    
    let start = Math.ceil(min / 495) * 495;
    let nArr = [];
    // 收集所有在范围内的495倍数
    for (let num = start; num <= max; num += 495) { nArr.push(num); }
    
    let change = Infinity; // 改变次数
    let result = 0; // 结果
    
    function changeSum(a, b) {
        let sum = 0;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) sum++;
        }
        return sum;
    };
    for (const num of nArr) {
        let numStr = String(num);
        let changeCur = changeSum(numStr, nStr);
        if (changeCur < change || (changeCur === change && num < result)) {
            change = changeCur;
            result = num;
        }
    };
    return [change, result];
};
// ⚠️ 位动态规划+剪枝
// DFS（Depth-First Search，深度优先搜索）｜ 一条路走到黑 —— 先尽可能往深处探索，走不通了再回头（回溯）
// BFS（广度优先搜索）｜ “按层推进”
function niceNumber2(n) {
    let nStr = String(n);
    let nLen = nStr.length;
    let minChange = Infinity;
    let result = null;

    function dfs(pos, curNum, changeCnt, mod495){
        if (changeCnt>minChange) return; // 剪枝
        if (pos===nLen){
            if (mod495===0 && curNum[0]!=='0'){
                let candidate = Number(curNum.join(''));
                if (changeCnt<minChange || (changeCnt===minChange&&candidate<result)){
                    minChange = changeCnt;
                    result = candidate;
                };
            };
            return;
        };
        // 保留原数
        curNum[pos] = nStr[pos];
        dfs(pos+1, curNum, changeCnt, (mod495*10+Number(nStr[pos]))%495 );
        for (let d=0; d<=9; d++){
            if (d==Number(nStr[pos])) continue; // == d 数字 nStr[pos] 字符串
            if (pos===0&&d===0) continue;
            curNum[pos] = String(d);
            dfs(pos+1, curNum, changeCnt+1, (mod495*10+d)%495);
        };
    };

    dfs(0, Array(nLen), 0, 0);
    return [minChange, result];
}

console.log(niceNumber(195));
console.log(niceNumber(1950));

console.log(niceNumber2(195));
console.log(niceNumber2(1950));