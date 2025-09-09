/**
 * 给你两个按非递减顺序排列的整数数组 nums1 和 nums2
 * 另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目
 * 请你合并 nums2 到 nums1 中，使合并后的数组同样按非递减顺序排列。
 * 注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。
 * 为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。
 */

var merge = function(nums1, m, nums2, n) {
    // ⚠️ 三个指针 p1：nums1有效末尾 p2：nums2有效末尾 p：nums1占位带来的末尾
    let p1=m-1, p2=n-1, p=m+n-1;
    while(p2>=0){ // 最终不能让 p2 有剩余
        if(p1>=0 && nums1[p1]>nums2[p2]){
            // ⚠️ 能保证 p1<0 之后 继续把剩余的 p2 塞进正确位置
            nums1[p--] = nums1[p1--];
        } else {
            nums1[p--] = nums2[p2--];
        };
    };
};


const nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3;
merge(nums1, m, nums2, n);
console.log(nums1);