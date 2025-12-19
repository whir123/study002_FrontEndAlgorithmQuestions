/**
 * 给你由 n 个小写字母字符串组成的数组 strs，其中每个字符串长度相等。
 * 这些字符串可以每个一行，排成一个网格。例如，strs = ["abc", "bce", "cae"] 可以排列为：
 * abc
 * bce
 * cae
 * 你需要找出并删除 不是按字典序非严格递增排列的列。
 * 在上面的例子（下标从 0 开始）中，列 0（'a', 'b', 'c'）和列 2（'c', 'e', 'e'）都是按字典序非严格递增排列的，
 * 而列 1（'b', 'c', 'a'）不是，所以要删除列 1 。
 * 返回你需要删除的列数。
 */

var minDeletionSize = function(strs) {
    const n = strs.length;
    if (n===0) return 0;
    const len = strs[0].length; // 列数
    if (len===0) return 0;

    let ans = 0;
    for (let i=0; i<len; i++){
        let cur = strs[0][i];
        for (let j=1; j<n; j++){
            let pre = cur;
            cur = strs[j][i];
            if (cur.charCodeAt() < pre.charCodeAt()){
                ans++;
                break;
            };
        };
    };

    return ans;
};

const strs1 = ["cba","daf","ghi"];
console.log(minDeletionSize(strs1));
// 输出：1
// 解释：网格示意如下：
// cba
// daf
// ghi
// 列 0 和列 2 按升序排列，但列 1 不是，所以只需要删除列 1 。

const strs2 = ["a","b"];
console.log(minDeletionSize(strs2));
// 输出：0

const strs3 = ["zyx","wvu","tsr"];
console.log(minDeletionSize(strs3));
// 输出：3
// 解释：网格示意如下：
// zyx
// wvu
// tsr
// 所有 3 列都是非升序排列的，所以都要删除。