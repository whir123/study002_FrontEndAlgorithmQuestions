/**
 * 请你设计一个数据结构来高效管理网络路由器中的数据包。
 * 每个数据包包含以下属性：
 * - source：生成该数据包的机器的唯一标识符。
 * - destination：目标机器的唯一标识符。
 * - timestamp：该数据包到达路由器的时间戳。
 * 实现 Router 类：
 * Router(int memoryLimit)：初始化路由器对象，并设置固定的内存限制。
 * - memoryLimit 是路由器在任意时间点可以存储的最大数据包数量。
 * - 如果添加一个新数据包会超过这个限制，则必须移除最旧的数据包以腾出空间。
 * bool addPacket(int source, int destination, int timestamp)：将具有给定属性的数据包添加到路由器。
 * - 如果路由器中已经存在一个具有相同 source、destination 和 timestamp 的数据包，则视为重复数据包。
 * - 如果数据包成功添加（即不是重复数据包），返回 true；否则返回 false。
 * int[] forwardPacket()：以 FIFO（先进先出）顺序转发下一个数据包。
 * - 从存储中移除该数据包。
 * - 以数组 [source, destination, timestamp] 的形式返回该数据包。
 * - 如果没有数据包可以转发，则返回空数组。
 * int getCount(int destination, int startTime, int endTime)：]
 * - 返回当前存储在路由器中（即尚未转发）的，且目标地址为指定 destination 且时间戳在范围 [startTime, endTime]（包括两端）内的数据包数量。
 * - 注意：对于 addPacket 的查询会按照 timestamp 的递增顺序进行。
 */


// ⭐️ 引入双向链表（部分方法）
class DL {
    // ⭐️ 内部类 节点
    Node = class {
        constructor(data){
            this.data = data;
            this.prev = null;
            this.next = null;
        };
    };

    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    };

    append(data){
        let newNode = new this.Node(data);
        if(this.length===0){
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        };
        this.length++;
    };

    shift(){
        if (this.length===0) return null;

        let returnNode = this.head;
        if (this.length===1) {
            this.head = this.tail = null;
        } else {
            this.head = returnNode.next;
            this.head.prev = null;
        }
        this.length--;
        return returnNode.data;
    };

    size(){
        return this.length;
    };
};

var Router = function(memoryLimit) {
    this.rtData = new DL();
    this.rtSet = new Set(); // 去重用
    this.rtMap = new Map(); // destination -> 有序时间数组
    this.mLimit = memoryLimit;
};

Router.prototype.addPacket = function(source, destination, timestamp) {
    let key = `${source}_${destination}_${timestamp}`;
    if (this.rtSet.has(key)) return false;

    this.rtSet.add(key);
    this.rtData.append([source, destination, timestamp]);
    if (!this.rtMap.has(destination)){
        this.rtMap.set(destination, []);
    };
    this.rtMap.get(destination).push(timestamp); // ⚠️ 输入时本来就会按照时间戳递增

    while (this.rtData.length > this.mLimit) {
        let head = this.rtData.shift();
        let key = `${head[0]}_${head[1]}_${head[2]}`;
        this.rtSet.delete(key);
        this.rtMap.get(head[1]).shift();
        if (this.rtMap.get(head[1]).length===0) this.rtMap.delete(head[1]); //❗️
    };
    return true;
};

Router.prototype.forwardPacket = function() {
    if (this.rtData.size()!==0) {
        let next = this.rtData.shift();
        let key = `${next[0]}_${next[1]}_${next[2]}`;
        this.rtSet.delete(key);
        this.rtMap.get(next[1]).shift();
        if (this.rtMap.get(next[1]).length===0) this.rtMap.delete(next[1]); //❗️
        return next;
    } else {
        return [];
    };
};

Router.prototype.getCount = function(destination, startTime, endTime) {
    if (!this.rtMap.has(destination)) return 0;
    let arr = this.rtMap.get(destination);
    let l = _lowerBound(arr, startTime); // >= sT 的第一个位置
    let r = _upperBound(arr, endTime); // > sT 的第一个位置
    return r-l;
};

function _lowerBound(arr, num) {
    let left = 0, right = arr.length;
    while (left<right) {
        let mid = Math.floor((left+right)/2);
        if (arr[mid] < num) {
            left = mid+1;
        } else {
            right = mid;
        };
    };
    return left; // ⭐️ 能返回 >= num 的第一个位置
};
function _upperBound(arr, num) {
    let left = 0, right = arr.length;
    while (left<right) {
        let mid = Math.floor((left+right)/2);
        if (arr[mid] <= num) {
            left = mid+1;
        } else {
            right = mid;
        };
    };
    return left; // ⭐️ 能返回 > num 的第一个位置
};

const r = new Router(3);
console.log(r.addPacket(1, 4, 90)); // true
console.log(r.addPacket(2, 5, 90)); // true
console.log(r.addPacket(1, 4, 90)); // false
console.log(r.addPacket(3, 5, 95)); // true
console.log(r.addPacket(4, 5, 105)); // true
console.log(r.forwardPacket()); // [2,5,90]
console.log(r.addPacket(5, 2, 110)); // true
console.log(r.getCount(5, 100, 110)); // 1
