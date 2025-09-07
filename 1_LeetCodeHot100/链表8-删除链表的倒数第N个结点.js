/**
 * 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
 * 输入：head = [1,2,3,4,5], n = 2
 * 输出：[1,2,3,5]
 * 倒数第二个是 4
 */
var ListNode = function(val){
    this.val = val;
    this.next = null; 
};

const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);
head.next.next.next.next = new ListNode(5);

//【双指针法】【快慢指针法】
var removeNthFromEnd = function(head, n) {
    let dummy = new ListNode(0);
    dummy.next = head;
    let slow = dummy;
    let fast = dummy;

    //快指针先走n+1步
    for(let i=0; i<n+1; i++){
        fast = fast.next;
    };
    //一起走
    while(fast!==null){
        fast = fast.next;
        slow = slow.next;
    };//fast ——> null；slow ——> 要删除元素的前一个

    slow.next = slow.next.next;
    return dummy.next; // !!!
};

var removeNthFromEnd2 = function(head, n) {
    let nodeMap = new Map();
    let cur = head, i = 0;
    while(cur!==null) {
        nodeMap.set(i++,cur);
        cur = cur.next;
    };

    const len = i; //链表长度
    const delIndex = len-n; // 要删除的节点索引
    if(delIndex===0){ // 如果要删除的是头节点
        return head.next;
    };

    // let del = nodeMap.get(delIndex); //没必要
    let delPrev = nodeMap.get(delIndex-1);// 前驱节点
    let delNext = nodeMap.get(delIndex+1) || null;// 后继节点
    // del.next = null; //没必要
    delPrev.next = delNext;
    return head;
};

console.log(removeNthFromEnd(head,2));