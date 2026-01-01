/**
 * 给定一个表示大整数的整数数组 digits，其中 digits[i] 是整数的第 i 位数字。这些数字按从左到右，从最高位到最低位排列。
 * 这个大整数不包含任何前导0。
 * 将大整数加 1，并返回结果的数字数组。
 */

var plusOne = function(digits) {
    let arr = [...digits];
    let i = arr.length-1;

    while(i>=0){
        let cur = arr[i]+1;
        if(cur<10){
            arr[i] = cur;
            return arr;
        };
        arr[i] = 0;
        i--;
    };

    arr[0] = 1;
    arr.push(0);
    return arr;
};

const digits1 = [1,2,3];
console.log(plusOne(digits1));
// 输出：[1,2,4]

const digits2 = [4,3,2,1];
console.log(plusOne(digits2));
// 输出：[4,3,2,2]

const digits3 = [9];
console.log(plusOne(digits3));
// 输出：[1,0]