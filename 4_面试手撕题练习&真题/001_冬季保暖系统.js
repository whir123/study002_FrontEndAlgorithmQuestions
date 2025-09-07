/**
 * 某小区 冬季采暖期间 室内温度保持 18～24摄氏度 温差在4摄氏度之内恒温服务
 * 为评价其温控效果 固定时间间隔进行N次室内温度采样 从0开始的索引序号依次记录
 * 计算符合承诺的持续时间 即温度T满足 18 <= T <= 24 且 max-min <= 4 持续多久
 * 
 * 【输入】温度数值数组
 * 【输出】最大持续时间的 开始点&结束点的数组元素索引号 存在多组时均需输出
 */

function judge (arr) {
    let left = 0;
    let curMin = Infinity, curMax = -Infinity;
    let maxLen = 0;
    let result = [];

    for(let right=0; right<arr.length; right++){
        if(arr[right]<18 || arr[right]>24){ // ⚠️ 如果大小条件不满足 直接重置
            left = right+1;
            curMin = Infinity;
            curMax = -Infinity;
            continue; // ⚠️ 
        };
        if (arr[right]>curMax) curMax = arr[right];
        if (arr[right]<curMin) curMin = arr[right];

        // ⚠️ 暴力解 max / min
        while(curMax-curMin>4){
            left++;
            curMax = Math.max(...arr.slice(left, right+1));
            curMin = Math.min(...arr.slice(left, right+1));
        };

        let curMaxLen = right-left+1;
        if(curMaxLen>maxLen){
            result = [[left,right]];
            maxLen = curMaxLen;
        } else if(curMaxLen===maxLen){
            result.push([left,right]);
        };
    };
    return result;
};

//【测试】
console.log(judge([17, 18, 19, 21, 22, 24, 25, 20]));
// 👉 [ [1, 4] ]   => [18,19,21,22] 长度4

console.log(judge([18, 19, 20, 21, 22, 23, 24]));
// 👉 [ [0, 4], [2, 6] ]  => [18,19,20,21,22] & [20,21,22,23,24] 长度5

console.log(judge([16, 18, 20, 19, 22, 23, 21, 25]));
// 👉 [ [1, 6] ]   => [18,20,19,22,23,21] 长度6

console.log(judge([19, 20, 21, 22, 23, 24, 25, 26]));
// 👉 [ [0, 4], [1, 5] ]  => [19,20,21,22,23] & [20,21,22,23,24] 长度5