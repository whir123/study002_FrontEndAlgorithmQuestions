/**
 * n行m列网格 (i,j)表示第i行第j列单元格 (1<=i<=n,1<=j<=m)
 * 最初所有单元格为空 需要在每个单元格填入一个非0整数 使得：
 * 任意2*2子网格整数之和 = 整个网络中所有单元格内整数之和
 * 输出：一共n行 第i行输出m个空格分割的非0整数
 */

// ⭐️ 感觉有坑：mn=奇数时不对
function getGrid(m,n){
    let g = Array.from({length:m}, ()=>Array(n));
    for (let i=0; i<m; i++){
        for (let j=0; j<n; j++){
            if ((i+j)%2===0){
                g[i][j] = 2;
            } else {
                g[i][j] = -2;
            };
        };
    };
    return g;
};

console.log(getGrid(2,2));
console.log(getGrid(3,4));