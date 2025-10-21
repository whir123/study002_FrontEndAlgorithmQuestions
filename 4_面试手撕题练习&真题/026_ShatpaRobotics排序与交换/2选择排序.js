// ⭐ Selection
// 每轮从剩余元素里选最小 -> 放到前面
// 平均/最坏 O(n²)，空间 O(1)，不稳定，交换次数少

function selectionSort(arr) {
    let n = arr.length;

    for (let i=0; i<n-1; i++) {
        let min = i;
        for (let j=i+1; j<n; j++) {
            if (arr[j] < arr[min]) {
                [arr[min],arr[j]] = [arr[j],arr[min]];
            };
        };
    };

    return arr;
};

const a1 = [8,7,2,6,5,11];
const a2 = [0,2,3,1];
const a3 = [111];
console.log(selectionSort(a1));
console.log(selectionSort(a2));
console.log(selectionSort(a3));