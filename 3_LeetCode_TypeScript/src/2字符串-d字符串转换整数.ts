/**
 * 请你来实现一个 myAtoi(string s) 函数，使其能将字符串转换成一个 32 位有符号整数。
 * 函数 myAtoi(string s) 的算法如下：
 * 空格：读入字符串并丢弃无用的前导空格（" "）
 * 符号：检查下一个字符（假设还未到字符末尾）为 '-' 还是 '+'。如果两者都不存在，则假定结果为正。
 * 转换：通过跳过前置零来读取该整数，直到遇到非数字字符或到达字符串的结尾。如果没有读取数字，则结果为0。
 * 舍入：如果整数数超过 32 位有符号整数范围 [−2^31,  2^31 − 1] ，需要截断这个整数，使其保持在这个范围内。
 * 具体来说，小于 −2^31 的整数应该被舍入为 −2^31 ，大于 2^31 − 1 的整数应该被舍入为 2^31 − 1 。
 * 返回整数作为最终结果。
 */

function myAtoi(s: string): number {
    let i:number = 0; //字符串指针
    let result:number = 0;
    
    // 丢弃前置的空格
    while(i<s.length && s[i]===" "){i++;}

    // 判断符号
    let flag:number = 1;
    if(s[i]==="-"){
        flag = -1;i++;
    }else if(s[i]==="+"){
        i++;
    }else if((s[i]!) < '0' || (s[i]!) > '9'){
    //else if(s.charCodeAt(i)<48 || s.charCodeAt(i)>57) 比较ASCII码
        return 0;
    }

    // 计算结果
    // ⚠️注意 ： 位运算是32位有符号整数 1<<31会变成-2147483648 所以写成 (1<<30)*2-1
    // JS 的 ** 运算符在 V8 引擎里是直接优化过的 不一定追求位运算
    
    const INT_MAX = 2 ** 31 - 1; // 2147483647
    const INT_MIN = -(2 ** 31);  // -2147483648

    while(i<s.length && (s[i]!) >= '0' && (s[i]!) <= '9'){
        let digit = parseInt(s[i]!);
        if(flag===1){
            if( result > (INT_MAX-digit)/10 ){return 2**31-1;}
        };
        if(flag===-1){
            if( 0-result < (INT_MIN+digit)/10 ){return 0-2**31;}
        };
        result = result*10+digit; //先判断 再赋值
        i++;
    };

    return result*flag;
};

console.log(myAtoi("42"));