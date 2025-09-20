// 快递公司收到一批 n 个快递
// 每个快递重量 wi 为高效运输 计划组合成包裹
// 规则：两两组合 二者重量差至少为k |wa-wb|>=k
// 满足规则下 最多能组成多少对配重包裹
// 输入 正整数k（重量差最小值要求）+ n个正整数wi (依次表示每个快递的重量)

function maxPairs (k, arrW) {
    arrW.sort((a, b) => a - b);
    const n = arrW.length;
    let i = 0, j = 0, res = 0;
    let notUsed = Array(n).fill(true);

    while (i < n && j < n) {
        if (i >= j) {
            j++;
            continue;
        }
        if (arrW[j]-arrW[i]>=k && notUsed[i] && notUsed[j]) { // 如果差值满足 成功组成一组快递
            res++;
            notUsed[i] = false;
            notUsed[j] = false;
            i++;
            j++;
        } else { // 差值不够 让较重的快递往后移动 直到差值够大为止
            j++;
        }
    }
    return res;
};

let arr1 = [1, 3, 5, 7, 9];
console.log(maxPairs(3, arr1)); 
// 排序后 [1,3,5,7,9] 匹配: (1,5), (3,7)，剩下9没配
// 输出 2

let arr2 = [1, 2, 5, 6];
console.log(maxPairs(3, arr2));
// 排序后 [1,2,5,6] 匹配: (1,5), (2,6)
// 输出 2
