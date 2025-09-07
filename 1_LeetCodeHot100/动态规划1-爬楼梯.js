//假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
//每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

//【思路：动态规划（DP）】
//【爬到第 n 阶的最后一步，要么是从 n-1 阶爬 1 阶上来，要么是从 n-2 阶爬 2 阶上来】
//【dp(n) = dp(n-1) + dp(n-2)】
var climbStairs = function(n) {
    if(n===1)return 1;
    if(n===2)return 2;
    let x0 = 1, x1 = 2, tem;
    for(let i=0; i<n-2; i++){
        tem = x0+x1;
        x0 = x1;
        x1 = tem;
    }
    return x1;
};
console.log(climbStairs(2));
console.log(climbStairs(3));
console.log(climbStairs(5));