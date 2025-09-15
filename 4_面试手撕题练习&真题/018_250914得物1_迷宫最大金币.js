// 攻略迷宫获取宝物
// 迷宫n层 第1层1个房间-第n层n个 每一层：房间从第一列开始排
// 迷宫入口：固定位于第一层
// 进入一个房间 只允许接着走右边/下面的房间
// 最后一层：每个房间都有出口 但是没有通往左右的门
// 已知每个房间有多少个金币 输出：能得到的最多金币
// 输入：第一行一个正整数n：迷宫层数；接下来n行：每行n个正整数表示各房间金币数

function maxCoin(arr){
    const n = arr.length;
    if (n === 0) return 0;
    if (n === 1) return arr[0][0];

    let dp = Array.from({length:n}, ()=>Array(n).fill(-Infinity));
    dp[0][0] = arr[0][0];
    for (let i=1; i<n-1; i++) {
        for (let j=0; j<=i; j++) {
            if (j===0) {
                dp[i][j] = dp[i-1][j] + arr[i][j];
            } else if (j===i) {
                dp[i][j] = dp[i][j-1] + arr[i][j];
            } else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]) + arr[i][j]
            };
        };
    };
    for (let j=0; j<n; j++) {
        dp[n-1][j] = dp[n-2][j] + arr[n-1][j];
    };

    console.log(dp);
    return Math.max(...dp[n-1]);
};

const arr1 = [[1],
            [2,4],
            [6,3,7],
            [7,7,9,1],
            [2,3,5,2,8],
            [2,7,2,4,9,1]]
console.log(maxCoin(arr1));