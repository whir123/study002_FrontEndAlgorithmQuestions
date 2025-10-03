/**
 * 给你两个整数 numBottles 和 numExchange 。
 * numBottles 代表你最初拥有的满水瓶数量。在一次操作中，你可以执行以下操作之一：
 * 1 喝掉任意数量的满水瓶，使它们变成空水瓶。
 * 2 用 numExchange 个空水瓶交换一个满水瓶。然后，将 numExchange 的值增加 1 。
 * 注意，你不能使用相同的 numExchange 值交换多批空水瓶。
 * 例如，如果 numBottles == 3 并且 numExchange == 1 ，则不能用 3 个空水瓶交换成 3 个满水瓶。
 * 返回你 最多 可以喝到多少瓶水。
 */

var maxBottlesDrunk = function(numBottles, numExchange) {
    let Drunk=0;
    while (numBottles>=numExchange){
        numBottles -= numExchange;
        Drunk += numExchange
        numBottles++;
        numExchange++;
    };
    return Drunk+numBottles;
};

const numBottles1 = 13, numExchange1 = 6;
console.log(maxBottlesDrunk(numBottles1, numExchange1));
// 输出：15

const numBottles2 = 10, numExchange2 = 3;
console.log(maxBottlesDrunk(numBottles2, numExchange2));
// 输出：13