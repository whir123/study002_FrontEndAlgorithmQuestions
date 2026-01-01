/**
 * 给你一个整数数组 nums 和一个链表的头节点 head。
 * 从链表中移除所有存在于 nums 中的节点后，返回修改后的链表的头节点。
 */
class ListNode {
    constructor(val){
        this.val = val;
        this.next = null;
    };
};

var modifiedList = function(nums, head) {
    let numsSet = new Set(nums);
    let dummy = new ListNode(0); // 虚拟头节点
    dummy.next = head;

    let cur = dummy;
    while(cur.next){
        if (numsSet.has(cur.next.val)){
            let nextNode = cur.next.next;
            cur.next = nextNode;
            // ⚠️ 不移动 继续检查下一个 cur.next
        } else {
            cur = cur.next;
        };
    };
    return dummy.next;
};