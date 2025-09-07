//给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行。
//在「杨辉三角」中，每个数是它左上方和右上方的数的和。

var generate = function(numRows) {
    if(numRows===1) return [[1]];
    if(numRows===2) return [[1],[1,1]];
    let result = [[1],[1,1]];
    for(i=2;i<numRows;i++){
        let now = [1];
        for(j=0;j<i-1;j++){
            now.push(result[i-1][j]+result[i-1][j+1]);
        };
        now.push(1);
        result.push(now);
    };
    return result;
};

//【更简洁版本】
var generate2 = function(numRows) {
    let result = [];
    for(let i=0;i<numRows;i++){
        const row = [1];
        for(let j=1;j<i;j++){
            row.push(result[i-1][j-1]+result[i-1][j]);
        };
        if(i>0){row.push(1)};
        result.push(row);
    };
    return result;
}

const numRows = 5;
console.log(generate(numRows));
console.log(generate2(numRows));
//[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]