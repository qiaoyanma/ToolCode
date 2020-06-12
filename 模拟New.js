function _New(){
    let target={};
    let [constructor,...args]=[...arguments];
    target.prototype=constructor.prototype;
    let result=constructor.apply(target,args);
    if(result && (typeof result==="object" || result==="function")){
        return result;
    }else{
        return target;
    }
}

function instanceOf(left,right){
    if(!right.prototype){
        throw new Error("null");
    }
    let left=Object.getPrototypeOf(left);
    while(true){
        if(!left){return false;}
        if(left===right.prototype){return true;}
        left=Object.getPrototypeOf(left);
    }
}

function New(context,...args){
    let obj=Object.create(context.prototype);
    let result=context.apply(obj,args);
    if((typeof result==="object" && result!==null)|| typeof result==="function"){
        return result;
    }else{
        return obj;
    }
}

