// ⭐️ 固定某个函数的一些参数 得到该函数剩余参数的一个新函数
function fn (x, y, z, w) {
    return x + y + z + w;
};

// ⭐️ 手写实现 curry
// 【如果参数一直没达到length 返回新函数】
// 【如果达到了 直接计算结果】
function curry (fn, ...args1) {
    return function curried(...args2) {
        const allArgs = [...args1, ...args2];
        if (allArgs.length >= fn.length){
            return fn(...allArgs);
        } else {
            return curry(fn, ...allArgs);
        };
    };
};

let f = curry(fn);
let g = curry(f, 2); //传入fn的第1个参数:2 固定住；
console.log(g(3, 4, 2)); // 11
console.log(g(1, 1, 2)); // 6

let h = curry(g, 3, 7); //共传入了3个参数:2 3 7 固定住；
console.log(h(9)); // 21
console.log(h(5)); // 17