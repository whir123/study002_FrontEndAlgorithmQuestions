/**
 * 一个魔法师有许多不同的咒语。
 * 给你一个数组 power ，其中每个元素表示一个咒语的伤害值，可能会有多个咒语有相同的伤害值。
 * 已知魔法师使用伤害值为 power[i] 的咒语时，他们就不能使用
 * 伤害为 power[i] - 2 ，power[i] - 1 ，power[i] + 1 或者 power[i] + 2 的咒语。
 * 每个咒语最多只能被使用一次 。
 * 请你返回这个魔法师可以达到的伤害值之和的最大值 。
 */

var maximumTotalDamage = function(power) {
    let powerMax = 0;
    let powerMap = new Map();
    for (const p of power) {
        if (!powerMap.has(p)) powerMap.set(p,0);
        powerMap.set(p, powerMap.get(p)+p);
    };
    const keys = Array.from(powerMap.keys()).sort((a,b)=>a-b);

    // 状态转移：如果当前伤害值与前一个伤害值差距大于2，则可以选当前和前一个的最大值。
    // 否则只能选当前和更前面的最大值，跳过冲突区间
    let dp = Array(keys.length).fill(0);
    dp[0] = powerMap.get(keys[0]);
    for (let i=1; i<keys.length; i++) {
        const powerCur = powerMap.get(keys[i]);
        let j = i-1;
        while (j>=0 && keys[i]-keys[j]<=2) j--;
        if (j>=0) {
            dp[i] = Math.max(dp[i-1], dp[j]+powerCur);
        } else {
            dp[i] = Math.max(dp[i-1], powerCur);
        };
    };
    return dp[keys.length-1];
};

const power1 = [1,1,3,4];
console.log(maximumTotalDamage(power1));
// 输出：6
// 解释：可以使用咒语 0，1，3，伤害值分别为 1，1，4，总伤害值为 6

const power2 = [7,1,6,6]
console.log(maximumTotalDamage(power2));
// 输出：13