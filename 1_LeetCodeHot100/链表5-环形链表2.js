//给定一个链表的头节点  head ，返回链表【开始入环的第一个节点】。 如果链表无环，则返回 null。
//如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 
//不允许修改链表

//【构建链表】
var ListNode = function(val){
    this.val = val;
    this.next = null; 
};
const head = new ListNode(3);
head.next = new ListNode(2);
head.next.next = new ListNode(0);
head.next.next.next = head.next;// 3 -> 2 -> 0 -> 指回2

//【哈希表法】
var hasCycle = function(head) {
    if(!head){return null;}
    const visited = new Set();
    let cur = head;
    while(cur){
        if(visited.has(cur)){return cur;}
        else{visited.add(cur);}
        cur = cur.next;
    };
    return null; // 无值时返回null
};
console.log(hasCycle(head));