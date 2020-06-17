/*
 bridgePromise--桥梁promise
 x--返回的结果
*/
function resolvePromise(x, resolve, reject) {
    if (x instanceof MyPromise) {
        if (x.status == "pending") {
            x.then(y => {
                resolvePromise(y, resolve, reject);
            }, y => reject(y))
        } else {
            x.then(resolve, reject)
        }
    } else {
        resolve(x);
    }
}

Promise.resolve = function (param) {
    if (param instanceof Promise) {
        return param;
    }
    return new Promise((resolve, reject) => {
        if (param && param.then && typeof param.then === "function") {
            param(resolve, reject);
        } else {
            resolve(param);
        }
    })
}
Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    })
}

Promise.finally = function (callback) {
    this.then(() => {
        return Promise.resolve(callback()).then(() => value)
    }, (error) => {
        return Promise.resolve(callback()).then(() => {
            throw error
        });
    })
}

Promise.all = function (arr = []) {
    return new Promise((resolve, reject) => {
        if (arr.length === 0) {
            resolve(arr);
        }
        let result = [];
        let index = 0,
            length = arr.length;
        for (let i = 0; i < arr.length; i++) {
            Promise.resolve(arr[i]).then(value=>{
                result[i]=value;
                index++;
                if(index===length){
                    resolve(result);
                }
            },err=>{
                reject(err);
            })
        }
    })

}

Promise.resolve=function(arr=[]){
    return new Promise((resolve,reject)=>{
        if(arr.length===0){
            return; //传空数组会一直处于pendding的状态
        }
        for(let i=0;i<arr.length;i++){
            Promise.resolve(arr[i]).then(value=>{
                resolve(value);
            }).catch(err=>{
                reject(err);
            })
        }
    });
}