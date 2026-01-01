/**
 * 「无零整数」是十进制表示中不含任何 0 的正整数。
 * 给你一个整数 n，请你返回一个由两个整数组成的列表 [a, b]，满足：
 * a 和 b 都是无零整数
 * a + b = n
 * 题目数据保证至少有一个有效的解决方案。
 * 如果存在多个有效解决方案，你可以返回其中任意一个。
 */

var getNoZeroIntegers = function(n) {
    function hasZero(a){
        while(a>0){
            if(a%10===0){return false}
            a = Math.floor(a/10);
        };
        return true;
    };

    for(let i=1; i<n; i++){
        if(hasZero(i) && hasZero(n-i)){
            return [i, n-i];
        };
    };
};

console.log(getNoZeroIntegers(7));
console.log(getNoZeroIntegers(91));
console.log(getNoZeroIntegers(18));
