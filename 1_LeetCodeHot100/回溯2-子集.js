//给你一个整数数组 nums ，数组中的元素互不相同 。返回该数组所有可能的子集（幂集）。
//解集不能包含重复的子集。你可以按任意顺序返回解集。

// 1.回溯法（递归）
var subsets = function(nums) {
    let result = [];

    function backtrack(start, path) {
        result.push([...path]);
        for(let i=start; i<nums.length; i++){
            path.push(nums[i]);
            backtrack(i+1, path);
            path.pop();
        }
    };

    backtrack(0,[]);
    return result;
};

// 2.迭代法（运用位运算思想 每个元素有“选”和“不选”两个状态）
var subsets2 = function(nums) {
    let result = [];
    let n = nums.length;

    for(let mask=0; mask<(1<<n); mask++){//主循环 生成所有可能的掩码
    //(1<<n)是位左移操作 表示数字1向左移动n位 【如n=3 1<<3 = 1000（二进制）】
    //mask 从0开始，到(1<<n)-1结束 【n=3，mask从0（000）到7（111）】

        let subset = [];//初始化当前子集

        for (let i=0; i<n; i++){//内循环 检查每一位 //mask & (1<<i)：这个表达式检查mask的第i位是否为1
            // 1<<i 创建一个只有第i位为1的数字 如i=1时，1<<1 = 010（二进制）
            // mask & (1<<i) 进行按位与运算 只有当mask的第i位为1时，结果才不为0
            if(mask & (1<<i)){
            
                subset.push(nums[i]);
            }
        };

        result.push(subset);
    };

    return result;
};
//依然是上面迭代思路 但是用字符串生成掩码
var subsets3 = function(nums) {
    let result = [];
    let n = nums.length;
    let total = 1<<n; //掩码共有2^n种可能 total出来是十进制
    //let total = 2 ** n; //没位运算快

    for(let mask=0; mask<total; mask++){
        //mask转二进制 补0
        const binaryStr = mask.toString(2).padStart(n,'0');
        const subset = [];
        for(let i=0; i<n; i++){
            if (binaryStr[i]==='1'){
                subset.push(nums[i]);
            };
        };
        result.push(subset);
    };

    return result;
}

const nums = [1,2,3];
console.log(subsets(nums));
console.log(subsets2(nums));
console.log(subsets3(nums));
// [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

//【递归方法详细解读】
//输入假设为：[0,1,2]
//                                              初始调用 backtrack(0, [])           result = [[]]
//进入循环 i=0                  path = [0]       递归调用 backtrack(1, [0])          result = [[], [0]]
    //进入循环 i=1              path = [0,1]     递归调用 backtrack(2, [0,1])        result = [[], [0], [0,1]]
        //进入循环 i=2          path = [0,1,2]   递归调用 backtrack(3, [0,1,2])      result = [[], [0], [0,1], [0,1,2]]
            //循环不执行(因为i=3不小于长度3)
        //撤销2: path = [0,1]   循环结束
    //撤销1: path = [0]
    //进入循环 i=2              path = [0,2]     递归调用 backtrack(3, [0,2])        result = [[], [0], [0,1], [0,1,2], [0,2]]
        //循环不执行
    //撤销2: path = [0]         循环结束
//撤销0: path = []
//进入循环 i=1                  path = [1]       递归调用 backtrack(2, [1])          result = [[], [0], [0,1], [0,1,2], [0,2], [1]]
    //进入循环 i=2              path = [1,2]     递归调用 backtrack(3, [1,2])        result = [[], [0], [0,1], [0,1,2], [0,2], [1], [1,2]]
        //循环不执行
    //撤销2: path = [1]         循环结束
//撤销1: path = []
//进入循环 i=2                  path = [2]       递归调用 backtrack(3, [2])          result = [[], [0], [0,1], [0,1,2], [0,2], [1], [1,2], [2]]
    //循环不执行
//撤销2: path = []      循环结束
//最终输出
