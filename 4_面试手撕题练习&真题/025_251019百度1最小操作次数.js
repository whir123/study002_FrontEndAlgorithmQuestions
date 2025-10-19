// 一个数组称为令人心动：当且仅当该数组最大值不超过最小值两倍
// 长度为n的数组：[a1,a2,...,an];
// 为了让数组变心动，可以进行以下操作多次，直到满足条件：
// 选择一个元素ai，并选取两个正整数xy 满足ai=x+y 将ai删除 并将x y插入数组中

// [输入]：第一行输入一个整数n 表示数组长度 第二行输入n个整数 表示数组中元素
// [输出]：输出一个整数 表示最少操作次数

// ❌ 暂存问题
function niceArr(arr) {
    arr.sort((a,b)=>a-b);
    let min = arr[0];
    let ops = 0;

    for (let i = 1; i < arr.length; i++){
        let a = arr[i];
        while (a > 2 * min){
            // 拆分一次，使得 a 减小
            ops++;
            a = Math.ceil(a / 2); // 拆成两半时，最大的一半
        }
        min = Math.min(min, a); // 理论上 min 不变，这里保守处理
    }
    return ops;
}

console.log(niceArr([1,10,2,3]));
console.log(niceArr([1,1,1,100]));
console.log(niceArr([5,5,5,5]));
console.log(niceArr([1,20]));
console.log(niceArr([2,8,16]));