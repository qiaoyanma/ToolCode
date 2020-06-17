function pipe(value) {
    let stackArr = [];
    let proxy = new Proxy({}, {
        get: function (target, property, receiver) {
            if(property==="get"){
                return stackArr.reduce(function(pre,next){
                    return next(pre);
                },value)
            }
            stackArr.push(window[property]);
            return proxy;
        }
    });
    return proxy;
}
var double=n=>n*2;
var pow=n=>n*n;
var reverse=n=>String(n).split("").reverse().join("");
console.log(pipe(3).double.pow.reverse.get);