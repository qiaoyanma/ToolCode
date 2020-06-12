//实现函数add add(1)(2,3)(4).value()  =>10
/*
应用函数柯里化
*/

function add(...args){
    let cur=function(...para){
        return add.apply(this,args.concat(para));
    }
    cur.value=function(){
        return args.reduce((pre,next)=>{
            return pre+next;
        })
    }
    return cur;
}
console.log(add(1,2)(3)(4,5).value());

/*
另一种方式
*/

function add1(...args){
    function curry(...args1){
        return add1.apply(this,args.concat(args1));
    }
    curry.value=function(){
        return args.reduce((pre,next)=>pre+next);
    }
    return curry;
}


/*
实现如下功能 add(1)(2)(3)=add(1,2,3)
*/
function add2(...args){
 let curry=function(...args1){
     return add2.apply(this,args.concat(args1));
 }

 curry[Symbol.toPrimitive]=function(){
    return args.reduce((pre,next)=>pre+next);
}
 return curry;
}
console.log(add2(1)(2)(3,4)===add2(1,2,3,4))

'use strict'
function fn1(number){
 if(number===1){
     return 1;
 }else{
     return arguments.callee(number-1)*number
 }
}

function myCurry(fn,...args){
    if(args.length>=fn.length){
        return fn.apply(null,args);
    }else{
        return function(...args1){
            return myCurry.apply(null,args.unshift(fn).concat(args1));
        }
    }
}