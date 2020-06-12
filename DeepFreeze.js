function deepFreeze(obj) {
    let propertys = Reflect.ownKeys(obj);
    for (let prop of propertys) {
        obj[prop] = (obj[prop] && typeof obj[prop] === "object") ? deepFreeze(obj[prop]) : obj[prop];
    }
    return Object.freeze(obj);
}
var obj={
    x:{name:"jiafei"}
}
deepFreeze(obj);
obj.x.name="hahha";


function throttle(fn,duration=1000){
    let pre=Date.now();
    return function(){
        let self=this;
        let args=arguments;
        if(Date.now()-now>duration){
            setTimeout(()=>{
                fn.apply(self,args);
                pre=Date.now();
            })
            
        }

    }
}