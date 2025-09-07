/**
 * 给你一个整数数组 nums 和一个整数 k 
 * 请你返回其中出现频率前 k 高的元素。你可以按 任意顺序 返回答案。
*/

var topKFrequent = function(nums, k) {
    let numsMap = new Map();
    for(const num of nums){
        numsMap.set(num,(numsMap.get(num)||0)+1);
    };

    //最小堆，存储[频率,元素]对
    const Heap = [];
    for(const [num,freq] of numsMap){
        if(Heap.length<k){
            Heap.push([freq,num]);
            bubbleUp(Heap,Heap.length-1);
        } else if (freq>Heap[0][0]){
            Heap[0] = [freq,num];
            bubbleDown(Heap,0);
        };
    };

    // const arr = [];
    // for(const [freq,num] of Heap){
    //     arr.push(num);
    // };

    // return arr;
    return Heap.map(item => item[1]);// 直接这样 return
};

function bubbleUp(Heap,index){
    while(index>0){
        let parent = Math.floor((index-1)/2);
        if(Heap[parent][0]<=Heap[index][0]) break;
        [Heap[parent],Heap[index]] = [Heap[index],Heap[parent]];
        index = parent;
    }
};
function bubbleDown(Heap,index){
    const n = Heap.length;
    while(true){
        let smallest = index;
        let left = index*2+1;
        let right = index*2+2;
        if(left<n && Heap[smallest][0]>Heap[left][0]) smallest=left;
        if(right<n && Heap[smallest][0]>Heap[right][0]) smallest=right;
        if(smallest === index) break;
        [Heap[index],Heap[smallest]] = [Heap[smallest],Heap[index]];
        index = smallest;
    }
};

const nums1 = [1,1,1,2,2,3], k1 = 2;
console.log(topKFrequent(nums1,k1)); // [1,2]
const nums2 = [1], k2 = 1;
console.log(topKFrequent(nums2,k2)); // [1]
 