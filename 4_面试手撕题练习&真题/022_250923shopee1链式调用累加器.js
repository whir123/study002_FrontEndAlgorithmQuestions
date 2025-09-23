function sum (...args) {
    let curSum = args.reduce((a,c)=>a+c, 0);

    function inner (...nextArgs) {
        if (nextArgs.length===0) {
            return curSum;
        };
        curSum += nextArgs.reduce((a,c)=>a+c, 0);
        return inner;
    };

    return inner;
};

console.log(sum(1,2)()); // 3
console.log(sum(1,2)(2,2,2)()); // 9
console.log(sum(1,2)(6,7)()); // 16