function Obj(value) {
    this.value = value;
    this.next = null;
}

Obj.prototype[Symbol.iterator] = function () {
    let current = this,
        value;
    function next() {
        if (current) {
            value = current.value;
            current = current.next;
            return {value,done:false}
        }
        return {value:undefined,done:true}
    }
    return {
        next
    }
}

var one=new Obj(1);
var two=new Obj(2);
var three=new Obj(3);
one.next=two;
two.next=three;
for(let item of one){
    console.log(item);
}
