/**
 * 车上最初：num 个空座位 车只能向东行驶
 * 给定 整数num + 数组trips
 * trips[i]=[numPassengersi, fromi, toi] 表示
 * 第i次旅行有numPassengersi乘客 接他们和放他们的位置分别是fromi toi
 * 这些位置是从汽车初始位置向东的公里数
 * 当且仅当 可以在所有给定的行程中接送所有乘客 返回true 否则返回false
 */

// ⭐️ 力扣 1094 原题
function carPooling(trips, num) {
    const diff = new Map();

    for (const [np, fi, ti] of trips) {
        diff.set(fi, (diff.get(fi) || 0) + np);  // 上车
        diff.set(ti, (diff.get(ti) || 0) - np);  // 下车
    }

    let cur = 0;
    const keys = Array.from(diff.keys()).sort((a, b) => a - b); // ⚠️
    console.log(diff, keys); // Map(4) { 1 => 2, 5 => -2, 3 => 3, 7 => -3 } [ 1, 3, 5, 7 ]
    // diff.keys()：返回 Map 的所有键的 iterator
    // Array.from(...)：把 iterator 转成数组
    // .sort((a, b) => a - b)：用自定义比较函数按升序排列数组元素

    for (const k of keys) {
        cur += diff.get(k);
        if (cur > num) return false;
    }

    return true;
};

const trips1 = [[2,1,5],[3,3,7]], num1 = 4;
console.log(carPooling(trips1, num1));
// 输出：false

const trips2 = [[2,1,5],[3,3,7]], num2 = 5;
console.log(carPooling(trips2, num2));
// 输出：true