var Event={
    [Symbol.hasInstance](foo){
        console.log(foo);
        return foo%2===1;
    }
}
console.log(1 in Event)
console.log(2 in Event)


function instanceOf1(child,parent){
    if(!child || !parent){
        return false;
    }
    parent=typeof parent==="function"?parent.prototype:parent;
    while(child.__proto__){
        if(child.__proto__==parent){
            return true;
        }
        child=child.__proto__;
    }
    return false;
}

var obj={x:1};
var obj1=Object.create(obj);
console.log(instanceOf1(obj1,obj));

function A(){}
function B(){
    A.call(this);
}
B.prototype=Object.create(A.prototype,{
    "constructor":{
        enumerable:false,
        configurable:true,
        writable:true,
        value:A
    }
})
console.log(instanceOf1(new B(),A));