//给你单链表的头节点 head ，请你反转链表，并返回反转后的链表

//【创建链表函数】
function ListNode(val){
    this.val = val; // 节点值
    this.next = null; // 指向下一个节点的指针 默认没有下一个节点 默认null
};
function buildList(arr){
    const head = new ListNode(arr[0]);
    let cur = head;
    for(i=1;i<arr.length;i++){
        cur.next = new ListNode(arr[i]);
        cur = cur.next;
    };
    return head;
}

//【反转链表】【两种方法】
//【1迭代法】
var reverseList = function(head) {
    let prev = null;
    let curr = head;
    while(curr){
        let next = curr.next; //临时保存下一个节点
        curr.next = prev;
        prev = curr; // prev前进
        curr = next; // curr前进
    };
    return prev;
};//会导致原链表改变 递归法测试得换一个head
//【2递归法】
var reverseList2 = function(head) {
    //空链表/只有一个节点
    if(!head ||!head.next) return head;
    //递归反转剩余部分
    const newHead = reverseList2(head.next);
    head.next.next = head;
    head.next = null; // 断开原指针 防止成环
    return newHead; // 返回新头节点
};
// 原链表：1 -> 2 -> 3 -> 4 -> 5
// 递归过程：
// 1. 递归到 5 时返回 5（新头）。
// 2. 回溯到 4：4.next.next = 4 → 5 -> 4，断开 4.next。
// 3. 回溯到 3：3.next.next = 3 → 4 -> 3，断开 3.next。
// 4. 回溯到 2：2.next.next = 2 → 3 -> 2，断开 2.next。
// 5. 回溯到 1：1.next.next = 1 → 2 -> 1，断开 1.next。
// 最终新链表：5 -> 4 -> 3 -> 2 -> 1

//【打印链表】
function printList(head){
    let result = [];
    let cur = head;
    while(cur){
        result.push(cur.val);
        cur = cur.next;
    }
    console.log(result.join('->'));
}

const list1 = buildList([1,2,3,4,5]);
const list2 = buildList([1,2,3,4,5]);
printList(reverseList(list1));//5->4->3->2->1
printList(reverseList2(list2));//5->4->3->2->1
