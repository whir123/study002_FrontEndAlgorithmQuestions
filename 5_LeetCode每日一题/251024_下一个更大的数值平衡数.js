/**
 * 如果整数  x 满足：对于每个数位 d ，这个数位恰好在 x 中出现 d 次。
 * 那么整数 x 就是一个 数值平衡数 。
 * 给你一个整数 n ，请你返回严格大于 n 的最小数值平衡数 。
 */

var nextBeautifulNumber = function(n) {
    let num = n+1;
    while (true) {
        let cur = String(num);

        let map = new Map();
        for (const c of cur){
            map.set(c, (map.get(c)||0)+1);
        };

        let find = true;
        for (const [k,v] of map){
            if (k-v===0) continue;
            else find=false;
        };

        if (find) return num;
        num++;
    };
};

//=============================================
console.log(nextBeautifulNumber(1));
// 输出：22
// 22 是一个数值平衡数，因为：数字 2 出现 2 次 
// 这也是严格大于 1 的最小数值平衡数。

console.log(nextBeautifulNumber(1000));
// 输出：1333
// 1333 是一个数值平衡数，因为：数字 1 出现 1 次。数字 3 出现 3 次。 
// 这也是严格大于 1000 的最小数值平衡数。
// 注意，1022 不能作为本输入的答案，因为数字 0 的出现次数超过了 0 。

console.log(nextBeautifulNumber(3000));
// 输出：3133
// 3133 是一个数值平衡数,这也是严格大于 3000 的最小数值平衡数。