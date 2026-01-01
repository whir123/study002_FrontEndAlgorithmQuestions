/**
 * 给你一个长度为 n 的数组 happiness ，以及一个正整数 k
 * n 个孩子站成一队，其中第 i 个孩子的幸福值是 happiness[i]
 * 你计划组织 k 轮筛选从这 n 个孩子中选出 k 个孩子
 * 在每一轮选择一个孩子时，所有尚未被选中的孩子的幸福值将减少 1 。注意，幸福值不能变成负数，且只有在它是正数的情况下才会减少
 * 选择 k 个孩子，并使你选中的孩子幸福值之和最大，返回你能够得到的最大值 。
 */

var maximumHappinessSum = function(happiness, k) {
    happiness.sort((a,b)=>b-a);
    let ans = 0;
    for (let i=0; i<k; i++){
        // if (happiness[i]-i>0) ans += happiness[i]-i;
        ans += Math.max(happiness[i]-i, 0);
    };
    return ans;
};

const happiness1 = [1,2,3], k1 = 2;
console.log(maximumHappinessSum(happiness1, k1));
// 输出：4
// 解释：按以下方式选择 2 个孩子：
// - 选择幸福值为 3 的孩子。剩余孩子的幸福值变为 [0,1] 。
// - 选择幸福值为 1 的孩子。剩余孩子的幸福值变为 [0] 。注意幸福值不能小于 0 。
// 所选孩子的幸福值之和为 3 + 1 = 4 。

const happiness2 = [1,1,1,1], k2 = 2;
console.log(maximumHappinessSum(happiness2, k2));
// 输出：1
// 解释：按以下方式选择 2 个孩子：
// - 选择幸福值为 1 的任意一个孩子。剩余孩子的幸福值变为 [0,0,0] 。
// - 选择幸福值为 0 的孩子。剩余孩子的幸福值变为 [0,0] 。
// 所选孩子的幸福值之和为 1 + 0 = 1 。

const happiness3 = [2,3,4,5], k3 = 1;
console.log(maximumHappinessSum(happiness3, k3));
// 输出：5
// 解释：按以下方式选择 1 个孩子：
// - 选择幸福值为 5 的孩子。剩余孩子的幸福值变为 [1,2,3] 。
// 所选孩子的幸福值之和为 5 。