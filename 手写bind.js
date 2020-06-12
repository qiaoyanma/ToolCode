function _bind(context,...args){
    if(typeof this!=="function"){
        throw new Error("not a function");
    }
    var self=this;
    var fbond=function(...args1){
        return context.apply(this instanceof self?this:self,args.concat(args1));
    }
    fbond.prototype=Object.create(context.prototype);
    return fbond;
}