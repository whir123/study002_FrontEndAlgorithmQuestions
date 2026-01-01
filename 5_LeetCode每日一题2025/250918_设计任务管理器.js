/**
 * 一个任务管理器系统可以让用户管理他们的任务，每个任务有一个优先级。这个系统需要高效地处理添加、修改、执行和删除任务的操作。
 * 请你设计一个 TaskManager 类：
 * - TaskManager(vector<vector<int>>& tasks) 初始化任务管理器，初始化的数组格式为 [userId, taskId, priority] ，表示给 userId 添加一个优先级为 priority 的任务 taskId 。
 * - void add(int userId, int taskId, int priority) 表示给用户 userId 添加一个优先级为 priority 的任务 taskId ，输入 保证 taskId 不在系统中。
 * - void edit(int taskId, int newPriority) 更新已经存在的任务 taskId 的优先级为 newPriority 。输入 保证 taskId 存在于系统中。
 * - void rmv(int taskId) 从系统中删除任务 taskId 。输入 保证 taskId 存在于系统中。
 * - int execTop() 执行所有用户的任务中优先级 最高 的任务，如果有多个任务优先级相同且都为 最高 ，执行 taskId 最大的一个任务。执行完任务后，taskId 从系统中 删除 。同时请你返回这个任务所属的用户 userId 。如果不存在任何任务，返回 -1 。
 * 注意 ，一个用户可能被安排多个任务。
 */

// ⭐️ 堆的基本结构
// ❗️ 最大堆就是一棵完全二叉树（用数组存），规则是：
// ❗️ 父节点 ≥ 子节点
// ❗️ 堆顶（数组下标 0）永远是最大元素
// ⭐️ 数组存储方式：
// ❗️ 对于节点索引 i：
// ❗️ 左子：2*i + 1
// ❗️ 右子：2*i + 2
// ❗️ 父亲：Math.floor((i-1)/2)

class MyHeap {
    constructor () {
        this.data = [];
    };
    cmp (a,b) { // 比较函数：优先级高 → 大，若相同 taskId 大的优先
        if (a[0]!==b[0]) return a[0]>b[0];
        return a[1]>b[1];
    };
    push (val) {
        this.data.push(val);
        this.siftUp(this.data.length-1);
    };
    pop () { // 取最大元素
        if (this.data.length===0) return null;
        const top = this.data[0];
        const last = this.data.pop();
        if (this.data.length>0) {
            this.data[0] = last;
            this.siftDown(0);
        };
        return top;
    };
    top () {
        return this.data.length ? this.data[0] : null;
    };
    siftUp (i) {
        while (i>0) {
            const p = Math.floor((i-1)/2);
            if (this.cmp(this.data[i], this.data[p])) {
                [this.data[i], this.data[p]] = [this.data[p], this.data[i]];
                i=p;
            } else break;
        };
    };
    siftDown (i) {
        const n = this.data.length;
        while (true) {
            let l = 2*i+1, r = 2*i+2, max = i;
            if (l < n && this.cmp(this.data[l], this.data[max])) max = l;
            if (r < n && this.cmp(this.data[r], this.data[max])) max = r;
            if (max !== i) {
                [this.data[i], this.data[max]] = [this.data[max], this.data[i]];
                i = max;
            } else break; 
        };
    };
}
var TaskManager = function(tasks) {
    this.taskMap = new Map(); // taskId -> [ userId, priority ]
    this.taskHeap = new MyHeap();
    for (const [userId, taskId, priority] of tasks) {
        this.taskMap.set(taskId, [userId, priority]);
        this.taskHeap.push([priority, taskId, userId]);
    };
};

TaskManager.prototype.add = function(userId, taskId, priority) {
    this.taskMap.set(taskId, [userId, priority]);
    this.taskHeap.push([priority, taskId, userId]);
};

TaskManager.prototype.edit = function(taskId, newPriority) {
    const [userId] = this.taskMap.get(taskId);
    this.taskMap.set(taskId, [userId, newPriority]);
    this.taskHeap.push([newPriority, taskId, userId]);
};

TaskManager.prototype.rmv = function(taskId) {
    this.taskMap.delete(taskId);
};

TaskManager.prototype.execTop = function() {
    while (this.taskHeap.data.length > 0) {
        const [prio, tid, uid] = this.taskHeap.top();
        if (this.taskMap.has(tid)) {
            const [curUid, curPrio] = this.taskMap.get(tid);
            if (curUid === uid && curPrio === prio) {
                this.taskHeap.pop();
                this.taskMap.delete(tid);
                return uid;
            }
        }
        // 否则说明是过期元素，丢掉
        this.taskHeap.pop();
    };
    return -1;
};

let a = new TaskManager([[1,101,10],[2,102,20],[3,103,15]]);
a.add(4,104,5);
a.edit(102,8);
console.log(a.execTop());
a.rmv(101);
a.add(5,105,15);
console.log(a.execTop());