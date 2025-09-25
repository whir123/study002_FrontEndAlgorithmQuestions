/**
 * 根据百度百科，生命游戏，简称为生命，是英国数学家约翰·何顿·康威在1970年发明的细胞自动机。
 * 给定一个包含 m × n 个格子的面板，每一个格子都可以看成是一个细胞。
 * 每个细胞都具有一个初始状态：1 即为活细胞（live），或 0 即为死细胞（dead）。
 * 每个细胞与其八个相邻位置（水平，垂直，对角线）的细胞都遵循以下四条生存定律：
 * - 如果活细胞周围八个位置的活细胞数少于两个，则该位置活细胞死亡；
 * - 如果活细胞周围八个位置有两个或三个活细胞，则该位置活细胞仍然存活；
 * - 如果活细胞周围八个位置有超过三个活细胞，则该位置活细胞死亡；
 * - 如果死细胞周围正好有三个活细胞，则该位置死细胞复活；
 * 下一个状态是通过将上述规则同时应用于当前状态下的每个细胞所形成的，其中细胞的出生和死亡是同时发生的。
 * 给你 m x n 网格面板 board 的当前状态，返回下一个状态。
 * 给定当前 board 的状态，更新 board 到下一个状态。
 * 注意你不需要返回任何东西。
 */

var gameOfLife = function(board) {
    const m = board.length;
    const n = board[0].length;
    let res = Array.from({length:m}, ()=>Array(n).fill(0));

    function liveAround(i,j) {
        let count = 0;
        for (let x of [i-1, i, i+1]){
            for (let y of [j-1, j, j+1]){
                if (!(x===i&&y===j)) {
                    if (x>=0 && x<m && y>=0 && y<n){
                        if(board[x][y]===1) count++;
                    };
                };
            };
        };
        return count;
    };

    for (let i=0; i<m; i++){
        for (let j=0; j<n; j++){
            let live = liveAround(i,j);
            if (board[i][j]===0) {
                if (live===3) res[i][j]=1;
            } else {
                if (live===2 || live===3) {
                    res[i][j]=1;
                } else {
                    res[i][j]=0;
                };
            };
        };
    };

    for (let i=0; i<m; i++){
        for (let j=0; j<n; j++){
            board[i][j] = res[i][j];
        };
    };
    return;
};

const board1 = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]];
console.log(gameOfLife(board1));
// 输出：[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]