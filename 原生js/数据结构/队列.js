function Queue(){
    this.container=[];
}
Queue.prototype={
    constructor:Queue,//保证原型链的完整性
    enter(value){
        this.container.push(value);
    },
    leave(){
        if(this.container.length===0) return;
        return this.container.shift();
    },
    size(){
        return this.container.length;
    },
    value(){
        //要进行深拷贝，防止外部获取数据后操作修改元数据
        //最简单的深拷贝是JSON.stringify 但是不能对Date RegExp Symbol function递归等处理
        //而且如果引用嵌套也会抛出异常
        return JSON.parse(JSON.stringify(this.container))
    }
}

//经典面试题：击鼓传花
/**
 * 思路：小于m时不断地由对头出队然后入队，m直接出队
 */

 /**
  * 
  * @param {*} n  队列初始化size
  * @param {*} m  击鼓的间隔
  */
function playGame(n,m){
    let queue=new Queue();
    for(let i=1;i<=n;i++){
        queue.enter(i);
    }
    while(queue.size()>1){
        for(let i=0;i<m-1;i++){
            queue.enter(queue.leave());
        }
        queue.leave();
    }
    console.log(queue.value());
}

//基于数组实现
function playGame(n,m){
    let queue=[];
    for(let i=1;i<=n;i++){
        queue.push(i);
    }
    while(queue.length>1){
        for(let i=0;i<m-1;i++){
            queue.push(queue.shift());
        }
        queue.shift();
    }
    console.log(queue[0]);
}

playGame(5,3);