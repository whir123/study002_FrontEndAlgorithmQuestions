/**
 * 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
 * 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
 * 你必须设计并实现时间复杂度为 O(n) 的算法解决此问题。
*/

//【堆排序（O(n log k)）】
//【思路：维护一个大小为 k 的最小堆，堆顶就是第 k 大的元素】
//【minHeap】 = [第k大， 其他元素（都比minHeap[0]大）顺序无关紧要]
//【堆】的物理结构是数组，但逻辑上是完全二叉树
//【完全二叉树】的【数组表示规则】
    //根节点：存储在 arr[0]
    //任意节点 arr[i] 的父子关系：
    //父节点：parent = Math.floor((i - 1) / 2)
    //左子节点：left = 2 * i + 1
    //右子节点：right = 2 * i + 2

var findKthLargest = function(nums, k) {
    const minHeap = [];

    for (const num of nums) {
        if(minHeap.length < k) {
            // 每次插入新元素时，将其放在数组末尾，然后通过 bubbleUp（上浮）调整位置
            minHeap.push(num);
            bubbleUp(minHeap, minHeap.length-1);
        } else if(num > minHeap[0]){
            // 当堆的某个节点的值变大了（替换堆顶），需要让它 "下沉"，以恢复堆的性质（父 ≤ 子）
            minHeap[0] = num;
            bubbleDown(minHeap, 0);
        };
    };

    return minHeap[0];
    // 最小堆性质：父节点 ≤ 子节点「 minHeap[parent]<=minHeap[index] 」，因此 heap[0] 是堆中的最小值。
    // 堆的大小为 k：堆中存储的是当前遇到的 最大的 k 个元素

    //—————————————— 补充两个函数 ——————————————
    function bubbleUp(minHeap, index){ // 最小堆上浮（插入时）
        // index 是新插入元素的初始位置（数组末尾）
        while(index>0){
            let parent = Math.floor((index-1)/2);
            if (minHeap[index] >= minHeap[parent]) break; //直接跳出整个 while 循环
            [minHeap[index],minHeap[parent]] = [minHeap[parent],minHeap[index]];
            index = parent;
        }
        // 每次只比较当前节点和父节点：
        // 堆的其余部分在插入前已经是有序的，只需保证新插入的节点不会破坏从它到根节点的路径上的有序性。
        // 逐步向上调整：如果新节点比父节点小，会一直交换到它比父节点大或到达根节点为止。
    };

    function bubbleDown(minHeap, index){ // 最小堆下沉（删除堆顶时）
        const n = minHeap.length;
        while(true){
            let smallest = index; // 假设当前节点是最小的
            const left = index*2+1;
            const right = index*2+2;
            if(left<n && minHeap[left]<minHeap[smallest]) smallest = left;
            if(right<n && minHeap[right]<minHeap[smallest]) smallest = right;
            if(index === smallest) break;
            [minHeap[index],minHeap[smallest]] = [minHeap[smallest],minHeap[index]];
            index = smallest;
        }
    };
}

var findKthLargest_My = function(nums, k) {
    let curMax = -Infinity;
    let index = -1;

    for(let i=0; i<k-1; i++) {
        for(let j=0; j<nums.length; j++){
            if(nums[j]>=curMax){
                curMax = nums[j];
                index = j;
            };
        };
        nums.splice(index,1); // 从索引 index 开始删除 1 个元素
        curMax = -Infinity; // 重置 curMax
    };
    //console.log(nums);
    curMax = -Infinity; // 重置 curMax
    for(let j=0; j<nums.length; j++){
        if(nums[j]>=curMax){
            curMax = nums[j];
        };
    };

    return curMax;
};

const nums1 = [3,2,1,5,6,4], k1 = 2;
console.log(findKthLargest(nums1, k1)); // 5

const nums2 = [3,2,3,1,2,4,5,5,6], k2 = 4;
console.log(findKthLargest(nums2, k2)); // 4