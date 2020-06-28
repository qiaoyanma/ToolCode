const {
    resolve
} = require("path");

const ENUM = {
    PENDING: 'PENDING',
    FULFILLED: 'FULFILLED',
    REJECTED: 'REJECTED'
}
let resolvePromise = (x, promise2, resolve, reject) => {
    if (x === promise2) {
        // reject(new TypeError(`TypeError: Chaining cycle detected for promise #<Promise>`))
        reject(new TypeError('`TypeError: Chaining cycle detected for promise #<Promise>'));
    }
    //判断x是否为promise
    if ((typeof x === "object" && x !== null) || typeof x === "function") {
        let called;
        try {
            let then = x.then; //防止出现第一次调用之后读取then再报错的情况，所以缓存了一下
            if (typeof then === "function") {
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    resolvePromise(y, promise2, resolve, reject)
                }, err => {
                    if (called) return;
                    called = true;
                    reject(err);
                })
            } else {
                resolve(x);
            }
        } catch (err) {
            if (called) return;
            reject(err);
        }
    } else {
        resolve(x);
    }
}

class Promise {
    constructor(executor) {
        this.status = ENUM.PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolveCallbacks = [];
        this.onRejectCallbacks = [];

        //用箭头函数this指向外层，也就是promise
        let resolve = value => {
            //为了解决resolve(promise)的问题
            if (value instanceof Promise) {
                return value.then(reject, resolve);
            }
            if (this.status === ENUM.PENDING) {
                this.status = ENUM.FULFILLED;
                this.value = value;
                this.onResolveCallbacks.forEach(fn => fn())
            }
        }
        let reject = value => {
            if (this.status === ENUM.PENDING) {
                this.status = ENUM.REJECTED;
                this.reason = value;
                this.onResolveCallbacks.forEach(fn => fn())
            }
        }
        try {
            executor(resolve, reject);
        } catch (err) {
            //执行过程中出错也会调用reject
            reject(err);
        }

    }
    //then方法
    then(onfulfilled, onrejected) {
        //鉴于此机制后面才会catch和finally
        onfulfilled = typeof onfulfilled === "function" ? onfulfilled : (value) => value;
        onrejected = typeof onrejected === "function" ? onrejected : (err) => {
            throw err
        };
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === ENUM.PENDING) {
                this.onResolveCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            x = onfulfilled(this.value);
                            resolvePromise(x, promise2, resolve, reject);
                            //所有会等待前面promise完结才继续执行，比如promise.then(()=>{return promise})
                        } catch (ex) {
                            reject(ex);
                        }

                    }, 0);

                });
                this.onRejectCallbacks.push(() => {
                    //此处使用宏任务，v8底层使用微任务
                    setTimeout(() => {
                        try {
                            let x = onrejected(this.reason);
                            resolvePromise(x, promise2, resolve, reject)
                            //所以reject队列后续的promise接受到resolve队列
                        } catch (err) {
                            reject(err);
                        }

                    }, 0);
                });
            }
            if(this.status==ENUM.FULFILLED){
                setTimeout(() => {
                    try {
                        x = onfulfilled(this.value);
                        resolvePromise(x, promise2, resolve, reject);
                    } catch (ex) {
                        reject(ex);
                    }

                }, 0);
            }
            if(this.status==ENUM.REJECTED){
                setTimeout(() => {
                    try {
                        x = onrejected(this.reason);
                        resolvePromise(x, promise2, resolve, reject);
                    } catch (ex) {
                        reject(ex);
                    }

                }, 0);
            }
        })
    }

     //catch
     catch(onrejected){
        return this.then(null,onrejected);
     }
     //finally
     finally(callback){
         return this.then((value)=>{
             return Promise.resolve(callback()).then(()=>value)
         },(err)=>{
            return Promise.resolve(callback()).then(()=>{throw err})
         })
     }
     //all
     all(arr=[]){
         return new Promise((resolve,reject)=>{
             if(arr.length===0){
                 resolve([]);
             }
             let arrResult=[],index=0;
             for(let i=0;i<arr.length;i++){
                 Promise.resolve(arr[i]).then((value)=>{
                    arrResult[i]=value;
                    index++;
                    if(index===arr.length){
                        resolve(arrResult);
                    }
                 },err=>{
                     reject(err);
                 })
             }
         })
     }

    //类静态方法resolve
    static resolve(value) {
        return new Promise((resolve, reject) => {
            resolve(value);
        })
    }
    //reject
    static reject(value){
        return new Promise((resolve,reject)=>{
            reject(value);
        })
    }
   
}