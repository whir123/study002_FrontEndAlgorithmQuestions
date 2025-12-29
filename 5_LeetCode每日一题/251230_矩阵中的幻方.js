/**
 * 3 x 3 的幻方是一个填充有从 1 到 9 的不同数字的 3 x 3 矩阵，其中每行，每列以及两条对角线上的各数之和都相等。
 * 给定一个由整数组成的row x col 的 grid，其中有多少个 3 × 3 的 “幻方” 子矩阵？
 * 注意：虽然幻方只能包含 1 到 9 的数字，但 grid 可以包含最多15的数字。
 */

var numMagicSquaresInside = function(grid) {
    let m = grid.length;
    if (m===0) return 0;
    let n = grid[0].length;
    if (n===0) return 0;

    let ans = 0;
    for (let i=0; i<=m-3; i++){
        for (let j=0; j<=n-3; j++){
            if (isMagicSquare(i,j)) ans++;
        };
    };
    
    function isMagicSquare(i,j){
        // 1 ⚠️ 3*3幻方 中心一定是5！
        if (grid[i+1][j+1] !== 5) return false;

        // 2 检查重复值/越界值
        let set = new Set();
        for (let x=0; x<3; x++){
            for (let y=0; y<3; y++){
                let v = grid[i+x][j+y];
                if (v<1 || v>9 || set.has(v)) return false;
                set.add(v);
            };
        };

        // 3 检查每行每列对角线
        for (let x=0; x<3; x++){
            if (grid[i+x][j] + grid[i+x][j+1] + grid[i+x][j+2] !== 15) return false;
        };
        for (let y=0; y<3; y++){
            if (grid[i][j+y] + grid[i+1][j+y] + grid[i+2][j+y] !== 15) return false;
        };
        if(grid[i][j] + grid[i+1][j+1] + grid[i+2][j+2] !==15) return false;
        if(grid[i][j+2] + grid[i+1][j+1] + grid[i+2][j] !==15) return false;

        return true;
    };

    return ans;
};

const grid1 = [[4,3,8,4],[9,5,1,9],[2,7,6,2]];
console.log(numMagicSquaresInside(grid1));
// 输出: 1

const grid2 = [[8]];
console.log(numMagicSquaresInside(grid2));
// 输出: 0