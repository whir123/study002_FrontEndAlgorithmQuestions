//给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。
//如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 ""

var minWindow = function(s, t) {
    if(s.length===0||t.length===0){return ''}
    //t中每个字符的出现次数
    let tMap = new Map();
    for (const char of t){
        tMap.set(char,(tMap.get(char)||0)+1);
    };
    const tMapSize = tMap.size;//tMap成员总数【需要的唯一字符数量】
    let left = 0 , right = 0;//两个指针 窗口的左右边界
    let formed = 0;//记录当前窗口中满足t字符频率的字符数量
    //用来记录当前窗口的字符频率
    let windowMap = new Map();
    let minLen = Infinity;//最小窗口
    let minLeft = 0;//最小窗口的left
    //移动right指针 逐步扩展窗口 直到窗口中的字符包含了t的所有字符
    //继续移动right指针 重复上述过程 直到right到达s的末尾
    while(right<s.length){
        let char = s[right];
        windowMap.set(char,(windowMap.get(char)||0)+1);
        if(tMap.has(char) && tMap.get(char)===windowMap.get(char)){
            formed++;
        }
        //formed累加到=tMapSize 开始收缩窗口
        while(left<=right && formed>=tMapSize){//更新一下最小窗口
            if(right-left+1<minLen){
                minLen = right-left+1;
                minLeft = left;
            }
            const leftChar = s[left];
            if(tMap.has(leftChar) && tMap.get(leftChar)===windowMap.get(leftChar)){
                formed--;
            }
            windowMap.set(leftChar,windowMap.get(leftChar)-1);
            left++;
        }
        //继续移动指针right放大窗口
        right++;
    }
    return minLen===Infinity ? "" : s.substr(minLeft,minLen);
};
const s = "ADOBECODEBANC";
const t = "ABC";
const s1 = "A";
const t1 = "A";
const s2 = "A";
const t2 = "AA";
console.log(minWindow(s,t));//"BANC"
console.log(minWindow(s1,t1));//"A"
console.log(minWindow(s2,t2));//""