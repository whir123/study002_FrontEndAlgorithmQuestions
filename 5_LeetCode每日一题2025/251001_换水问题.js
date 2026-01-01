/**
 * 超市正在促销，你可以用 numExchange 个空水瓶从超市兑换一瓶水。
 * 最开始，你一共购入了 numBottles 瓶水。
 * 如果喝掉了水瓶中的水，那么水瓶就会变成空的。
 * 给你两个整数 numBottles 和 numExchange ，返回你最多可以喝到多少瓶水。
 */

var numWaterBottles = function(numBottles, numExchange) {
    let res = 0;
    while (numBottles>=numExchange) {
        let newBottles = Math.floor(numBottles/numExchange)
        res += newBottles*numExchange;
        numBottles = numBottles-newBottles*numExchange+newBottles;
    };
    return res+numBottles;
};

const numBottles1 = 9, numExchange1 = 3;
console.log(numWaterBottles(numBottles1, numExchange1));
// 输出：13
// 解释：你可以用 3 个空瓶兑换 1 瓶水。所以最多能喝到 9 + 3 + 1 = 13 瓶水。

const numBottles2 = 15, numExchange2 = 4;
console.log(numWaterBottles(numBottles2, numExchange2));
// 输出：19
// 解释：你可以用 4 个空瓶兑换 1 瓶水。所以最多能喝到 15 + 3 + 1 = 19 瓶水。