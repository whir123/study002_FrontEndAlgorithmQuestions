// 不借助其他变量交换两个变量的值

// 位运算法（适用于整数）
function exchange(a,b){
    console.log(`交换前 a=${a} b=${b}`);
    a = a^b; // 异或 相同为0 不同为1
    b = a^b;
    a = a^b;
    console.log(`交换前 a=${a} b=${b}`);
};

exchange(3,90);