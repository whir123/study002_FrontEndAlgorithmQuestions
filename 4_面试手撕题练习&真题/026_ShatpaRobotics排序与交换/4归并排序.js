// ⭐ Merge
// 分治，分别有序后“归并”
// 稳定 O(nlogn)，空间 O(n)，稳定，外排/链表/需要稳定性时首选

function mergeSort(arr) {
    if (arr.length<=1) return arr; // 递归终止条件
    const mid = Math.floor(arr.length/2);
    const left = arr.slice(0,mid);
    const right = arr.slice(mid);
    return merge(mergeSort(left), mergeSort(right)); // 分别递归
};

function merge(left, right){ // 辅助函数 合并两个有序数组
    let res = [];
    let i = 0, j = 0;
    while (i<left.length && j<right.length){
        left[i]<=right[j] ? res.push(left[i++]) : res.push(right[j++]);
    };
    return res.concat(left.slice(i)).concat(right.slice(j));
};

const a1 = [8,7,2,6,5,11];
const a2 = [0,2,3,1];
const a3 = [111];
console.log(mergeSort(a1));
console.log(mergeSort(a2));
console.log(mergeSort(a3));