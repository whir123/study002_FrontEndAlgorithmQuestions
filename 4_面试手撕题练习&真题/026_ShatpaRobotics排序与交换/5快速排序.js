// ⭐ Quick
// 选枢轴，按大小划分成两边，递归
// 平均 O(nlogn)，最坏 O(n²)，空间 O(log n)，不稳定，通常最快的通用内排

function quickSort(arr) {
    if (arr.length<=1) return arr; // 递归终止条件

    const mid = Math.floor(arr.length/2);
    // splice() 方法就地移除或者替换已存在的元素和/或添加新的元素 | 返回值：包含了删除的元素的数组
    const p = arr.splice(mid,1)[0];
    let left = [];
    let right = [];

    // 遍历数组 小于基准的放左边 大于的放右边
    for (let i=0; i<arr.length; i++) {
        arr[i]<p ? left.push(arr[i]) : right.push(arr[i]);
    };

    return [...quickSort(left), p, ...quickSort(right)]; // 递归对左右子数组合并
};

const a1 = [8,7,2,6,5,11];
const a2 = [0,2,3,1];
const a3 = [111];
console.log(quickSort(a1));
console.log(quickSort(a2));
console.log(quickSort(a3));