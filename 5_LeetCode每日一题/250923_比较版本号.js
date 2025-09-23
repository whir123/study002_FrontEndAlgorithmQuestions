/**
 * 给你两个版本号字符串 version1 和 version2 ，请你比较它们。
 * 版本号由被点 '.' 分开的修订号组成。修订号的值是它转换为整数并忽略前导零。
 * 比较版本号时，请按从左到右的顺序 依次比较它们的修订号。
 * 如果其中一个版本字符串的修订号较少，则将缺失的修订号视为 0。
 * 返回规则如下：
 * 如果 version1 < version2 返回 -1，
 * 如果 version1 > version2 返回 1，
 * 除此之外返回 0。
 */

var compareVersion = function(version1, version2) {
    let v1 = version1.split('.');
    let v2 = version2.split('.');
    let n = Math.max(v1.length, v2.length);

    for (let i=0; i<n; i++) {
        if (v1[i]===undefined && Number(v2[i])!==0) return -1;
        if (v2[i]===undefined && Number(v1[i])!==0) return 1;

        if (Number(v1[i]) < Number(v2[i])) {
            return -1;
        } else if (Number(v1[i]) > Number(v2[i])) {
            return 1;
        };
    };

    return 0;
};

const versionA1 = "1.2", versionA2 = "1.10";
console.log(compareVersion(versionA1, versionA2));
// 输出：-1
// version1 的第二个修订号为 "2"，version2 的第二个修订号为 "10"：2 < 10，所以 version1 < version2。

const versionB1 = "1.01", versionB2 = "1.001";
console.log(compareVersion(versionB1, versionB2));
// 输出：0
// 忽略前导零，"01" 和 "001" 都代表相同的整数 "1"。