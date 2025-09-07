//给定n个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
//输入：height = [0,1,0,2,1,0,1,3,2,1,2,1] 输出：6 【如图所示】

const height = [0,1,0,2,1,0,1,3,2,1,2,1];
var trap = function(height) {
    let left = 0;
    let right = height.length-1;
    let leftMax = 0;
    let rightMax = 0;
    let water = 0;
    while (left < right) {//整体指针左边还在左边 右边还在右边
        if (height[left]<height[right]){//左边矮 从左边接水
            if(height[left]>=leftMax){leftMax = height[left];}//更新一下左边最高值
            else{water += leftMax - height[left]};
            left++;
        }
        else {//右边矮 从右边接水
            if(height[right]>=rightMax){rightMax = height[right];}//更新一下右边最高值
            else{water += rightMax - height[right]};
            right--;
        }
    }
    return water;
};
console.log(trap(height));