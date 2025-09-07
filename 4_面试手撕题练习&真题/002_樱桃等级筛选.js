/**
 * 自动化机械扫描一批樱桃的尺寸大小 获得直径范围[L,H]各个区间所有樱桃个数统计
 * 通过 a 个等级来筛选不同尺寸大小的樱桃（ a < H - L ）
 * 使得各等级内樱桃数目标准差最小
 * 
 * 【输入】(樱桃直径总数n(2<n<=20)) 需要获取的等级数目a(2<a<n) 一个长度为 n 的数组 A 其中第i个元素ai表示直径为第 1+n 个直径的樱桃个数(0<=i<=H-L,0<ai<100)
 * 【输出】长度为a的数组R 其中第一个元素b0表示顺序从A中取b0个元素 该尺寸范围作为一个分类等级 第二个元素b1表示从b0开始取b1个元素 ...
 */

function choose(a, A){
    const n = A.length;
    if(a<=0 || a>n) throw new Error('must: 0 < a < n');
    //❗️【 标准差最小 等价于 分组后，每个组的总和尽量接近 总数/a 】
    //❗️【 方差 = ( Σ (Si - 平均)^2 ) / a ｜ 实际上是最小化 Σ Si^2 ｜ 把 A 分成 a 段，使得各段的 和平方和最小 】
    const preSum = new Array(n).fill(0); // ⚠️ 前缀和 preSum[0]=A[0];
    for(let i=0; i<n; i++){
        preSum[i] = (i>0 ? preSum[i-1] : 0) + A[i];
    };
    function segSum(l, r){ // ⚠️ 片段和 A[l]~A[r]两边都含
        if (l>r) return 0;
        return preSum[r]-(l>0 ? preSum[l-1] : 0);
    };

    // ⚠️ 二维数组——dp[i][k]：前 i 个元素(A[0...i-1]) 分成 k 段的 最小 Σ(段和^2)
    const INF = Number.POSITIVE_INFINITY; // ❗️ 下面不能用 Array().fill() 数组会指向同一数组引用
    const dp = Array.from({length:n+1}, ()=> new Array(a+1).fill(INF)); // [序号0～序号n]
    const cut = Array.from({length:n+1}, ()=> new Array(a+1).fill(-1)); // [⚠️ 用来设置断点]
    // dp[0][0] = 0; // ⚠️ 含o个0段概念的直接不管
    // ⚠️ dp[0][k>0]已为INF dp[i>0][0]保持INF--不可能用>0元素分成0段

    // k=1 即前i个元素成1段 ｜ 段和^2
    for(let i=1; i<n+1; i++){
        const s = segSum(0,i-1) // 前i个元素
        dp[i][1] = s*s;
        cut[i][1] = 0; // 第一段从0开始
    };

    // k>=2的情况（k <= i）
    for(let i=1; i<n+1; i++){
        for(let k=2; k<=Math.min(i,a); k++){ // k最多到a 但不能超过i
            let curMin = INF, bestJ = -1;
            for(let j=k-1; j<=i-1; j++){ // 前j个元素分k-1段 剩下的j～i-1自成一段
                const s = segSum(j, i-1)
                const cand = dp[j][k-1] + s*s;
                if (cand<curMin){
                    curMin = cand;
                    bestJ = j; // 接下来一段从j开始（包括j）
                };
            };
            dp[i][k] = curMin;
            cut[i][k] = bestJ;
            //❗️❗️dp[i][k]时 ｜ 把对应的 j 存入 cut[i][k]（表示最优划分里，前 i 元素分 k 段时最后一段是从 j 开始）
        };
    };

    // ⚠️ 回溯得到各段长度 R | (R.length=a)
    const R = new Array(a).fill(0);
    let i=n;
    for(k=a; k>0; k--){
        const j = cut[i][k]; // ⚠️ 最后一段从j开始 ｜ 就是 A[j..n-1]
        R[k-1] = i-j;
        i=j;
    };
    return R;
};

//【测试】
console.log(choose(3, [1,2,3,4,5]));
//R = [3,1,1] → groups: [1,2,3]=6, [4]=4, [5]=5，组和平方和 = 6² + 4² + 5² = 77，组和的均值 = 5，方差 ≈ 0.6667（很小，合理）
console.log(choose(2, [2,2,2,2,2]));
//结果 R = [2,3] → groups sums = [4,6]，这把元素划成更接近平衡的和（输出里已给出详表）
console.log(choose(4, [1,1,1,1]));
//结果 R = [1,1,1,1]（每组一个元素），当然是最优
console.log(choose(3, [10,1,1,1,10]));
//[1,3,1]