//编写一个类，它允许获取和设置键-值对，并且每个键都有一个过期时间 。
//该类有三个公共方法：
//set(key, value, duration) ：接收参数为整型键 key 、整型值 value 和以毫秒为单位的持续时间 duration 
//                            一旦 duration 到期后，这个键就无法访问
//                            如果相同的未过期键已经存在，该方法将返回 true ，否则返回 false 
//                            如果该键已经存在，则它的值和持续时间都应该被覆盖
//get(key) ：如果存在一个未过期的键，它应该返回这个键相关的值。否则返回 -1 。
//count() ：返回未过期键的总数。

//【方法3：ES6 Class 简洁实现 TimeLimitedCache】
class TimeLimitedCache {
    constructor() {
        this.cache = new Map();
    };
    set(key, value, duration) {
        const exists = this.cache.has(key) && this.cache.get(key).expiredAt > Date.now();
        this.cache.set(key, {
            value, expiredAt: duration + Date.now()
        })
        return exists;
    };
    get(key) {
        if (!this.cache.has(key)) return -1;
        return this.cache.get(key).expiredAt>Date.now() ? this.cache.get(key).value : -1;
    };
    count() {
        const now = Date.now();
        return [...this.cache.values()].filter(item => item.expiredAt > now).length;
        //this.cache.values()：返回 Map 中【所有值】的迭代器
        //[... ]：扩展运算符，将迭代器转换为数组
        //filter()：数组方法，返回通过测试的元素组成的新数组
        //测试条件 item.expiredAt > now
    };
}

const testA = new TimeLimitedCache();
console.log(testA.set(1,20,1000));//false
console.log(testA.set(1,20,5000));//true
console.log(testA.get(1));//20
console.log(testA.count());//1
setTimeout(()=>{
    console.log(testA.count());//0
},6000);