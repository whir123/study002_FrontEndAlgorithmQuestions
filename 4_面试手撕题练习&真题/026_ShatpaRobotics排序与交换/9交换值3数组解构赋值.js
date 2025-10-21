// 不借助其他变量交换两个变量的值

// 数组解构赋值（ES6+）
function exchange(a,b){
    console.log(`交换前 a=${a} b=${b}`);
    [a,b] = [b,a];
    // ⚠️ 其实使用了额外空间 大致底层过程：
    // const _temp = [b, a];  // 创建了一个临时数组
    // a = _temp[0];          // 从临时数组读取值
    // b = _temp[1];          // 从临时数组读取值
    console.log(`交换前 a=${a} b=${b}`);
};

exchange(3,90);