/**
 * 给你一个整数 c，表示 c 个电站，每个电站有一个唯一标识符 id，从 1 到 c 编号。
 * 这些电站通过 n 条双向电缆互相连接，表示为一个二维数组 connections，其中每个元素 connections[i] = [ui, vi] 表示电站 ui 和电站 vi 之间的连接。直接或间接连接的电站组成了一个电网 。
 * 最初，所有电站均处于在线（正常运行）状态。
 * 另给你一个二维数组 queries，其中每个查询属于以下 两种类型之一 ：
 * [1, x]：请求对电站 x 进行维护检查。如果电站 x 在线，则它自行解决检查。如果电站 x 已离线，则检查由与 x 同一电网中编号最小的在线电站解决。如果该电网中不存在任何在线电站，则返回 -1。
 * [2, x]：电站 x 离线（即变为非运行状态）。
 * 返回一个整数数组，表示按照查询中出现的顺序，所有类型为 [1, x] 的查询结果。
 * 注意：电网的结构是固定的；离线（非运行）的节点仍然属于其所在的电网，且离线操作不会改变电网的连接性。
 */
class UnionFind {
    constructor(n) {
        this.fa = Array(n).fill(0).map((_, i) => i);
        this.size = Array(n).fill(1);
    };
    find(x){ // 查找根节点（查找属于哪个集合）
        if (this.fa[x]!==x) this.fa[x] = this.find(this.fa[x]);
        return this.fa[x];
    };
    merge(from,to){ // 将from和to所在的集合合并成一个集合（根节点指向新的根 集合大小累加）
        let x = this.find(from);
        let y = this.find(to);
        if (x===y) return false;
        this.fa[x] = y;
        this.size[y] += this.size[x];
        return true;
    };
}
var processQueries = function(c, connections, queries) {
    const uf = new UnionFind(c+1);
    for (const [x,y] of connections) uf.merge(x,y);
    console.log(uf.fa, uf.size); // 📝

    const map = new Map();
    for (let i=1; i<=c; i++){
        const root = uf.find(i);
        if (map.has(root)) {map.get(root).push(i)}
        else {map.set(root, [i])};
    };

    const minMap = new Map();
    for (const [k,v] of map) {
        const arr = [...v];
        minMap.set(k, arr.sort((a,b) => b-a));
        console.log(k, minMap.get(k)); // 📝
    };

    const isOnline = Array(c+1).fill(true);
    const ans = [];
    for (const [x,y] of queries){
        if (x===1) {
            if (isOnline[y]) {ans.push(y)}
            else {
                const root = uf.find(y);
                const minArr = minMap.get(root);
                let hasAdd = false;
                for (let i=minArr.length-1; i>=0; i--){
                    const val = minArr[i];
                    if (isOnline[val]){
                        ans.push(val);
                        hasAdd = true;
                        break;
                    } else {
                        minArr.pop();
                    };
                };
                if (minArr.length===0 && !hasAdd) ans.push(-1);
            };
        } else {
            isOnline[y] = false;
        };
    };

    return ans;
};

const c1 = 5;
const connections1 = [[1,2],[2,3],[3,4],[4,5]];
const queries1 = [[1,3],[2,1],[1,1],[2,2],[1,2]];
console.log(processQueries(c1, connections1, queries1));
// 输出： [3,2,3]
// 最初，所有电站 {1, 2, 3, 4, 5} 都在线，并组成一个电网。
// 查询 [1,3]：电站 3 在线，因此维护检查由电站 3 自行解决。
// 查询 [2,1]：电站 1 离线。剩余在线电站为 {2, 3, 4, 5}。
// 查询 [1,1]：电站 1 离线，因此检查由电网中编号最小的在线电站解决，即电站 2。
// 查询 [2,2]：电站 2 离线。剩余在线电站为 {3, 4, 5}。
// 查询 [1,2]：电站 2 离线，因此检查由电网中编号最小的在线电站解决，即电站 3。
const c2 = 3, connections2 = [], queries2 = [[1,1],[2,1],[1,1]]
console.log(processQueries(c2, connections2, queries2));
// 输出： [1,-1]
// 没有连接，因此每个电站是一个独立的电网。

