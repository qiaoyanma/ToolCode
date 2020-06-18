//分时函数
function timeTrunk(arr, fn, count) {
    let t;
    let start = function () {
        for (let i = 0; i < Math.min(arr.length, count || 1); i++) {
            var obj = arr.shift();
            fn(obj);
        }
    }
    return function () {
        t = setInterval(() => {
            if (arr.length === 0) {
                clearInterval(t);
            } else {
                start();
            }
        }, 25);
    }
}

//缓冲器函数
function multistep(steps,args,callback){
    var tasks = steps.concat();
    //var tasks=stpes.slice();
    setTimeout(function(){
        var task = tasks.shift();
        task.apply(null, args || []);   //调用Apply参数必须是数组

        if(tasks.length > 0){
            setTimeout(arguments.callee, 25);
        }else{
            callback();
        }
    },25);
}

function mulipFn(steps,args,callback){
    var tasks=steps.slice(0);
    setTimeout(()=>{
        var task=tasks.shift();
        task.apply(null,args||[]);
        if(tasks.length>0){
            setTimeout(arguments.callee,1000)
        }else{
            callback();
        }
    },1000);
}