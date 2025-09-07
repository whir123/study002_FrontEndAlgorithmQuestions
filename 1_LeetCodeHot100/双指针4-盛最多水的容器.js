//给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 
//找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水
//返回容器可以储存的最大水量
var maxArea = function(height) {
    let left = 0;
    let right = height.length - 1;//双指针
    let waterMax = 0;
    while(left<right){//移动较矮的指针（因为移动较高的指针不会增加水量，而移动较矮的指针可能找到更高的垂线）!!!
        let water = Math.min(height[left],height[right])*(right-left);
        waterMax = Math.max(water, waterMax);
        if(height[left]<height[right]){left++;}
        else{right--;}
    }
    return waterMax;
};

const height = [1,8,6,2,5,4,8,3,7];
console.log(maxArea(height));//49