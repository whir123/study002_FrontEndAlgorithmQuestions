// ⭐ Bubble
// 相邻两两交换 把大的慢慢冒泡到末端
// 平均/最坏 O(n²)，空间 O(1)，稳定，适合几乎有序的小数组

function bubbleSort(arr) {
    let n = arr.length;
    let swapped = true;

    while(swapped){
        swapped = false;
        for (let i=1; i<n; i++){
            if (arr[i-1] > arr[i]) {
                [arr[i-1],arr[i]] = [arr[i],arr[i-1]];
                swapped = true;
            };
        };
        n--; // 尾部已就位
    };

    return arr;
};

const a1 = [8,7,2,6,5,11];
const a2 = [0,2,3,1];
const a3 = [111];
console.log(bubbleSort(a1));
console.log(bubbleSort(a2));
console.log(bubbleSort(a3));