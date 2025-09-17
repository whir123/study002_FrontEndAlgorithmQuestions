class MyPromise {
    constructor (fn) {
        this.state = 'pending';

        this.value = undefined;
        this.reason = undefined;

        this.fulfilledCB = [];
        this.rejectedCB = [];

        const resolve = (value) => {
            if (this.state!=='pending') return;
            this.state = 'fulfilled';
            this.value = value;

            //在 resolve/reject 的 setTimeout 回调 catch 到异常时，直接抛出或全局捕获，不再调用 reject
            setTimeout(()=>{
                try {
                    this.fulfilledCB.forEach(a => a(this.value));
                } catch (e) {
                    throw e;
                };
            }, 0);
        };

        const reject = (reason) => {
            if (this.state!=='pending') return;
            this.state = 'rejected';
            this.reason = reason;
            setTimeout(()=>{
                try {
                    this.rejectedCB.forEach(a => a(this.reason));
                } catch (e) {
                    throw e;
                };
            }, 0);
        };

        //⭐️ 执行传入函数
        try {
            fn(resolve, reject);
        } catch (e) {
            reject(e);
        };
    };

    /**
     * then 在 pending 状态下的作用：
     * Promise 的 then 方法无论当前状态如何都可以被调用。
     * 如果 Promise 还在 pending（即异步操作还没完成），then 注册的回调会被暂存，等状态变为 fulfilled/rejected 后再异步执行。
     */
    then(onFulfilled, onRejected){
        onFulfilled = typeof onFulfilled==='function' ? onFulfilled : val=>val;
        onRejected = typeof onRejected==='function' ? onRejected : rea=>{throw rea};

        return new MyPromise((res, rej)=>{
            if (this.state==='pending'){
                this.fulfilledCB.push((val)=>{
                    try {
                        res(onFulfilled(val));
                    } catch (e) {
                        rej(e);
                    };
                });
                this.rejectedCB.push((rea)=>{
                    try {
                        rej(onRejected(rea));
                    } catch (e) {
                        rej(e);
                    };
                });
            } else if (this.state==='fulfilled') {
                setTimeout (()=>onFulfilled(this.value), 0);
            } else if (this.state==='rejected') {
                setTimeout (()=>onRejected(this.reason), 0);
            }
        });
    };

    catch(onRejected){
        return this.then(null, onRejected);
    };
}