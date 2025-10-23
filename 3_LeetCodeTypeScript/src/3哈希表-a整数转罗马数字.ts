/**
 * 罗马数字是通过添加从最高到最低的小数位值的转换而形成的。将小数位值转换为罗马数字有以下规则：
 * 如果该值不是以 4 或 9 开头，请选择可以从输入中减去的最大值的符号，将该符号附加到结果，减去其值，然后将其余部分转换为罗马数字
 * 如果该值以 4 或 9 开头，使用减法形式，表示从以下符号中减去一个符号
 * 例如 4 是 5 (V) 减 1 (I): IV ，9 是 10 (X) 减 1 (I)：IX。仅使用以下减法形式：4 (IV)，9 (IX)，40 (XL)，90 (XC)，400 (CD) 和 900 (CM)
 * 只有 10 的次方（I, X, C, M）最多可以连续附加 3 次以代表 10 的倍数
 * 你不能多次附加 5 (V)，50 (L) 或 500 (D)。如果需要将符号附加4次，请使用减法形式
 * 给定一个整数，将其转换为罗马数字
 */

/**
 * 符号	值
 *  I	1
 *  V	5
 *  X	10
 *  L	50
 *  C	100
 *  D	500
 *  M	1000
 */

function intToRoman(num: number): string {
    //提示：1 <= num <= 3999
    let numStr:string = num.toString().padStart(4,'0');
    let a:string = numStr[0]!, b:string = numStr[1]!,
        c:string = numStr[2]!, d:string = numStr[3]!;
    let aa:string, bb:string, cc:string, dd:string;
    if (a==='0') {
        aa = ''
    } else {
        let n:number = parseInt(a);
        aa = 'M'.repeat(n);
    };

    if (b==='0') {
        bb = '';
    } else if (b==='5') {
        bb = 'D';
    } else {
        let index1:number = Math.floor(parseInt(b)/5);
        let index2:number = parseInt(b)%5;
        if (index2===4) {
            bb = index1===0 ? 'CD' : 'CM';
        } else {
            bb = index1===0 ? 'C'.repeat(index2) : 'D'+'C'.repeat(index2);
        };
    };

    if (c==='0') {
        cc = '';
    } else if (c==='5') {
        cc = 'L';
    } else {
        let index1:number = Math.floor(parseInt(c)/5);
        let index2:number = parseInt(c)%5;
        if (index2===4) {
            cc = index1===0 ? 'XL' : 'XC';
        } else {
            cc = index1===0 ? 'X'.repeat(index2) : 'L'+'X'.repeat(index2);
        };
    };

    if (d==='0') {
        dd = '';
    } else if (d==='5') {
        dd = 'V';
    } else {
        let index1:number = Math.floor(parseInt(d)/5);
        let index2:number = parseInt(d)%5;
        if (index2===4) {
            dd = index1===0 ? 'IV' : 'IX';
        } else {
            dd = index1===0 ? 'I'.repeat(index2) : 'V'+'I'.repeat(index2);
        };
    };

    return aa+bb+cc+dd;
};

console.log(intToRoman(1994)); // "MCMXCIV"
console.log(intToRoman(3749)); // "MMMDCCXLIX"
console.log(intToRoman(510)); // "DX"