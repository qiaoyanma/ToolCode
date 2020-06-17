/*
防抖（debounce）：不管事件触发频率多高，一定在事件触发n秒后才执行，
如果你在一个事件触发的 n 秒内又触发了这个事件，
就以新的事件的时间为准，n 秒后才执行，总之，触发完事件 n 秒内不再触发事件，n秒后再执行。

flag为true表示第一次是立即执行的  
*/
function debounce(event, time, flag) {
    let timer = null;
    return function (...args) {
        //settimeout函数如果执行过会有返回自身id，即使clearTimeout后依然有返回
        cleartimeout(timer);
        if (flag && !timer) {
            event.apply(this, args);
        }
        timer=setTimeout(() => {
            event.apply(this,args);
        }, time);
    }

}

function debounce1(fn,time,flag/*第一次是否执行 */){
    let timer=null;
    return function(...args){
        cleartimeout(timer);
        if(flag && !timer){
            fn.apply(this,args);
        }
        timer=setTimeout(() => {
            fn.apply(this,args);
        }, time);
    }
}


function debounce(fn,time,isFirst/*isFirst */){
    let timer=null;
    return function(...args){
        let self=this;
        if(!timer && isFirst){
            fn.apply(self,args);
            isFirst=false;
        }
        if(timer){
            clearTimeout(timer);
        }
        timer=setTimeout(()=>{
            fn.apply(self,args);
        },time);
    }
}

function throttle(fn,time,isFirst/*第一次是否执行*/){
    let canRun=true;
    return function(...args){
        let self=this;
        if(canRun&& isFirst){
            fn.apply(self.args);
            isFirst=false;
        }
        if(!canRun){
            return;
        }
        flag=false;
        setTimeout(()=>{
            fn.apply(self,args);
            canRun=true;
        })
    }
}