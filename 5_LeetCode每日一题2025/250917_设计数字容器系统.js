/**
 * 设计一个数字容器系统，可以实现以下功能：
 * - 在系统中给定下标处 插入 或者 替换 一个数字。
 * - 返回系统中给定数字的最小下标。
 * 实现 NumberContainers 类：
 * - NumberContainers() 初始化数字容器系统。
 * - void change(int index, int number) 在下标 index 处填入 number 。
 * - 如果该下标 index 处已经有数字了，那么用 number 替换该数字。
 * - int find(int number) 返回给定数字 number 在系统中的最小下标。
 * - 如果系统中没有 number ，那么返回 -1 。
 */

// 小根堆实现
class MiniHeap {
    constructor() {
        this.data = [];
    }
    push(x) {
        this.data.push(x);
        this._up(this.data.length - 1);
    }
    pop() {
        if (this.size() === 0) return undefined;
        this._swap(0, this.data.length - 1);
        const res = this.data.pop();
        this._down(0);
        return res;
    }
    top() {
        return this.data[0];
    }
    size() {
        return this.data.length;
    }
    _parent(i) {
        return (i - 1) >> 1;
    }
    _left(i) {
        return (i << 1) + 1;
    }
    _right(i) {
        return (i << 1) + 2;
    }
    _up(i) {
        while (i > 0) {
            let p = this._parent(i);
            if (this.data[p] <= this.data[i]) break;
            this._swap(p, i);
            i = p;
        }
    }
    _down(i) {
        const n = this.data.length;
        while (true) {
            let l = this._left(i), r = this._right(i), min = i;
            if (l < n && this.data[l] < this.data[min]) min = l;
            if (r < n && this.data[r] < this.data[min]) min = r;
            if (min === i) break;
            this._swap(i, min);
            i = min;
        }
    }
    _swap(i, j) {
        [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
    }
}

var NumberContainers = function() {
    this.indexToNum = new Map(); // index -> number
    this.numToHeap = new Map();  // number -> MiniHeap of index
};

NumberContainers.prototype.change = function(index, number) {
    // if (this.indexToNum.has(index)) {
    //     // 旧值存在，不需要从堆中移除，懒惰删除
    // }
    this.indexToNum.set(index, number);
    if (!this.numToHeap.has(number)) {
        this.numToHeap.set(number, new MiniHeap());
    }
    this.numToHeap.get(number).push(index);
};

NumberContainers.prototype.find = function(number) {
    if (!this.numToHeap.has(number)) return -1;
    const heap = this.numToHeap.get(number);
    while (heap.size() > 0) {
        const idx = heap.top();
        if (this.indexToNum.get(idx) === number) {
            return idx;
        } else {
            heap.pop(); // 懒惰删除无效index
        }
    }
    return -1;
};

// 测试用例
let nc = new NumberContainers();
nc.change(1,4);
nc.change(1,5);
nc.change(1,7);
nc.change(2,7);
nc.change(6,7);
nc.change(6,9);
console.log(nc.find(4)); // -1
console.log(nc.find(7)); // 1
console.log(nc.find(9)); // 6