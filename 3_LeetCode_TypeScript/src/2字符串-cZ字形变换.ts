/**
 * 将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。
 * 比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：
 * P   A   H   N
 * A P L S I I G
 * Y   I   R
 * 之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"。
 * 请你实现这个将字符串进行指定行数变换的函数：
 */

function convert(s: string, numRows: number): string {
    if (s.length<2 || s.length<=numRows || numRows===1) return s;

    //let arr:Array<string> = Array(numRows).fill("");
    let arr:string[] = Array(numRows).fill(""); // 这种写法也行
    let flag:number = -1; // 1代表向下 -1向上
    let index:number = 0; // 在第几行加数字

    for(const char of s){
        if(index===0 || index===numRows-1) flag *= -1;
        arr[index] += char; // 直接 + 合并字符串
        index = index+flag;
    };

    return arr.join(''); // 直接合并数组成字符串
};

console.log(convert("PAYPALISHIRING", 3));