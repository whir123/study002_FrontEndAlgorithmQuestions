//给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧
//你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位
//返回滑动窗口中的最大值
//滑动窗口的位置                  最大值
// ---------------               -----
// [1  3  -1] -3  5  3  6  7       3
//  1 [3  -1  -3] 5  3  6  7       3
//  1  3 [-1  -3  5] 3  6  7       5
//  1  3  -1 [-3  5  3] 6  7       5
//  1  3  -1  -3 [5  3  6] 7       6
//  1  3  -1  -3  5 [3  6  7]      7

var maxSlidingWindow = function(nums, k) {
    let n = nums.length - k + 1;
    let result = [];
    let m = nums[0];
    for(i=0;i<n;i++){
        m = nums[i];
        for(j=0;j<k;j++){
            if (nums[i+j]>m){m=nums[i+j]}
        };
        result.push(m);
    }
    return result;
};
//循环总共执行 n = nums.length - k + 1 次 ≈ O(n) 次（记数组长度为 n）
//每次外层循环都执行 k 次操作
//O((n−k+1)×k)=O(nk) 暴力解法的时间复杂度

//更高效的解法：使用双端队列（时间复杂度 O(n)）
var maxSlidingWindow1 = function(nums, k) {
    const deque = [];//用来保存数组元素的下标
    const result = [];
    for(let i=0;i<nums.length;i++){//遍历整个数组 i是窗口右端点
        while(deque.length&&nums[deque[deque.length - 1]] <= nums[i]){
            deque.pop();//deque有元素 且 最后下标的nums小于当前nums ——> 去掉
        }
        deque.push(i);//把当前i（下标）放进deque
        if(deque[0] <= i-k){
            deque.shift();//移除队首的过期元素
        }
        if(i>=k-1){//只有当 i 达到第 k-1 位后，窗口才算形成
            result.push(nums[deque[0]]);
        }
    }
    return result;
};

//时间复杂度：O(nk)【不够高效】
var maxSlidingWindow2 = function(nums, k) {
    let queue = [];
    const result = [];
    for(let i=0;i<k;i++){
        queue.push(nums[i]);
    }
    for(let i=1;i<nums.length-k+1;i++){
        maxQueue = Math.max(...queue);//内层Math.max(...queue)每次都要扫描 k 个元素
        result.push(maxQueue);
        queue.push(nums[i+k-1]);
        queue.shift();
    }
    maxQueue = Math.max(...queue);
    result.push(maxQueue);
    return result;
};

let nums = [1,3,-1,-3,5,3,6,7];let k = 3;
let nums1 = [1];let k1 = 1;
console.log(maxSlidingWindow(nums,k));
console.log(maxSlidingWindow(nums1,k1));
console.log(maxSlidingWindow1(nums,k));
console.log(maxSlidingWindow1(nums1,k1));
console.log(maxSlidingWindow2(nums,k));//[ 3, 3, 5, 5, 6, 7 ]
console.log(maxSlidingWindow2(nums1,k1));//[ 1 ]
