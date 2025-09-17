class MyPromise {
  constructor(fn) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilled = [];
    this.onRejected = [];

    const resolve = (val) => {
      queueMicrotask(() => {
        if (this.state !== 'pending') return;
        this.state = 'fulfilled';
        this.value = val;
        this.onFulfilled.forEach(cb => cb(val));
      });
    };

    const reject = (rea) => {
      queueMicrotask(() => {
        if (this.state !== 'pending') return;
        this.state = 'rejected';
        this.reason = rea;
        this.onRejected.forEach(cb => cb(rea));
      });
    };

    try {
      fn(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const fulfilledTask = (val) => {
        try {
          let x = onFulfilled ? onFulfilled(val) : val;
          resolvePromise(x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      };
      const rejectedTask = (rea) => {
        try {
          let x = onRejected ? onRejected(rea) : rea;
          resolvePromise(x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      };
      if (this.state === 'fulfilled') fulfilledTask(this.value);
      else if (this.state === 'rejected') rejectedTask(this.reason);
      else {
        this.onFulfilled.push(fulfilledTask);
        this.onRejected.push(rejectedTask);
      }
    });
  }
}

function resolvePromise(x, resolve, reject) {
  if (x instanceof MyPromise) {
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
}
