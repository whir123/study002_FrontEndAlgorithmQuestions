// 不借助其他变量交换两个变量的值

// 加减法
function exchange(a,b){
    console.log(`交换前 a=${a} b=${b}`);
    a = a+b;
    b = a-b;
    a = a-b;
    console.log(`交换前 a=${a} b=${b}`);
};

exchange(3,90);