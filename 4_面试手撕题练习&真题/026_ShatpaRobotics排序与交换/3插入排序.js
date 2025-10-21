// ⭐ Insertion
// 已排序区 + 把当前元素插入到合适位置
// 平均/最坏 O(n²)，最好 O(n)，空间 O(1)，稳定，小数组/近乎有序时非常快

function insertionSort(arr) {
    for (let i=1; i<arr.length; i++){
        let j = i-1;
        while (j>=0 && arr[j]>arr[j+1]) {
            [arr[j],arr[j+1]] = [arr[j+1],arr[j]];
            j--;
        };
    };

    return arr;
};

const a1 = [8,7,2,6,5,11];
const a2 = [0,2,3,1];
const a3 = [111];
console.log(insertionSort(a1));
console.log(insertionSort(a2));
console.log(insertionSort(a3));