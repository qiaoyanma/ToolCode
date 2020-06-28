Function.prototype.call=function(context,...args){
    //处理undefined，null和不传值情况 undefined==null
    context==undefined?context=window:(void 0);
    //处理传入context为非对象情况，比如数值、symbol等
    if(!/^(object|function)&/.test(typeof context)){
        context=Object(context);
    }
    //处理
    let key=Symbol('key');
    context[key]=this;
    let result=context[key](...args);
    delete context[key];
    return result;
}

//手写apply
Function.prototype.apply=function(context){
    context==undefined?context=window:(void 0);
    if(!/^(object|function)&/.test(typeof context)){
        context=Object(context);
    }
    let args =[].slice(1),result;
    let key=Symbol('key');
    context[key]=this;
    if(Array.isArray(args)){
        result=context[key](...args);
    }else{
        result=context[key]();
    }
    delete context[key];
    return result;
}

//手写bind
Function.prototype.bind=function(context,...args){
    context==undefined?context=window:(void 0);
    if(!/^(object|function)&/.test(typeof context)){
        context=Object(context);
    }
    let self=this;
    return function(...params){
       return self.apply(context,args.concat(params));
    }
}
//经典面试题
function fn1(){console.log(1);}
function fn2(){console.log(2);};
fn2.call(fn1);
//this=fn2 context=fn1 fn1.xx=fn2 fn1.xx() ==>输出1
fn2.call.call(fn1);  //fn2.call.call.call.....call(fn1) 都是取最后一个call
//this=fn2.call context=fn1  fn1.xx=fn2.call fn1.xx()=>fn2.call();
//fn2.call()  this=>fn2 context=window  window.xx=fn2 window.xx() fn2()  所以输出2
Function.prototype.call(fn1);
//this=>Function.prototype  是一个匿名空函数  context=fn1
//fn1.xx=Function.prototype fn1.xx()  Function.prototype()
Function.prototype.call.call(fn1)
//this=>Function.prototype.call context=fn1 fn1.xx=Function.prototype.call 
//fn1.xx()=>fn1.call() this=>fn1 context=window window.xx=fn1 window.xx() fn1()





