/**
 * 给定一个异步函数数组 functions，返回一个新的 promise 对象 promise。
 * 数组中的每个函数都不接受参数并返回一个 promise。所有的 promise 都应该并行执行。
 * promise resolve 条件：
 * 当所有从 functions 返回的 promise 都成功的并行解析时。
 * promise 的解析值应该是一个按照它们在 functions 中的顺序排列的 promise 的解析值数组。
 * promise 应该在数组中的所有异步函数并行执行完成时解析。
 * promise reject 条件：
 * 当任何从 functions 返回的 promise 被拒绝时。promise 也会被拒绝，并返回第一个拒绝的原因。
 * 请在不使用内置的 Promise.all 函数的情况下解决。
 */

var promiseAll = function(functions) {
    return new Promise((res, rej)=>{
        const results = [];
        let finished = false;
        // ⚠️ 用一个计数器 resolvedCount 判断所有 resolve 时机，只要等于函数总数全部成功即可 resolve
        let count = 0;

        const n = functions.length;
        if(n===0){return res([])};

        functions.forEach((fn,i)=>{
            fn().then((val)=>{
                // ⚠️ 要保证返回数组与原顺序一致，必须用 results[i] = val 记录每个 Promise 的返回值，而不能用 push
                results[i] = val;
                count ++;
                if(count===n && !finished){
                    finished = true;
                    res(results);
                }
            }).catch((err)=>{
                if(!finished){
                    finished = true;
                    rej(err);
                }
            })
        })
    });
};

const functions1 = [
    () => new Promise(resolve => setTimeout(() => resolve(5), 200))
];
promiseAll(functions1).then(console.log); 
// => [5] （200ms 后输出）
// {"t": 200, "resolved": [5]} | 单个函数在 200 毫秒后以值 5 成功解析

const functions2 = [
    () => new Promise(resolve => setTimeout(() => resolve(1), 500)), 
    () => new Promise((resolve, reject) => setTimeout(() => reject("Error"), 300))
];
promiseAll(functions2).then(console.log).catch(console.error);
// => "Error" （300ms 时立刻报错）
// {"t": 300, "rejected": "Error"} | 由于其中一个 promise 被拒绝，返回的 promise 也在同一时间被拒绝并返回相同的错误

const functions3 = [
    () => new Promise(resolve => setTimeout(() => resolve("A"), 500)),
    () => new Promise(resolve => setTimeout(() => resolve("B"), 600)),
    () => new Promise(resolve => setTimeout(() => resolve("C"), 700))
];
promiseAll(functions3).then(console.log);
// => ["A", "B", "C"] （700ms 后输出，顺序按输入）