var reverseList = function (head) {
    if (!head && !head.next) {
        return head;
    }
    var current = head,
        pre = null;
    while (current) {
        var next = current.next;
        current.next = pre;
        pre=current;
        current = next;
    }
}

/*
尾递归调用
*/
var reverseList = function (head) {
    if (!head || !head.next) {
        return head;
    }
    var head = reverse(null, head);
    return head;
}

function reverse(pre, current) {
    if (!current) return pre;
    var next = current.next;
    current.next = pre;
    return reverse(current, next);
}