/**
 * 在一条无限长的公路上有 n 辆汽车正在行驶。汽车按从左到右的顺序按从 0 到 n - 1 编号，每辆车都在一个独特的位置。
 * 给你一个下标从 0 开始的字符串 directions ，长度为 n 。
 * directions[i] 可以是 'L'、'R' 或 'S' 分别表示第 i 辆车是向左 、向右 或者 停留 在当前位置。每辆车移动时速度相同 。
 * 碰撞次数可以按下述方式计算：
 * - 当两辆移动方向 相反 的车相撞时，碰撞次数加 2 。
 * - 当一辆移动的车和一辆静止的车相撞时，碰撞次数加 1 。
 * - 碰撞发生后，涉及的车辆将无法继续移动并停留在碰撞位置。除此之外，汽车不能改变它们的状态或移动方向。
 * 返回在这条道路上发生的 碰撞总次数 。
 */

var countCollisions = function(directions) {
    // ⚠️ 去掉左边连续L
    let i = 0;
    while(i<directions.length && directions[i]==='L') i++;

    // ⚠️ 去掉右边连续R
    let j = directions.length-1;
    while(j>=0 && directions[j]==='R') j--;

    let res = 0;
    for (let k=i; k<=j; k++){
        if (directions[k]!=='S') res++;
    };
    return res;
};

const directions1 = "RLRSLL";
console.log(countCollisions(directions1));
// 输出：5
// 将会在道路上发生的碰撞列出如下：
// - 车 0 和车 1 会互相碰撞。由于它们按相反方向移动，碰撞数量变为 0 + 2 = 2 。
// - 车 2 和车 3 会互相碰撞。由于 3 是静止的，碰撞数量变为 2 + 1 = 3 。
// - 车 3 和车 4 会互相碰撞。由于 3 是静止的，碰撞数量变为 3 + 1 = 4 。
// - 车 4 和车 5 会互相碰撞。在车 4 和车 3 碰撞之后，车 4 会待在碰撞位置，接着和车 5 碰撞。碰撞数量变为 4 + 1 = 5 。
// 因此，将会在道路上发生的碰撞总次数是 5 。

const directions2 = "LLRR";
console.log(countCollisions(directions2));
// 输出：0
// 不存在会发生碰撞的车辆。因此，将会在道路上发生的碰撞总次数是 0 。
