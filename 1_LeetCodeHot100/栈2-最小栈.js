/**
 * 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
 * 实现 MinStack 类:
 *      MinStack() 初始化堆栈对象。
 *      void push(int val) 将元素val推入堆栈。
 *      void pop() 删除堆栈顶部的元素。
 *      int top() 获取堆栈顶部的元素。
 *      int getMin() 获取堆栈中的最小元素。
 */

var MinStack = function() {
    this.stack = [];
    this.stackMin = [];
};

MinStack.prototype.push = function(val) {
    this.stack.push(val);
    if(this.stackMin.length===0){
        this.stackMin.push(val);
    }else{
        this.stackMin.push(Math.min(val,this.stackMin[this.stackMin.length-1]))
    };
};

MinStack.prototype.pop = function() {
    this.stack.pop();
    this.stackMin.pop();  
};

MinStack.prototype.top = function() {
    return this.stack[this.stack.length-1];
};

MinStack.prototype.getMin = function() {
    return this.stackMin[this.stackMin.length-1];  
};

var obj = new MinStack();
obj.push(5);
obj.push(3);
obj.push(2);
obj.push(6);
console.log(obj);
obj.pop();
obj.pop();
console.log(obj);
var param_1 = obj.top();
var param_2 = obj.getMin();
console.log(param_1);
console.log(param_2);