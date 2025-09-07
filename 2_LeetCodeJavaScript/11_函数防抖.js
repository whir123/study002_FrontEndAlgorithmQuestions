//请你编写一个函数，接收参数为【另一个函数】和【一个以毫秒为单位的时间 t 】，并返回该函数的【函数防抖】后的结果
//函数防抖方法是一个函数，它的执行被延迟了 t 毫秒，如果在这个时间窗口内再次调用它，它的执行将被取消。你编写的防抖函数也应该接收传递的参数。
//例如，假设 t = 50ms ，函数分别在 30ms 、 60ms 和 100ms 时调用。前两个函数调用将被取消，第三个函数调用将在 150ms 执行。
//如果改为 t = 35ms ，则第一个调用将被取消，第二个调用将在 95ms 执行，第三个调用将在 135ms 执行。

//【写法1：箭头函数 + apply】
var debounce = function(fn, t) {
    let timeoutId;
    return function(...args) {
        if(timeoutId){clearTimeout(timeoutId)};
        timeoutId = setTimeout(()=>{
            fn.apply(this, args);//// 箭头函数没有自己的 this，直接继承外部的 this
            // fn.call(this, ...args);
        },t);
    }
};
//【写法2：普通函数 + 手动绑定 this】
var debounce2 = function(fn, t) {
    let timeoutId;
    return function(...args) {
        let context = this;
        if(timeoutId){clearTimeout(timeoutId)};
        timeoutId = setTimeout(
            function(){
                fn.apply(context, args);
            },t);
    }
};

const log = debounce(console.log, 100);
log('Hello'); // cancelled
log('Hello'); // cancelled
log('Hello'); // Logged at t=100ms

const log2 = debounce2(console.log, 100);
log2('Hello'); // cancelled
log2('Hello'); // cancelled
log2('Hello'); // Logged at t=100ms