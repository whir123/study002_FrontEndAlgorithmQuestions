/**
 * 请你判断一个 9 x 9 的数独是否有效。只需要根据以下规则 ，验证已经填入的数字是否有效即可。
 * 数字 1-9 在每一行只能出现一次。
 * 数字 1-9 在每一列只能出现一次。
 * 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。（请参考示例图）
 */

// 一次性检查 行 列 宫
function isValidSudoku(board: string[][]): boolean {
    //let rows = Array(9).fill(new Set()) // ⚠️ 错误 九个一起指向同一个Set实例
    let rows = Array(9).fill(0).map(()=> new Set());
    let cols = Array(9).fill(0).map(()=> new Set());
    let boxes = Array(9).fill(0).map(()=> new Set());

    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            let nums:string = board[i]![j]!;
            if(nums === '.') continue;

            if(rows[i]!.has(nums)) return false;
            rows[i]!.add(nums);

            if(rows[j]!.has(nums)) return false;
            cols[j]!.add(nums);

            let index = Math.floor(i/3) * 3 + Math.floor(j/3); // ⚠️关键
            if(boxes[index]!.has(nums)) return false;
            boxes[index]!.add(nums);
        };
    };

    return true;
};

// 分开检查 行 列 宫
function isValidSudoku2(board: string[][]): boolean {
    let record:Set<string> = new Set();
    // 行验证:
    for(const arr of board){
        record.clear();
        for(const str of arr){
            if(str!=="."){
                if(record.has(str)) return false;
                record.add(str);
            };
        };
    };
    // 列验证：
    for(let i=0; i<9; i++){
        record.clear();
        for(let j=0; j<9; j++){
            const str:string = board[j]![i]!; 
            if(str!=="."){
                if(record.has(str)) return false;
                record.add(str);
            };
        };
    };
    // 宫验证
    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            record.clear();
            for(let x=3*i; x<3*i+3; x++){
                for(let y=3*j; y<3*j+3; y++){
                    const str: string = board[x]![y]!;
                    if(str!=="."){
                        if(record.has(str)) return false;
                        record.add(str);
                    };
                };
            };
        };
    };
    return true;
};

const board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]];
console.log(isValidSudoku(board));