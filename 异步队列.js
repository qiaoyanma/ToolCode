// 2.实现一个异步队列Queue，要求按时间依次执行callback
// new Queue().task(1000, function () {
//     console.log(1);
// }).task(2000, function () {
//     console.log(2);
// }).start()

//实现方法一

function Queue1(){
    this.queue=[];
    this.task=function(time,fn){
        this.queue.push({time,fn});
        return this;
    }
    this.start=function(){
        let defer=0;
        for(let item of this.queue){
            defer+=item.time;
            setTimeout(() => {
                item.fn()
            }, defer);
        }
    }
}
//方法2
function Queue2(){
    this.queue=[];
    this.task=function(time,fn){
        this.queue.push(function(resolve,reject){
            setTimeout(()=>{
                resolve(fn());
            },time);
        });
        return this;
    }
    this.start= async function(){
        for(let item of this.queue){
            await new Promise(item);
        }
    }
}



new Queue2().task(1000, function () {
    console.log(1);
}).task(2000, function () {
    console.log(2);
}).start()