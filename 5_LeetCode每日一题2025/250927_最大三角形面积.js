/**
 * 给你一个由 X-Y 平面上的点组成的数组 points ，其中 points[i] = [xi, yi] 。
 * 从其中取任意三个不同的点组成三角形，返回能组成的最大三角形的面积。
 * 与真实值误差在 10-5 内的答案将会视为正确答案。
 */

var largestTriangleArea = function(points) {
    let maxS = 0;
    const n = points.length;
    function triS(x1,y1,x2,y2,x3,y3) {
        let S = 0.5*Math.abs((x2-x1)*(y3-y1)-(x3-x1)*(y2-y1));
        return S;
    };

    for (let i=0; i<n-2; i++) {
        for (let j=i+1; j<n-1; j++) {
            for (let k=j+1; k<n; k++) {
                let S = triS(points[i][0], points[i][1], points[j][0], points[j][1], points[k][0], points[k][1]);
                if (S>maxS) maxS = S;
            };
        };
    };

    return maxS;
};

const points1 = [[0,0],[0,1],[1,0],[0,2],[2,0]];
console.log(largestTriangleArea(points1));
// 输出：2.00000

const points2 = [[1,0],[0,0],[0,1]];
console.log(largestTriangleArea(points2));
// 输出：0.50000