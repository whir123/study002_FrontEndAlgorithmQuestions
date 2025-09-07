//给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量
//岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成
//此外，你可以假设该网格的四条边均被水包围
// 示例 1：
// 输入：grid = [
//   ["1","1","1","1","0"],
//   ["1","1","0","1","0"],
//   ["1","1","0","0","0"],
//   ["0","0","0","0","0"]
// ]
// 输出：1
// ————————————————————————
// 示例 2：
// 输入：grid = [
//   ["1","1","0","0","0"],
//   ["1","1","0","0","0"],
//   ["0","0","1","0","0"],
//   ["0","0","0","1","1"]
// ]
// 输出：3
var numIslands = function(grid) {
    if(!grid || grid.length===0){return 0;}
    let count = 0;
    const rows = grid.length;       //行数
    const cols = grid[0].length;    //列数
    //函数：【深度优先搜索（DFS）】或广度优先搜索（BFS）
    function dfs(r,c){
        if(r<0 || r>=rows || c<0 || c>=cols || grid[r][c]==='0') return;
        grid[r][c] = '0';
        //检查四个方向
        dfs(r-1, c);
        dfs(r+1, c);
        dfs(r, c-1);
        dfs(r, c+1);
    };
    for(let r=0; r<rows; r++){
        for(let c=0; c<cols; c++){
            if(grid[r][c]==='1'){
                count++;
                dfs(r,c);//检查相邻的1
            }
        }
    };
    return count;
};
var numIslands2 = function(grid) {//【这里用广度优先搜索BFS】
    if(!grid || grid.length===0){return 0;}
    let count = 0;
    const rows = grid.length;       //行数
    const cols = grid[0].length;    //列数
    const direction = [[-1,0],[1,0],[0,-1],[0,1]];//方向数组
    for (let r=0; r<rows; r++){ //遍历
        for(let c=0; c<cols; c++){
            if(grid[r][c]==='1'){
                count++;
                const queue = [[r,c]];//初始化队列，存入当前陆地坐标
                grid[r][c] = '0';//标记为已访问

                while(queue.length>0){//只要队列里有东西
                    const [curR,curC] = queue.shift();//取出队首坐标
                    for(const [dr,dc] of direction){//检查四个方向
                        const newR = curR + dr;
                        const newC = curC + dc;
                        if(newR<rows && newR>=0 && newC<cols && newC>=0 && grid[newR][newC]==='1'){
                            grid[newR][newC] = '0';//更新成已访问
                            queue.push([newR,newC]);//加入队列
                        }
                    }
                }
            }
        }
    };
    return count;
};

const grid1 = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
];
const grid2 = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
const grid3 = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
];
const grid4 = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
console.log(numIslands(grid1));
console.log(numIslands(grid2));
console.log(numIslands2(grid3));
console.log(numIslands2(grid4));