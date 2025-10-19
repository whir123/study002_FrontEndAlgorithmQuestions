// 长度为n的数组：[a1,a2,...,an]
// 可以对数组执行以下操作任意次：
// - 选择两个不同的下标i，j 1<=i<j<=n且[n/i]=[n/j]（向下取整）
// - 将ai与aj同时替换为 ai,aj的最大公约数
// [输入]：第一行输入一个整数n 表示数组长度 第二行输入n个整数 表示数组中元素
// [输出]：操作后（或不执行任何操作）数组所有元素之和的最小值

const gcd = (a,b) => b===0 ? a : gcd(b, a%b);
function minSum(arr){
    const n = arr.length;
    const groups = new Map();
    for (let i=1; i<=n; i++){
        let bucket = Math.floor(n / i);
        if (!groups.has(bucket)) groups.set(bucket,[]);
        groups.get(bucket).push(arr[i-1]);
    };
    let ans = 0;
    for (let [_,val] of groups) {
        let g = val[0];
        for (let v of val) {
            g = gcd(g,v);
        };
        ans += g*val.length;
    };
    return ans;
};

console.log(minSum([6,9,15,21])); // 21
console.log(minSum([2,4,6,8,10])); // 12
console.log(minSum([7,14,21,28])); // 35
console.log(minSum([5,5,5,5])); // 20
console.log(minSum([3,6,9,12,15,18])); // 72
console.log(minSum([100,200,300,400,500])); // 600