//请你编写一个函数，检查给定的值是否是给定类或超类的实例
//可以传递给函数的数据类型没有限制。例如，值或类可能是undefined 

var checkIfInstanceOf = function(obj, classFunction) {
    //检查 参数obj 是否是 参数classFunction或其超类 的实例

    // 1 处理obj是null / undefined 或者 classFunction不是函数
    //【if (!obj)】会在以下情况为true：null / undefined / false / 0 / "" / NaN
    if(obj===null || obj===undefined || typeof classFunction!=='function')return false;// typeof可以区分‘function’

    // 2 处理原始值【5(number) / "hello"(string) / true(boolean)】
    //对于所有原始值（如 5n, 42, "abc"），应该【先用 Object(obj) 装箱成对应的对象】，再【用原型链来检查】
    const wrappedObj = Object(obj);
    //Object(obj) 是一种安全地将“任意值转为对象”的方式
    //如果 obj 是原始值（如数字、字符串、布尔、BigInt、Symbol），wrappedObj 就是对应的对象（Number、String等）
    //如果 obj 是对象或函数，它就保持不变
    //如果 obj 是 null 或 undefined，会抛出错误，需要提前排除

    // 3 手动遍历原型链
    let proto = Object.getPrototypeOf(wrappedObj);//返回的是对象 wrappedObj 的原型 //值等同于 wrappedObj.__proto__
    //obj.__proto__ 可以获取原型，但它是非标准/历史遗留的属性 在某些场景下不可靠
    console.log('proto是什么:',proto);
    while(proto !== null){
        if(proto.constructor === classFunction) return true;
        proto = Object.getPrototypeOf(proto);
    }
    return false;
};

console.log(checkIfInstanceOf(5,Number));
console.log(checkIfInstanceOf('lzk',String));
console.log(checkIfInstanceOf([1,2],Array));
console.log(checkIfInstanceOf({},Object));
console.log(checkIfInstanceOf(5n, Object));

class Animal {};//定义了一个名为 Animal 的类
class Dog extends Animal {};//定义了一个继承自 Animal 的 Dog 类（子类）【继承 Animal 的所有特性】
const AA = new Dog();
console.log(checkIfInstanceOf(AA,Animal));

//【拓展】：proto.constructor 指向创建这个原型对象的构造函数，即 proto.constructor === 构造函数本身
//当你创建一个构造函数或类时，JS 会自动为其 .prototype 添加一个 constructor 属性，指向这个构造函数本身
console.log(Animal.prototype.constructor === Animal);//true
function Person(){}
console.log(Person.prototype.constructor === Person);//true