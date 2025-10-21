// ⭐ Heap
// 建最大堆，反复把堆顶（最大）放到尾部
// O(nlogn)，空间 O(1)，不稳定，在意最坏界限 & 常数可控时不错

function heapSort(arr) {
    let n = arr.length;

    // 构建最大堆
    for (let i=Math.floor(n/2)-1; i>=0; i--) heapify(arr, n, i);

    // 一个个从堆顶取出元素 将当前堆顶元素（最大值）与末尾元素进行交换
    for (let i=n-1; i>0; i--){
        [arr[0],arr[i]] = [arr[i],arr[0]];
        heapify(arr, i, 0); // ⚠️ 调整剩余元素 保持最大堆的性质
    };
    return arr;
};

// 将数组的某个子树调整成最大堆
function heapify(arr, n, i){
    let largest = i; // 初始化根节点为最大值
    let left = i*2+1;
    let right = i*2+2;

    if (left<n && arr[left]>arr[largest]) largest = left;
    if (right<n && arr[right]>arr[largest]) largest = right;
    if (largest !== i) {
        [arr[i],arr[largest]] = [arr[largest],arr[i]];
        heapify(arr, n, largest);
    };
};

const a1 = [8,7,2,6,5,11];
const a2 = [0,2,3,1];
const a3 = [111];
console.log(heapSort(a1));
console.log(heapSort(a2));
console.log(heapSort(a3));

// ❓ 为什么构建最大堆时 只需要从 Math.floor(n/2)-1 开始？
// ❕ 堆是一棵完全二叉树，数组下标从 0 开始。对于任意节点 i：左子节点下标为 2*i+1 右子节点下标为 2*i+2
//    只有非叶子节点才需要进行堆化（heapify）操作，因为叶子节点本身已经满足堆的性质（没有子节点，无需比较和交换）
//    数组长度为 n ｜ 下标从 0 到 n-1 ｜ 下标大于等于 Math.floor(n/2) 的都是叶子节点

// ❓ 一个个从堆顶取出元素交换的操作逻辑？
// ❕ 堆顶始终是当前堆的最大值 最大堆的性质保证了堆顶（数组下标 0）是当前堆中最大的元素。
//    将堆顶与末尾元素交换：通过 [arr[0], arr[i]] = [arr[i], arr[0]]，把最大值放到数组末尾（已排序区），堆的有效长度减 1。
//    重新调整剩余部分为最大堆：交换后，堆顶可能不再满足最大堆性质。通过 heapify(arr, i, 0)，只对剩余未排序部分（长度 i）自顶向下调整，使其重新成为最大堆。