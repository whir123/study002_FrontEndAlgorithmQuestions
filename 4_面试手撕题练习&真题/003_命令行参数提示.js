/**
 * 在使用命令行工具时，经常出现手工输错字母情况
 * 需要从支持的子命令列表中找到最相似的子命令提示给用户
 * 最相似定义：最短莱文斯坦距离：两个字符串之间 一个转成另一个所需的最少编辑操作次数
 * （ 1替换 2插入 3删除 ）
 * 
 * 【输入】可提示的最短距离D (子命令数量N arr.length) 子命令列表arr 用户输入的子命令command
 */

function reminder(D, arr, command){
    const n = command.length;
    const res = [];

    // 函数签名
    /**
     * 计算两个字符串的莱文斯坦距离
     * @param {string} a 
     * @param {string} b 
     * @returns {number} 编辑距离
    */
    function lev(a, b){
        const m = a.length;
        const n = b.length;
        // ⚠️ dp[i][j] 表示 a[0..i) 和 b[0..j) 的编辑距离 [⚠️ 最后一位分别是：a[i-1] b[j-1]]
        const dp = Array.from({length:m+1}, ()=>new Array(n+1).fill(0)); // ⚠️ 如有花括号记得return
        for(let i=0; i<=m; i++){dp[i][0] = i}; // 删到空需要的步骤 删除i次
        for(let j=0; j<=n; j++){dp[0][j] = j}; // 增加j次
        // ⚠️ 状态转移方程
        for(let i=1; i<=m; i++){
            for(let j=1; j<=n; j++){
                if(a[i-1]===b[j-1]){
                    dp[i][j] = dp[i-1][j-1];
                } else {
                    dp[i][j] = Math.min(
                        dp[i-1][j-1]+1, //替换
                        dp[i-1][j]+1,   //删除
                        dp[i][j-1]+1    //添加
                    );
                };
            };
        };
        return dp[m][n];
    };

    for(const a of arr){
        let distance = lev(command, a);
        if(distance<=D){
            res.push(a);
        };
    };
    return res;
};

console.log(reminder(2, ["commit", "checkout", "clone", "init"], "conmit"));
// => ["commit"]

console.log(reminder(1, ["start", "status", "stash"], "statr"));
// => []

console.log(reminder(2, ["pull", "push", "publish"], "puhl"));
// => ["pull", "push"]
