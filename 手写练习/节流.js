/*
节流（throttle）:不管事件触发频率多高，只在单位时间内执行一次。
*/
function throttle(fn,time=10000){
    let _self=fn;
    let isFirst=true;
    let timer=null;
    return function(...args){
        let _this=this;
        if(isFirst){
            isFirst=false;
            fn.apply(_this,args);
        }
        if(timer){
            return false;
        }
        timer=setTimeout(() => {
            clearTimeout(time);
            timer=null;
            fn.apply(_this.args);
        }, time);
    }
}

function throttle1(fn,time=1000){
    let canRun=true;
    return function(){
        if(!canRun) return;
        canRun=false;
        setTimeout(() => {
            fn.apply(this,arguments);
            canRun=true;
        }, time);
    }
}
