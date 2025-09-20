// 项链前面镶嵌了 n 颗宝石 每颗有特定的能量值
// 分别为a1、a2 ... an
// 规则：如果存在一个三元组(i,j,k)同时满足：
// （1）1 <= i < j < k <= n
// （2）ai < aj < ak
// 那么这对应的三颗宝石就能提供一分钟的能量
// 请计算总共能提供多少分钟的能量

// ⭐️ 这道题就是数一共有多少个严格递增的三元组 (i,j,k)

function countE (arr) {
    const n = arr.length;
    let ans = 0;

    for (let j = 1; j < n - 1; j++) {
        let left = 0, right = 0;

        // 左边比 arr[j] 小的数量
        for (let i = 0; i < j; i++) {
            if (arr[i] < arr[j]) left++;
        };

        // 右边比 arr[j] 大的数量
        for (let k = j + 1; k < n; k++) {
            if (arr[j] < arr[k]) right++;
        };

        // 以 arr[j] 为中间的递增三元组数量
        ans += left * right;
    };

    return ans;
};

const arr1 = [1, 2, 3, 4];
console.log(countE(arr1)); // 4 ✅ 三元组是 (1,2,3), (1,2,4), (1,3,4), (2,3,4)

const arr2 = [3, 1, 2];
console.log(countE(arr2)); // 0
