// 封装栈类
function Stack(){
    // 栈的属性
    this.items = [];

    // 栈的相关操作
    // ⚠️ 箭头函数会带来问题 this是构造时的那个实例 new多个Stack 会共享同一个.prototype.push等
    // ⚠️ 箭头函数不适合挂在 prototype 丢掉了动态绑定的优势 
    Stack.prototype.push = function(element){
        this.items.push(element);
        return;
    };

    Stack.prototype.pop = function(){
        return this.items.pop(); // 最后一个元素就是栈顶元素
    };

    Stack.prototype.peek = function(){
        return this.items[this.items.length-1];
    };

    Stack.prototype.isEmpty = function(){
        return this.items.length===0;
    };
};

const s = new Stack();