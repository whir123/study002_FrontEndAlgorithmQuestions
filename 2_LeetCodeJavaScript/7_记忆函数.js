//请你编写一个函数 fn，它接收【另一个函数作为输入】，并返回该函数的【记忆化】后的结果
//【记忆函数】是一个对于相同的输入永远不会被调用两次的函数。相反，它将返回一个缓存值
//你可以假设有 3 个可能的输入函数：sum 、fib 和 factorial
    //sum 接收两个整型参数 a 和 b ，并返回 a + b 。假设如果参数 (b, a) 已经缓存了值，其中 a != b，它不能用于参数 (a, b)
    //例如，如果参数是 (3, 2) 和 (2, 3)，则应进行两个单独的调用
    //fib 接收一个整型参数 n ，如果 n <= 1 则返回 1，否则返回 fib (n - 1) + fib (n - 2)
    //factorial 接收一个整型参数 n ，如果 n <= 1 则返回  1 ，否则返回 factorial(n - 1) * n 

//【记忆化是一种优化技术，它通过缓存函数的结果来避免对相同输入的重复计算】
//【它接收另一个函数作为输入，并返回该函数的记忆化版本】
//【记忆化函数对于相同的输入永远不会被调用两次，而是直接返回缓存的结果】
function memoize(fn) {
    let memMap = new Map();//使用Map作为缓存
    return function(...args) {//fn的参数被收集到args数组中
        const key = JSON.stringify(args);//唯一键
        if(memMap.has(key)){return memMap.get(key);}
        else {
            let result = fn(...args);
            memMap.set(key, result);
            return result;
        }
    }
};

let callCount = 0;
const memoizedFn = memoize(function (a, b) {
    callCount += 1;//记录函数实际运行了几次
    return a + b;
})
console.log(memoizedFn(2, 3)) // 5
console.log(memoizedFn(2, 3)) // 5
console.log(callCount) // 1 