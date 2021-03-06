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

function promiseall(arr=[]){
    return new Promise((resolve,reject)=>{
        if(arr.length===0){
            resolve([]);
        }else{
           let result=[],num=0;
           for(var i=0;i<arr.length;i++){
               Promise.resolve(arr[i]).then(value=>{
                result[num++]=value;
                if(num===arr.length){
                    resolve(result);
                }
               },err=>{
                   reject(err);
               });
           }
        }
    })
}

let asyncLimit=function(arr=[],limit){
    return new Promise((resolve,reject)=>{
        if(arr.length===0){
            resolve();
        }
        let count=0;
        let stop=false;
        let start=function(){
            if(stop){
                return;
            }
            let task=arr.shift();
            Promise.resolve(task).then((val)=>{
                count++;
                if(count===arr.length){
                    resolve();
                }else{
                    start();
                }
            },err=>{
                task.error++;
                if(task.error<3){
                    arr.push(task);
                }else{
                    stop=true;
                }
            })
        }
        while(limit--){
            start();
        }
    });
}
