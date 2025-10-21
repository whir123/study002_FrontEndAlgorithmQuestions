/**
 * 给你一个整数数组 nums 和两个整数 k 和 numOperations 。
 * 你必须对 nums 执行操作 numOperations 次。每次操作中，你可以：
 * - 选择一个下标 i ，它在之前的操作中 没有 被选择过。
 * - 将 nums[i] 增加范围 [-k, k] 中的一个整数。
 * 在执行完所有操作以后，请你返回 nums 中出现频率最高元素的出现次数。
 * 一个元素 x 的 频率 指的是它在数组中出现的次数。
 */

var maxFrequency = function(nums, k, numOperations) {
    const frequencyMap = {};
    nums.forEach(v => frequencyMap[v] = (frequencyMap[v] || 0) + 1);
    if (k === 0 || numOperations === 0) return Math.max(...Object.values(frequencyMap));
    
    nums.sort((a, b) => a - b);
    let maxFreq = 0;
    
    // 构造候选目标值集合 targets：对每个原始值 num，将 num、num+k、num-k 加入候选集合
    const targets = new Set();
    for (let num of nums) {
        targets.add(num);
        targets.add(num + k);
        targets.add(num - k);
    }
    
    // 遍历每个候选 target：数组中落在 [target-k, target+k] 的元素: 这些元素可以不改变或通过一次操作变为 target
    for (let target of targets) {
        const leftBound = target - k;
        const rightBound = target + k;
        // 在已排序的 nums 中用二分查找
        // 获取 left（第一个 ≥ leftBound 的下标）和 right（第一个 > rightBound 的下标）
        let left = binarySearchLeft(nums, leftBound);
        let right = binarySearchRight(nums, rightBound);
        // m: 原值在 [target-k, target+k] 的元素个数（这些元素理论上可以在一次操作内变为 target，或者本来就是 target）
        const m = right - left;
        // cntTarget: 原本等于 target 的元素数量
        const cntTarget = frequencyMap[target] || 0;
        const needOperations = m - cntTarget;
        // finalCount：在当前 target 下，能通过现有 numOperations 把多少元素变为 target
        const finalCount = Math.min(numOperations, needOperations) + cntTarget;
        maxFreq = Math.max(maxFreq, finalCount);
    };
    return maxFreq;
};

function binarySearchLeft(nums, target) {
    let left = 0, right = nums.length;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] >= target) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
};
function binarySearchRight(nums, target) {
    let left = 0, right = nums.length;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] <= target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
};


const nums1 = [1,4,5], k1 = 1, numOperations1 = 2;
console.log(maxFrequency(nums1, k1, numOperations1)); // 输出：2
// 通过以下操作得到最高频率 2 ：
// 将 nums[1] 增加 0 ，nums 变为 [1, 4, 5] 。
// 将 nums[2] 增加 -1 ，nums 变为 [1, 4, 4] 。

const nums2 = [5,11,20,20], k2 = 5, numOperations2 = 1;
console.log(maxFrequency(nums2, k2, numOperations2)); // 输出：2
// 通过以下操作得到最高频率 2 ：
// 将 nums[1] 增加 0 。

const nums3 = [8,8,56,67,18,5], k3 = 86, numOperations3 = 0;
console.log(maxFrequency(nums3, k3, numOperations3)); // 输出：2
