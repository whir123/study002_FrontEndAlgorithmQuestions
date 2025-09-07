/**
 * 设计一个 EventEmitter 类。这个接口与 Node.js 或 DOM 的 Event Target 接口相似，但有一些差异。
 * EventEmitter 应该允许订阅事件和触发事件。有以下两个方法：
 * subscribe - 这个方法接收两个参数：一个作为字符串的事件名和一个回调函数。当事件被触发时，这个回调函数将被调用。 
 * 一个事件应该能够有多个监听器。当触发带有多个回调函数的事件时，应按照订阅的顺序依次调用每个回调函数。应返回一个结果数组。
 * 你可以假设传递给 subscribe 的回调函数都不是引用相同的。 subscribe 方法还应返回一个对象，其中包含一个 unsubscribe 方法
 * 用户可以取消订阅。当调用 unsubscribe 方法时，回调函数应该从订阅列表中删除，并返回 undefined。
 * unsubscribe 操作接收一个参数，即之前进行订阅的顺序（从 0 开始）
 * emit - 这个方法接收两个参数：一个作为字符串的事件名和一个可选的参数数组，这些参数将传递给回调函数。
 * 如果没有订阅给定事件的回调函数，则返回一个空数组。否则，按照它们被订阅的顺序返回所有回调函数调用的结果数组。
 */

class EventEmitter {
    constructor(){
        this.events = new Map();
        this.list = [];
    };

    subscribe(eventName, callback){
        if(!this.events.has(eventName)){
            this.events.set(eventName,[]);
        };
        this.events.get(eventName).push(callback);

        const sub = {eventName, callback};
        this.list.push(sub);

        // unsubscribe(0) —— ⚠️ 这里传的是 订阅返回对象的索引（第 0 个订阅），而不是 sub0.unsubscribe()
        return {
            unsubscribe: ()=>{
                this._remove(sub);
                return undefined;
            }
        };
    };

    unsubscribe(id){
        const sub = this.list[id];
        if(!sub) return;
        this._remove(sub);
        return undefined;
    };

    _remove(sub){
        const listeners = this.events.get(sub.eventName);
        if(!listeners) return;
        const idx = listeners.indexOf(sub.callback);
        if(idx!==-1) listeners.splice(idx,1); // 在索引 idx 处移除 1 个元素
        //❗️splice() 方法就地移除或者替换已存在的元素和/或添加新的元素
    }

    emit(eventName, args = []){
        let listeners = this.events.get(eventName);
        if(!listeners) return [];
        return listeners.map(fn => fn(...args));
    };
};

const emitter1 = new EventEmitter();
console.log(emitter1.emit("firstEvent")); // [], 还没有订阅任何回调函数
emitter1.subscribe("firstEvent", function cb1() { return 5; });
emitter1.subscribe("firstEvent", function cb2() { return 6; });
console.log(emitter1.emit("firstEvent")); // [5, 6], 返回 cb1 和 cb2 的输出

const emitter2 = new EventEmitter();
const sub = emitter2.subscribe("firstEvent", (...args) => args.join(''));
console.log(emitter2.emit("firstEvent", [1, 2, 3])); // ["123"]
console.log(emitter2.emit("firstEvent", [4, 5, 6])); // ["456"]
sub.unsubscribe(0);
console.log(emitter2.emit("firstEvent", [4, 5, 6])); // [], 没有订阅者

const emitter3 = new EventEmitter();
emitter3.subscribe("firstEvent", x => x + 1);
emitter3.subscribe("firstEvent", x => x + 2);
emitter3.subscribe("firstEvent", x => x + 3);
emitter3.unsubscribe(1);
emitter3.unsubscribe(2);
console.log(emitter3.emit("firstEvent", [5])); // [ 6 ]