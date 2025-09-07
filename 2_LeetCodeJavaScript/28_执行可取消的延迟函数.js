/**
 * 给定一个函数 fn，一个参数数组 args 和一个以毫秒为单位的超时时间 t ，返回一个取消函数 cancelFn 
 * 在 cancelTimeMs 的延迟后，返回的取消函数 cancelFn 将被调用。 setTimeout(cancelFn, cancelTimeMs)
 * 最初，函数 fn 的执行应该延迟 t 毫秒。
 * 如果在 t 毫秒的延迟之前调用了函数 cancelFn，它应该取消 fn 的延迟执行。
 * 否则，如果在指定的延迟 t 内没有调用 cancelFn，则应执行 fn，并使用提供的 args 作为参数。
 */

var cancellable = function(fn, args, t) {
    const timer = setTimeout(()=>{
        fn(...args);
    }, t);

    let flag = false;
    return ()=>{
        if(flag) return; // 幂等
        clearTimeout(timer);
        flag = true;
    }
};

//⚠️【说明】：传入 fn / args / t，我们先安排在 t ms 后执行 fn(...args)。返回一个 cancelFn。只要 在 t 之前调用了它，就取消这次安排；否则到点就执行 fn。
// 之后无论什么时候再调用 cancelFn，都应该是幂等的（不会出错、不会重复影响）。
const fn1 = (x) => x * 5, args1 = [2], t1 = 20;
const cancelFn1 = cancellable(fn1, args1, t1); // ⚠️ 此时 t的计时已经开始！！
const cancelTimeMs1 = 50;
setTimeout(cancelFn1, cancelTimeMs1);
// 取消操作被安排在延迟了 cancelTimeMs（50毫秒）后进行，这发生在 fn(2) 在20毫秒时执行之后。

const fn2 = (x) => x**2, args2 = [2], t2 = 100;
const cancelFn2 = cancellable(fn2, args2, t2);
const cancelTimeMs2 = 50;
setTimeout(cancelFn2, cancelTimeMs2);
// 取消操作被安排在延迟了 cancelTimeMs（50毫秒）后进行，这发生在 fn(2) 在100毫秒时执行之前，导致 fn(2) 从未被调用