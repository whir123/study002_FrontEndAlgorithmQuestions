//请你编写一个函数，它接受一个【异步函数 fn】 和一个以毫秒为单位的【时间 t】
//它应根据限时函数返回一个有限时效果的函数。函数 fn 接受提供给限时函数的参数
//限时函数应遵循以下规则：
//如果 fn 在 t 毫秒的时间限制内完成，限时函数应返回结果
//如果 fn 的执行超过时间限制，限时函数应拒绝并返回字符串 "Time Limit Exceeded" 

var timeLimit = function(fn, t) {
    return async function(...args) {
        let timeoutId;
        //创建一个 rejectPromise，t毫秒之后拒绝；
        const rejectPromise = new Promise((_,reject)=>{//_ 是占位符表示[忽略第一个参数] 参数名可以任意
            timeoutId = setTimeout(()=>{
                reject("Time Limit Exceeded");
            }, t);
        });
        //使用 Promise.race，竞争 fnPromise 和 rejectPromise
        //【Promise.race() 是 JavaScript中Promise的一个静态方法，它接收一个 Promise 数组（或可迭代对象），并返回一个新的 Promise
        //这个新 Promise 的状态和结果取决于最先完成（resolve 或 reject）的 Promise】
        //清理计时器 防止内存泄露
        try {
            const result = await Promise.race([fn(...args), rejectPromise]);
            clearTimeout(timeoutId); //如果 fn 先完成，则清理计时器
            return result;
        } catch (err) {
            clearTimeout(timeoutId); // 超时或 fn 抛出错误，清理计时器
            throw err;
        };
    };
};

//示例 1：
const fn1 = async (n) => { 
  await new Promise(res => setTimeout(res, 100)); 
  return n * n; 
}; //输入的异步函数
const t1 = 50; //设定的超时时间
const inputs1 = [5];
//【timeLimit 应该接收函数 fn 和时间 t，返回一个新函数
//需要调用返回的这个新函数】
let limit1 = timeLimit(fn1, t1);
limit1(...inputs1)
.then(res=>console.log(res))
.catch(err=>console.log(err));
//输出结果 Time Limit Exceeded
//提供的函数设置在 100ms 后执行完成，但是设置的超时时间为 50ms，所以在 t=50ms 时拒绝因为达到了超时时间。


//示例 2：
const fn2 = async (n) => { 
  await new Promise(res => setTimeout(res, 100)); 
  return n * n; 
}, t2 = 150, inputs2 = [5];
let limit2 = timeLimit(fn2, t2);
limit2(...inputs2)
.then(res=>console.log(res))
.catch(err=>console.log(err)); 
// 25
//在 t=100ms 时执行 5*5=25 ，没有达到超时时间。

//【延申】
//performance.now()是浏览器和 Node.js 提供的高精度时间测量方法，返回一个以毫秒为单位的时间戳，精度可达微秒（1ms = 1000μs）
    // 比 Date.now() 更精确（Date.now() 精度仅到毫秒）。
    // 单调递增：不受系统时间调整影响（即使用户修改电脑时间，performance.now() 也不会回退）。
    // 相对时间：返回的是从页面加载或 Node.js 进程启动开始的毫秒数（不是 UNIX 时间戳）