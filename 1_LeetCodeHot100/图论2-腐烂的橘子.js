//在给定的 m x n 网格 grid 中，每个单元格可以有以下三个值之一：
// 值 0 代表空单元格；
// 值 1 代表新鲜橘子；
// 值 2 代表腐烂的橘子。
// 每分钟，腐烂的橘子【2】周围 4 个方向上相邻的新鲜橘子都会腐烂【1】——>【2】。
// 返回直到单元格中没有新鲜橘子为止【无1】所必须经过的最小分钟数。如果不可能，返回 -1 
var orangesRotting = function(grid) {
    if(!grid||grid.length===0)return -1;//空 不可能
    //【应该使用广度优先搜索（BFS）】
    //【从所有腐烂的橘子同时开始，每分钟向外扩展一层】
    const rows = grid.length;   //行
    const cols = grid[0].length;//列
    const queue = [];
    let fresh = 0;
    let minutes = 0;
    //遍历 统计新鲜橘子数量 将腐烂橘子加入队列
    for(let r=0;r<rows;r++){
        for(let c=0;c<cols;c++){
            if(grid[r][c]===1){fresh++;}
            else if(grid[r][c]===2){queue.push([r,c]);};
        }
    };
    if(fresh===0)return 0;//没有新鲜橘子的情况
    const direction = [[0,-1],[0,1],[-1,0],[1,0]];
    //BFS开始
    while(queue.length>0 && fresh>0){//既有烂橘子也有新鲜橘子
        const size = queue.length;
        //目前存贮的所有烂橘子开始扩散
        for(let i=0;i<size;i++){
            const [r,c] = queue.shift();//拿出烂橘子坐标
            for(const [dr,dc] of direction){
                const nr = r+dr;
                const nc = c+dc;
                if(nr>=0 && nr<rows && nc>=0 && nc<cols && grid[nr][nc]===1){//检查：边界/新鲜橘子
                    grid[nr][nc] = 2;//变成烂橘子
                    fresh--;//新鲜橘子变少
                    queue.push([nr,nc]);//放入新的烂橘子
                }
            }
        }
        //一波扩散完 队列里有新的烂橘子 时间增加
        if(queue.length>0){minutes++;}
    };
    //判断return
    return fresh===0 ? minutes : -1;
};
const grid = [[2,1,1],[1,1,0],[0,1,1]];
console.log(orangesRotting(grid)); //4