function autoGenerator(genFunc){
    return function(...args){
        let gen=genFunc.apply(this,args);;
        return new Promise((resolve,reject)=>{
            function next(type,val){
                try{
                    let {done,value}=gen[type](val);
                }
                catch(e){
                    reject(e);
                }
                if(done){
                    resolve(value);
                }else{
                    Promise.resolve(value).then(val=>{
                        next('next',value);
                    },err=>{
                       next('throw',err);
                    })
                }
            }
            next('next');
        });
    }
}