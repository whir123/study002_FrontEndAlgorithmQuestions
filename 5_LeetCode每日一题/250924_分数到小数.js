/**
 * 给定两个整数，分别表示分数的分子 numerator 和分母 denominator，以字符串形式返回小数
 * 如果小数部分为循环小数，则将循环的部分括在括号内
 * 如果存在多个答案，只需返回任意一个
 * 对于所有给定的输入，保证答案字符串的长度小于 104
 */

var fractionToDecimal = function(numerator, denominator) {
    let isNeg = false;
    if (numerator*denominator<0) isNeg = true;
    numerator = Math.abs(numerator);
    denominator = Math.abs(denominator);

    let integer = Math.floor(numerator / denominator);
    let res = String(integer);
    let decimalMap = new Map();
    if (numerator%denominator!==0) res = res.concat('.');

    let idx = res.length;
    while (numerator%denominator!==0) {
        numerator = numerator % denominator * 10;
        let decimal = Math.floor(numerator / denominator);

        if (decimalMap.has(numerator)) {
            let i = decimalMap.get(numerator);
            res = res.slice(0,i) + "(" + res.slice(i) + ")";
            break;
        } else if (!decimalMap.has(numerator)) decimalMap.set(numerator, idx++);

        if (numerator%denominator===0) {
            res = res.concat(String(decimal));
            break;
        };

        res = res.concat(String(decimal));
    };

    return isNeg ? '-'+res : res;
};

const numerator1 = 1, denominator1 = 2;
console.log(fractionToDecimal(numerator1, denominator1));
// 输出："0.5"

const numerator2 = 2, denominator2 = 1;
console.log(fractionToDecimal(numerator2, denominator2));
// 输出："2"

const numerator3 = 4, denominator3 = 333;
console.log(fractionToDecimal(numerator3, denominator3));
// 输出："0.(012)"