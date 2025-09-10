/**
 * 在一个由 m 个用户组成的社交网络里，我们获取到一些用户之间的好友关系。
 * 两个用户之间可以相互沟通的条件是他们都掌握同一门语言。
 * 给你一个整数 n ，数组 languages 和数组 friendships ，它们的含义如下：
 * * 总共有 n 种语言，编号从 1 到 n 。
 * * languages[i] 是第 i 位用户掌握的语言集合。
 * * friendships[i] = [u​​​​​​i​​​, v​​​​​​i] 表示 u​​​​​​​​​​​i​​​​​ 和 vi 为好友关系。
 * 你可以选择 一门 语言并教会一些用户，使得所有好友之间都可以相互沟通。请返回你 最少 需要教会多少名用户。
 * 请注意，好友关系没有传递性，也就是说如果 x 和 y 是好友，且 y 和 z 是好友， x 和 z 不一定是好友。
 */

var minimumTeachings = function(n, languages, friendships) {
    // 【 思路 】
    // ⚠️ 1 找出所有无法正常交流的好友对
    // ⚠️ 2 查看教哪门语言教的人数最少
    // ⚠️❕ 所有 badUsers 对于语言L 不会它的都得学【因为只选这一种语言就让他们都能互相交流】

    function canTalk(uL, vL){
        for(const l1 of uL){
            for(const l2 of vL){
                if(l1===l2) return true;
            };
        };
        return false;
    };

    const badUsers = new Set();
    for(const [u, v] of friendships) {
        let uL = languages[u-1], vL = languages[v-1];
        if(!canTalk(uL,vL)){
            badUsers.add(u);
            badUsers.add(v);
        };
    };

    let minTeach = Infinity;
    for(let l=1; l<=n; l++) {
        let unknow = 0;
        for(const u of badUsers){
            if(languages[u-1].indexOf(l)===-1){
                unknow++;
            };
        };
        minTeach = Math.min(minTeach, unknow);
    };
    return minTeach;
};

const n1 = 2, languages1 = [[1],[2],[1,2]], friendships1 = [[1,2],[1,3],[2,3]];
console.log(minimumTeachings(n1, languages1, friendships1));
// 输出：1
// 解释：你可以选择教用户 1 第二门语言，也可以选择教用户 2 第一门语言。

const n2 = 3, languages2 = [[2],[1,3],[1,2],[3]], friendships2 = [[1,4],[1,2],[3,4],[2,3]];
console.log(minimumTeachings(n2, languages2, friendships2));
// 输出：2
// 解释：教用户 1 和用户 3 第三门语言，需要教 2 名用户。
