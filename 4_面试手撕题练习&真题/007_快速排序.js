// 请补全JavaScript代码，要求将数组参数中的数字【从小到大】进行排序并返回该数组。
// 1. 数组元素仅包含数字
// 2. 请优先使用快速排序方法
// 输入描述：_quickSort([0,-1,1,-2,2])
// 输出描述：[-2,-1,0,1,2]

//------------------------------------------------------------------------
// ⚠️【 快速排序 】 一种分治算法，通过递归地将数组分为较小和较大的两个子数组，然后对每个子数组进行排序
// 时间复杂度 O(nlogn) | 空间复杂度 O(logn)
function _quickSort(arr){
    if(arr.length<=1)return arr;
    let left=[], right=[];
    let sd = arr[0]; // 以第一个数为基准
    for(let i=1; i<arr.length; i++){ //❗不包括基准自己 以免无限递归
        if(arr[i]<=sd){
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        };
    }; // ❗️ 还可以把等于sd的单独放一个队列
    return [..._quickSort(left), sd, ..._quickSort(right)]; //❗中间放基准自己
};

//------------------------------------------------------------------------
// ⚠️【 冒泡排序 】 通过反复交换相邻的未按顺序排列的元素，直到整个数组有序
// 时间复杂度 O(n^2) | 空间复杂度 O(1) 原地排序
function _bubbleSort(arr){
    const n = arr.length;
    for(let i=0; i<n-1; i++){
        for(let j=0; j<n-1; j++){
            if(arr[j]>arr[j+1]){
                [arr[j],arr[j+1]] = [arr[j+1],arr[j]];
            };
        };
    };
    return arr;
};

//------------------------------------------------------------------------
// ⚠️【 选择排序 】 反复选择数组中最小的元素，并将其放到前面
// 时间复杂度 O(n^2) | 空间复杂度 O(1) 原地排序
function _selectionSort(arr){
    const n =arr.length;
    for(let i=0; i<n; i++){
        let minIndex = i;
        for(let j=i+1; j<n; j++){
            if (arr[j]<arr[minIndex]) {
                minIndex = j;
            };
        };
        [arr[minIndex],arr[i]] = [arr[i],arr[minIndex]];
    };
    return arr;
};

//------------------------------------------------------------------------
// ⚠️【 插入排序 】 将每个元素插入到前面已排序部分的正确位置
// 时间复杂度 O(n^2) | 空间复杂度 O(1)
function _insertSort(arr){
    const n = arr.length;
    for(let i=1; i<n; i++){
        let minIndex = i;
        for(let j=i; j>=0; j--){
            if(arr[minIndex]<arr[j]) {
                [arr[minIndex], arr[j]] = [arr[j], arr[minIndex]];
                minIndex=j;
            };
        };
    };
    return arr;
};

//------------------------------------------------------------------------
// ⚠️【 归并排序 】 分治法将数组分为两个子数组 分别排序后合并
// 时间复杂度 O(nlogn) | 空间复杂度 O(n)
function _mergeSort(arr){
    const n = arr.length;
    if(n<=1) return arr;

    const mid = Math.floor(n/2);
    let left = _mergeSort(arr.slice(0,mid));
    let right = _mergeSort(arr.slice(mid,n));

    function merge(left, right){
        const result = [];
        while(left.length && right.length){
            if(left[0] <= right[0]){
                result.push(left.shift());
            }else{
                result.push(right.shift());
            };
        };
        return result.concat(left, right);
    };

    return merge(left, right);
}

//------------------------------------------------------------------------
// ⚠️【 堆排序 】 使用堆数据结构（最大堆或最小堆）
// 时间复杂度 O(nlogn) | 空间复杂度 O(1)
//堆是一种 完全二叉树 (complete binary tree) 形式的数据结构，满足 堆序性 (heap property)：
// 最大堆 (Max-Heap)：每个节点的值 ≥ 其子节点的值。
// 最小堆 (Min-Heap)：每个节点的值 ≤ 其子节点的值。
// ⚠️ 注意：堆并不是“完全有序”的，而是局部有序 —— 父节点和子节点满足大小关系，但兄弟节点之间没有必然大小关系
function _heapSort(arr){ // ⭐️ 最大堆 + 原地排序
    let n = arr.length;
    function heapify(arr, n, i){ // 使以 i 为根的子树满足最大堆性质（父节点 ≥ 子节点）
        let largest = i;
        const left = i*2+1, right = i*2+2;

        if(left<n && arr[left]>arr[largest]){
            largest = left;
        };
        if(right<n && arr[right]>arr[largest]){
            largest = right;
        };

        if(largest !== i){
            [arr[i], arr[largest]] = [arr[largest], arr[i]]; // 把当前根换下去，把更大的子上升到根位置
            // 交换后，原来位于 largest 的值（现在在 i 的位置）可能破坏了 largest 位置子树的堆性质
            // 递归调用 heapify(..., largest)
            heapify(arr, n, largest);
        };
    };

    // 建堆
    // 完全二叉树中，索引 0..n-1，叶子节点的索引是从 Math.floor(n/2) 到 n-1（或说最后一个非叶子是 Math.floor(n/2)-1）
    // 从 Math.floor(n/2)-1 向下遍历到 0，对每个非叶子节点运行 heapify，自底向上把每个子树调整为堆
    for(let i=Math.floor(n/2)-1; i>=0; i--){
        heapify(arr, n, i);
    };// 建堆结束，数组表示一个最大堆

    // 这是提取最大并放末尾的循环，每次迭代完成一个元素的最终位置
    for(let i=n-1; i>0; i--){
        [arr[i], arr[0]] = [arr[0], arr[i]];
        heapify(arr, i, 0);
    };

    return arr;
};

const arr = [0, -1, 1, -2, 2];
const arr2 = [2, 8, 0, 12, -9, -1, 2, -0.7, 9.1, 3.14];
// ⚠️ 原数组被修改 传拷贝：
const cp = a => a.slice();
console.log(_quickSort(cp(arr)), _quickSort(cp(arr2)));
console.log(_bubbleSort(cp(arr)), _bubbleSort(cp(arr2)));
console.log(_selectionSort(cp(arr)), _selectionSort(cp(arr2)));
console.log(_insertSort(cp(arr)), _insertSort(cp(arr2)));
console.log(_mergeSort(cp(arr)), _mergeSort(cp(arr2)));
console.log(_heapSort(cp(arr)), _heapSort(cp(arr2)));