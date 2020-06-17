function intersection(...args){
    if(args.length===0){
        return [];
    }else if(args.length===1){
        return args[0];
    }
    return [...new Set(args.reduce((pre,next)=>{
        return pre.filter(x=>next.includs(x));
    }))]
}