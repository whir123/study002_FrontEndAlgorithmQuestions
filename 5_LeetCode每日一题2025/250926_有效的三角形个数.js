/**
 * 给定一个包含非负整数的数组 nums ，返回其中可以组成三角形三条边的三元组个数。
 */

var triangleNumber = function(nums) {
    const n = nums.length;
    if (n<3) return 0;

    let res = 0;
    nums.sort((a,b)=>a-b);
    for (let r=n-1; r>=2; r--) { // 固定最大边
        let l=0, m=r-1;
        while(l<m) {
            if (nums[l]+nums[m]>nums[r]) {
                res += m-l; // 当前r和m能找到多少l 成组
                m--;
            } else {
                l++;
            };
        };
    };

    return res;
};

const nums1 = [2,2,3,4];
console.log(triangleNumber(nums1));
// 输出: 3
// 解释:有效的组合是: 
// 2,3,4 (使用第一个 2)
// 2,3,4 (使用第二个 2)
// 2,2,3

const nums2 = [4,2,3,4];
console.log(triangleNumber(nums2));
// 输出: 4