//给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。
//算法的时间复杂度应该为 O(log (m+n)) 
//输入：nums1 = [1,3], nums2 = [2] 解释：合并数组 = [1,2,3] ，中位数 2
//输入：nums1 = [1,2], nums2 = [3,4] 解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5

//思路：
//将 A 分成两部分：A[1..i] 和 A[i+1..n1]。
//将 B 分成两部分：B[1..j] 和 B[j+1..n2]。
//i + j = (m + n + 1) / 2（左半部分的长度等于或比右半部分多一个）
// A[i] <= B[j+1] 且 B[j] <= A[i+1]（左半部分的最大值 ≤ 右半部分的最小值）
//选择较短的数组进行二分查找
var findMedianSortedArrays = function(nums1, nums2) {
    // 确保 nums1 是较短的数组
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }
    const m = nums1.length;
    const n = nums2.length;
    const totalLeft = Math.floor((m + n + 1) / 2); // 左半部分的总长度
    let left = 0;
    let right = m;
    while (left <= right) {
        const i = Math.floor((left + right) / 2); // nums1 的分割点
        const j = totalLeft - i; // nums2 的分割点

        // 处理边界条件
        const nums1Left = i === 0 ? -Infinity : nums1[i - 1];
        const nums1Right = i === m ? Infinity : nums1[i];
        const nums2Left = j === 0 ? -Infinity : nums2[j - 1];
        const nums2Right = j === n ? Infinity : nums2[j];

        // 检查分割点是否满足条件
        if (nums1Left <= nums2Right && nums2Left <= nums1Right) {
            // 计算中位数
            if ((m + n) % 2 === 1) {
                return Math.max(nums1Left, nums2Left); // 奇数长度
            } else {
                return (Math.max(nums1Left, nums2Left) + Math.min(nums1Right, nums2Right)) / 2; // 偶数长度
            }
        } else if (nums1Left > nums2Right) {
            right = i - 1; // 分割点需要左移
        } else {
            left = i + 1; // 分割点需要右移
        }
    };
    return 0; // 不会执行到这里
};

// const nums1 = [1,3], nums2 = [2];
// const nums1 = [1,2], nums2 = [3,4];
// const nums1 = [1], nums2 = [];
const nums1 = [3], nums2 = [-2,-1];
console.log(findMedianSortedArrays(nums1, nums2));