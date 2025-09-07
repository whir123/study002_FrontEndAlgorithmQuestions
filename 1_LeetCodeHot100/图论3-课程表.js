/**
 * 你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses - 1 
 * 在选修某些课程之前需要一些先修课程。 先修课程按数组 prerequisites 给出
 * 其中 prerequisites[i] = [ai, bi] ，表示如果要学习课程 ai 则 必须 先学习课程  bi 。
 * 例如，先修课程对 [0, 1] 表示：想要学习课程 0 ，你需要先完成课程 1 。
 * 请你判断是否可能完成所有课程的学习？如果可以，返回 true ；否则，返回 false 。
 */

//【本质上是判断一个有向图是否有环】
// 方法一：拓扑排序（入度法）
var canFinish = function(numCourses, prerequisites) {
    const indegree = new Array(numCourses).fill(0);//记录每门课程需要的【先修课程数量（入度数）】
    const graph = new Array(numCourses).fill(0).map(() => []);//创建邻接表 graph 表示课程依赖关系图
    //回调函数 () => []： 忽略输入值，直接返回一个新的空数组 []
    //[0,0,0,0] => [[],[],[],[]]
    for (let [a, b] of prerequisites) {
        indegree[a]++;//a 的入度数 +1 因为他依赖于课程 b
        graph[b].push(a);//在邻接表中记录b→a的边（b是a的先修课程）
    }
    const queue = [];//初始化队列queue 用于拓扑排序
    for (let i = 0; i < numCourses; i++) {//将所有入度为 0 的课程加入队列
        if (indegree[i] === 0) queue.push(i);
    }
    let count = 0;//初始化计数器 用于记录已排序的课程数量
    while (queue.length) {
        const cur = queue.shift();
        count++;//取出当前课程 已排序课程数量+1
        for (let next of graph[cur]) {
            indegree[next]--;//减少后续课程的入度（因为先修课程 cur 已被"修完"）
            if (indegree[next] === 0) queue.push(next);//如果某个后续课程的入度变为0，将其加入队列
        }
    }
    return count === numCourses;//如果【成功排序的课程数】等于【总课程数】 返回true
};

// 方法二：DFS染色法（检测有向环）
var canFinishDFS = function(numCourses, prerequisites) {
    const graph = new Array(numCourses).fill(0).map(() => []);
    for (let [a, b] of prerequisites) {// graph 储存该课程的后续课程
        graph[b].push(a);
    }
    // 0=未访问，1=访问中，2=已访问
    const visited = new Array(numCourses).fill(0);//初始化所有课程visited状态为0 未访问
    let hasCycle = false;//初始化是否有环为 false
    function dfs(node) {
        if (visited[node] === 1) {
            hasCycle = true;
            return;
        }//如果1 说明形成了环
        if (visited[node] === 2 || hasCycle) return;

        visited[node] = 1;//标记当前节点为1
        for (let next of graph[node]) {
            dfs(next);//递归访问后续所有课程呢
        }
        visited[node] = 2;
    }
    for (let i = 0; i < numCourses; i++) {
        if (visited[i] === 0) dfs(i);
        if (hasCycle) return false;
    }//完成当前节点所有后续课程的检查后，标记为"已访问"
    return true;
}

//示例 1：
const numCourses = 2, prerequisites = [[1,0]];
console.log(canFinish(numCourses, prerequisites)); // true
console.log(canFinishDFS(numCourses, prerequisites)); // true
//解释：总共有 2 门课程。学习课程 1 之前，你需要完成课程 0 。这是可能的。

//示例 2：
const numCourses2 = 2, prerequisites2 = [[1,0],[0,1]];
console.log(canFinish(numCourses2, prerequisites2)); // false
console.log(canFinishDFS(numCourses2, prerequisites2)); // false
//解释：总共有 2 门课程。学习课程 1 之前，你需要先完成课程 0 ；
// 并且学习课程 0 之前，你还应先完成课程 1 ； 这是不可能的 。
