//给定任务数组 [task0, task1, task2] 串行执行异步任务 每个任务返回Promise
//任务按照顺序执行 前一个完成再下一个
//每个任务失败会进行重试 最多retries次 仍失败抛出最后一次错
//返回Promise 所有任务依次结果的数组 ｜ 有任务失败 则抛出该错

async function executeTasks(tasks = [], retries = 0) {
    const result = [];

    //【 执行任务 & 重试 】
    async function run(task, retries){
        let lastErr;
        for(let i=0; i<retries+1; i++){ // ⚠️ 总尝试次数 = 1（首次）+ retries（重试）
            try {
                return await task();
            } catch (e){
                lastErr = e;
                if (i===retries) throw lastErr;
            };
        };
    };

    for(const task of tasks) {
        const res = await run(task, retries); // ⚠️ await 保证“前一个完成再下一个”
        result.push(res);
    };

    return result;
}

//[测试]
const makeTask = (index) => {
    return () => {
        return new Promise((resolve, reject) => {
            return setTimeout(() => {
                return Math.random()>0.7 ? resolve(`task ${index} success`) : reject(new Error(`task ${index} failed`));
            }, 100);
        });
    };
}
const tasks = [makeTask(0), makeTask(1), makeTask(2)];
// ⭐️ executeTasks 是 async function，它返回的就是一个 Promise：
// 【 成功时 】 → return result → 自动转化为 Promise.resolve(result)
// → .then(res => ...) 可以拿到 result。
// 【 失败时 】 → throw err → 自动转化为 Promise.reject(err)
// → .catch(err => ...) 可以拿到错误。
executeTasks(tasks, 2)
    .then(res => console.log(`All done:`, res))
    .catch(err => console.error(`Error:`, err));