/**
 * 请你写一个函数 createCounter。
 * 这个函数接收一个初始的整数值 init。并返回一个包含三个函数的对象。
 * 这三个函数是：
 * increment() 将当前值加 1 并返回。
 * decrement() 将当前值减 1 并返回。
 * reset() 将当前值设置为 init 并返回。
 */

var createCounter = function(init) {
    let cur = init; // 保存当前值
    return {
        increment: function(){ // 不能输入值
            return ++cur; // 先加再返回
        },
        decrement: function(){
            return --cur;
        },
        reset: function(){
            cur = init;
            return cur;
        },
        // 可以改成箭头函数 箭头函数没有自己的this 但这个例子中不需要this
    };
}; // 使用闭包来维护 cur 状态 所有操作都基于这个变量

const counter = createCounter(5)
console.log(counter.increment()); // 6
console.log(counter.reset()); // 5
console.log(counter.decrement()); // 4
console.log(counter.cur); // undefined (无法直接访问)

//【闭包】回顾：
// 1 访问外部作用域：内部函数可以访问外部函数的变量
// 2 保持变量存活：即使外部函数已经执行完毕，内部函数仍然可以访问外部函数的变量

//（1）基本闭包
function outer() {
    let num = 0;
    function inner(){
        num++;
        return num; // 内部函数 访问 外部函数 变量
    };
    return inner; // 返回内部函数（不加括号）
};
const count = outer(); // 只调用outer()一次 创建一个闭包环境
console.log(count());
console.log(count());
console.log(count()); // 操作同一个num

//（2）循环中的闭包问题
// 有问题的代码
for (var i=0; i<5; i++){ // 「var」没有块级作用域 只有函数作用域
    setTimeout(function(){
        console.log(i); // 全部都输出5
    },20);    
};
// 使用闭包修复
for (var i=0; i<5; i++){
    (function(j){
        setTimeout(function(){
            console.log(j)
        },20)
    })(i);
};
// 更简单的：不用var 而用let