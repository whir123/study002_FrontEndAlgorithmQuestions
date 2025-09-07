/**
 * 给你一个整数 n ，返回和为 n 的完全平方数的最少数量 。
 * 完全平方数是一个整数，其值等于另一个整数的平方；
 * 换句话说，其值等于一个整数自乘的积。
 * 例如，1、4、9 和 16 都是完全平方数，而 3 和 11 不是。
 */

var numSquares = function(n) {
    let dp = Array(n+1).fill(Infinity);
    dp[0] = 0;//dp[0]=0 0不需要完全平方数
    for(let i=1; i<n+1; i++){
        let j=1;
        while(j*j<=i){
            dp[i] = Math.min(dp[i], dp[i-j*j]+1);
            j++;
        };
    };
    return dp[n];
};

console.log(numSquares(1));//1
console.log(numSquares(4));//1
console.log(numSquares(13));//2
console.log(numSquares(27));//3