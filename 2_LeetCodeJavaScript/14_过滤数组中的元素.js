//fn 函数接受一个或两个参数：
// · arr[i] - arr 中的数字
// · i - arr[i] 的索引
//filteredArr 应该只包含使表达式 fn(arr[i], i) 的值为真值的 arr 中的元素。
//真值是指 Boolean(value) 返回参数为 true 的值。
//请在不使用内置的 Array.filter 方法的情况下解决该问题。

var filter = function(arr, fn) {
    if(arr.length===0)return [];
    let filteredArr = [];
    for(let i=0;i<arr.length;i++){//记得考虑【处理fn的第二个参数i】的情况
        if(fn(arr[i],i)){
            filteredArr.push(arr[i]);
        }
    };
    return filteredArr;
};

const arr = [0,10,20,30], fn = function greaterThan10(n) { return n > 10; };
console.log(filter(arr, fn));//[20,30]
// 过滤函数过滤掉不大于 10 的值

const arr1 = [1,2,3], fn1 = function firstIndex(n, i) { return i === 0; }
console.log(filter(arr1, fn1));//[1]
// 索引===0的项