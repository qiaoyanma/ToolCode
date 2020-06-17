/**
 * 
 * @param {*} name 
 * 
实现一个LazyMan，可以按照以下方式调用:
LazyMan('Hank')输出:
Hi! This is Hank!
LazyMan('Hank').sleep(10).eat('dinner')输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~
LazyMan('Hank').sleep(10).eat('dinner').eat('supper')输出
Hi This is Hank!
Eat dinner~
Eat supper~
LazyMan('Hank').sleepFirst(5).eat('supper')输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper~
以此类推。
 */
function LazyMan(name){
    if(!(this instanceof LazyMan)){
        throw new Error("error!");
    }
    this.cbs=[];
    const cb=(next)=>{
        console.log(`hello,${name}`);
        next();
    }
    this.cbs.push(cb);
    setTimeout(()=>{
        this.next();
    },0);
}
LazyMan.prototype.next=function(){
    if(this.cbs.length<=0) return;
    let first=this.cbs.shift();
    first(this.next.bind(this));
}
LazyMan.prototype.eat=function(food){
    const cb=(next)=>{
        console.log(`eat food ${food}`);
        next();
    }
    this.cbs.push(cb);
    return this;
}
LazyMan.prototype.sleep=function(duration){
    const cb=(next)=>{
        setTimeout(()=>{
            console.log(`after sleep${duration}s`);
            next();
        },duration);
    }
    this.cbs.push(cb);
    return this;
}
LazyMan.prototype.sleepFirst=function(duration){
    const cb=(next)=>{
        console.log(`after sleep${duration}s`);
        next();
    }
    this.cbs.unshift(cb);
    return this;
}
new LazyMan('Hank').sleep(1000).eat('dinner').eat('supper')