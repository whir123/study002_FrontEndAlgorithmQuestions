/**
 * 给你一个字符串 s 以及两个整数 a 和 b 。其中，字符串 s 的长度为偶数，且仅由数字 0 到 9 组成。
 * 你可以在 s 上按任意顺序多次执行下面两个操作之一：
 * 累加：将  a 加到 s 中所有下标为奇数的元素上（下标从 0 开始）。数字一旦超过 9 就会变成 0，如此循环往复。
 * 例如，s = "3456" 且 a = 5，则执行此操作后 s 变成 "3951"。
 * 轮转：将 s 向右轮转 b 位。例如，s = "3456" 且 b = 1，则执行此操作后 s 变成 "6345"。
 * 请你返回在 s 上执行上述操作任意次后可以得到的字典序最小的字符串。
 * 如果两个字符串长度相同，那么字符串 a 字典序比字符串 b 小可以这样定义：
 * 在 a 和 b 出现不同的第一个位置上，字符串 a 中的字符出现在字母表中的时间早于 b 中的对应字符。
 * 例如，"0158” 字典序比 "0190" 小，因为不同的第一个位置是在第三个字符，显然 '5' 出现在 '9' 之前。
 */

// ⭐️
// 由于字符串长度有限，所有可能的状态（字符串）也是有限的。
// 可以用 BFS/DFS 枚举所有可能的字符串状态，记录已访问过的状态，避免死循环。
// 每次从队列中取出一个字符串，分别执行“累加”和“轮转”操作，将新状态加入队列。
// 过程中维护当前遇到的最小字典序字符串。

var findLexSmallestString = function(s, a, b) {
    let visited = new Set();
    let minStr = s;
    let queue = [s];
    visited.add(s);

    while (queue.length) {
        const cur = queue.shift();
        if (cur < minStr) minStr = cur;

        // 累加
        let arr = cur.split('');
        for (let i=1; i<arr.length; i+=2){
            arr[i] = ((+arr[i]+a)%10).toString();
        };
        let addStr = arr.join('');
        if (!visited.has(addStr)){
            visited.add(addStr);
            queue.push(addStr);
        };

        // 轮转
        let rotStr = cur.slice(b) + cur.slice(0,b);
        if (!visited.has(rotStr)){
            visited.add(rotStr);
            queue.push(rotStr);
        };
    };
    return minStr;
};

const s1 = "5525", a1 = 9, b1 = 2;
console.log(findLexSmallestString(s1,a1,b1)); // 输出："2050"
// 解释：执行操作如下：
// 初态："5525"
// 轮转："2555"
// 累加："2454"
// 累加："2353"
// 轮转："5323"
// 累加："5222"
// 累加："5121"
// 轮转："2151"
// 累加："2050"​​​​​
// 无法获得字典序小于 "2050" 的字符串。

const s2 = "74", a2 = 5, b2 = 1;
console.log(findLexSmallestString(s2,a2,b2)); // 输出："24"
// 解释：执行操作如下：
// 初态："74"
// 轮转："47"
// 累加："42"
// 轮转："24"​​​​​
// 无法获得字典序小于 "24" 的字符串。