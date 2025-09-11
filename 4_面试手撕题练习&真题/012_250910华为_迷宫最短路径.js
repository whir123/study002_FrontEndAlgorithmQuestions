/**
 * 给定一个迷宫地图（二维数组）
 * 0通道 1墙壁 S起点 E终点
 * 返回最短路径步数 无法返回：-1
 * 迷宫有虫洞 2表示 成对出现 穿越到另一端口 耗费0步
 */

process.stdin.resume(); //⚠️ 启动标准输入监听（开启“读”模式），否则 Node 不会自动等待你的输入。
process.stdin.setEncoding('utf-8'); //⚠️ 设定输入内容编码为 utf-8，能正确读取中文、英文、数字等
let input = '';
process.stdin.on('data', (data) => { //⚠️ 监听每次输入的数据片段 累加到input
    input += data;
    // ⚠️ 数据全部输入完毕后 Ctrl+D
});
process.stdin.on('end', () => { //⚠️ 所有输入全部完成之后，才会触发这个回调，正式运行处理逻辑
    let inputArray = input.trim().split('\n');
    let [m,n] = inputArray[0].split(' ').map(Number);
    let maze = inputArray.slice(1).map(row => row.split(''));
    console.log(solveMaze(m, n, maze));

    /**
     * 待实现函数，在此函数中填入答题代码
     * doFunc()
     */
    function solveMaze(m, n, maze) {
        let start, end;
        let wormholes = [];
        for(let i=0; i<m; i++){
            for(let j=0; j<n; j++){
                if(maze[i][j]==='S') start = [i,j];
                if(maze[i][j]==='E') end = [i,j];
                if(maze[i][j]==='2') wormholes.push([i,j]);
            }
        }

        let wormholeMap = new Map();
        for(let i=0; i<wormholes.length; i+=2){
            let [x1, y1] = wormholes[i];
            let [x2, y2] = wormholes[i+1];
            wormholeMap.set(`${x1},${y1}`,[x2, y2]);
            wormholeMap.set(`${x2},${y2}`,[x1, y1]);
        }

        let queue = [[...start, 0]]; // [x, y, step]
        let visited = Array.from({length: m}, () => Array(n).fill(false));
        visited[start[0]][start[1]] = true;
        const dirs = [[1,0], [-1,0], [0,1], [0,-1]]; // 上下左右

        while(queue.length>0){
            let [x, y, step] = queue.shift();
            if(x===end[0] && y===end[1]) return step;

            for(let [dx, dy] of dirs){
                let nx = x + dx, ny = y + dy;
                if(nx<0 || ny<0 || nx>=m || ny>=n) continue;
                if(maze[nx][ny]==='1') continue;
                if(!visited[nx][ny]){
                    visited[nx][ny] = true;
                    queue.push([nx, ny, step+1]);
                }
            }

            if(maze[x][y]==='2'){
                const key = `${x},${y}`;
                if(wormholeMap.has(key)){
                    const [tx, ty] = wormholeMap.get(key);
                    if(!visited[tx][ty]){
                        visited[tx][ty] = true;
                        queue.push([tx, ty, step]); // 传送不耗步
                    }
                }
            }
        }

        return -1;
    }

    process.exit();
});

//【输入】
// 5 5 
// S0000
// 11110
// 01010
// 01010
// 0000E

//【输出】
// 8