// 请你编写一个生成器函数，并返回一个可以生成斐波那契数列的生成器对象。
// 斐波那契数列 的递推公式为 Xn = Xn-1 + Xn-2 。
// 这个数列的前几个数字是 0, 1, 1, 2, 3, 5, 8, 13 。

//【function*】【生成器函数】
//可以暂停和恢复执行 允许逐步产生(yield)多个值 而不是一次性返回所有结果
var fibGenerator = function*() {
    let x0=0, x1=1;
    while(true) {
        yield x0;//用于暂停函数执行并返回一个值 下次调用 next() 时从暂停处继续执行
        let y = x0+x1;
        x0 = x1;
        x1 = y;
    }
};

const gen = fibGenerator();
console.log(gen.next().value); // 0
console.log(gen.next().value); // 1