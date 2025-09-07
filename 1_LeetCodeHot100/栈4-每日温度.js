/**
 * 给定一个整数数组 temperatures ，表示每天的温度
 * 返回一个数组 answer ，其中 answer[i] 是指对于第 i 天，下一个更高温度出现在几天后。
 * 如果气温在这之后都不会升高，请在该位置用 0 来代替。
*/

var dailyTemperatures = function(temperatures) {
    let n = temperatures.length;
    let answer = Array(n).fill(0);
    let Stack = [], j;
    for(let i=0; i<n; i++) {
        while(Stack.length && temperatures[i]>temperatures[Stack[Stack.length-1]]){
            //只要当前温度比栈里存在的找不到更高气温的缓存温度高 就循环：
            j = Stack.pop();
            answer[j] = i-j;
        };
        Stack.push(i);
    };
    return answer;
};

const temperatures1 = [73,74,75,71,69,72,76,73];
console.log(dailyTemperatures(temperatures1));
//输出: [1,1,4,2,1,1,0,0]

const temperatures2 = [30,40,50,60];
console.log(dailyTemperatures(temperatures2));
// 输出: [1,1,1,0]

const temperatures3 = [30,60,90];
console.log(dailyTemperatures(temperatures3));
// 输出: [1,1,0]
