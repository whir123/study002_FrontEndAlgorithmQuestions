// 现给定一个整数的【多维数组】 ，请你返回一个生成器对象，按照【中序遍历】的顺序逐个生成整数
// 多维数组是一个递归数据结构，包含整数和其他多维数组
// 中序遍历是从左到右遍历每个数组，在遇到任何整数时生成它，遇到任何数组时递归应用【中序遍历】

var inorderTraversal = function*(arr) {
    for(const element of arr) {
        if(!Array.isArray(element)){yield element}
        else {yield* inorderTraversal(element)}
        //在生成器函数中，可以通过 yield* 委托给另一个生成器，实现递归
    };
};

const arr = [[[6]],[1,3],[]];
const generator = inorderTraversal(arr);
console.log(generator.next().value); //6
console.log(generator.next().value); //1
console.log(generator.next().value); //3
console.log(generator.next().done); //true


const arr2 = [];
const generator2 = inorderTraversal(arr2);
console.log(generator2.next().value);//undefined 输入的多维数组没有任何参数，所以生成器不需要生成任何值。