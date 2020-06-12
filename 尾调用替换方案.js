function sum(x,y){
    if(y>0){
        return sum.bind(null,x+1,y-1);
    }else{
        return x;
    }
}

function trampoline(fn){
    while(fn&&fn instanceof Function){
        fn=fn();
    }
    return fn;
}

trampoline(sum(1,1000))

