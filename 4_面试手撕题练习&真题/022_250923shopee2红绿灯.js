// 需要结合 Promise 或 async/await
// 红灯3s 绿灯1s 黄灯2s

const sleep = (ms) => {
    return new Promise (resolve => setTimeout(resolve, ms));
};

async function light(){
    let count = 0, cycle = 10;
    while (count<cycle) {
        console.log('🔴 红灯');
        await sleep(3000);

        console.log('🟢 绿灯');
        await sleep(1000);

        console.log('🟡 黄灯');
        await sleep(2000);

        count++;
    };
};
light();

// ⚠️ ⚠️ ⚠️
// async 用来修饰函数 声明它是一个异步函数
// 异步函数返回值永远是一个 Promise （普通值会被Promise.reslove包装）
// await 只能在 async 函数里用 
// 等待Promise完成 暂停async函数的执行 【 等待过程中 JS线程不会阻塞 事件循环继续跑 】

// 没有async 等价于 Promise.then 链
function light2(){
    function run() {
        return Promise.resolve()
        .then(()=>{
            console.log('🔴 红灯2');
            return sleep(3000);
        })
        .then(()=>{
            console.log('🟢 绿灯2');
            return sleep(1000);
        })
        .then(()=>{
            console.log('🟡 黄灯2');
            return sleep(2000);
        })
        .then(run); // 循环
    };
    run();
};
light2();