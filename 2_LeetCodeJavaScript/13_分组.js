//请你编写一段可应用于所有数组的代码，使任何数组调用 array. groupBy(fn)方法时，它返回对该数组分组后的结果。
//数组分组是一个对象，其中的每个键都是 fn(arr[i]) 的输出的一个数组，该数组中含有原数组中具有该键的所有项。
//提供的回调函数 fn 将接受数组中的项并返回一个字符串类型的键。
//每个值列表的顺序应该与元素在数组中出现的顺序相同。任何顺序的键都是可以接受的。
//请在不使用 lodash 的 _.groupBy 函数的前提下解决这个问题。

Array.prototype.groupBy = function(fn) {
    if(this.length===0){return {}};
    let vis = new Map();
    for(let i=0; i<this.length; i++){
        let str = fn(this[i]);
        if(vis.has(str)){vis.get(str).push(this[i])}
        else{
            vis.set(str,[this[i]])
        };
    };
    return Object.fromEntries(vis);
};

//示例 1：
const array = [
  {"id":"1"},
  {"id":"1"},
  {"id":"2"}
], 
fn = function (item) {return item.id;};
console.log(array.groupBy(fn));
//{ 
//  "1": [{"id": "1"}, {"id": "1"}],   
//  "2": [{"id": "2"}] 
//}

//示例 2：
console.log([1,2,3].groupBy(String)); // {"1":[1],"2":[2],"3":[3]}
