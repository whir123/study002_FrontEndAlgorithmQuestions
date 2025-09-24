/**
 * 实现RandomizedSet 类：
 * RandomizedSet() 初始化 RandomizedSet 对象
 * bool insert(int val) 当元素 val 不存在时，向集合中插入该项，并返回 true ；否则，返回 false 。
 * bool remove(int val) 当元素 val 存在时，从集合中移除该项，并返回 true ；否则，返回 false 。
 * int getRandom() 随机返回现有集合中的一项（测试用例保证调用此方法时集合中至少存在一个元素）。每个元素应该有 相同的概率 被返回。
 * 你必须实现类的所有函数，并满足每个函数的平均时间复杂度为 O(1) 
 */

var RandomizedSet = function() {
    this.data = new Map();
    this.arr = []
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
    if (this.data.has(val)) return false;
    this.data.set(val, this.arr.length);
    this.arr.push(val);
    return true;
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
    if (!this.data.has(val)) return false;
    const idx = this.data.get(val);
    if (idx===this.arr.length-1) {
        this.arr.pop();
        this.data.delete(val);
        return true;
    };

    const las = this.arr[this.arr.length-1];
    this.arr[idx] = las;
    this.arr.pop();
    this.data.delete(val);
    this.data.set(las, idx);
    return true;
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
    const n = this.arr.length;
    let i = Math.floor(Math.random()*n);
    return this.arr[i];
};