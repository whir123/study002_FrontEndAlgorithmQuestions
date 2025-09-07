/**
 * 给定一个函数 fn ，它返回一个新的函数，返回的函数与原始函数完全相同，只不过它确保 fn 最多被调用一次。
 * 第一次调用返回的函数时，它应该返回与 fn 相同的结果。
 * 第一次后的每次调用，它应该返回 undefined 。
 */

function once(fn){
    let flag = 1;
    return function (...args){
        if(flag === 1){
            flag = 0;
            return fn(...args);
        } else {
            return undefined;
        };
    };
};

// ⭐️ 用 null 覆盖掉原函数
// 这样不用额外的 flag，也避免了闭包里保存没必要的状态。
function onceBetter(fn) {
    return function (...args) {
        if (fn === null) return undefined; 
        const result = fn(...args);  
        fn = null; // ⚠️ 覆盖掉，释放引用
        return result;
    };
}

// 示例 1：
fn1 = (a,b,c) => (a + b + c);
const onceFn1 = once(fn1);
console.log(onceFn1(1, 2, 3)); // 6
console.log(onceFn1(2, 3, 6)); // undefined, fn 没有被调用

// 示例 2：
fn2 = (a,b,c) => (a * b * c);
const onceFn2 = once(fn2);
console.log(onceFn2(5, 7, 4)); // 140
console.log(onceFn2(2, 3, 6)); // undefined, fn 没有被调用
console.log(onceFn2(4, 6, 8)); // undefined, fn 没有被调用 