//给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序
// 输入: s = "cbaebabacd", p = "abc"
// 输出: [0,6]
// 解释:
// 起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
// 起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。
var findAnagrams = function(s, p) {//暴力解法 时间过长
    let ns = s.length;
    let np = p.length;
    let arrs = s.split('');
    let arrp = p.split('').sort();
    let result = [];
    for(i=0;i<ns-np+1;i++){
        let arrMid = [];
        for(j=i;j<i+np;j++){
            arrMid.push(arrs[j]);
        };
        let arrss = arrMid.sort();
        if (arrss.join('') === arrp.join('')){//===会判断【数组】是否引用的是【同一块内存空间】
            result.push(i);
        };
    }
    return result;
};
//滑动窗口+字符频率计数（哈希表）
    // 先计算目标字符串 p 的字符频率；
    // 使用滑动窗口在 s 上移动，并维护当前窗口内的字符频率；
    // 每次移动时比较两个频率表是否相同，相同就说明是异位词。
function arraysEqual(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

var findAnagrams1 = function(s, p) {
    const ns = s.length, np = p.length;
    if (ns<np) return [];
    let result = [];
    let countP = Array(26).fill(0);//创建两个长度为26的数组（对应26个英文字母），countP记录p中每个字母的出现次数
    let countS = Array(26).fill(0);//countS用于记录当前滑动窗口中s的字母频率
    //获取字符 'a' 的 ASCII 编码（即 97），用于后面把字符转成数组下标：'a' → 0, 'b' → 1 ... 'z' → 25
    //.charCodeAt(0) 获取字符串第 0 个字符（即 'a'）的ASCII编码
    const aCharCode = 'a'.charCodeAt(0);//=97
    //初始化p字符频率
    for(let i=0;i<np;i++){//遍历 p 和 s 的前 np 个字符
        countP[p.charCodeAt(i) - aCharCode]++;//统计 p 中每个字母的频率
        countS[s.charCodeAt(i) - aCharCode]++;//同时统计 s 中前 np 个字符
    }
    //判断初始窗口是否匹配  初始窗口：s[0...np-1]
    if (arraysEqual(countP,countS)) result.push(0);
    //【滑动窗口】：每次移动一个字符
    for(let i=np;i<ns;i++){//窗口总是维持 np 长度，从 s[i-np+1] 到 s[i]
        //从 初始窗口右一位 开始
        countS[s.charCodeAt(i) - aCharCode]++;//新加入窗口的字符频率+1
        countS[s.charCodeAt(i-np) - aCharCode]--;//移出窗口的字符频率-1
        //arraysEqual 比较两个数组内容是否逐项相等；
        if(arraysEqual(countP, countS)) result.push(i-np+1);//当前位置 i-np+1 是异位词子串的起始位置
    }
    return result;
};

let s = "cbaebabacd";
let p = "abc";
console.log(findAnagrams(s, p));
console.log(findAnagrams1(s, p));

let a = [1, 2, 3];
let b = [1, 2, 3];
console.log(a === b);//false //=== 比较的是“引用地址”，不是“内容”