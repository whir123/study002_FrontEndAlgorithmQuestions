//编写一个函数，这个函数接收一个整数数组 arr 和一个映射函数  fn ，通过该映射函数返回一个新的数组。
//返回数组的创建语句应为 returnedArray[i] = fn(arr[i], i) 。
//请你在不使用内置方法 Array.map 的前提下解决这个问题。

var map = function(arr, fn) {
    if(arr.length===0)return [];
    let returnedArray = [];
    for(let i=0;i<arr.length;i++){
        returnedArray.push(fn(arr[i],i));
    };
    return returnedArray;
};

const arr1 = [1,2,3], fn1 = function plusone(n) { return n + 1; };
const arr2 = [1,2,3], fn2 = function plusI(n, i) { return n + i; }
const arr3 = [10,20,30], fn3 = function constant() { return 42; }
console.log(map(arr1, fn1));// [2,3,4]
console.log(map(arr2, fn2));// [1,3,5]
console.log(map(arr3, fn3));// [42,42,42]