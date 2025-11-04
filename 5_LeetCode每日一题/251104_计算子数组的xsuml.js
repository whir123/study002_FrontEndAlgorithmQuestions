/**
 * 给你一个由 n 个整数组成的数组 nums，以及两个整数 k 和 x。
 * 数组的 x-sum 计算按照以下步骤进行：
 * - 统计数组中所有元素的出现次数。
 * - 仅保留出现次数最多的前 x 个元素的每次出现。如果两个元素的出现次数相同，则数值 较大 的元素被认为出现次数更多。
 * - 计算结果数组的和。
 * 注意，如果数组中的不同元素少于 x 个，则其 x-sum 是数组的元素总和。
 * 返回一个长度为 n - k + 1 的整数数组 answer，其中 answer[i] 是 子数组 nums[i..i + k - 1] 的 x-sum。
 * 子数组 是数组内的一个连续 非空 的元素序列。
 */

var findXSum = function(nums, k, x) {
    if (nums.length<=k) {
        let map = new Map();
        for (const num of nums){
            map.set(num, (map.get(num)||0)+1);
        };
        let sum = 0;
        let arr = Array.from(map.entries());
        arr = arr.sort((a,b)=> b[1]-a[1] || b[0]-a[0]).slice(0,x);
        for (const a of arr){
            sum += a[0]*a[1];
        };
        return [sum];
    };
    let map = new Map();
    let res = [];
    let i = 0;
    while(i<nums.length){
        map.set(nums[i], (map.get(nums[i])||0)+1);
        if (i>=k){
            map.set(nums[i-k], map.get(nums[i-k])-1);
            if (map.get(nums[i-k]) === 0) map.delete(nums[i-k]);
        };
        if (i>=k-1){
            let arr = Array.from(map.entries());
            arr = arr.sort((a,b)=> b[1]-a[1] || b[0]-a[0]).slice(0,x);
            // console.log(arr);
            let sum = 0;
            for (const a of arr){
                sum += a[0]*a[1];
            };
            res.push(sum);
        };
        i++;
    };
    return res;
};

const nums = [1,1,2,2,3,4,2,3], k = 6, x = 2;
console.log(findXSum(nums, k, x)); // 输出：[6,10,12]
// 对于子数组 [1, 1, 2, 2, 3, 4]，只保留元素 1 和 2。因此，answer[0] = 1 + 1 + 2 + 2。
// 对于子数组 [1, 2, 2, 3, 4, 2]，只保留元素 2 和 4。因此，answer[1] = 2 + 2 + 2 + 4。注意 4 被保留是因为其数值大于出现其他出现次数相同的元素（3 和 1）。
// 对于子数组 [2, 2, 3, 4, 2, 3]，只保留元素 2 和 3。因此，answer[2] = 2 + 2 + 2 + 3 + 3