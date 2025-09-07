//以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 
//请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 
//输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
//输出：[[1,6],[8,10],[15,18]]
//解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6]
var merge = function(intervals) {
    //按区间的起始点从小到大排序！！！
    intervals.sort((a,b)=>a[0]-b[0]);
    let result = [intervals[0]];
    for(i=1;i<intervals.length;i++){
        n = result.length - 1;
        let lastLeft = result[n][0];//result的最后一个
        let lastRight = result[n][1];
        let curLeft = intervals[i][0];//intervals的当前一个
        let curRight = intervals[i][1];
        if(lastLeft<curRight && lastRight>=curLeft){
            result.pop();
            result.push([Math.min(lastLeft,curLeft), Math.max(lastRight, curRight)]);
        }else if(lastLeft<curRight && lastRight<curLeft){
            result.push(intervals[i]);
        };
    };
    return result;
};