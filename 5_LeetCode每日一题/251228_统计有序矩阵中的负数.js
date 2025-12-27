/**
 * 给你一个 m * n 的矩阵 grid，矩阵中的元素无论是按行还是按列，都以非严格递减顺序排列。
 * 请你统计并返回 grid 中负数的数目。
 */

var countNegatives = function(grid) {
    const m = grid.length;
    if (m===0) return 0;
    const n = grid[0].length;
    if (n===0) return 0;

    let ans = 0;
    // for (let i=0; i<m; i++){
    //     for (let j=0; j<n; j++){
    //         if (grid[i][j]<0) ans++;
    //     };
    // };
    // ⚠️ 从右上角=>左下角
    let i=0, j=n-1;
    while (i<m && j>=0){
        if (grid[i][j]<0){
            ans += m-i;
            j--; // 向左
        } else {
            i++; // 向下
        };
    };
    return ans;
};

const grid1 = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]];
console.log(countNegatives(grid1));
// 输出：8

const grid2 = [[3,2],[1,0]];
console.log(countNegatives(grid2));
// 输出：0