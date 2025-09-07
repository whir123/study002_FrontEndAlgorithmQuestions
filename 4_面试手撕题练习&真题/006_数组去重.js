// 请补全JavaScript代码，要求去除数组参数中的重复数字项并返回该数组。
// 注意： 数组参数仅包含数字
// 输入 | _deleteRepeat([-1,1,2,2])
// 输出 | [-1,1,2]


const _deleteRepeat = array => {
    const set = new Set(array); // Set 可直接传入一个可迭代对象
    const res = Array.from(set); // 使用 Array.from(set) 或 [...set] 将 Set 转换为数组
    return res;
};
console.log(_deleteRepeat([-1,1,2,2]));
