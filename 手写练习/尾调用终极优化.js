function tfo(fn){
    let value,isActive=false,argArr=[];
    return function(...args){
        argArr.push(args);
        if(!isActive){
            isActive=true;
            while(argArr.length>0){
                value=fn.apply(this,argArr.shift())
            }
            isActive=false;
            return value;
        }
    }
}
let sum=tfo(function(x,y){
    if(y>0){
        return sum(x+1,y-1);
    }else{
        return x;
    }
});
console.log(sum(1,10));
