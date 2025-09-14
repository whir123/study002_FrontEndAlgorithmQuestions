/**
 * 给你一个整数数组 citations ，其中 citations[i] 表示研究者的第 i 篇论文被引用的次数。
 * 计算并返回该研究者的 h 指数。
 * 根据维基百科上 h 指数的定义：h 代表“高引用次数” ，
 * 一名科研人员的 h 指数 是指他（她）至少发表了 h 篇论文，
 * 并且 至少 有 h 篇论文被引用次数大于等于 h 。
 * 如果 h 有多种可能的值，h 指数 是其中最大的那个。
 */

var hIndex = function(citations) {
    let hmax = citations.length;
    let h = 0;
    for (let hi=1; hi<=hmax; hi++) {
        let count = 0;
        for (const num of citations) {
            if (num>=hi){
                count++;
            };
        };
        if (count>=hi) h = Math.max(h, hi);
    };
    return h;
};
// ⭐️ 更优解 排序法
// 找到最大的 h，使得有 h 篇论文引用数 >= h
var hIndex2 = function(citations) {
    citations.sort((a,b)=>a-b);
    const n = citations.length;
    for(let i=0; i<n; i++){
        let nums = n-i; // 有 nums 篇论文引用次数大于等于目前的 citations[i]
        if(citations[i]>=nums){
            return n-i;
        };
    };
    return 0;
}

const citations1 = [3,0,6,1,5];
console.log(hIndex(citations1));
console.log(hIndex2(citations1));
// 输出：3 
// 解释：给定数组表示研究者总共有 5 篇论文，每篇论文相应的被引用了 3, 0, 6, 1, 5 次。
// 由于研究者有 3 篇论文每篇 至少 被引用了 3 次，其余两篇论文每篇被引用 不多于 3 次，所以她的 h 指数是 3。

const citations2 = [1,3,1];
console.log(hIndex(citations2));
console.log(hIndex2(citations2));
// 输出：1