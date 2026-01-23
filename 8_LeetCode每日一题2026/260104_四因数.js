/**
 * 难度：🟡
 * 
 * 给你一个整数数组 nums，请你返回该数组中恰有四个因数的这些整数的各因数之和。
 * 如果数组中不存在满足题意的整数，则返回 0
 * 1 <= nums.length <= 10^4
 * 1 <= nums[i] <= 10^5
 */

var sumFourDivisors = function(nums) {
    // ⭐️ 更优解：
    // 恰好有四个正因数，一定满足：
    // 1. n=p^3 | p为质数
    // 2. n因数：1 p q p*q | p q为不同质数

    let ans = 0;
    for (const n of nums){
        let found = false;
        for (let i=2; i*i<=n; i++){
            if (n%i!==0) continue; //直到找到第一个>1的因数
            const j = n/i;
            // 情况1 n=p^3
            if (j===i*i) {
                ans += 1 + i + i*i + n;
                found = true;
            }
            // 情况2
            else if (j!==i && isPrime(i) && isPrime(j)) {
                ans += 1 + i + j + n;
                found = true;
            };
            break;
        };
    };
    return ans;

    function isPrime(x){
        if (x<2) return false;
        for (let i=2; i*i<=x; i++){
            if (x%i===0) return false;
        };
        return true;
    };
};

var sumFourDivisors2 = function(nums) { // 自己原先的解法
    if (nums.length===0) return 0;

    let ans = 0;
    for (const num of nums){
        let count = 0;
        let curSum = 0;
        let left = 1, right = num;
        if (right===1) continue;
        while (left<=right){
            if (left!==right && num/left===right) {
                count += 2;
                curSum += left+right;
            };
            if (left===right && num/left===right) {
                count += 1;
                curSum += left;
            };
            if (count > 4) break;

            left++;
            right = Math.floor(num/left);
        };
        if (count===4) ans += curSum;
    };
    return ans;
};

const nums1 = [21,4,7];
console.log(sumFourDivisors(nums1));
// 输出：32
// 解释：
// 21 有 4 个因数：1, 3, 7, 21
// 4 有 3 个因数：1, 2, 4
// 7 有 2 个因数：1, 7
// 答案仅为 21 的所有因数的和。

const nums2 = [21,21]
console.log(sumFourDivisors(nums2));
// 输出: 64

const nums3 = [1,2,3,4,5];
console.log(sumFourDivisors(nums3));
// 输出: 0