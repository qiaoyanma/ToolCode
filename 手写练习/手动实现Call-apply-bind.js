Function.prototype.myCall = function (context = window, ...args) {
    if (this === Function.prototype) {
        return undefined; // 用于防止 Function.prototype.myCall() 直接调用
    }
    context = context || window;
    const symbol = Symbol();
    context[symbol] = this;
    let result = context[symbol](...args);
    delete context[symbol];
    return result;
}

Function.prototype.myApply = function (context = window, args) {
    if (this === Function.prototype) {
        return undefined;
    }
    context=context||window;
    const symbol=Symbol();
    context[symbol]=this;
    let result;
    if(Array.isArray(args)){
        result=context[symbol](...args);
    }else{
        result=context[symbol]();
    }
   
    delete context[symbol];
    return result;
}

Function.prototype.myBind=function(context=window,...args){
    if(this===Function.prototype){
        throw new TypeError("error");
    }
    context=context|| window;
    let fn=this;
    return function F(...args1){
        //判断是否用于构造函数
        if(this instanceof F){
            return new fn(...args,...args1);
        }else{
            return fn.apply(context,args.concat(args1));
        }
    }
}

//另一种优雅的写法
Function.prototype.myBind=function(thisArg,...args){
    if(typeof this !="function"){
        throw TypeError("Bind must be called on a function")
    }
    let self=this;
    let fun=function(...args1){
        //let args1=Array.prototype.slice.call(arguments);
       return self.apply(this instanceof self?this:self,args.concat(args1))
    }
    fun.prototype=Object.create(self.prototype);
    return fun;
}