/**
 * 给定由一些正数（代表长度）组成的数组 nums ，
 * 返回由其中三个长度组成的、面积不为零的三角形的最大周长 。
 * 如果不能形成任何面积不为零的三角形，返回 0。
 */

var largestPerimeter = function(nums) {
    let maxL = 0;

    nums.sort((a,b) => b-a);
    for (let i=1; i<nums.length-1; i++) {
        let l=nums[i-1], m=nums[i], r=nums[i+1];
        if (l<m+r && l+m+r>maxL) maxL = l+m+r;
    };

    return maxL;
};

const nums1 = [2,1,2];
console.log(largestPerimeter(nums1));
// 输出：5

const nums2 = [1,2,1,10];
console.log(largestPerimeter(nums2));
// 输出：0