/**
 * 小红和小明在玩一个字符串元音游戏。
 * 给你一个字符串 s，小红和小明将轮流参与游戏，小红 先 开始：
 * 在小红的回合，她必须移除 s 中包含 奇数 个元音的任意 非空 子字符串。
 * 在小明的回合，他必须移除 s 中包含 偶数 个元音的任意 非空 子字符串。
 * 第一个无法在其回合内进行移除操作的玩家输掉游戏。假设小红和小明都采取 最优策略 。
 * 如果小红赢得游戏，返回 true，否则返回 false。
 * 英文元音字母包括：a, e, i, o, 和 u。
*/

var doesAliceWin2 = function(s) {
    // ⭐️ 最简思路：
    // 如果字符串没有任何元音，小红（Alice）必输（返回 false）。
    // 如果字符串至少有一个元音，小红（Alice）必胜（返回 true）。
    // ⭐️⭐️ 可以直接：return /[aeiou]/.test(s);
    const vowel = 'aeiou';
    let flag = false;
    for(const c of s){
        if (vowel.includes(c)) flag = true;
    };
    return flag;
};

var doesAliceWin = function(s) {
    const vowel = new Set(['a','e','i','o','u']);
    const memo = new Map();

    function canWin(str, isHong) { // 输入：目前字符串 + 是否是小红回合
        let key = str+'#'+isHong;
        if(memo.has(key)) return memo.get(key);
        for(let i=0; i<str.length; i++){
            let count = 0;
            for(let j=i; j<str.length; j++){
                if(vowel.has(str[j])) count++;
                if((count%2===1&&isHong)||(count%2===0&&!isHong)){
                    const next = str.slice(0,i)+str.slice(j+1); // 移除str[i...j]
                    if(!canWin(next, !isHong)){
                        memo.set(key, true); // ⭐️
                        return true;
                    };
                };
            };
        };
        memo.set(key, false);
        return false;
    };

    return canWin(s, true);
}


const s1 = "leetcoder";
console.log(doesAliceWin(s1));
console.log(doesAliceWin2(s1));
// 输出： true
// 解释：
// 小红可以执行如下移除操作来赢得游戏：
// 小红先手，她可以移除加下划线的子字符串 s = "[leetco]der"，其中包含 3 个元音。结果字符串为 s = "der"。
// 小明接着，他可以移除加下划线的子字符串 s = "[d]er"，其中包含 0 个元音。结果字符串为 s = "er"。
// 小红再次操作，她可以移除整个字符串 s = "er"，其中包含 1 个元音。
// 又轮到小明，由于字符串为空，无法执行移除操作，因此小红赢得游戏。

const s2 = "bbcd";
console.log(doesAliceWin(s2));
console.log(doesAliceWin2(s2));
// 输出： false
// 解释：
// 小红在她的第一回合无法执行移除操作，因此小红输掉了游戏。