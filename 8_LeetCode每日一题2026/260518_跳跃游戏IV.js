/**
 * 难度：🔴
 * 
 * 给你一个整数数组 arr ，你一开始在数组的第一个元素处（下标为 0）。
 * 每一步，你可以从下标 i 跳到下标 i + 1 、i - 1 或者 j ：
 * i + 1 需满足：i + 1 < arr.length
 * i - 1 需满足：i - 1 >= 0
 * j 需满足：arr[i] == arr[j] 且 i != j
 * ⚠️：【左跳】【右跳】【相同值瞬移】
 * 请你返回到达数组最后一个元素的下标处所需的最少操作次数 。
 * 注意：任何时候你都不能跳到数组外面。
 */

var minJumps = function(arr) { // ⚠️ 用BFS（广度优先搜索）
    const n = arr.length;
    if (n===1) return 0;

    // 值 -> 相同值的所有下标
    const map = new Map();

    for (let i=0; i<n; i++){
        if(!map.has(arr[i])) map.set(arr[i], []);
        map.get(arr[i]).push(i);
    };

    const queue = [0];
    const visited = new Set([0]); // ⚠️ Set()的参数必须是「可迭代对象（iterable）」
    // const visited = new Set();
    // visited.add(0);

    let steps = 0;

    while(queue.length){
        const size = queue.length;
        for (let k=0; k<size; k++){ // ⚠️ 当前层节点数
            const i = queue.shift();
            if (i === n-1) return steps; // 终点

            const neighbors = []; // ⚠️ 当前节点可到达的邻居节点
            // 左右跳
            neighbors.push(i-1);
            neighbors.push(i+1);
            // 同值跳
            if (map.has(arr[i])) {
                neighbors.push(...map.get(arr[i]));
                map.delete(arr[i]); // ⚠️ 同值节点只访问一次，防止重复遍历导致超时
            };

            for (const next of neighbors){
                if (next>=0 && next<n && !visited.has(next)){
                    visited.add(next);
                    queue.push(next);
                };
            };
        };
        steps++;
    };
};

const arr1 = [100,-23,-23,404,100,23,23,23,3,404];
console.log(minJumps(arr1));
// 输出：3
// 解释：那你需要跳跃 3 次，下标依次为 0 --> 4 --> 3 --> 9 。下标 9 为数组的最后一个元素的下标。

const arr2 = [7];
console.log(minJumps(arr2));
// 输出：0
// 解释：一开始就在最后一个元素处，所以你不需要跳跃。

const arr3 = [7,6,9,6,9,6,9,7];
console.log(minJumps(arr3));
// 输出：1
// 解释：你可以直接从下标 0 处跳到下标 7 处，也就是数组的最后一个元素处。