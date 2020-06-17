if(!Number.prototype[Symbol.iterator]){
    // let i=0,inc=1,done=false
    // if(!done){
    //     return{
            
    //     }
    // }else{
    //     return {done:true,value:undefined};
    // }
    Object.defineProperty(Number.prototype,Symbol.iterator,{
        writable:true,
        configurable:true,
        enumerable:false,
        value:function iterator(){
            let i=0,inc=1,done=false,top=+this//+转化为数字;
            //判断是正向还是反向
            inc=inc*(top<0?-1:1);
            return {
                next(){
                    if(!done){
                        //正向代理
                        if(top>=0){
                            i=Math.min(top,i+inc);
                        }else{
                            i=Math.max(top,i+inc);
                        }
                       if(i==top){
                           done=true;
                       }
                       return {value:i,done:false}
                    }else{
                        return {done:true}
                    }
                }
            }
        }
    });
}

for(let i of 5){
    console.log(i);
}


Object.defineProperty(Number.prototype,Symbol.iterator,{
    writable:true,
    configurable:true,
    enumertable:true,
    value:function iterator(){
        let i=0,inc=1,top=+this,done=false;
        inc=inc*(top<0?-1:1);
        return {
           next(){
               if(!done){
                  if(top>0){
                      i=Math.min(top,i+inc);
                  }else{
                      i=Math.max(top,i+inc);
                  }
                  if(i===top){
                      done=true;
                  }
                  return {done,value:i}
               }else{
                   return {done}
               }
           }
        }
    }
})

for(let i of 5){
    console.log(i);
}
