function hasCycle(head){
    while(head){
        if(head.flag) return true;
        head.flag=true;
        head=head.next;
    }
}

/*
利用JSON.Stringify不能序列化循环引用的结构，返回false
*/
function hasCycle(head){
    try{
        JSON.stringify(head);
        return true;
    }catch(err){
        return false;
    }
}

/*
利用两个指针，一个快指针，一次走两步，一个慢指针一次走一步，要是有循环，快指针肯定能追上慢指针、
*/
function hasCycle(head){
    if(!head || !head.next){
        return false;
    }
    let fast=head.next.next,slow=head;
    while(fast!=slow){
        if(!fast|| !fast.next){
            return false;
        }
        fast=fast.next.next;
        slow=slow.next;
    }
    return true;
}