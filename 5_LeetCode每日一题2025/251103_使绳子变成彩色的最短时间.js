/**
 * Alice 把 n 个气球排列在一根绳子上。
 * 给你一个下标从 0 开始的字符串 colors ，其中 colors[i] 是第 i 个气球的颜色。
 * Alice 想要把绳子装扮成五颜六色的 ，且她不希望两个连续的气球涂着相同的颜色，所以她喊来 Bob 帮忙。
 * Bob 可以从绳子上移除一些气球。给你一个下标从 0 开始 的整数数组 neededTime ，其中 neededTime[i] 是 Bob 从绳子上移除第 i 个气球需要的时间（以秒为单位）。
 * 返回 Bob 使绳子变成 五颜六色 需要的 最少时间 。
 */

var minCost = function(colors, neededTime) {
    let res = 0;
    for (let i=1; i<colors.length; i++){
        if (colors[i]===colors[i-1]){
            res += Math.min(neededTime[i], neededTime[i-1]);
            neededTime[i] = Math.max(neededTime[i], neededTime[i-1]);
        };
    };
    return res;
};

const colors1 = "abaac", neededTime1 = [1,2,3,4,5];
console.log(minCost(colors1, neededTime1));
// 输出：3
// 解释：'a' 是蓝色，'b' 是红色且 'c' 是绿色。
// Bob 可以移除下标 2 的蓝色气球。这将花费 3 秒。
// 移除后，不存在两个连续的气球涂着相同的颜色。总时间 = 3 。