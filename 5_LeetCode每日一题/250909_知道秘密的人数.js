/**
 * 在第 1 天，有一个人发现了一个秘密。
 * 给你一个整数 delay ，表示每个人会在发现秘密后的 delay 天之后，
 * 每天给一个新的人分享秘密。同时给你一个整数 forget ，表示每个人在发现秘密 forget 天之后会忘记这个秘密。
 * 一个人不能在忘记秘密那一天及之后的日子里分享秘密。
 * 给你一个整数 n ，请你返回在第 n 天结束时，知道秘密的人数。
 * 由于答案可能会很大，请你将结果对 10^9 + 7 取余 后返回
 */

var peopleAwareOfSecret = function(n, delay, forget) {
    const MOD = 1e9 + 7;
    // ⭐️ dp[i]表示第i天【新增的】知道秘密的人数
    const dp = new Array(n+1).fill(0);
    dp[1] = 1; // 第一天多 1 个人知道
    for (let i=1; i<=n; i++) {
        for (let j=i+delay; j<i+forget&&j<=n; j++) {
            // 第 i 天新增的人会在 i+delay ～ i+forget 天传播
            dp[j] = (dp[i] + dp[j]) % MOD; // ⚠️ 在每次加法时就取模，保证中间值不爆
        };
    };
    let allPeople = 0;
    for (let i=n-forget+1; i<=n; i++) {
        if (i>0) allPeople = (allPeople + dp[i]) % MOD;
    }
    return allPeople % MOD;
};
// ⚠️ 模运算满足加法与乘法的同余性：
// ⚠️ (a+b)modM=((amodM)+(bmodM))modM
// ⚠️ (a×b)modM=((amodM)×(bmodM))modM

const n1 = 6, delay1 = 2, forget1 = 4;
console.log(peopleAwareOfSecret(n1, delay1, forget1));
// 第 1 天：假设第一个人叫 A 。（一个人知道秘密）
// 第 2 天：A 是唯一一个知道秘密的人。（一个人知道秘密）
// 第 3 天：A 把秘密分享给 B 。（两个人知道秘密）
// 第 4 天：A 把秘密分享给一个新的人 C 。（三个人知道秘密）
// 第 5 天：A 忘记了秘密，B 把秘密分享给一个新的人 D 。（三个人知道秘密）
// 第 6 天：B 把秘密分享给 E，C 把秘密分享给 F 。（五个人知道秘密）

const n2 = 4, delay2 = 1, forget2 = 3;
console.log(peopleAwareOfSecret(n2, delay2, forget2));
// 第 1 天：第一个知道秘密的人为 A 。（一个人知道秘密）
// 第 2 天：A 把秘密分享给 B 。（两个人知道秘密）
// 第 3 天：A 和 B 把秘密分享给 2 个新的人 C 和 D 。（四个人知道秘密）
// 第 4 天：A 忘记了秘密，B、C、D 分别分享给 3 个新的人。（六个人知道秘密）

const n3 = 684, delay3 = 18, forget3 = 496;
console.log(peopleAwareOfSecret(n3, delay3, forget3)); // 653668527